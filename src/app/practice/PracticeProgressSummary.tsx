"use client";

import { useStore } from "@/lib/local-store";
import { practiceProgress } from "@/lib/practice-store";
import type { PracticeTopic } from "@/data/practice";

export function PracticeProgressSummary({ topics }: { topics: PracticeTopic[] }) {
  const progress = useStore(practiceProgress);

  const totalWords = topics.reduce((acc, t) => acc + t.words.length, 0);
  const masteredWords = Object.keys(progress.masteredWords).length;
  const practicedSentences = Object.keys(progress.practicedSentences).length;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      <div className="rounded-2xl border-2 border-rule bg-paper p-4 text-center">
        <span className="text-xs text-ink-soft block font-medium">Từ vựng đã thuộc</span>
        <span className="font-serif text-3xl font-bold text-tone-2">
          {masteredWords} <span className="text-sm font-normal text-ink-soft">/ {totalWords}</span>
        </span>
      </div>
      <div className="rounded-2xl border-2 border-rule bg-paper p-4 text-center">
        <span className="text-xs text-ink-soft block font-medium">Câu phản xạ đã luyện</span>
        <span className="font-serif text-3xl font-bold text-tone-1">
          {practicedSentences} <span className="text-sm font-normal text-ink-soft">câu</span>
        </span>
      </div>
      <div className="col-span-2 sm:col-span-1 rounded-2xl border-2 border-rule bg-paper p-4 text-center">
        <span className="text-xs text-ink-soft block font-medium">Chủ đề chuyên sâu</span>
        <span className="font-serif text-3xl font-bold text-seal">
          {topics.length} <span className="text-sm font-normal text-ink-soft">chủ đề</span>
        </span>
      </div>
    </div>
  );
}
