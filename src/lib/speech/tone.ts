import type { Tone } from "./sandhi";

export type LexicalTone = Exclude<Tone, 0>;

/**
 * Tone shapes in Chao numerals mapped to semitones around the speaker's mid pitch
 * (one Chao step ≈ 2.5 st). Tone 3 has a full (214) and a half (211) form;
 * the half form is what speakers produce before another syllable.
 */
const chao = (...levels: number[]) => levels.map((l) => (l - 3) * 2.5);
const TEMPLATES: Record<LexicalTone, number[][]> = {
  1: [chao(5, 5, 5)],
  2: [chao(3, 3.5, 5)],
  3: [chao(2, 1, 4), chao(2, 1, 1)],
  4: [chao(5, 3, 1)],
};

const POINTS = 12;
const SCALES = [0.4, 0.55, 0.7, 0.85, 1, 1.2];
const LEVEL_PENALTY = 0.25;

export interface ToneGuess {
  tone: LexicalTone;
  /** Probability-like confidence for each tone, sums to 1. */
  scores: Record<LexicalTone, number>;
  /** The resampled contour (semitones vs. speaker mid) used for matching. */
  contour: number[];
}

/** Classifies one syllable's pitch contour, given in semitones relative to the speaker's mid pitch. */
export function classifyTone(semitones: number[]): ToneGuess | null {
  const contour = prepare(semitones);
  if (!contour) return null;

  const distances = ([1, 2, 3, 4] as LexicalTone[]).map((tone) => ({
    tone,
    d: Math.min(...TEMPLATES[tone].map((tpl) => fit(contour, resample(tpl, POINTS)))),
  }));
  const weights = distances.map(({ d }) => Math.exp(-d));
  const total = weights.reduce((a, b) => a + b, 0);
  const scores = Object.fromEntries(distances.map(({ tone }, i) => [tone, weights[i] / total])) as ToneGuess["scores"];
  const best = distances.reduce((a, b) => (b.d < a.d ? b : a));
  return { tone: best.tone, scores, contour };
}

/** Smallest RMS distance over scale and level shift, with a cost for shifting away from the speaker mid. */
function fit(contour: number[], template: number[]): number {
  let best = Infinity;
  for (const k of SCALES) {
    const scaled = template.map((v) => v * k);
    // The optimal shift for RMS is the mean difference; clamp it so tone 1 cannot sit low.
    const shift = clamp(mean(contour.map((v, i) => v - scaled[i])), -5, 5);
    const rms = Math.sqrt(mean(contour.map((v, i) => (v - scaled[i] - shift) ** 2)));
    best = Math.min(best, rms + LEVEL_PENALTY * Math.abs(shift));
  }
  return best;
}

/** Median-smooths, trims onset and offset glides, and resamples to a fixed length. */
function prepare(values: number[]): number[] | null {
  if (values.length < 5) return null;
  const smooth = values.map((_, i) => {
    const win = values.slice(Math.max(0, i - 2), i + 3).sort((a, b) => a - b);
    return win[win.length >> 1];
  });
  const from = Math.floor(smooth.length * 0.12);
  const to = Math.ceil(smooth.length * 0.92);
  return resample(smooth.slice(from, to), POINTS);
}

export function resample(values: number[], n: number): number[] {
  if (values.length === 1) return Array(n).fill(values[0]);
  return Array.from({ length: n }, (_, i) => {
    const pos = (i * (values.length - 1)) / (n - 1);
    const lo = Math.floor(pos);
    const hi = Math.min(lo + 1, values.length - 1);
    return values[lo] + (values[hi] - values[lo]) * (pos - lo);
  });
}

const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
