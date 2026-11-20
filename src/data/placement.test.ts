import { describe, expect, it } from "vitest";
import { placementPool, POOL_SIZE } from "./placement";
import { fromPinyin } from "../lib/speech/sandhi";

describe("placementPool", () => {
  const pool = placementPool();

  it("has a full pool for every level", () => {
    expect(Object.keys(pool)).toEqual(["1", "2", "3", "4", "5", "6"]);
    for (const list of Object.values(pool)) {
      expect(list).toHaveLength(POOL_SIZE);
      expect(new Set(list.map((s) => s.hanzi)).size).toBe(POOL_SIZE);
    }
  });

  it("gets longer with each level", () => {
    const avg = (l: string) => pool[l].reduce((n, s) => n + fromPinyin(s.hanzi, s.pinyin).length, 0) / POOL_SIZE;
    for (let l = 2; l <= 6; l++) expect(avg(String(l))).toBeGreaterThan(avg(String(l - 1)));
  });
});
