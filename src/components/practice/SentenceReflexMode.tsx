"use client";

import { useState } from "react";
import type { PracticeSentence } from "@/data/practice";
import { fromPinyin } from "@/lib/speech/sandhi";
import { canSpeak, speak } from "@/lib/speech/webspeech";
import { toneColor } from "@/components/ToneCurve";
import { SpeakPractice } from "@/components/SpeakPractice";

export function SentenceReflexMode({
  sentences,
  practicedMap,
  onTogglePracticed,
}: {
  sentences: PracticeSentence[];
  topicId?: string;
  practicedMap: Record<string, boolean>;
  onTogglePracticed: (sentenceId: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const [showKeywords, setShowKeywords] = useState(false);
  const [showChinese, setShowChinese] = useState(false);
  const [enableSpeakPractice, setEnableSpeakPractice] = useState(false);

  const currentS = sentences[Math.min(index, sentences.length - 1)];
  const syllables = fromPinyin(currentS.hanzi, currentS.pinyin);
  const isPracticed = Boolean(practicedMap[currentS.id]);

  const handleNext = () => {
    setShowKeywords(false);
    setShowChinese(false);
    setEnableSpeakPractice(false);
    setIndex((i) => (i + 1) % sentences.length);
  };

  const handlePrev = () => {
    setShowKeywords(false);
    setShowChinese(false);
    setEnableSpeakPractice(false);
    setIndex((i) => (i - 1 + sentences.length) % sentences.length);
  };

  const handleListen = () => {
    if (canSpeak()) {
      speak(currentS.hanzi);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mx-auto max-w-2xl">
        {/* Main reflex card */}
        <div className="rounded-3xl border-3 border-ink bg-paper p-6 sm:p-8 shadow-[0_6px_0_var(--ink)]">
          {/* Header row */}
          <div className="flex items-center justify-between border-b border-rule pb-3">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-peach px-3 py-1 text-xs font-bold text-seal">
                Câu {index + 1} / {sentences.length}
              </span>
              <span className="text-xs text-ink-soft hidden sm:inline">{currentS.situation}</span>
            </div>
            <button
              type="button"
              onClick={() => onTogglePracticed(currentS.id)}
              className={`rounded-full border-2 border-ink px-3 py-1 text-xs font-semibold transition-colors ${
                isPracticed ? "bg-tone-2 text-white" : "bg-paper hover:bg-paper-deep text-ink"
              }`}
            >
              {isPracticed ? "✓ Đã luyện xong" : "+ Đánh dấu đã luyện"}
            </button>
          </div>

          {/* Vietnamese prompt */}
          <div className="mt-6 text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
              Dịch câu sau sang tiếng Trung:
            </span>
            <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-bold leading-snug text-ink">
              &ldquo;{currentS.vi}&rdquo;
            </h3>
            <p className="mt-1 text-xs text-ink-soft sm:hidden">{currentS.situation}</p>
          </div>

          {/* Keywords hint toggle */}
          <div className="mt-6 flex justify-center gap-2">
            <button
              type="button"
              onClick={() => setShowKeywords((v) => !v)}
              className="btn-soft text-xs sm:text-sm font-medium"
            >
              💡 {showKeywords ? "Ẩn từ khóa gợi ý" : "Xem từ khóa gợi ý"}
            </button>
            <button
              type="button"
              onClick={() => setShowChinese((v) => !v)}
              className="seal px-4 py-2 text-xs sm:text-sm font-semibold"
            >
              👁 {showChinese ? "Ẩn câu tiếng Trung" : "Hiện câu tiếng Trung"}
            </button>
          </div>

          {/* Revealed keywords */}
          {showKeywords && (
            <div className="mt-4 rounded-2xl border border-rule bg-paper-deep p-3 text-center animate-fadeIn">
              <span className="text-xs font-semibold text-ink-soft block mb-1">
                Các từ vựng trọng tâm trong câu:
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {currentS.keywords.map((kw) => (
                  <span
                    key={kw}
                    lang="zh-CN"
                    className="han rounded-lg border border-ink/20 bg-paper px-2.5 py-1 text-sm font-bold text-seal"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Revealed Chinese solution */}
          {showChinese && (
            <div className="mt-6 rounded-2xl border-2 border-tone-2/30 bg-mint/20 p-5 text-center animate-fadeIn">
              <div className="flex items-center justify-center gap-3">
                <span lang="zh-CN" className="han text-2xl sm:text-3xl font-bold text-ink">
                  {currentS.hanzi}
                </span>
                <button
                  type="button"
                  onClick={handleListen}
                  title="Nghe câu mẫu"
                  aria-label="Nghe câu mẫu"
                  className="seal h-8 w-8 text-xs shrink-0"
                >
                  🔊
                </button>
              </div>

              {/* Syllable-by-syllable Pinyin */}
              <div className="mt-3 flex flex-wrap justify-center gap-x-2 gap-y-1">
                {syllables.map((s, idx) => (
                  <span
                    key={idx}
                    className="pinyin text-base sm:text-lg font-bold"
                    style={{ color: toneColor(s.surface || s.citation) }}
                  >
                    {s.marked}
                  </span>
                ))}
              </div>

              {/* Voice Practice Toggle */}
              <div className="mt-5 border-t border-rule/50 pt-4">
                <button
                  type="button"
                  onClick={() => setEnableSpeakPractice((v) => !v)}
                  className="btn-soft text-xs sm:text-sm font-semibold"
                >
                  🎙 {enableSpeakPractice ? "Thu gọn luyện nói" : "Luyện nói câu này với XiaoQiao"}
                </button>
              </div>

              {/* Live SpeakPractice integration */}
              {enableSpeakPractice && (
                <div className="mt-4 text-left border-t border-rule pt-4 animate-fadeIn">
                  <SpeakPractice
                    text={currentS.hanzi}
                    syllables={syllables}
                    onResult={(r) => {
                      if (r.score >= 0.7) {
                        onTogglePracticed(currentS.id);
                      }
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-between gap-3 border-t border-rule pt-4">
            <button
              type="button"
              onClick={handlePrev}
              className="btn-soft flex-1 text-sm font-semibold"
            >
              ← Câu trước
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="btn-soft flex-1 text-sm font-semibold"
            >
              Câu tiếp →
            </button>
          </div>
        </div>

        {/* Overview of all 10 sentences */}
        <div className="mt-8 rounded-2xl border-2 border-rule bg-paper p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-serif text-lg font-bold text-ink">
              Toàn bộ 10 câu phản xạ công xưởng
            </h4>
            <span className="text-xs text-ink-soft">
              Đã luyện: {sentences.filter((s) => practicedMap[s.id]).length}/{sentences.length}
            </span>
          </div>

          <div className="space-y-2">
            {sentences.map((s, idx) => {
              const active = idx === index;
              const done = Boolean(practicedMap[s.id]);
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setIndex(idx);
                    setShowKeywords(false);
                    setShowChinese(false);
                    setEnableSpeakPractice(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border-2 text-left transition-all ${
                    active
                      ? "border-seal bg-peach/30 shadow-sm"
                      : "border-rule bg-paper hover:border-ink hover:bg-paper-deep"
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-seal">Câu {idx + 1}:</span>
                      <span className="font-medium text-sm text-ink truncate">{s.vi}</span>
                    </div>
                    <span lang="zh-CN" className="han text-xs text-ink-soft truncate block mt-0.5">
                      {s.hanzi}
                    </span>
                  </div>
                  <span className={`text-xs font-bold shrink-0 ${done ? "text-tone-2" : "text-ink-soft"}`}>
                    {done ? "✓ Đã luyện" : "Chưa luyện"}
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
