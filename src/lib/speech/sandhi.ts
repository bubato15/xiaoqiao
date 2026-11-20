import { convert, pinyin } from "pinyin-pro";

export type Tone = 0 | 1 | 2 | 3 | 4;

export interface Syllable {
  hanzi: string;
  /** Pinyin with tone marks as printed in textbooks (citation form). */
  marked: string;
  /** Dictionary tone before sandhi. 0 = neutral. */
  citation: Tone;
  /** Tone a native speaker actually produces in this context. */
  surface: Tone;
}

const toneOf = (numbered: string): Tone => {
  const digit = Number(numbered.at(-1));
  return (digit >= 0 && digit <= 4 ? digit : 0) as Tone;
};

/** 3+3 → 2+3, applied left to right so 我很好 becomes 2+2+3. */
function thirdToneSandhi(tones: Tone[]): Tone[] {
  const out = [...tones];
  for (let i = 0; i < out.length - 1; i++) {
    if (out[i] === 3 && tones[i + 1] === 3) out[i] = 2;
  }
  return out;
}

/**
 * Splits Chinese text into syllables with expected spoken tones.
 * pinyin-pro already applies the 不 and 一 rules; the 3+3 rule is applied here.
 * `neutral` lists syllable indexes the lesson marks as neutral tone (e.g. 谢谢 → [1]).
 */
export function syllabify(text: string, neutral: number[] = []): Syllable[] {
  const hanzi = [...text].filter((c) => /\p{Script=Han}/u.test(c));
  const joined = hanzi.join("");
  const citationNum = pinyin(joined, { toneType: "num", type: "array", toneSandhi: false });
  const surfaceNum = pinyin(joined, { toneType: "num", type: "array" });
  const marked = pinyin(joined, { type: "array", toneSandhi: false });

  const surface = thirdToneSandhi(surfaceNum.map((p, i) => (neutral.includes(i) ? 0 : toneOf(p))));

  return hanzi.map((h, i) => ({
    hanzi: h,
    marked: neutral.includes(i) ? pinyin(h, { toneType: "none" }) : marked[i],
    citation: neutral.includes(i) ? 0 : toneOf(citationNum[i]),
    surface: surface[i],
  }));
}

/**
 * Same as `syllabify` but trusts the given reading (tone numbers, 5 = neutral) instead of
 * letting pinyin-pro guess, which matters for words with several readings such as 都 or 东西.
 */
export function fromPinyin(text: string, numeric: string): Syllable[] {
  const hanzi = [...text].filter((c) => /\p{Script=Han}/u.test(c));
  const parts = numeric.trim().split(/\s+/);
  if (parts.length !== hanzi.length) throw new Error(`Pinyin "${numeric}" does not match "${text}"`);

  const citation = parts.map(toneOf);
  const surface = citation.map((t, i): Tone => {
    const next = citation[i + 1];
    if (hanzi[i] === "不" && t === 4 && next === 4) return 2;
    if (hanzi[i] === "一" && t === 1 && next !== undefined && next !== 0) return next === 4 ? 2 : 4;
    return t;
  });

  return hanzi.map((h, i) => ({
    hanzi: h,
    marked:
      citation[i] === 0
        ? parts[i].replace(/\d$/, "")
        : convert(parts[i].replace(/u:|v/g, "ü"), { format: "numToSymbol" }),
    citation: citation[i],
    surface: thirdToneSandhi(surface)[i],
  }));
}
