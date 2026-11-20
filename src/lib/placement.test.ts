import { describe, expect, it } from "vitest";
import { estimateLevel, type LevelReading } from "./placement";

const read = (...scores: number[]): LevelReading[] => scores.map((score) => ({ score, aided: false }));

describe("estimateLevel", () => {
  it("is 0 when HSK 1 is not passed", () => {
    expect(estimateLevel(read(50, 30)).level).toBe(0);
    expect(estimateLevel([]).level).toBe(0);
  });

  it("stops at the last passed level", () => {
    expect(estimateLevel(read(95, 90, 85, 60, 40, 20))).toEqual({ level: 3, close: true });
    expect(estimateLevel(read(95, 90, 85, 30, 0, 0))).toEqual({ level: 3, close: false });
  });

  it("forgives one weak sentence lower down", () => {
    expect(estimateLevel(read(95, 90, 50, 80, 40, 0)).level).toBe(4);
  });

  it("counts skipped levels as zero", () => {
    expect(estimateLevel([...read(90, 90), null, ...read(90)]).level).toBe(2);
  });

  it("discounts aided readings", () => {
    expect(estimateLevel([{ score: 72, aided: false }]).level).toBe(1);
    expect(estimateLevel([{ score: 72, aided: true }]).level).toBe(0);
  });

  it("reaches HSK 6", () => {
    expect(estimateLevel(read(90, 90, 90, 90, 90, 90))).toEqual({ level: 6, close: false });
  });
});
