import { analyzeTones, type Analysis } from "./analyze";
import { readingScore, type ReadingScore } from "./score";
import { syllabify, type Syllable } from "./sandhi";

export const hanCount = (s: string) => [...s].filter((c) => /\p{Script=Han}/u.test(c)).length;

/** Tone sandhi does not carry across a pause, so each phrase between punctuation marks is read on its own. */
export const syllabifyPhrases = (s: string): Syllable[] =>
  s.split(/[，。！？、；：,.!?;:\s]+/u).flatMap((p) => (hanCount(p) ? syllabify(p) : []));

// Longer stretches make syllable segmentation unreliable (same cap as the free reading on /level).
export const MAX_SPOKEN_HAN = 40;

export type SpokenScore = { analysis: Analysis; score: ReadingScore } | { skipped: string };

/**
 * Scores tones and fluency of a sentence the learner said freely (in the chat), using the recogniser's
 * transcript as the target. Pronunciation of initials and finals is left out: the transcript is what the
 * machine heard, so comparing against it would always match.
 */
export function scoreSpoken(
  samples: Float32Array,
  sampleRate: number,
  heard: string,
  speakerMidHz?: number,
): SpokenScore {
  // The recogniser writes numbers as digits (我要3个), which have no syllables to line up with the audio.
  if (/[0-9A-Za-z]/.test(heard))
    return { skipped: "Câu có chữ số hoặc chữ Latin nên XiaoQiao chưa chấm giọng câu này." };
  const count = hanCount(heard);
  if (!count) return { skipped: "Câu này không có chữ Hán để chấm giọng." };
  if (count > MAX_SPOKEN_HAN) return { skipped: "Câu dài quá nên chưa chấm giọng. Thử nói từng câu ngắn nhé." };

  const syllables = syllabifyPhrases(heard);
  const analysis = analyzeTones(samples, sampleRate, syllables, speakerMidHz);
  // A bad recording is not a wrong tone, same rule as SpeakPractice.
  if (analysis.syllables.some((s) => !s.span || (s.syllable.surface !== 0 && !s.guess))) {
    return { skipped: "Bản thu chưa rõ nên chưa chấm giọng câu này. Nói gần micro và rõ từng tiếng nhé." };
  }
  return { analysis, score: readingScore(analysis, null, heard) };
}
