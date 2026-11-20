import { createLocalStore } from "./local-store";

export interface TalkRecord {
  best: number;
  last: number;
  tries: number;
}

/** Scores per scenario, kept in the browser like lesson progress. */
export const talkScores = createLocalStore<Record<string, TalkRecord>>("xq.talkScores", {});

export function recordTalkScore(id: string, total: number) {
  const all = talkScores.get();
  const prev = all[id] ?? { best: 0, last: 0, tries: 0 };
  talkScores.set({ ...all, [id]: { best: Math.max(prev.best, total), last: total, tries: prev.tries + 1 } });
}
