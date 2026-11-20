import { spokenCount, type Analysis } from "./analyze";
import type { PronunciationResult } from "./pronunciation";
import type { Tone } from "./sandhi";

/**
 * One overall reading score out of 100, built from three parts (each 0..1, null when it cannot be measured):
 * tones from the pitch track, initials and finals from speech recognition, and fluency from timing.
 * Missing parts are left out and the remaining weights are scaled up.
 */
export interface ReadingScore {
  total: number;
  tone: number | null;
  pronunciation: number | null;
  fluency: number | null;
  /** Spoken syllables per second, from the first to the last voiced syllable. */
  rate: number | null;
  /** Pauses longer than LONG_PAUSE_SECONDS that do not follow punctuation. */
  longPauses: number;
}

const WEIGHTS = { tone: 0.5, pronunciation: 0.3, fluency: 0.2 };

// Learners reading slowly sit around 1.2 syllables a second; careful native reading is about 3.
const SLOW_RATE = 1.2;
const FLUENT_RATE = 2.8;
const LONG_PAUSE_SECONDS = 0.5;
const PAUSE_PENALTY = 0.15;
// Timing says little about one or two syllables, so fluency is only scored from this length up.
const MIN_FLUENCY_SYLLABLES = 4;

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

export function fluencyOf(
  analysis: Analysis,
  text: string,
): { fluency: number; rate: number; longPauses: number } | null {
  const count = spokenCount(analysis.syllables.map((s) => s.syllable));
  if (count < MIN_FLUENCY_SYLLABLES) return null;
  // Erhua shares its span with the syllable before it, so keep each span once.
  const spans = analysis.syllables.flatMap((s, i, all) => (s.span && s.span !== all[i - 1]?.span ? [s.span] : []));
  if (spans.length < MIN_FLUENCY_SYLLABLES) return null;

  const t = (i: number) => analysis.frames[Math.min(i, analysis.frames.length - 1)].t;
  const seconds = t(spans.at(-1)![1] - 1) - t(spans[0][0]);
  if (seconds <= 0) return null;
  const rate = count / seconds;

  // A pause is expected after a comma or full stop inside the text.
  const allowed = [...text.replace(/[\s。！？.!?]+$/u, "")].filter((c) => /[，、；：,;:。！？]/u.test(c)).length;
  let pauses = 0;
  for (let i = 1; i < spans.length; i++) {
    if (t(spans[i][0]) - t(spans[i - 1][1] - 1) > LONG_PAUSE_SECONDS) pauses++;
  }
  const longPauses = Math.max(0, pauses - allowed);

  const fluency = clamp01((rate - SLOW_RATE) / (FLUENT_RATE - SLOW_RATE)) - PAUSE_PENALTY * longPauses;
  return { fluency: clamp01(fluency), rate, longPauses };
}

export function readingScore(
  analysis: Analysis,
  pronunciation: PronunciationResult | null,
  text: string,
): ReadingScore {
  const scored = analysis.syllables.filter((s) => s.correct !== null);
  const tone = scored.length ? scored.filter((s) => s.correct).length / scored.length : null;
  const pron = pronunciation ? pronunciation.score : null;
  const flow = fluencyOf(analysis, text);

  const parts: [number | null, number][] = [
    [tone, WEIGHTS.tone],
    [pron, WEIGHTS.pronunciation],
    [flow?.fluency ?? null, WEIGHTS.fluency],
  ];
  const present = parts.filter((p): p is [number, number] => p[0] !== null);
  const weight = present.reduce((n, [, w]) => n + w, 0);
  const total = weight ? Math.round((100 * present.reduce((n, [v, w]) => n + v * w, 0)) / weight) : 0;

  return {
    total,
    tone,
    pronunciation: pron,
    fluency: flow?.fluency ?? null,
    rate: flow?.rate ?? null,
    longPauses: flow?.longPauses ?? 0,
  };
}

/** One syllable read wrongly: a wrong tone, a wrong sound (initial or final), or both. */
export interface Mistake {
  /** Index among the Chinese characters of the text, punctuation not counted. */
  index: number;
  hanzi: string;
  /** Tone-marked pinyin as written in dictionaries (before sandhi). */
  pinyin: string;
  tone?: { want: Tone; heard: Tone };
  /** Toneless pinyin; `heard` is null when the recogniser had nothing in that position. */
  sound?: { want: string; heard: string | null };
}

/** Syllables to point out after a reading. Sounds are only listed when the transcript lined up syllable by syllable. */
export function mistakesOf(analysis: Analysis, pronunciation: PronunciationResult | null): Mistake[] {
  const sounds = pronunciation?.status === "close" ? pronunciation.syllables : [];
  return analysis.syllables.flatMap(({ syllable, guess, correct }, index) => {
    const sound = sounds[index];
    const mistake: Mistake = { index, hanzi: syllable.hanzi, pinyin: syllable.marked };
    if (correct === false && guess) mistake.tone = { want: syllable.surface, heard: guess.tone };
    if (sound && !sound.ok) mistake.sound = { want: sound.target, heard: sound.heard };
    return mistake.tone || mistake.sound ? [mistake] : [];
  });
}

/** Short Vietnamese verdict for a score out of 100. */
export function scoreVerdict(total: number): string {
  if (total >= 90) return "Xuất sắc";
  if (total >= 75) return "Tốt";
  if (total >= 55) return "Khá";
  return "Cần luyện thêm";
}
