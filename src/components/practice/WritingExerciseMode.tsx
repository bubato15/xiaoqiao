"use client";

import { useState, useRef, useMemo } from "react";
import type { WritingExercise } from "@/data/practice";
import type { WritingEvalResult, GrammarError } from "@/app/api/writing-eval/route";
import { canSpeak, speak } from "@/lib/speech/webspeech";

const RATING_CONFIG = {
  excellent: { label: "Chính xác & Xuất sắc!", color: "text-tone-2", bg: "bg-mint/20 border-tone-2/40", emoji: "🎉" },
  good: { label: "Tốt (còn lỗi nhỏ)", color: "text-tone-3", bg: "bg-sky/20 border-tone-3/40", emoji: "👍" },
  fair: { label: "Hiểu được (có lỗi ngữ pháp)", color: "text-tone-4", bg: "bg-peach/30 border-tone-4/40", emoji: "✏️" },
  needs_work: { label: "Cần sửa lại câu", color: "text-seal", bg: "bg-peach/50 border-seal/40", emoji: "⚠️" },
} as const;

const ERROR_TYPE_LABELS: Record<GrammarError["type"], { label: string; badge: string }> = {
  grammar: { label: "Lỗi ngữ pháp", badge: "bg-seal/10 text-seal border-seal/30" },
  vocabulary: { label: "Dùng từ chưa chuẩn", badge: "bg-amber-500/10 text-amber-700 border-amber-500/30" },
  word_order: { label: "Sai trật tự từ", badge: "bg-purple-500/10 text-purple-700 border-purple-500/30" },
  missing: { label: "Thiếu từ cần thiết", badge: "bg-blue-500/10 text-blue-700 border-blue-500/30" },
  extra: { label: "Thừa từ", badge: "bg-rose-500/10 text-rose-700 border-rose-500/30" },
};

