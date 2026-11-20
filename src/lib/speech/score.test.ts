import { describe, expect, it } from "vitest";
import type { Analysis } from "./analyze";
import { checkPronunciation } from "./pronunciation";
import { fluencyOf, mistakesOf, readingScore } from "./score";
import { fromPinyin } from "./sandhi";
import type { Span } from "./segment";

/** Fake analysis: 10 ms frames, one span per spoken syllable from the given [start, end] seconds. */
function fake(text: string, pinyin: string, times: [number, number][], correct: (boolean | null)[]): Analysis {
  const syllables = fromPinyin(text, pinyin);
  const frames = Array.from({ length: 1000 }, (_, i) => ({ t: i * 0.01, hz: 200, rms: 0.1 }));
  const spans: Span[] = times.map(([a, b]) => [Math.round(a * 100), Math.round(b * 100)]);
  return {
    frames,
    refHz: 200,
    calibrationIgnored: false,
    syllables: syllables.map((syllable, i) => ({ syllable, span: spans[i], guess: null, correct: correct[i] })),
  };
}

const evenly = (n: number, syl: number, gap: number): [number, number][] =>
  Array.from({ length: n }, (_, i) => [0.2 + i * (syl + gap), 0.2 + i * (syl + gap) + syl]);

describe("fluencyOf", () => {
  it("is not scored for short words", () => {
    expect(fluencyOf(fake("你好", "ni3 hao3", evenly(2, 0.3, 0.1), [true, true]), "你好")).toBeNull();
  });

  it("rewards a steady pace and penalises long pauses", () => {
    const text = "我想喝茶。";
    const steady = fluencyOf(fake(text, "wo3 xiang3 he1 cha2", evenly(4, 0.25, 0.08), [true, true, true, true]), text)!;
    expect(steady.rate).toBeGreaterThan(2.8);
    expect(steady.fluency).toBe(1);
    expect(steady.longPauses).toBe(0);

    const halting = fluencyOf(fake(text, "wo3 xiang3 he1 cha2", evenly(4, 0.3, 0.8), [true, true, true, true]), text)!;
    expect(halting.longPauses).toBe(3);
    expect(halting.fluency).toBe(0);
  });

  it("allows a pause at a comma", () => {
    const text = "我很累，想睡觉。";
    const times = evenly(6, 0.22, 0.06);
    // Pause of 0.7 s after 累.
    const shifted = times.map(([a, b], i): [number, number] => (i >= 3 ? [a + 0.7, b + 0.7] : [a, b]));
    const r = fluencyOf(fake(text, "wo3 hen3 lei4 xiang3 shui4 jiao4", shifted, Array(6).fill(true)), text)!;
    expect(r.longPauses).toBe(0);
  });
});

describe("readingScore", () => {
  it("weights tones, pronunciation and fluency", () => {
    const text = "我想喝茶。";
    const a = fake(text, "wo3 xiang3 he1 cha2", evenly(4, 0.25, 0.08), [true, true, false, true]);
    const perfect = checkPronunciation(text, ["我想喝茶"]);
    const s = readingScore(a, perfect, text);
    expect(s.tone).toBe(0.75);
    expect(s.pronunciation).toBe(1);
    expect(s.fluency).toBe(1);
    expect(s.total).toBe(Math.round(100 * (0.5 * 0.75 + 0.3 + 0.2)));
  });

  it("scales the weights up when a part is missing", () => {
    const a = fake("你好", "ni3 hao3", evenly(2, 0.3, 0.1), [true, false]);
    // Tones only: 1 of 2 right.
    expect(readingScore(a, null, "你好").total).toBe(50);
  });

  it("skips neutral tones in the tone part", () => {
    const a = fake("谢谢", "xie4 xie5", evenly(2, 0.3, 0.1), [true, null]);
    expect(readingScore(a, null, "谢谢").tone).toBe(1);
  });
});

describe("pronunciation score", () => {
  it("is the share of syllables heard right", () => {
    expect(checkPronunciation("水果", ["水果"]).score).toBe(1);
    expect(checkPronunciation("四十", ["十四"]).score).toBe(0);
    expect(checkPronunciation("水果", []).score).toBe(0);
  });
});

describe("mistakesOf", () => {
  it("points out wrong tones and wrong sounds by character", () => {
    const analysis = fake("我想喝茶", "wo3 xiang3 he1 cha2", evenly(4, 0.25, 0.08), [true, true, false, true]);
    const guess = { tone: 4 as const, scores: { 1: 0, 2: 0, 3: 0, 4: 1 }, contour: [] };
    analysis.syllables[2] = { ...analysis.syllables[2], guess };
    const mistakes = mistakesOf(analysis, checkPronunciation("我想喝茶", ["我想喝扎"]));
    expect(mistakes).toEqual([
      { index: 2, hanzi: "喝", pinyin: "hē", tone: { want: 1, heard: 4 } },
      { index: 3, hanzi: "茶", pinyin: "chá", sound: expect.objectContaining({ want: "cha", heard: "zha" }) },
    ]);
  });

  it("lists nothing for a clean reading", () => {
    const analysis = fake("你好", "ni3 hao3", evenly(2, 0.3, 0.1), [true, true]);
    expect(mistakesOf(analysis, null)).toEqual([]);
  });
});
