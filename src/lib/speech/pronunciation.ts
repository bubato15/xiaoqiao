import { pinyin } from "pinyin-pro";

/**
 * Checks initials and finals (not tones) by comparing what speech recognition heard
 * with the target word. Tones are scored separately from the pitch track.
 */

export interface SyllableCheck {
  target: string;
  /** Toneless pinyin of what was heard in this position, or null when nothing lined up. */
  heard: string | null;
  ok: boolean;
  /** Vietnamese advice for a known confusion, when one applies. */
  hint?: string;
}

export interface PronunciationResult {
  /** "match": heard exactly; "close": same syllable count, some sounds differ; "unclear": could not line up. */
  status: "match" | "close" | "unclear";
  syllables: SyllableCheck[];
  /** The recognised text used for the comparison. */
  heardText: string;
  /** Share of target syllables heard right, 0..1. */
  score: number;
}

const toneless = (text: string) => pinyin(text, { toneType: "none", type: "array", v: false });
// Two-letter initials first so "zh" is not read as "z" + "h...".
const INITIALS = [
  "zh",
  "ch",
  "sh",
  "b",
  "p",
  "m",
  "f",
  "d",
  "t",
  "n",
  "l",
  "g",
  "k",
  "h",
  "j",
  "q",
  "x",
  "r",
  "z",
  "c",
  "s",
  "y",
  "w",
];
const initialOf = (syl: string) => INITIALS.find((i) => syl.startsWith(i)) ?? "";

/** Pairs Vietnamese speakers commonly mix up, keyed "target>heard" on initials or finals. */
const HINTS: Record<string, string> = {
  "zh>z": "“zh” cần uốn lưỡi lên vòm miệng, đừng đọc thẳng lưỡi như “z”.",
  "ch>c": "“ch” cần uốn lưỡi và bật hơi, đừng đọc thẳng lưỡi như “c”.",
  "sh>s": "“sh” cần uốn lưỡi, đọc gần giống “s” nặng của miền Bắc nhưng cong lưỡi hơn.",
  "z>zh": "“z” đọc thẳng lưỡi, đầu lưỡi chạm sau răng, không uốn.",
  "c>ch": "“c” đọc thẳng lưỡi và bật hơi mạnh, không uốn.",
  "s>sh": "“s” đọc thẳng lưỡi như chữ “x” tiếng Việt, không uốn.",
  "x>s": "“x” đọc với mặt lưỡi áp vòm miệng, môi dẹt, nghe mềm hơn “s”.",
  "x>sh": "“x” không uốn lưỡi; đặt mặt lưỡi phẳng sát vòm miệng.",
  "q>ch": "“q” giống “x” nhưng bật hơi, không uốn lưỡi.",
  "j>zh": "“j” đọc mặt lưỡi phẳng, không uốn, nghe gần “ch” tiếng Việt.",
  "r>l": "“r” cần uốn lưỡi và rung nhẹ, đừng đọc thành “l”.",
  "r>y": "“r” cần uốn lưỡi, đừng đọc thành “d” kiểu miền Nam.",
  "n>l": "“n” cần cho hơi ra đường mũi, đừng nhầm với “l”.",
  "l>n": "“l” cho hơi ra hai bên lưỡi, đừng nhầm với “n”.",
  "p>b": "“p” cần bật hơi mạnh, đặt tay trước miệng phải thấy hơi.",
  "t>d": "“t” cần bật hơi mạnh như “th” tiếng Việt.",
  "k>g": "“k” cần bật hơi mạnh như “kh” nhẹ.",
  "f>h": "“f” là răng trên chạm môi dưới, như “ph” tiếng Việt.",
  "ü>u": "“ü” tròn môi như “u” nhưng lưỡi đặt như “i”, nghe gần “uy”.",
  "ing>in": "Vần “-ing” kết thúc bằng âm mũi sau, giống “-inh” tiếng Việt.",
  "in>ing": "Vần “-in” kết thúc ở đầu lưỡi, giống “-in” tiếng Việt, không phải “-inh”.",
  "eng>en": "Vần “-eng” kết thúc bằng âm mũi sau, giống “-âng”.",
  "en>eng": "Vần “-en” kết thúc ở đầu lưỡi, giống “-ân”.",
  "ang>an": "Vần “-ang” kết thúc bằng âm mũi sau.",
  "an>ang": "Vần “-an” kết thúc ở đầu lưỡi.",
  "e>o": "“e” đọc gần như “ưa” trong tiếng Việt, môi không tròn.",
  "e>a": "“e” đọc gần như “ưa”, đừng mở miệng thành “a”.",
};