export function WritingExerciseMode({
  exercises,
  topicId,
}: {
  exercises: WritingExercise[];
  topicId: string;
}) {
  const [index, setIndex] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showSample, setShowSample] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<WritingEvalResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeErrorIdx, setActiveErrorIdx] = useState<number | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const current = exercises[Math.min(index, exercises.length - 1)];

  const resetForNewQuestion = () => {
    setStudentAnswer("");
    setShowHint(false);
    setShowSample(false);
    setResult(null);
    setError(null);
    setActiveErrorIdx(null);
  };

  const handleNext = () => {
    resetForNewQuestion();
    setIndex((i) => (i + 1) % exercises.length);
  };

  const handlePrev = () => {
    resetForNewQuestion();
    setIndex((i) => (i - 1 + exercises.length) % exercises.length);
  };

  const handleJump = (idx: number) => {
    if (idx === index) return;
    resetForNewQuestion();
    setIndex(idx);
  };

  const handleEvaluate = async () => {
    const answer = studentAnswer.trim();
    if (!answer) {
      setError("Vui lòng nhập câu trả lời tiếng Trung trước khi nộp bài!");
      return;
    }
    setIsEvaluating(true);
    setResult(null);
    setError(null);
    setActiveErrorIdx(null);
    try {
      const res = await fetch("/api/writing-eval", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: current.question,
          sampleAnswer: current.sampleAnswer,
          keywords: current.keywords,
          studentAnswer: answer,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Không thể chấm bài lúc này, vui lòng thử lại.");
        return;
      }
      setResult(data as WritingEvalResult);
      if ((data as WritingEvalResult).score >= 60) {
        setCompletedIds((prev) => new Set(prev).add(current.id));
      }
    } catch {
      setError("Lỗi kết nối máy chủ, vui lòng kiểm tra mạng và thử lại.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleListenCorrected = () => {
    if (result?.corrected && canSpeak()) {
      speak(result.corrected);
    }
  };

  const handleListenSample = () => {
    if (current?.sampleAnswer && canSpeak()) {
      speak(current.sampleAnswer);
    }
  };

  // Build segmented preview of student's answer highlighting erroneous parts
  const renderedStudentAnswer = useMemo(() => {
    if (!result || !result.errors || result.errors.length === 0) {
      return null;
    }

    const text = studentAnswer;
    const errors = result.errors;

    // Find occurrences of each error.wrong in text
    interface ErrorSpan {
      start: number;
      end: number;
      errorIdx: number;
    }

    const spans: ErrorSpan[] = [];
    errors.forEach((err, errIdx) => {
      if (!err.wrong) return;
      const pos = text.indexOf(err.wrong);
      if (pos !== -1) {
        spans.push({ start: pos, end: pos + err.wrong.length, errorIdx: errIdx });
      }
    });

    // If no matching text spans found directly, fallback
    if (spans.length === 0) return null;

    // Sort spans by start
    spans.sort((a, b) => a.start - b.start);

    // Merge or pick non-overlapping spans
    const nonOverlapping: ErrorSpan[] = [];
    let lastEnd = 0;
    for (const span of spans) {
      if (span.start >= lastEnd) {
        nonOverlapping.push(span);
        lastEnd = span.end;
      }
    }

    const parts: React.ReactNode[] = [];
    let cursor = 0;
    nonOverlapping.forEach((span, i) => {
      if (span.start > cursor) {
        parts.push(
          <span key={`text-${cursor}`}>{text.substring(cursor, span.start)}</span>
        );
      }
      const err = errors[span.errorIdx];
      const isSelected = activeErrorIdx === span.errorIdx;
      parts.push(
        <mark
          key={`err-${i}`}
          onClick={() => setActiveErrorIdx(isSelected ? null : span.errorIdx)}
          className={`cursor-pointer rounded px-1.5 py-0.5 font-bold transition-all inline-block mx-0.5 ${
            isSelected
              ? "bg-seal text-white shadow-md scale-105"
              : "bg-red-200 text-seal border-b-2 border-seal underline decoration-wavy hover:bg-red-300"
          }`}
          title={`Bấm để xem cách sửa: ${err.wrong} ➔ ${err.right}`}
        >
          {text.substring(span.start, span.end)}
        </mark>
      );
      cursor = span.end;
    });

    if (cursor < text.length) {
      parts.push(<span key={`text-${cursor}`}>{text.substring(cursor)}</span>);
    }

    return parts;
  }, [result, studentAnswer, activeErrorIdx]);

  const ratingCfg = result ? RATING_CONFIG[result.rating] : null;

  return (
    <div className="space-y-6">
      <div className="mx-auto max-w-3xl">
        {/* Main Exercise Card */}
        <div className="rounded-3xl border-3 border-ink bg-paper p-6 sm:p-8 shadow-[0_6px_0_var(--ink)]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-rule pb-3">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-peach px-3 py-1 text-xs font-bold text-seal">
                Bài {index + 1} / {exercises.length}
              </span>
              <span className="text-xs text-ink-soft hidden sm:inline">
                ✍️ Luyện viết câu & Check ngữ pháp
              </span>
            </div>
            <span className="text-xs font-semibold text-tone-2">
              {completedIds.size}/{exercises.length} đã hoàn thành
            </span>
          </div>

          {/* Question / Prompt */}
          <div className="mt-5">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-soft block mb-1.5">
              Đề bài – Hãy viết câu tiếng Trung tương ứng:
            </span>
            <div className="rounded-2xl border-2 border-ink/20 bg-paper-deep px-5 py-4">
              <p className="font-serif text-lg sm:text-xl font-bold text-ink leading-relaxed">
                {current.question}
              </p>
              {current.keywords && current.keywords.length > 0 && (
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                  <span className="text-xs text-ink-soft">Từ gợi ý:</span>
                  {current.keywords.map((kw) => (
                    <span
                      key={kw}
                      lang="zh-CN"
                      className="han rounded-md bg-paper border border-ink/20 px-2 py-0.5 text-xs font-bold text-seal"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Hint & Sample answer buttons */}
          <div className="mt-3.5 flex flex-wrap gap-2">
            {current.hint && (
              <button
                type="button"
                onClick={() => setShowHint((v) => !v)}
                className="btn-soft text-xs font-medium"
              >
                💡 {showHint ? "Ẩn gợi ý cấu trúc" : "Xem gợi ý cấu trúc"}
              </button>
            )}
            {result && current.sampleAnswer && (
              <button
                type="button"
                onClick={() => setShowSample((v) => !v)}
                className="btn-soft text-xs font-medium"
              >
                📖 {showSample ? "Ẩn câu mẫu" : "Xem câu mẫu tham khảo"}
              </button>
            )}
          </div>

          {showHint && current.hint && (
            <div className="mt-2.5 rounded-xl border border-rule bg-paper-deep/90 px-4 py-3 text-sm text-ink-soft animate-fadeIn">
              <span className="font-semibold text-ink">Gợi ý: </span>
              {current.hint}
            </div>
          )}

          {showSample && current.sampleAnswer && (
            <div className="mt-2.5 rounded-xl border border-tone-2/30 bg-mint/20 px-4 py-3 animate-fadeIn flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-tone-2 block mb-0.5">Câu mẫu tham khảo:</span>
                <span lang="zh-CN" className="han text-base font-bold text-ink">
                  {current.sampleAnswer}
                </span>
              </div>
              <button
                type="button"
                onClick={handleListenSample}
                className="seal h-8 w-8 text-xs shrink-0 ml-3"
                title="Nghe câu mẫu"
              >
                🔊
              </button>
            </div>
          )}

          {/* Writing Input Area */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor={`writing-${topicId}-${current.id}`}
                className="text-xs font-bold text-ink-soft"
              >
                ✏️ Viết câu của bạn bằng chữ Hán giản thể:
              </label>
              <span className="text-xs text-ink-soft">
                {studentAnswer.length} ký tự
              </span>
            </div>
            <textarea
              id={`writing-${topicId}-${current.id}`}
              ref={textareaRef}
              value={studentAnswer}
              onChange={(e) => {
                setStudentAnswer(e.target.value);
                setResult(null);
                setError(null);
                setActiveErrorIdx(null);
              }}
              rows={3}
              placeholder="Nhập câu tiếng Trung của bạn tại đây... (Ví dụ: 我想应聘这个岗位...)"
              className="w-full rounded-2xl border-2 border-ink/30 bg-paper p-4 han text-lg font-medium text-ink placeholder:text-ink-soft/40 focus:border-seal focus:outline-none resize-none transition-colors shadow-inner"
              lang="zh-CN"
              dir="ltr"
            />
          </div>

          {/* Error notice */}
          {error && (
            <div className="mt-3 rounded-xl border border-seal/40 bg-peach/40 px-4 py-3 text-sm font-semibold text-seal animate-fadeIn">
              ⚠️ {error}
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="button"
              onClick={handleEvaluate}
              disabled={isEvaluating || !studentAnswer.trim()}
              className="seal w-full py-3 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_4px_0_var(--ink)] active:translate-y-0.5 active:shadow-[0_2px_0_var(--ink)]"
            >
              {isEvaluating ? "⏳ Đang kiểm tra ngữ pháp & chấm câu..." : "🔍 Check ngữ pháp & Nộp bài"}
            </button>
          </div>

          {/* ═════════════════════════════════════════════════════════════ */}
          {/* EVALUATION RESULT & ERROR CORRECTION AREA                     */}
          {/* ═════════════════════════════════════════════════════════════ */}
          {result && ratingCfg && (
            <div className={`mt-6 rounded-2xl border-2 p-5 sm:p-6 animate-fadeIn ${ratingCfg.bg}`}>
              {/* Score & Rating Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{ratingCfg.emoji}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-serif text-2xl font-bold ${ratingCfg.color}`}>
                        {result.score} điểm
                      </span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold bg-white/70 ${ratingCfg.color}`}>
                        {ratingCfg.label}
                      </span>
                    </div>
                    <p className="text-xs text-ink-soft mt-0.5">
                      {result.errors.length === 0
                        ? "Câu viết chuẩn ngữ pháp, không phát hiện lỗi sai."
                        : `Phát hiện ${result.errors.length} điểm cần sửa chữa.`}
                    </p>
                  </div>
                </div>

                {/* Status chip */}
                <div className="text-right">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    result.errors.length === 0
                      ? "border-tone-2 bg-tone-2/10 text-tone-2"
                      : "border-seal bg-seal/10 text-seal"
                  }`}>
                    {result.errors.length === 0 ? "✓ Đúng ngữ pháp" : "✗ Có lỗi sai"}
                  </span>
                </div>
              </div>

              {/* Overall Feedback */}
              {result.feedback_vi && (
                <div className="mt-3.5 text-sm text-ink leading-relaxed">
                  <span className="font-bold text-ink">Nhận xét: </span>
                  {result.feedback_vi}
                </div>
              )}

              {/* 1. INLINE HIGHLIGHT OF STUDENT ANSWER */}
              {result.errors.length > 0 && (
                <div className="mt-4 rounded-xl border border-ink/15 bg-paper/80 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-seal uppercase tracking-wider">
                      📍 Vị trí sai trong câu của bạn (bấm vào chữ đỏ để xem lỗi):
                    </span>
                  </div>
                  <div lang="zh-CN" className="han text-xl sm:text-2xl font-medium text-ink leading-loose">
                    {renderedStudentAnswer || (
                      <span className="text-ink">{studentAnswer}</span>
                    )}
                  </div>
                </div>
              )}

              {/* 2. DETAILED LIST OF ERRORS & CORRECTIONS */}
              {result.errors.length > 0 ? (
                <div className="mt-4 space-y-3">
                  <span className="text-xs font-bold text-ink-soft block uppercase tracking-wider">
                    🛠️ Chi tiết lỗi sai & Gợi ý từ đúng:
                  </span>
                  {result.errors.map((err, i) => {
                    const isSelected = activeErrorIdx === i;
                    const typeInfo = ERROR_TYPE_LABELS[err.type] || {
                      label: "Lỗi câu",
                      badge: "bg-seal/10 text-seal border-seal/30",
                    };

                    return (
                      <div
                        key={i}
                        onClick={() => setActiveErrorIdx(isSelected ? null : i)}
                        className={`cursor-pointer rounded-2xl border-2 p-4 transition-all ${
                          isSelected
                            ? "border-seal bg-peach/40 shadow-sm"
                            : "border-ink/15 bg-paper/90 hover:border-ink/30"
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${typeInfo.badge}`}>
                            {typeInfo.label}
                          </span>
                          <span className="text-xs text-ink-soft font-mono">
                            Lỗi #{i + 1}
                          </span>
                        </div>

                        {/* Wrong -> Right Comparison */}
                        <div className="flex flex-wrap items-center gap-2 text-base font-bold sm:text-lg">
                          <div className="flex items-center gap-1.5 rounded-lg bg-red-100 px-2.5 py-1 text-seal">
                            <span className="text-xs font-normal text-seal/80">Chỗ sai:</span>
                            <span lang="zh-CN" className="han line-through">
                              {err.wrong}
                            </span>
                          </div>
                          <span className="text-ink-soft">➔</span>
                          <div className="flex items-center gap-1.5 rounded-lg bg-mint/50 px-2.5 py-1 text-tone-2">
                            <span className="text-xs font-normal text-tone-2/80">Sửa thành:</span>
                            <span lang="zh-CN" className="han">
                              {err.right}
                            </span>
                          </div>
                        </div>

                        {/* Explanation in Vietnamese */}
                        <p className="mt-2 text-xs sm:text-sm text-ink-soft leading-relaxed">
                          💡 <span className="font-semibold text-ink">Giải thích: </span>
                          {err.explain_vi}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-4 rounded-xl border border-tone-2/40 bg-mint/30 p-4 text-center">
                  <span className="text-sm font-bold text-tone-2">
                    🌟 Xuất sắc! Câu của bạn hoàn toàn chính xác và tự nhiên.
                  </span>
                </div>
              )}

              {/* 3. FULL CORRECTED SENTENCE */}
              <div className="mt-5 rounded-2xl border-2 border-tone-2/30 bg-paper/90 p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-tone-2 uppercase tracking-wider">
                    ✅ Câu hoàn chỉnh đúng chuẩn:
                  </span>
                  <button
                    type="button"
                    onClick={handleListenCorrected}
                    className="seal h-8 w-8 text-xs shrink-0"
                    title="Nghe câu đúng"
                  >
                    🔊
                  </button>
                </div>
                <div lang="zh-CN" className="han text-xl sm:text-2xl font-bold text-ink leading-relaxed">
                  {result.corrected}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-between gap-3 border-t border-rule pt-4">
            <button
              type="button"
              onClick={handlePrev}
              className="btn-soft flex-1 text-sm font-semibold"
            >
              ← Bài trước
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="btn-soft flex-1 text-sm font-semibold"
            >
              Bài tiếp →
            </button>
          </div>
        </div>

        {/* Exercises list overview */}
        <div className="mt-6 rounded-2xl border-2 border-rule bg-paper p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-serif text-lg font-bold text-ink">
              Danh sách bài tập viết ({exercises.length} câu)
            </h4>
            <span className="text-xs text-ink-soft">
              Đã hoàn thành: {completedIds.size}/{exercises.length}
            </span>
          </div>
          <div className="space-y-2">
            {exercises.map((ex, idx) => {
              const active = idx === index;
              const done = completedIds.has(ex.id);
              return (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => handleJump(idx)}
                  className={`w-full flex items-start justify-between gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                    active
                      ? "border-seal bg-peach/30 shadow-sm"
                      : "border-rule bg-paper hover:border-ink hover:bg-paper-deep"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-seal shrink-0">Câu {idx + 1}:</span>
                      <span className="font-medium text-sm text-ink line-clamp-2 leading-snug">
                        {ex.question}
                      </span>
                    </div>
                    {ex.keywords && ex.keywords.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {ex.keywords.map((kw) => (
                          <span
                            key={kw}
                            lang="zh-CN"
                            className="han text-xs text-ink-soft font-medium"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className={`text-xs font-bold shrink-0 mt-0.5 ${done ? "text-tone-2" : "text-ink-soft"}`}>
                    {done ? "✓ Đã làm" : "Chưa làm"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
