import { describe, expect, it } from "vitest";
import { fromPinyin } from "../lib/speech/sandhi";
import { FACTORY_TOPIC, PRACTICE_TOPICS } from "./practice";

const REQUIRED_39_WORDS = [
  "公司", "部门", "生产部", "仓库部", "人事部", "财务部", "技术部", "经理", "总经理",
  "主管", "生产主管", "班长", "员工", "实习生", "生产", "计划", "检查", "操作", "维修",
  "测试", "管理", "质检", "提高效率", "机器", "生产线", "设备", "流水线", "配件",
  "零件", "模具", "工作时间", "加班", "工资", "奖金", "任务", "原材料", "安全", "卫生",
  "销售部",
];

describe("practice topics", () => {
  it("includes all 39 factory words requested by the user", () => {
    const factoryHanzi = new Set(FACTORY_TOPIC.words.map((w) => w.hanzi));
    for (const word of REQUIRED_39_WORDS) {
      expect(factoryHanzi.has(word), `Missing word: ${word}`).toBe(true);
    }
    expect(FACTORY_TOPIC.words.length).toBe(39);
  });

  it("has valid pinyin matching syllable counts for every practice word", () => {
    for (const topic of PRACTICE_TOPICS) {
      for (const w of topic.words) {
        const hanziCount = [...w.hanzi].filter((c) => /\p{Script=Han}/u.test(c)).length;
        const pinyinParts = w.pinyin.trim().split(/\s+/);
        expect(pinyinParts.length, `Length mismatch in word: ${w.hanzi}`).toBe(hanziCount);
        expect(() => fromPinyin(w.hanzi, w.pinyin)).not.toThrow();
      }
    }
  });

  it("has valid pinyin and syllables for every practice reflex sentence", () => {
    for (const topic of PRACTICE_TOPICS) {
      expect(topic.sentences.length).toBeGreaterThanOrEqual(10);
      for (const s of topic.sentences) {
        const hanziCount = [...s.hanzi].filter((c) => /\p{Script=Han}/u.test(c)).length;
        const pinyinParts = s.pinyin.trim().split(/\s+/);
        expect(pinyinParts.length, `Length mismatch in sentence: ${s.hanzi}`).toBe(hanziCount);
        expect(() => fromPinyin(s.hanzi, s.pinyin)).not.toThrow();
        expect(s.vi.trim().length).toBeGreaterThan(0);
        expect(s.keywords.length).toBeGreaterThan(0);
      }
    }
  });
});
