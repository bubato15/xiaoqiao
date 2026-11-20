import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { LEVELS, LEVEL_INFO, levelWordCount } from "@/data/hsk";
import { LessonProgress } from "./LessonProgress";

export const metadata: Metadata = { title: "Bài học HSK · Luyện nói cùng XiaoQiao" };

export default function HskPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="Bài học HSK"
        title="Từng từ, từng thanh"
        glyph="学"
        vertical="汉语水平"
        lead="Sáu cấp HSK, mỗi bài khoảng mười từ theo một chủ đề. Mỗi từ có pinyin, nghĩa tiếng Việt và âm Hán Việt để bạn dễ nhớ. Bạn nghe mẫu, đọc theo, và XiaoQiao chấm thanh cho từng tiếng."
      />

      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(LEVEL_INFO).map(([level, info]) => {
          const lessons = LEVELS[level];
          const body = (
            <>
              <span className="flex items-start justify-between gap-3">
                <span className="seal h-14 w-14 font-serif text-2xl font-bold tabular-nums">{level}</span>
                <span lang="zh-CN" aria-hidden className="han-cute text-4xl text-ink-soft/60">
                  {info.numeral}
                </span>
              </span>
              <span className="mt-4 block font-serif text-2xl font-bold">HSK {level}</span>
              <span className="mt-1 block text-sm leading-relaxed text-ink-soft">{info.goal}</span>
              <span className="mt-4 flex items-center justify-between border-t border-rule pt-3 text-sm">
                {lessons ? (
                  <>
                    <span>
                      {levelWordCount(lessons)} từ · {lessons.length} bài
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="sr-only">Đã thuộc</span>
                      <LessonProgress level={level} hanzi={lessons.flatMap((l) => l.words.map((w) => w.hanzi))} />
                    </span>
                  </>
                ) : (
                  <span className="text-ink-soft">Sắp có</span>
                )}
              </span>
            </>
          );
          return (
            <li key={level}>
              {lessons ? (
                <Link
                  href={`/hsk/${level}`}
                  className="block h-full rounded-3xl border-2 border-ink bg-paper p-5 shadow-[0_3px_0_var(--ink)] transition-transform hover:-translate-y-1 hover:bg-mint/50"
                >
                  {body}
                </Link>
              ) : (
                <div className="block h-full rounded-3xl border-2 border-dashed border-rule bg-paper p-5">{body}</div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