function hintFor(target: string, heard: string): string | undefined {
  const ti = initialOf(target);
  const hi = initialOf(heard);
  if (ti !== hi) return HINTS[`${ti}>${hi}`];
  const tf = target.slice(ti.length);
  const hf = heard.slice(hi.length);
  if (HINTS[`${tf}>${hf}`]) return HINTS[`${tf}>${hf}`];
  // Compare only the nasal ending, e.g. "ying" vs "yin", "zheng" vs "zhen".
  for (const [a, b] of [
    ["ing", "in"],
    ["in", "ing"],
    ["eng", "en"],
    ["en", "eng"],
    ["ang", "an"],
    ["an", "ang"],
  ]) {
    if (tf.endsWith(a) && hf.endsWith(b) && tf.slice(0, -a.length) === hf.slice(0, -b.length))
      return HINTS[`${a}>${b}`];
  }
  return undefined;
}

/** Scores one transcript against the target; lower mismatch count is better. */
function compareOne(target: string[], heardText: string): { checks: SyllableCheck[]; misses: number } | null {
  const heard = toneless(heardText);
  if (heard.length < target.length) return null;
  // Slide a window over what was heard: recognisers often add a word before or after.
  let best: { checks: SyllableCheck[]; misses: number } | null = null;
  for (let start = 0; start + target.length <= heard.length; start++) {
    const checks = target.map((t, i) => {
      const h = heard[start + i];
      return { target: t, heard: h, ok: t === h, hint: t === h ? undefined : hintFor(t, h) };
    });
    const misses = checks.filter((c) => !c.ok).length;
    if (!best || misses < best.misses) best = { checks, misses };
  }
  return best;
}

export function checkPronunciation(targetHanzi: string, alternatives: string[]): PronunciationResult {
  const han = (s: string) => [...s].filter((c) => /\p{Script=Han}/u.test(c)).join("");
  const targetText = han(targetHanzi);
  const target = toneless(targetText);
  const transcripts = alternatives.map(han).filter(Boolean);

  const exact = transcripts.find((t) => t.includes(targetText));
  if (exact !== undefined) {
    return {
      status: "match",
      heardText: exact,
      syllables: target.map((t) => ({ target: t, heard: t, ok: true })),
      score: 1,
    };
  }

  let best: { checks: SyllableCheck[]; misses: number; text: string } | null = null;
  for (const text of transcripts) {
    const r = compareOne(target, text);
    if (r && (!best || r.misses < best.misses)) best = { ...r, text };
  }
  if (!best) {
    // Nothing lined up (the recogniser dropped syllables): give partial credit for target syllables heard anywhere.
    const heard = transcripts.map((t) => new Set(toneless(t)));
    const found = Math.max(0, ...heard.map((set) => target.filter((t) => set.has(t)).length));
    return {
      status: "unclear",
      heardText: transcripts[0] ?? "",
      syllables: target.map((t) => ({ target: t, heard: null, ok: false })),
      score: target.length ? (0.8 * found) / target.length : 0,
    };
  }
  // Homophones (same toneless pinyin, different characters) count as a match for pronunciation.
  return {
    status: best.misses === 0 ? "match" : "close",
    heardText: best.text,
    syllables: best.checks,
    score: (target.length - best.misses) / target.length,
  };
}
