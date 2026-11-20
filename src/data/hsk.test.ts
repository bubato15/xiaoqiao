import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { HSK1 } from "./hsk1";
import { HSK2 } from "./hsk2";
import { HSK3 } from "./hsk3";
import { HSK4 } from "./hsk4";
import { HSK5 } from "./hsk5";
import { HSK6 } from "./hsk6";

interface SourceEntry {
  simplified: string;
  forms: { transcriptions: { numeric: string } }[];
}

/** Source readings that are malformed or not the mainland standard (下载 xiàzài); we store the corrected form. */
const SOURCE_FIXES: Record<string, string> = { 致力于: "zhi4 li4 yu2", 纽扣儿: "niu3 kou4 r5", 下载: "xia4 zai4" };

const norm = (p: string) => p.toLowerCase().replace(/u:/g, "ü").replace(/v/g, "ü");

describe.each([
  { level: 1, lessons: HSK1 },
  { level: 2, lessons: HSK2 },
  { level: 3, lessons: HSK3 },
  { level: 4, lessons: HSK4 },
  { level: 5, lessons: HSK5 },
  { level: 6, lessons: HSK6 },
])("HSK$level lesson data", ({ level, lessons }) => {
  const source: SourceEntry[] = JSON.parse(readFileSync(`data/hsk/old-${level}.json`, "utf8"));
  const words = lessons.flatMap((l) => l.words);

  it("covers every source word exactly once", () => {
    const ours = words.map((w) => w.hanzi).sort();
    expect(new Set(ours).size).toBe(ours.length);
    expect(ours).toEqual(source.map((s) => s.simplified).sort());
  });

  it("uses a pinyin reading listed in the source for each word", () => {
    const mismatches = words.flatMap((w) => {
      const entry = source.find((s) => s.simplified === w.hanzi);
      const readings = entry?.forms.map((f) => norm(f.transcriptions.numeric)) ?? [];
      if (SOURCE_FIXES[w.hanzi]) readings.push(SOURCE_FIXES[w.hanzi]);
      return readings.includes(norm(w.pinyin)) ? [] : [`${w.hanzi}: ${w.pinyin} not in ${readings.join(" / ")}`];
    });
    expect(mismatches).toEqual([]);
  });

  it("numbers lessons 1..n in order", () => {
    expect(lessons.map((l) => l.id)).toEqual(lessons.map((_, i) => i + 1));
  });
});
