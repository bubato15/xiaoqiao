import { HSK1, HSK1_REVIEWED, type Lesson } from "./hsk1";
import { HSK2, HSK2_REVIEWED } from "./hsk2";
import { HSK3, HSK3_REVIEWED } from "./hsk3";
import { HSK4, HSK4_REVIEWED } from "./hsk4";
import { HSK5, HSK5_REVIEWED } from "./hsk5";
import { HSK6, HSK6_REVIEWED } from "./hsk6";

export type { Lesson, Word } from "./hsk1";

/** Levels with lesson content; the others are announced as coming soon. */
export const LEVELS: Record<string, Lesson[]> = { "1": HSK1, "2": HSK2, "3": HSK3, "4": HSK4, "5": HSK5, "6": HSK6 };

/** Whether a reviewer has checked the Vietnamese meanings and Hán Việt readings of a level. */
export const REVIEWED: Record<string, boolean> = {
  "1": HSK1_REVIEWED,
  "2": HSK2_REVIEWED,
  "3": HSK3_REVIEWED,
  "4": HSK4_REVIEWED,
  "5": HSK5_REVIEWED,
  "6": HSK6_REVIEWED,
};

/** Display info per level: Chinese numeral and a one-line goal in Vietnamese. */
export const LEVEL_INFO: Record<string, { numeral: string; goal: string }> = {
  "1": { numeral: "一", goal: "Chào hỏi, giới thiệu bản thân, hỏi giờ và mua đồ đơn giản." },
  "2": { numeral: "二", goal: "Nói câu ngắn về sinh hoạt hằng ngày, thời tiết, sức khỏe." },
  "3": { numeral: "三", goal: "Giao tiếp cơ bản khi học tập, làm việc và đi du lịch." },
  "4": { numeral: "四", goal: "Trò chuyện khá trôi chảy về nhiều chủ đề quen thuộc." },
  "5": { numeral: "五", goal: "Bàn luận, kể chuyện, nêu ý kiến về xã hội và công việc." },
  "6": { numeral: "六", goal: "Diễn đạt tự nhiên như người bản ngữ, dùng cả thành ngữ." },
};

export const levelWordCount = (lessons: Lesson[]) => lessons.reduce((n, l) => n + l.words.length, 0);

export function findLesson(level: string, id: string): Lesson | undefined {
  return LEVELS[level]?.find((l) => String(l.id) === id);
}
