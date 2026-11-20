import { describe, expect, it } from "vitest";
import { parseScore } from "./talk-score";

const base = { task: 80, accuracy: 60, expression: 40, summary_vi: "Tốt", strengths_vi: ["a"], improve_vi: ["b"] };

describe("parseScore", () => {
  it("weights the parts itself instead of trusting a total from the model", () => {
    expect(parseScore({ ...base, total: 100 })?.total).toBe(Math.round(80 * 0.4 + 60 * 0.35 + 40 * 0.25));
  });

  it("rejects answers that miss a rubric part", () => {
    expect(parseScore({ task: 80, accuracy: 60 })).toBeNull();
    expect(parseScore({ ...base, expression: "70" })).toBeNull();
    expect(parseScore(null)).toBeNull();
  });

  it("clamps out of range numbers", () => {
    expect(parseScore({ ...base, task: 140, accuracy: -5 })?.parts).toEqual({ task: 100, accuracy: 0, expression: 40 });
  });

  it("keeps only complete phrases and at most three of each list", () => {
    const s = parseScore({
      ...base,
      strengths_vi: ["1", "2", "3", "4", ""],
      phrases: [{ hanzi: "你好", pinyin: "nǐ hǎo", vi: "Xin chào" }, { hanzi: "谢谢" }, "x"],
    });
    expect(s?.strengths).toEqual(["1", "2", "3"]);
    expect(s?.phrases).toEqual([{ hanzi: "你好", pinyin: "nǐ hǎo", vi: "Xin chào" }]);
  });
});
