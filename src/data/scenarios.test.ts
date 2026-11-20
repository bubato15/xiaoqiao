import { describe, expect, it } from "vitest";
import { SCENARIOS, SCENARIO_GROUPS } from "./scenarios";

describe("scenarios", () => {
  it("has unique ids", () => {
    expect(new Set(SCENARIOS.map((s) => s.id)).size).toBe(SCENARIOS.length);
  });

  it("uses known groups and levels, with every field filled", () => {
    const groups = new Set(SCENARIO_GROUPS.map((g) => g.id));
    for (const s of SCENARIOS) {
      expect(groups.has(s.group), s.id).toBe(true);
      expect(s.minLevel, s.id).toBeGreaterThanOrEqual(1);
      expect(s.minLevel, s.id).toBeLessThanOrEqual(6);
      for (const v of [s.title, s.role, s.goal, s.hanzi]) expect(v.trim(), s.id).not.toBe("");
    }
  });

  it("tells the learner which job they play in every career role-play", () => {
    for (const s of SCENARIOS) expect(Boolean(s.learner?.trim()), s.id).toBe(s.group === "career");
  });

  it("gives beginners enough to practise", () => {
    expect(SCENARIOS.filter((s) => s.minLevel === 1).length).toBeGreaterThanOrEqual(8);
    for (const g of SCENARIO_GROUPS) {
      expect(SCENARIOS.some((s) => s.group === g.id && s.minLevel === 1), g.id).toBe(true);
    }
  });
});
