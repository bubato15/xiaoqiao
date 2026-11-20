"use client";

import { useState } from "react";
import type { PracticeWord } from "@/data/practice";
import { fromPinyin } from "@/lib/speech/sandhi";
import { SpeakPractice } from "@/components/SpeakPractice";
import { WordFace } from "@/components/WordFace";

export function WordSpeakMode({
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
  const [selectedCat, setSelectedCat] = useState("Tất cả");
  const filtered = selectedCat === "Tất cả" ? words : words.filter((w) => w.category === selectedCat);

  const [index, setIndex] = useState(0);
  const currentWord = filtered[Math.min(index, filtered.length - 1)] ?? words[0];
  const syllables = fromPinyin(currentWord.hanzi, currentWord.pinyin);
  const isMastered = Boolean(masteredMap[currentWord.hanzi]);

  return (
    <div className="space-y-6">
      {/* Category filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-ink-soft">Nhóm từ:</span>
        {["Tất cả", ...categories].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setSelectedCat(cat);
              setIndex(0);
            }}
            className={`chip px-3 py-1 text-xs font-medium ${
              selectedCat === cat ? "border-ink bg-ink text-paper" : "text-ink"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Word picker chips */}
      <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 rounded-2xl border border-rule bg-paper">
        {filtered.map((w, i) => {
          const active = i === index;
          const mastered = Boolean(masteredMap[w.hanzi]);
          return (
            <button
              key={w.hanzi}
              type="button"
              onClick={() => setIndex(i)}
              className={`rounded-xl border-2 px-3 py-1.5 text-sm font-semibold transition-all ${
                active
                  ? "border-seal bg-peach text-seal shadow-sm"
                  : "border-rule bg-paper hover:border-ink hover:bg-paper-deep text-ink"
              }`}
            >
              <span lang="zh-CN" className="han mr-1">
                {w.hanzi}
              </span>
              {mastered && <span className="text-xs text-tone-2 font-bold">✓</span>}
            </button>
          );
        })}
      </div>

      {/* Word reading & SpeakPractice card */}
      <div className="rounded-3xl border-3 border-ink bg-paper p-6 sm:p-8 shadow-[0_6px_0_var(--ink)]">
        <div className="flex items-center justify-between border-b border-rule pb-3">
          <span className="rounded-full bg-paper-deep px-3 py-1 text-xs font-semibold text-ink-soft">
            {currentWord.category}
          </span>
          <button
            type="button"
            onClick={() => onToggleMastered(currentWord.hanzi)}
            className={`rounded-full border-2 border-ink px-3 py-1 text-xs font-semibold transition-colors ${
              isMastered ? "bg-tone-2 text-white" : "bg-paper hover:bg-paper-deep text-ink"
            }`}
          >
            {isMastered ? "✓ Đã thuộc" : "+ Đánh dấu đã thuộc"}
          </button>
        </div>

        <div className="my-6">
          <WordFace syllables={syllables} size="lg" />
          <p className="mt-3 text-center font-serif text-xl font-bold text-seal">
            {currentWord.vi}
          </p>
          {currentWord.hanViet && (
            <p className="mt-1 text-center text-xs text-ink-soft">
              Âm Hán-Việt: <span className="font-semibold text-ink">{currentWord.hanViet}</span>
            </p>
          )}
        </div>

        <div className="border-t border-rule pt-6">
          <SpeakPractice
            text={currentWord.hanzi}
            syllables={syllables}
            onResult={(r) => {
              if (r.score >= 0.75) {
                onToggleMastered(currentWord.hanzi);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
