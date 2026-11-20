import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LEVELS, LEVEL_INFO, levelWordCount, type Lesson } from "@/data/hsk";
import { LessonProgress } from "../LessonProgress";

export function generateStaticParams() {
  return Object.keys(LEVELS).map((level) => ({ level }));
}

export async function generateMetadata({ params }: PageProps<"/hsk/[level]">): Promise<Metadata> {
  const { level } = await params;
  return { title: LEVELS[level] ? `HSK ${level} · Luyện nói cùng XiaoQiao` : "Không tìm thấy cấp HSK" };
}

/** Consecutive lessons sharing a topic; levels without topics come back as one untitled group. */
function groupByTopic(lessons: Lesson[]) {
  const groups: { topic?: string; lessons: Lesson[] }[] = [];
  for (const l of lessons) {
    const last = groups.at(-1);
    if (last && last.topic === l.topic) last.lessons.push(l);
    else groups.push({ topic: l.topic, lessons: [l] });
  }
  return groups;
}

export default async function LevelPage({ params }: PageProps<"/hsk/[level]">) {
  const { level } = await params;
  const lessons = LEVELS[level];
  if (!lessons) notFound();
  const groups = groupByTopic(lessons);
  const titled = groups.length > 1;

  return (
    <div className="space-y-10">
      <nav aria-label="Vị trí" className="text-sm text-ink-soft">
        <Link href="/hsk" className="underline decoration-rule underline-offset-4 hover:decoration-ink">
          Bài học HSK
        </Link>{" "}
        / HSK {level}
      </nav>

      <header className="relative isolate">
        <span lang="zh-CN" aria-hidden className="watermark -top-8 right-4 text-[8rem] sm:text-[11rem]">
          {LEVEL_INFO[level]?.numeral}
        </span>
        <h1 className="font-serif text-4xl font-bold sm:text-5xl">HSK {level}</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
          {LEVEL_INFO[level]?.goal} {levelWordCount(lessons)} từ chia thành {lessons.length} bài
          {titled ? ` theo ${groups.length} chủ đề` : ""}.
        </p>
      </header>

      {titled && (
        <nav aria-label="Chủ đề">
          <ul className="flex flex-wrap gap-2">
            {groups.map((g, i) => (
              <li key={i}>
                <a href={`#chu-de-${i + 1}`} className="chip inline-block px-3 py-1.5 text-sm">
                  {g.topic} <span className="text-ink-soft tabular-nums">· {g.lessons.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {groups.map((g, i) => (
        <section key={i} id={`chu-de-${i + 1}`} className="scroll-mt-24">
          {titled && (
            <h2 className="rule-double mb-4 flex items-baseline justify-between gap-4 font-serif text-2xl font-bold">
              <span>{g.topic}</span>
              <span className="shrink-0 text-sm font-normal text-ink-soft">{levelWordCount(g.lessons)} từ</span>
            </h2>
          )}
          <ol className="grid gap-3 sm:grid-cols-2">
            {g.lessons.map((l) => (
              <li key={l.id}>
                <Link
                  href={`/hsk/${level}/${l.id}`}
                  className="grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-3 rounded-3xl border-2 border-ink bg-paper p-4 shadow-[0_3px_0_var(--ink)] transition-transform hover:-translate-y-1 hover:bg-mint/50"
                >
                  <span className="seal h-11 w-11 font-serif text-lg font-bold tabular-nums">{l.id}</span>
                  <span>
                    <span className="font-serif text-lg font-bold">{l.title}</span>
                    <span lang="zh-CN" className="han mt-1 block truncate text-sm text-ink-soft">
                      {l.words.map((w) => w.hanzi).join(" ")}
                    </span>
                  </span>
                  <LessonProgress level={level} hanzi={l.words.map((w) => w.hanzi)} />
                </Link>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
