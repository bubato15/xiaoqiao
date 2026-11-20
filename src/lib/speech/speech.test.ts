import { describe, expect, it } from "vitest";
import { analyzeTones } from "./analyze";
import { fromPinyin, syllabify } from "./sandhi";
import { scoreSpoken, syllabifyPhrases } from "./spoken";

const RATE = 16000;
const MID_HZ = 200;

/** Synthesizes a voiced vowel-like tone whose pitch follows `semitones` (relative to MID_HZ). */
function synth(contours: number[][], syllableSec = 0.35, gapSec = 0.12): Float32Array {
  const parts: number[] = [];
  let phase = 0;
  const silence = (sec: number) => parts.push(...new Array(Math.round(sec * RATE)).fill(0));
  silence(0.2);
  for (const c of contours) {
    const n = Math.round(syllableSec * RATE);
    for (let i = 0; i < n; i++) {
      const pos = (i / (n - 1)) * (c.length - 1);
      const lo = Math.floor(pos);
      const st = c[lo] + ((c[Math.min(lo + 1, c.length - 1)] ?? c[lo]) - c[lo]) * (pos - lo);
      phase += (2 * Math.PI * MID_HZ * 2 ** (st / 12)) / RATE;
      const envelope = Math.sin((Math.PI * i) / n) ** 0.3;
      parts.push(envelope * (0.6 * Math.sin(phase) + 0.25 * Math.sin(2 * phase) + 0.1 * Math.sin(3 * phase)));
    }
    silence(gapSec);
  }
  silence(0.2);
  return Float32Array.from(parts);
}

const SHAPES = { 1: [4, 4], 2: [0, 0.5, 4], 3: [-2, -4.5, -4, 2], 4: [4.5, 0, -5] } as const;

describe("syllabify", () => {
  it("applies the 3+3 rule on top of pinyin-pro's 不 and 一 rules", () => {
    expect(syllabify("你好").map((s) => s.surface)).toEqual([2, 3]);
    expect(syllabify("不是").map((s) => s.surface)).toEqual([2, 4]);
    expect(syllabify("一起").map((s) => s.surface)).toEqual([4, 3]);
    expect(syllabify("你好").map((s) => s.marked)).toEqual(["nǐ", "hǎo"]);
  });

  it("marks lesson-defined neutral syllables", () => {
    const s = syllabify("谢谢", [1]);
    expect(s.map((x) => x.surface)).toEqual([4, 0]);
    expect(s[1].marked).toBe("xie");
  });
});

describe("fromPinyin", () => {
  it("uses the given reading and neutral tones", () => {
    expect(fromPinyin("东西", "dong1 xi5").map((s) => [s.marked, s.surface])).toEqual([
      ["dōng", 1],
      ["xi", 0],
    ]);
    expect(fromPinyin("女儿", "nü3 er2")[0].marked).toBe("nǚ");
  });

  it("applies 不, 一 and 3+3 sandhi", () => {
    expect(fromPinyin("不客气", "bu4 ke4 qi5").map((s) => s.surface)).toEqual([2, 4, 0]);
    expect(fromPinyin("对不起", "dui4 bu5 qi3").map((s) => s.surface)).toEqual([4, 0, 3]);
    expect(fromPinyin("一起", "yi1 qi3").map((s) => s.surface)).toEqual([4, 3]);
    expect(fromPinyin("一个", "yi1 ge4").map((s) => s.surface)).toEqual([2, 4]);
    expect(fromPinyin("一", "yi1").map((s) => s.surface)).toEqual([1]);
    expect(fromPinyin("水果", "shui3 guo3").map((s) => s.surface)).toEqual([2, 3]);
  });

  it("rejects a reading with the wrong syllable count", () => {
    expect(() => fromPinyin("你好", "ni3")).toThrow();
  });
});

