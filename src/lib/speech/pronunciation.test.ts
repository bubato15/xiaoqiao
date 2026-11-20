import { describe, expect, it } from "vitest";
import { checkPronunciation } from "./pronunciation";

describe("checkPronunciation", () => {
  it("accepts an exact transcript, also inside a longer sentence", () => {
    expect(checkPronunciation("水果", ["水果"]).status).toBe("match");
    expect(checkPronunciation("水果", ["我买水果"]).status).toBe("match");
  });

  it("treats homophones as correct pronunciation", () => {
    // 睡过 shuì guò has the same toneless pinyin as 水果 shuǐ guǒ.
    const r = checkPronunciation("水果", ["睡过"]);
    expect(r.status).toBe("match");
    expect(r.syllables.every((s) => s.ok)).toBe(true);
  });

  it("flags a flat-tongue initial with a Vietnamese hint", () => {
    const r = checkPronunciation("水果", ["虽果"]);
    expect(r.status).toBe("close");
    expect(r.syllables[0]).toMatchObject({ target: "shui", heard: "sui", ok: false });
    expect(r.syllables[0].hint).toContain("uốn lưỡi");
    expect(r.syllables[1].ok).toBe(true);
  });

  it("detects -ing read as -in", () => {
    const r = checkPronunciation("星期", ["新期"]);
    expect(r.syllables[0]).toMatchObject({ target: "xing", heard: "xin", ok: false });
    expect(r.syllables[0].hint).toContain("-ing");
  });

  it("picks the alternative with the fewest mismatches", () => {
    const r = checkPronunciation("中国", ["宗过", "中过"]);
    expect(r.heardText).toBe("中过");
    expect(r.status).toBe("match");
  });

  it("reports unclear when nothing usable was heard", () => {
    expect(checkPronunciation("水果", []).status).toBe("unclear");
    expect(checkPronunciation("水果", ["好"]).status).toBe("unclear");
  });
});
