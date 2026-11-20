import { createLocalStore } from "./local-store";

export interface WordProgress {
  tries: number;
  /** Best share of scored syllables read with the right tone, 0 to 1. */
  best: number;
}

/**
 * Practice history per word, keyed like "hsk1:学习".
 * Kept in the browser for now; the same shape can move to the database once accounts exist.
 */
export const progress = createLocalStore<Record<string, WordProgress>>("xq.progress", {});

export const progressKey = (level: string, hanzi: string) => `hsk${level}:${hanzi}`;

export function recordAttempt(key: string, score: number) {
  const all = progress.get();
  const prev = all[key] ?? { tries: 0, best: 0 };
  progress.set({ ...all, [key]: { tries: prev.tries + 1, best: Math.max(prev.best, score) } });
}

/** A word counts as learned once it has been read fully correct at least once. */
export const isMastered = (p?: WordProgress) => (p?.best ?? 0) >= 1;
