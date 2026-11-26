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
  const [direction, setDirection] = useState<"vi-to-zh" | "zh-to-vi">("vi-to-zh");
  const [index, setIndex] = useState(0);
  const [showKeywords, setShowKeywords] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [enableSpeakPractice, setEnableSpeakPractice] = useState(false);

  const currentS = sentences[Math.min(index, sentences.length - 1)];
  const syllables = fromPinyin(currentS.hanzi, currentS.pinyin);
  const isPracticed = Boolean(practicedMap[currentS.id]);

  const handleNext = () => {
    setShowKeywords(false);
    setShowSolution(false);
    setEnableSpeakPractice(false);
    setIndex((i) => (i + 1) % sentences.length);
  };

  const handlePrev = () => {
    setShowKeywords(false);
    setShowSolution(false);
    setEnableSpeakPractice(false);
    setIndex((i) => (i - 1 + sentences.length) % sentences.length);
  };

  const handleListen = () => {
    if (canSpeak()) {
      speak(currentS.hanzi);
    }
  };

  const handleChangeDirection = (newDir: "vi-to-zh" | "zh-to-vi") => {
    setDirection(newDir);
    setShowKeywords(false);
    setShowSolution(false);
    setEnableSpeakPractice(false);
  };

  return (
    <div className="space-y-6">
      <div className="mx-auto max-w-2xl">
        {/* Direction Switcher */}
        <div className="mb-4 flex justify-center">
          <div className="inline-flex rounded-2xl border-2 border-rule bg-paper p-1 shadow-sm">
            <button
              type="button"
              onClick={() => handleChangeDirection("vi-to-zh")}
              className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                direction === "vi-to-zh"
                  ? "bg-seal text-white shadow-[0_2px_0_var(--ink)]"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              🇻🇳 ➔ 🇨🇳 Dịch Việt - Trung
            </button>
            <button
              type="button"
              onClick={() => handleChangeDirection("zh-to-vi")}
              className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                direction === "zh-to-vi"
                  ? "bg-seal text-white shadow-[0_2px_0_var(--ink)]"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              🇨🇳 ➔ 🇻🇳 Dịch Trung - Việt
            </button>
          </div>
        </div>

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

          {/* Prompt Section */}
          <div className="mt-6 text-center">
            {direction === "vi-to-zh" ? (
              <>
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  Dịch câu sau sang tiếng Trung:
                </span>
                <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-bold leading-snug text-ink">
                  &ldquo;{currentS.vi}&rdquo;
                </h3>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                    Dịch câu sau sang tiếng Việt:
                  </span>
                  <button
                    type="button"
                    onClick={handleListen}
                    title="Nghe phát âm"
                    className="p-1 rounded-full border border-rule bg-paper-deep text-xs hover:bg-paper"
                  >
                    🔊
                  </button>
                </div>
                <h3 className="mt-2 font-serif han text-3xl sm:text-4xl font-bold leading-snug text-seal">
                  {currentS.hanzi}
                </h3>
                {/* Pinyin hint */}
                <div className="mt-2 flex flex-wrap justify-center gap-x-1.5 gap-y-0.5">
                  {syllables.map((s, idx) => (
                    <span
                      key={idx}
                      className="pinyin text-xs sm:text-sm font-semibold"
                      style={{ color: toneColor(s.surface || s.citation) }}
                    >
                      {s.marked}
                    </span>
                  ))}
                </div>
              </>
            )}
            <p className="mt-2 text-xs text-ink-soft sm:hidden">{currentS.situation}</p>
          </div>

          {/* Hint & Reveal Toggles */}
          <div className="mt-6 flex justify-center gap-2">
            <button
              type="button"
              onClick={() => setShowKeywords((v) => !v)}
              className="btn-soft text-xs sm:text-sm font-medium"
            >
              💡 {showKeywords ? "Ẩn gợi ý" : "Xem từ khóa gợi ý"}
            </button>
            <button
              type="button"
              onClick={() => setShowSolution((v) => !v)}
              className="seal px-4 py-2 text-xs sm:text-sm font-semibold"
            >
              👁{" "}
              {showSolution
                ? direction === "vi-to-zh"
                  ? "Ẩn câu tiếng Trung"
                  : "Ẩn nghĩa tiếng Việt"
                : direction === "vi-to-zh"
                ? "Hiện câu tiếng Trung"
                : "Hiện nghĩa tiếng Việt"}
            </button>
          </div>

          {/* Revealed keywords */}
          {showKeywords && (
            <div className="mt-4 rounded-2xl border border-rule bg-paper-deep p-3 text-center animate-fadeIn">
              <span className="text-xs font-semibold text-ink-soft block mb-1">
                Từ vựng trọng tâm & Ngữ cảnh:
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
              <p className="mt-2 text-xs text-ink-soft italic">{currentS.situation}</p>
            </div>
          )}

          {/* Revealed Solution Box */}
          {showSolution && (
            <div className="mt-6 rounded-2xl border-2 border-tone-2/30 bg-mint/20 p-5 text-center animate-fadeIn">
              {direction === "vi-to-zh" ? (
                <>
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
                </>
              ) : (
                <>
                  <span className="text-xs text-ink-soft block">Nghĩa tiếng Việt chuẩn:</span>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-1">
                    &ldquo;{currentS.vi}&rdquo;
                  </p>
                  <p className="text-xs text-ink-soft mt-1">Tình huống: {currentS.situation}</p>
                </>
              )}

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
          <div className="mt-8 flex items-center justify-between border-t border-rule pt-4">
            <button
              type="button"
              onClick={handlePrev}
              className="btn-soft px-4 py-2 text-xs sm:text-sm font-medium"
            >
              ← Câu trước
            </button>
            <div className="flex gap-1">
              {sentences.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setShowKeywords(false);
                    setShowSolution(false);
                    setEnableSpeakPractice(false);
                    setIndex(i);
                  }}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-seal" : "w-2.5 bg-paper-deep border border-rule"
                  }`}
                  aria-label={`Đi tới câu ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="seal px-4 py-2 text-xs sm:text-sm font-semibold"
            >
              Câu tiếp theo →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
