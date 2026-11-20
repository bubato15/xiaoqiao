import { pinyin } from "pinyin-pro";
import { describe, expect, it } from "vitest";
import { LEVELS } from "./hsk";
import { SENTENCES } from "./sentences";
import { fromPinyin } from "../lib/speech/sandhi";

const all = Object.entries(SENTENCES).flatMap(([level, byLesson]) =>
  Object.entries(byLesson).flatMap(([lesson, list]) => list.map((s) => ({ level, lesson: Number(lesson), ...s }))),
);

/** Lesson word readings; where a sentence spells out a whole word as listed, we trust it over pinyin-pro (油炸 zhá). */
const WORDS = Object.values(LEVELS).flatMap((ls) =>
  ls.flatMap((l) =>
    l.words.map((w) => ({ hanzi: w.hanzi, syllables: w.pinyin.toLowerCase().replace(/ü/g, "v").split(" ") })),
  ),
);

function fromWordList(han: string, syllables: string[], index: number) {
  return WORDS.some((w) => {
    for (let at = han.indexOf(w.hanzi); at !== -1; at = han.indexOf(w.hanzi, at + 1)) {
      const covers = index >= at && index < at + w.syllables.length;
      if (covers && w.syllables.every((p, j) => p === syllables[at + j])) return true;
    }
    return false;
  });
}

/** Readings where we follow the HSK textbook and pinyin-pro prefers the other standard form. */
const ACCEPTED_VARIANTS: Record<string, string> = { shei2: "shui2" };

describe("practice sentences", () => {
  it("exist for every lesson of every level", () => {
    for (const [level, lessons] of Object.entries(LEVELS)) {
      for (const l of lessons)
        expect(SENTENCES[level]?.[l.id]?.length, `HSK${level} lesson ${l.id}`).toBeGreaterThan(0);
    }
  });

  it("have one pinyin syllable per character", () => {
    for (const s of all) expect(() => fromPinyin(s.hanzi, s.pinyin), s.hanzi).not.toThrow();
  });

  it("agree with pinyin-pro on sounds and on every non-neutral tone", () => {
    const problems = all.flatMap((s) => {
      const han = [...s.hanzi].filter((c) => /\p{Script=Han}/u.test(c)).join("");
      const ref = pinyin(han, { toneType: "num", type: "array", toneSandhi: false, v: true });
      const syllables = s.pinyin.toLowerCase().replace(/ü/g, "v").split(/\s+/);
      return syllables.flatMap((ours, i) => {
        const theirs = ref[i].replace(/0$/, "5");
        const sameSound = ours.slice(0, -1) === theirs.slice(0, -1);
        // Neutral tones are a teaching choice (e.g. 后面 hòumian), so only sounds are compared there.
        const sameTone = ours.endsWith("5") || theirs.endsWith("5") || ours.at(-1) === theirs.at(-1);
        if (ACCEPTED_VARIANTS[ours] === theirs) return [];
        // Erhua suffix: we write r5 where pinyin-pro writes er.
        if (ours === "r5" && theirs.startsWith("er")) return [];
        if (fromWordList(han, syllables, i)) return [];
        return sameSound && sameTone ? [] : [`${s.hanzi} #${i}: ours ${ours}, pinyin-pro ${theirs}`];
      });
    });
    expect(problems).toEqual([]);
  }, 30000); // 1,299 sentences through pinyin-pro: about 2.5 s alone, slower when the suite runs in parallel
});
