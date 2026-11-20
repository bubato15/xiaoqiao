import { extractPitch, median, toSemitones, type PitchFrame } from "./pitch";
import { segmentSyllables, type Span } from "./segment";
import { classifyTone, type ToneGuess } from "./tone";
import type { Syllable } from "./sandhi";

export interface SyllableResult {
  syllable: Syllable;
  span: Span | null;
  guess: ToneGuess | null;
  /** null when the syllable is neutral tone and is not scored. */
  correct: boolean | null;
}

export interface Analysis {
  frames: PitchFrame[];
  refHz: number;
  /** True when a calibrated pitch was given but did not fit this recording, so the recording's own median was used. */
  calibrationIgnored: boolean;
  syllables: SyllableResult[];
}

/** Erhua 儿 (written "r5", e.g. 一会儿) merges into the previous syllable instead of being spoken on its own. */
export const isErhua = (s: Syllable, i: number) => i > 0 && s.hanzi === "儿" && s.marked === "r";

/** Number of syllables the learner actually pronounces. */
export const spokenCount = (expected: Syllable[]) => expected.filter((s, i) => !isErhua(s, i)).length;

// How far (in semitones) the recording's median pitch may sit from the calibrated mid before the calibration
// is treated as stale (another voice, another mic, or measured in a raised voice). A single word may sit a full
// tone level away from mid (tone 1 at Chao 5, tone 3 at Chao 2), a sentence of mixed tones stays close to it.
const MAX_DRIFT_WORD = 7;
const MAX_DRIFT_SENTENCE = 4;

/**
 * Scores the tones of one recording against the expected syllables.
 * `speakerMidHz` comes from calibration; without it the utterance median is used,
 * which is less reliable for single-syllable words. A calibration far from the utterance median is ignored:
 * a mid pitch off by half an octave pushes every syllable onto the same tone.
 */
export function analyzeTones(
  samples: Float32Array,
  sampleRate: number,
  expected: Syllable[],
  speakerMidHz?: number,
): Analysis {
  const frames = extractPitch(samples, sampleRate);
  const voiced = frames.flatMap((f) => (f.hz ? [f.hz] : []));
  const count = spokenCount(expected);
  const utteranceHz = median(voiced);
  const maxDrift = count >= 3 ? MAX_DRIFT_SENTENCE : MAX_DRIFT_WORD;
  const calibrationIgnored =
    !!speakerMidHz && voiced.length > 0 && Math.abs(toSemitones(utteranceHz, speakerMidHz)) > maxDrift;
  const refHz = speakerMidHz && !calibrationIgnored ? speakerMidHz : utteranceHz;
  const spans = segmentSyllables(frames, count);

  // Spoken index of each expected syllable; an erhua 儿 shares the span of the syllable before it.
  let spoken = -1;
  const syllables = expected.map((syllable, i) => {
    if (!isErhua(syllable, i)) spoken++;
    const span = spans[spoken] ?? null;
    const contour = span ? frames.slice(span[0], span[1]).flatMap((f) => (f.hz ? [toSemitones(f.hz, refHz)] : [])) : [];
    const guess = classifyTone(contour);
    const correct = syllable.surface === 0 ? null : guess ? guess.tone === syllable.surface : false;
    return { syllable, span, guess, correct };
  });

  return { frames, refHz, calibrationIgnored, syllables };
}
