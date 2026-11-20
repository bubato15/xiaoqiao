"use client";

import { useStore } from "@/lib/local-store";
import { isMastered, progress, progressKey } from "@/lib/progress";

export function LessonProgress({ level, hanzi }: { level: string; hanzi: string[] }) {
  const all = useStore(progress);
  const done = hanzi.filter((h) => isMastered(all[progressKey(level, h)])).length;
  return (
    <span className={`text-xs tabular-nums ${done === hanzi.length ? "text-tone-2" : "text-ink-soft"}`}>
      {done}/{hanzi.length}
    </span>
  );
}