describe("analyzeTones", () => {
  it.each([1, 2, 3, 4] as const)("recognises a synthetic tone %i", (tone) => {
    const [only] = syllabify("妈");
    const expected = [{ ...only, surface: tone }];
    const result = analyzeTones(synth([[...SHAPES[tone]]]), RATE, expected, MID_HZ);
    expect(result.syllables[0].guess?.tone).toBe(tone);
  });

  it("segments and scores a two-syllable word", () => {
    const expected = syllabify("你好"); // spoken as 2 + 3
    const audio = synth([[...SHAPES[2]], [...SHAPES[3]]]);
    const result = analyzeTones(audio, RATE, expected, MID_HZ);
    expect(result.syllables.map((s) => s.guess?.tone)).toEqual([2, 3]);
    expect(result.syllables.every((s) => s.correct)).toBe(true);
  });

  it("splits syllables that were joined without a pause", () => {
    const expected = syllabify("谢谢", [1]).map((s, i) => ({ ...s, surface: i === 0 ? 4 : 1 }) as const);
    const audio = synth([[...SHAPES[4]], [...SHAPES[1]]], 0.35, 0);
    const result = analyzeTones(audio, RATE, expected, MID_HZ);
    expect(result.syllables.map((s) => s.span !== null)).toEqual([true, true]);
  });

  it("ignores a stale calibration that is far from the recording's pitch", () => {
    const expected = fromPinyin("谁去买", "shei2 qu4 mai3");
    const audio = synth([[...SHAPES[2]], [...SHAPES[4]], [...SHAPES[3]]]);
    // Calibrated half an octave too high: without the guard every syllable reads as tone 3.
    const result = analyzeTones(audio, RATE, expected, MID_HZ * 1.5);
    expect(result.calibrationIgnored).toBe(true);
    expect(result.syllables.map((s) => s.guess?.tone)).toEqual([2, 4, 3]);
    expect(analyzeTones(audio, RATE, expected, MID_HZ).calibrationIgnored).toBe(false);
  });

  it("does not score neutral tone syllables", () => {
    const expected = syllabify("妈妈", [1]);
    const result = analyzeTones(synth([[...SHAPES[1]], [0, -1]]), RATE, expected, MID_HZ);
    expect(result.syllables[1].correct).toBeNull();
  });

  it("merges an erhua 儿 into the syllable before it", () => {
    const expected = fromPinyin("一会儿", "yi1 hui4 r5"); // spoken as two syllables: yí huìr
    const result = analyzeTones(synth([[...SHAPES[2]], [...SHAPES[4]]]), RATE, expected, MID_HZ);
    expect(result.syllables.map((s) => s.guess?.tone ?? null)).toEqual([2, 4, 4]);
    expect(result.syllables[2].span).toEqual(result.syllables[1].span);
    expect(result.syllables.map((s) => s.correct)).toEqual([true, true, null]);
  });
});

describe("scoreSpoken", () => {
  it("scores the tones of what the recogniser heard, with sandhi", () => {
    // 我很好 is spoken 2 + 2 + 3.
    const good = scoreSpoken(synth([[...SHAPES[2]], [...SHAPES[2]], [...SHAPES[3]]]), RATE, "我很好。", MID_HZ);
    expect("score" in good && good.score.tone).toBe(1);
    const off = scoreSpoken(synth([[...SHAPES[2]], [...SHAPES[4]], [...SHAPES[3]]]), RATE, "我很好", MID_HZ);
    expect("score" in off && off.analysis.syllables.map((s) => s.correct)).toEqual([true, false, true]);
  });

  it("does not carry 3+3 sandhi across punctuation", () => {
    expect(syllabifyPhrases("好，我").map((s) => s.surface)).toEqual([3, 3]);
  });

  it("skips sentences it cannot line up with the audio", () => {
    const audio = synth([[...SHAPES[4]], [...SHAPES[3]]]);
    expect(scoreSpoken(audio, RATE, "我要3个", MID_HZ)).toHaveProperty("skipped");
    expect(scoreSpoken(audio, RATE, "ok", MID_HZ)).toHaveProperty("skipped");
    expect(scoreSpoken(new Float32Array(RATE), RATE, "我很好", MID_HZ)).toHaveProperty("skipped");
  });
});
