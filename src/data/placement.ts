import { SENTENCES, type Sentence } from "./sentences";

/**
 * Sentences for the level check, a small pool per HSK level so the client bundle stays light.
 * Each level asks for longer sentences, since reading speed and accuracy over a longer line is part of the level.
 */
const LENGTH: Record<string, [min: number, max: number]> = {
  "1": [4, 7],
  "2": [5, 9],
  "3": [7, 11],
  "4": [9, 13],
  "5": [11, 16],
  "6": [13, 20],
};
export const POOL_SIZE = 10;

const hanCount = (s: string) => [...s].filter((c) => /\p{Script=Han}/u.test(c)).length;

/** Picks sentences spread evenly through the level so the pool covers many topics. */
export function placementPool(): Record<string, Sentence[]> {
  return Object.fromEntries(
    Object.entries(LENGTH).map(([level, [min, max]]) => {
      const all = Object.values(SENTENCES[level]).flat();
      const fit = all.filter((s) => hanCount(s.hanzi) >= min && hanCount(s.hanzi) <= max);
      const source = fit.length >= POOL_SIZE ? fit : all;
      const step = source.length / POOL_SIZE;
      return [level, Array.from({ length: Math.min(POOL_SIZE, source.length) }, (_, i) => source[Math.floor(i * step)])];
    }),
  );
}
