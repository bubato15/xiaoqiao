import type { PitchFrame } from "./pitch";

/** Inclusive start, exclusive end frame indexes. */
export type Span = [number, number];

const MAX_GAP_FRAMES = 3;
const MIN_RUN_FRAMES = 6;

/**
 * Cuts the pitch track into `count` syllables.
 * Voiced runs come first; if the speaker joined syllables (common with m, n, l initials)
 * the longest run is split at its quietest point until the count matches.
 */
export function segmentSyllables(frames: PitchFrame[], count: number): Span[] {
  let runs = voicedRuns(frames);
  if (runs.length === 0 || count <= 0) return [];

  while (runs.length > count) {
    let best = 0;
    for (let i = 1; i < runs.length - 1; i++) {
      if (gap(runs, i) < gap(runs, best)) best = i;
    }
    runs.splice(best, 2, [runs[best][0], runs[best + 1][1]]);
  }

  while (runs.length < count) {
    const longest = runs.reduce((a, r, i) => (len(r) > len(runs[a]) ? i : a), 0);
    const [s, e] = runs[longest];
    const cut = quietestFrame(
      frames,
      s + Math.floor(len(runs[longest]) * 0.2),
      e - Math.floor(len(runs[longest]) * 0.2),
    );
    runs = [...runs.slice(0, longest), [s, cut], [cut, e], ...runs.slice(longest + 1)];
  }
  return runs;
}

function voicedRuns(frames: PitchFrame[]): Span[] {
  const runs: Span[] = [];
  let start = -1;
  let lastVoiced = -1;
  frames.forEach((f, i) => {
    if (f.hz === null) return;
    if (start >= 0 && i - lastVoiced > MAX_GAP_FRAMES + 1) {
      runs.push([start, lastVoiced + 1]);
      start = i;
    }
    if (start < 0) start = i;
    lastVoiced = i;
  });
  if (start >= 0) runs.push([start, lastVoiced + 1]);
  return runs.filter((r) => len(r) >= MIN_RUN_FRAMES);
}

const len = ([s, e]: Span) => e - s;
const gap = (runs: Span[], i: number) => runs[i + 1][0] - runs[i][1];

function quietestFrame(frames: PitchFrame[], from: number, to: number): number {
  let best = from;
  for (let i = from; i < to; i++) if (frames[i].rms < frames[best].rms) best = i;
  return Math.max(best, from + 1);
}
