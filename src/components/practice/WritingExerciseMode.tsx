"use client";

import { useState, useRef } from "react";
import type { WritingExercise } from "@/data/practice";
import type { WritingEvalResult } from "@/app/api/writing-eval/route";

const RATING_CONFIG = {
  excellent: { label: "Xuất sắc!", color: "text-tone-2", bg: "bg-mint/30 border-tone-2/40", emoji: "🏆" },
  good: { label: "Tốt!", color: "text-tone-3", bg: "bg-sky/20 border-tone-3/40", emoji: "👍" },
  fair: { label: "Khá", color: "text-tone-4", bg: "bg-peach/30 border-tone-4/40", emoji: "✏️" },
  needs_work: { label: "Cần luyện thêm", color: "text-seal", bg: "bg-peach/50 border-seal/40", emoji: "💪" },
} as const;

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
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const current = exercises[Math.min(index, exercises.length - 1)];
  const isCompleted = completedIds.has(current.id);

  const resetForNewQuestion = () => {
    setStudentAnswer("");
    setShowHint(false);
    setShowSample(false);
    setResult(null);
    setError(null);
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
      setError("Vui lòng viết câu trả lời trước khi nộp bài!");
      return;
    }
    setIsEvaluating(true);
    setResult(null);
    setError(null);
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
        setError(data.error ?? "Lỗi không xác định, thử lại nhé.");
        return;
      }
      setResult(data as WritingEvalResult);
      if ((data as WritingEvalResult).score >= 55) {
        setCompletedIds((prev) => new Set(prev).add(current.id));
      }
    } catch {
      setError("Không kết nối được server, bạn thử lại nhé.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const ratingCfg = result ? RATING_CONFIG[result.rating] : null;

  return (
    <div className="space-y-6">
      <div className="mx-auto max-w-2xl">
        {/* Exercise Card */}
        <div className="rounded-3xl border-3 border-ink bg-paper p-6 sm:p-8 shadow-[0_6px_0_var(--ink)]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-rule pb-3">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-peach px-3 py-1 text-xs font-bold text-seal">
                Bài {index + 1} / {exercises.length}
              </span>
              <span className="text-xs text-ink-soft hidden sm:inline">
                ✍️ Luyện viết tiếng Trung
              </span>
            </div>
            <span className="text-xs font-semibold text-tone-2">
              {completedIds.size}/{exercises.length} hoàn thành
            </span>
          </div>

          {/* Question */}
          <div className="mt-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft block mb-2">
              Câu hỏi – Viết câu trả lời bằng tiếng Trung:
            </span>
            <div className="rounded-2xl border-2 border-ink/20 bg-paper-deep px-5 py-4">
              <p className="font-serif text-lg sm:text-xl font-bold text-ink leading-relaxed">
                {current.question}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {current.keywords.map((kw) => (
                  <span
                    key={kw}
                    lang="zh-CN"
                    className="han rounded-md bg-peach/60 px-2 py-0.5 text-xs font-bold text-seal"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Hint toggle */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setShowHint((v) => !v)}
              className="btn-soft text-xs font-medium"
            >
              💡 {showHint ? "Ẩn gợi ý" : "Xem gợi ý cấu trúc câu"}
            </button>
            {result && (
              <button
                type="button"
                onClick={() => setShowSample((v) => !v)}
                className="btn-soft text-xs font-medium"
              >
                📖 {showSample ? "Ẩn câu mẫu" : "Xem câu mẫu"}
              </button>
            )}
          </div>

          {showHint && (
            <div className="mt-3 rounded-xl border border-rule bg-paper-deep/80 px-4 py-3 text-sm text-ink-soft animate-fadeIn">
              <span className="font-semibold text-ink">Gợi ý: </span>
              {current.hint}
            </div>
          )}

          {showSample && result && (
            <div className="mt-3 rounded-xl border border-tone-2/30 bg-mint/20 px-4 py-3 animate-fadeIn">
              <span className="text-xs font-semibold text-tone-2 block mb-1">Câu mẫu tham khảo:</span>
              <span lang="zh-CN" className="han text-base font-bold text-ink">
                {current.sampleAnswer}
              </span>
            </div>
          )}

          {/* Writing Area */}
          <div className="mt-5">
            <label
              htmlFor={`writing-${topicId}-${current.id}`}
              className="text-xs font-semibold text-ink-soft block mb-2"
            >
              ✏️ Viết câu trả lời của bạn bằng tiếng Trung (giản thể):
            </label>
            <textarea
              id={`writing-${topicId}-${current.id}`}
              ref={textareaRef}
              value={studentAnswer}
              onChange={(e) => {
                setStudentAnswer(e.target.value);
                setResult(null);
                setError(null);
              }}
              rows={4}
              placeholder="Nhập câu trả lời tiếng Trung vào đây…"
              className="w-full rounded-2xl border-2 border-ink/30 bg-paper p-4 han text-lg font-medium text-ink placeholder:text-ink-soft/50 focus:border-seal focus:outline-none resize-none transition-colors"
              lang="zh-CN"
              dir="ltr"
            />
            <p className="mt-1 text-xs text-ink-soft">
              Mẹo: Bật bàn phím tiếng Trung trên thiết bị hoặc dùng bộ gõ Pinyin để nhập chữ Hán.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-3 rounded-xl border border-seal/40 bg-peach/40 px-4 py-3 text-sm font-semibold text-seal animate-fadeIn">
              ⚠️ {error}
            </div>
          )}

          {/* Submit button */}
          <div className="mt-4">
            <button
              type="button"
              onClick={handleEvaluate}
              disabled={isEvaluating || !studentAnswer.trim()}
              className="seal w-full py-3 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {isEvaluating ? "⏳ Đang chấm bài…" : "🎯 Nộp bài & Chấm điểm"}
            </button>
          </div>

          {/* Evaluation Result */}
          {result && ratingCfg && (
            <div className={`mt-6 rounded-2xl border-2 p-5 animate-fadeIn ${ratingCfg.bg}`}>
              {/* Score header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{ratingCfg.emoji}</span>
                  <div>
                    <div className={`font-serif text-2xl font-bold ${ratingCfg.color}`}>
                      {result.score} điểm
                    </div>
                    <div className={`text-sm font-semibold ${ratingCfg.color}`}>
                      {ratingCfg.label}
                    </div>
                  </div>
                </div>
                {/* Score bar */}
                <div className="w-24 sm:w-32">
                  <div className="h-2.5 overflow-hidden rounded-full bg-paper/60 border border-ink/10">
                    <div
                      className="h-full rounded-full bg-current transition-all duration-700"
                      style={{ width: `${result.score}%`, color: "currentColor" }}
                    />
                  </div>
                  <div className="mt-1 text-right text-xs text-ink-soft">{result.score}/100</div>
                </div>
              </div>

              {/* General feedback */}
              <p className="text-sm font-medium text-ink mb-4 italic">
                💬 {result.feedback_vi}
              </p>

              {/* Corrected sentence */}
              <div className="rounded-xl border border-ink/10 bg-paper/60 p-4 mb-4">
                <span className="text-xs font-semibold text-ink-soft block mb-1">
                  ✅ Câu đã sửa hoàn chỉnh:
                </span>
                <span lang="zh-CN" className="han text-xl font-bold text-ink">
                  {result.corrected}
                </span>
              </div>

              {/* Errors list */}
              {result.errors.length > 0 ? (
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-ink-soft block">
                    🔍 Các lỗi cần chú ý:
                  </span>
                  {result.errors.map((err, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-ink/10 bg-paper/50 p-3 text-sm"
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span
                          lang="zh-CN"
                          className="han font-bold text-seal line-through opacity-70"
                        >
                          {err.original}
                        </span>
                        <span className="text-ink-soft">→</span>
                        <span lang="zh-CN" className="han font-bold text-tone-2">
                          {err.correction}
                        </span>
                      </div>
                      <p className="text-xs text-ink-soft">{err.explanation_vi}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-tone-2/30 bg-mint/30 p-3 text-center">
                  <span className="text-sm font-semibold text-tone-2">
                    🎉 Không có lỗi – câu viết rất chuẩn!
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
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

        {/* Exercise overview list */}
        <div className="mt-6 rounded-2xl border-2 border-rule bg-paper p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-serif text-lg font-bold text-ink">
              Danh sách bài tập ({exercises.length} bài)
            </h4>
            <span className="text-xs text-ink-soft">
              Hoàn thành: {completedIds.size}/{exercises.length}
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
                      <span className="font-bold text-xs text-seal shrink-0">Bài {idx + 1}:</span>
                      <span className="font-medium text-sm text-ink line-clamp-2 leading-snug">
                        {ex.question}
                      </span>
                    </div>
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
                  </div>
                  <span className={`text-xs font-bold shrink-0 mt-0.5 ${done ? "text-tone-2" : "text-ink-soft"}`}>
                    {done ? "✓ Xong" : "Chưa làm"}
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
