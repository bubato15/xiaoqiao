"use client";

import { useState, useEffect, useCallback } from "react";
import type { PracticeWord } from "@/data/practice";
import { fromPinyin } from "@/lib/speech/sandhi";
import { canSpeak, speak } from "@/lib/speech/webspeech";
import { toneColor } from "@/components/ToneCurve";

export function FlashcardMode({
  words,
  categories,
  masteredMap,
  onToggleMastered,
}: {
  words: PracticeWord[];
  categories: string[];
  masteredMap: Record<string, boolean>;
  onToggleMastered: (hanzi: string) => void;
}) {
  const [selectedCat, setSelectedCat] = useState<string>("Tất cả");
  const filteredWords =
    selectedCat === "Tất cả" ? words : words.filter((w) => w.category === selectedCat);

  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentWord = filteredWords[Math.min(index, filteredWords.length - 1)] ?? words[0];
  const syllables = fromPinyin(currentWord.hanzi, currentWord.pinyin);
  const isMastered = Boolean(masteredMap[currentWord.hanzi]);

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    setIndex((prev) => (prev + 1) % filteredWords.length);
  }, [filteredWords.length]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    setIndex((prev) => (prev - 1 + filteredWords.length) % filteredWords.length);
  }, [filteredWords.length]);

  const handleSpeak = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (canSpeak()) {
      speak(currentWord.hanzi);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setIsFlipped((f) => !f);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <div className="space-y-6">
      {/* Category filter pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-ink-soft">Nhóm từ:</span>
        {["Tất cả", ...categories].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setSelectedCat(cat);
              setIndex(0);
              setIsFlipped(false);
            }}
            className={`chip px-3 py-1 text-xs font-medium sm:text-sm ${
              selectedCat === cat ? "border-ink bg-ink text-paper" : "text-ink"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Flashcard Container */}
      <div className="mx-auto max-w-xl">
        <div
          role="button"
          tabIndex={0}
          aria-label={`Thẻ từ: ${currentWord.hanzi}. Nhấn để lật thẻ.`}
          onClick={() => setIsFlipped((f) => !f)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsFlipped((f) => !f);
            }
          }}
          className={`relative min-h-[300px] sm:min-h-[340px] cursor-pointer rounded-3xl border-3 border-ink p-6 sm:p-8 transition-all duration-300 shadow-[0_6px_0_var(--ink)] hover:translate-y-[-2px] hover:shadow-[0_8px_0_var(--ink)] active:translate-y-[2px] active:shadow-[0_3px_0_var(--ink)] flex flex-col justify-between ${
            isFlipped ? "bg-peach/30 border-seal" : "bg-paper"
          }`}
        >
          {/* Top card row: category & mastered badge */}
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-paper-deep px-3 py-1 text-xs font-medium text-ink-soft">
              {currentWord.category}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleMastered(currentWord.hanzi);
                }}
                className={`rounded-full border-2 border-ink px-3 py-1 text-xs font-semibold transition-colors ${
                  isMastered ? "bg-tone-2 text-white" : "bg-paper hover:bg-paper-deep text-ink"
                }`}
              >
                {isMastered ? "✓ Đã thuộc" : "+ Đánh dấu đã thuộc"}
              </button>
              <button
                type="button"
                onClick={handleSpeak}
                title="Nghe phát âm"
                aria-label={`Nghe phát âm ${currentWord.hanzi}`}
                className="seal h-8 w-8 text-sm"
              >
                🔊
              </button>
            </div>
          </div>

          {/* Center card: Front or Back */}
          <div className="my-auto py-4 text-center">
            {!isFlipped ? (
              <div>
                <div lang="zh-CN" className="han text-6xl sm:text-7xl font-bold tracking-wide text-ink">
                  {currentWord.hanzi}
                </div>
                <p className="mt-4 text-xs font-medium text-ink-soft">
                  (Bấm vào thẻ hoặc phím Space để xem pinyin & nghĩa)
                </p>
              </div>
            ) : (
              <div className="space-y-3 animate-fadeIn">
                <div lang="zh-CN" className="han text-4xl sm:text-5xl font-bold text-ink">
                  {currentWord.hanzi}
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {syllables.map((s, idx) => (
                    <span
                      key={idx}
                      className="pinyin text-2xl font-bold"
                      style={{ color: toneColor(s.surface || s.citation) }}
                    >
                      {s.marked}
                    </span>
                  ))}
                </div>
                <div className="mt-2 text-xl sm:text-2xl font-serif font-bold text-seal">
                  {currentWord.vi}
                </div>
                {currentWord.hanViet && (
                  <p className="text-xs text-ink-soft">
                    Hán-Việt: <span className="font-semibold text-ink">{currentWord.hanViet}</span>
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Bottom card row: index indicator & flip hint */}
          <div className="flex items-center justify-between text-xs text-ink-soft border-t border-rule pt-3">
            <span>
              Thẻ {index + 1} / {filteredWords.length}
            </span>
            <span className="font-medium">
              {isFlipped ? "↺ Bấm để lật lại chữ Hán" : "↻ Bấm để lật xem đáp án"}
            </span>
          </div>
        </div>

        {/* Card Controls */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrev}
            className="btn-soft flex-1 text-sm font-semibold"
          >
            ← Từ trước
          </button>
          <button
            type="button"
            onClick={() => setIsFlipped((f) => !f)}
            className="seal px-5 py-2 text-sm font-semibold"
          >
            {isFlipped ? "Lật lại" : "Lật thẻ"}
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="btn-soft flex-1 text-sm font-semibold"
          >
            Từ tiếp →
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-ink-soft">
          Mẹo phím tắt: Dùng <b>←</b> và <b>→</b> để chuyển từ, <b>Phím cách (Space)</b> để lật thẻ
        </p>
      </div>

      {/* Grid of all words for quick lookup & selection */}
      <div className="mt-10 rounded-2xl border-2 border-rule bg-paper p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg font-bold text-ink">
            Danh sách từ trong nhóm ({filteredWords.length} từ)
          </h3>
          <span className="text-xs text-ink-soft">
            Đã thuộc: {filteredWords.filter((w) => masteredMap[w.hanzi]).length}/{filteredWords.length}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {filteredWords.map((w, i) => {
            const active = i === index;
            const mastered = Boolean(masteredMap[w.hanzi]);
            return (
              <button
                key={w.hanzi}
                type="button"
                onClick={() => {
                  setIndex(i);
                  setIsFlipped(false);
                }}
                className={`flex flex-col items-start p-2.5 rounded-xl border-2 text-left transition-all ${
                  active
                    ? "border-seal bg-peach/40 shadow-sm"
                    : "border-rule bg-paper hover:border-ink hover:bg-paper-deep"
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span lang="zh-CN" className="han text-base font-bold text-ink">
                    {w.hanzi}
                  </span>
                  {mastered && <span className="text-xs text-tone-2 font-bold">✓</span>}
                </div>
                <span className="text-xs text-ink-soft truncate w-full">{w.vi}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
