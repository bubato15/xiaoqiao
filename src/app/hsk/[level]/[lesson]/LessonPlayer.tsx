"use client";

import { useState } from "react";
import type { Word } from "@/data/hsk";
import type { Sentence } from "@/data/sentences";
import { useStore } from "@/lib/local-store";
import { isMastered, progress, progressKey, recordAttempt } from "@/lib/progress";
import { fromPinyin } from "@/lib/speech/sandhi";
import { Calibration } from "@/components/Calibration";
import { SpeakPractice } from "@/components/SpeakPractice";
import { Stamp } from "@/components/Stamp";
import { WordFace } from "@/components/WordFace";

type Mode = "words" | "sentences";

interface Item {
  hanzi: string;
  pinyin: string;
  vi: string;
  hanViet?: string;
  /** Text on the picker button. */
  label: string;
}

const MODES: { id: Mode; label: string }[] = [
  { id: "words", label: "Từ vựng" },
  { id: "sentences", label: "Mẫu câu" },
];

export function LessonPlayer({ level, words, sentences }: { level: string; words: Word[]; sentences: Sentence[] }) {
  const [mode, setMode] = useState<Mode>("words");
  const [index, setIndex] = useState(0);
  const all = useStore(progress);

  const items: Item[] =
    mode === "words"
      ? words.map((w) => ({ ...w, label: w.hanzi }))
      : sentences.map((s, i) => ({ ...s, label: `Câu ${i + 1}` }));
  const item = items[Math.min(index, items.length - 1)];
  const syllables = fromPinyin(item.hanzi, item.pinyin);
  const mastered = (it: Item) => isMastered(all[progressKey(level, it.hanzi)]);
  const done = items.filter(mastered).length;
  const unit = mode === "words" ? "từ" : "câu";

  const go = (delta: number) => setIndex((i) => Math.min(items.length - 1, Math.max(0, i + delta)));

  return (
    <div className="space-y-8">
      <Calibration compact />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          role="radiogroup"
          aria-label="Nội dung luyện"
          className="flex gap-1 rounded-full border-2 border-ink bg-paper p-1"
        >
          {MODES.map((m) => (
            <button
              key={m.id}
              role="radio"
              aria-checked={mode === m.id}
              onClick={() => {
                setMode(m.id);
                setIndex(0);
              }}
              className={`rounded-full px-4 py-1 font-serif text-lg font-bold ${
                mode === m.id ? "bg-seal text-on-seal" : "text-ink-soft hover:text-ink"
              }`}
            >
              {m.label}
              <span className="ml-2 text-xs opacity-80">{m.id === "words" ? words.length : sentences.length}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-ink-soft">
          Đã thuộc {done}/{items.length} {unit}
        </p>
      </div>

      <div className="h-3 overflow-hidden rounded-full border-2 border-ink bg-paper" aria-hidden>
        <div
          className="h-full rounded-full bg-tone-2 transition-[width]"
          style={{ width: `${(done / items.length) * 100}%` }}
        />
      </div>

      <div
        role="tablist"
        aria-label={mode === "words" ? "Danh sách từ" : "Danh sách câu"}
        className="flex flex-wrap gap-2"
      >
        {items.map((it, i) => (
          <button
            key={it.hanzi}
            role="tab"
            aria-selected={it === item}
            aria-label={`${it.label}, ${it.vi}${mastered(it) ? ", đã thuộc" : ""}`}
            onClick={() => setIndex(i)}
            lang={mode === "words" ? "zh-CN" : undefined}
            className={`chip relative min-h-11 min-w-11 px-3 ${mode === "words" ? "han text-lg" : "text-sm font-medium"}`}
          >
            {it.label}
            {mastered(it) && (
              <span
                className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 rounded-full border-2 border-paper bg-tone-2"
                aria-hidden
              />
            )}
          </button>
        ))}
      </div>

      <article
        role="tabpanel"
        aria-label={item.hanzi}
        className="paper-stack relative mr-2 mb-2 grid gap-10 p-6 sm:p-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
      >
        {mastered(item) && (
          <span className="absolute top-4 right-4">
            <Stamp key={item.hanzi} text="熟" size={48} label={`Đã thuộc ${unit} này`} />
          </span>
        )}
        <div>
          <WordFace syllables={syllables} size={mode === "words" ? "lg" : "sm"} />
          <dl className="mx-auto mt-8 grid max-w-xs grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
            <dt className="text-ink-soft">Nghĩa</dt>
            <dd className="font-medium">{item.vi}</dd>
            {item.hanViet && (
              <>
                <dt className="text-ink-soft">Hán Việt</dt>
                <dd className="font-serif font-semibold">{item.hanViet}</dd>
              </>
            )}
          </dl>
        </div>

        <div>
          <SpeakPractice
            text={item.hanzi}
            syllables={syllables}
            onResult={({ score }) => recordAttempt(progressKey(level, item.hanzi), score)}
          />
        </div>
      </article>

      <div className="flex justify-between">
        <button
          onClick={() => go(-1)}
          disabled={index === 0}
          className="min-h-11 px-2 text-sm underline decoration-rule underline-offset-4 hover:decoration-ink disabled:invisible"
        >
          <span aria-hidden>←</span> {mode === "words" ? "Từ trước" : "Câu trước"}
        </button>
        <button
          onClick={() => go(1)}
          disabled={index >= items.length - 1}
          className="min-h-11 px-2 text-sm underline decoration-rule underline-offset-4 hover:decoration-ink disabled:invisible"
        >
          {mode === "words" ? "Từ sau" : "Câu sau"} <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}
