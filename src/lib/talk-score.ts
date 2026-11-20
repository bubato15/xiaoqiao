/** A conversation needs this many learner turns before it can be scored. */
export const MIN_SCORED_TURNS = 3;

/** Rubric parts, each 0 to 100. The total is computed here, not by the model, so the weights stay fixed. */
export const SCORE_PARTS = [
  { key: "task", label: "Hoàn thành nhiệm vụ", weight: 0.4 },
  { key: "accuracy", label: "Ngữ pháp và dùng từ", weight: 0.35 },
  { key: "expression", label: "Diễn đạt tự nhiên", weight: 0.25 },
] as const;

export type ScorePart = (typeof SCORE_PARTS)[number]["key"];

export interface Phrase {
  hanzi: string;
  pinyin: string;
  vi: string;
}

export interface TalkScore {
  total: number;
  parts: Record<ScorePart, number>;
  summary: string;
  strengths: string[];
  improve: string[];
  phrases: Phrase[];
}

const clamp = (n: unknown) =>
  typeof n === "number" && Number.isFinite(n) ? Math.round(Math.min(100, Math.max(0, n))) : null;
const texts = (x: unknown, max: number) =>
  (Array.isArray(x) ? x : []).filter((s): s is string => typeof s === "string" && s.trim() !== "").slice(0, max);

/** Turns the model's JSON into a score, or null when a rubric part is missing. */
export function parseScore(raw: unknown): TalkScore | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;
  const parts = {} as Record<ScorePart, number>;
  for (const { key } of SCORE_PARTS) {
    const v = clamp(r[key]);
    if (v === null) return null;
    parts[key] = v;
  }
  const phrases = (Array.isArray(r.phrases) ? r.phrases : [])
    .filter(
      (p): p is Phrase =>
        typeof p === "object" && p !== null && ["hanzi", "pinyin", "vi"].every((k) => typeof p[k] === "string" && p[k]),
    )
    .slice(0, 3);
  return {
    total: Math.round(SCORE_PARTS.reduce((sum, { key, weight }) => sum + parts[key] * weight, 0)),
    parts,
    summary: typeof r.summary_vi === "string" ? r.summary_vi : "",
    strengths: texts(r.strengths_vi, 3),
    improve: texts(r.improve_vi, 3),
    phrases,
  };
}
