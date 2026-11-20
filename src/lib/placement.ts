import { createLocalStore } from "./local-store";
import type { Mistake } from "./speech/score";

/**
 * Level check: the learner reads one sentence per HSK level, each scored out of 100 by `readingScore`.
 * The estimate is the highest level whose own sentence passed and whose running average stays above the bar,
 * so one weak sentence lower down does not sink an otherwise strong reader.
 */
export const LEVEL_COUNT = 6;
export const PASS_SENTENCE = 65;
export const PASS_AVERAGE = 70;
/** Showing the pinyin or playing the model makes the sentence easier, so its score counts at this share. */
export const AIDED_FACTOR = 0.85;

export interface LevelReading {
  score: number;
  aided: boolean;
  /** Syllables read wrongly in this reading, shown on the result page. */
  mistakes?: Mistake[];
}

export const effectiveScore = (r: LevelReading | null) => (r ? Math.round(r.aided ? r.score * AIDED_FACTOR : r.score) : 0);

export interface LevelEstimate {
  /** 0 = below HSK 1, otherwise 1..6. */
  level: number;
  /** Next level is within reach: its sentence scored at least 50. */
  close: boolean;
}

/** `readings[i]` is the result for HSK i + 1; null means skipped or not reached and counts as 0. */
export function estimateLevel(readings: (LevelReading | null)[]): LevelEstimate {
  const scores = Array.from({ length: LEVEL_COUNT }, (_, i) => effectiveScore(readings[i] ?? null));
  let level = 0;
  let sum = 0;
  scores.forEach((s, i) => {
    sum += s;
    if (s >= PASS_SENTENCE && sum / (i + 1) >= PASS_AVERAGE) level = i + 1;
  });
  return { level, close: level < LEVEL_COUNT && scores[level] >= 50 };
}

export interface SavedLevel {
  level: number;
  /** Effective score per level, HSK 1 first. */
  scores: number[];
  /** ISO date of the check. */
  at: string;
}

export const lastLevelCheck = createLocalStore<SavedLevel | null>("xq.levelCheck", null);
