import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LEVELS, REVIEWED, findLesson } from "@/data/hsk";
import { SENTENCES } from "@/data/sentences";
import { LessonPlayer } from "./LessonPlayer";

export function generateStaticParams() {
  return Object.entries(LEVELS).flatMap(([level, lessons]) => lessons.map((l) => ({ level, lesson: String(l.id) })));
}

export async function generateMetadata({ params }: PageProps<"/hsk/[level]/[lesson]">): Promise<Metadata> {
  const { level, lesson } = await params;
  const found = findLesson(level, lesson);
  return { title: found ? `HSK ${level} · Bài ${found.id}: ${found.title} · XiaoQiao` : "Không tìm thấy bài" };
}

export default async function LessonPage({ params }: PageProps<"/hsk/[level]/[lesson]">) {
  const { level, lesson } = await params;
  const found = findLesson(level, lesson);
  if (!found) notFound();

  const lessons = LEVELS[level];
  const next = lessons.find((l) => l.id === found.id + 1);

  return (
    <div className="space-y-8">
      <nav aria-label="Vị trí" className="text-sm text-ink-soft">
        <Link href="/hsk" className="underline decoration-rule underline-offset-4 hover:decoration-ink">
          Bài học HSK
        </Link>{" "}
        /{" "}
        <Link href={`/hsk/${level}`} className="underline decoration-rule underline-offset-4 hover:decoration-ink">
          HSK {level}
        </Link>{" "}
        / Bài {found.id}
      </nav>
      <header>
        <h1 className="font-serif text-3xl font-bold sm:text-4xl">
          <span className="text-seal">Bài {found.id}.</span> {found.title}
        </h1>
      </header>

      <LessonPlayer level={level} words={found.words} sentences={SENTENCES[level]?.[found.id] ?? []} />

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6 text-sm">
        {!REVIEWED[level] && (
          <p className="max-w-md text-xs text-ink-soft">
            Nghĩa tiếng Việt và âm Hán Việt đang được duyệt lại. Pinyin đối chiếu với CC-CEDICT.
          </p>
        )}
        {next && (
          <Link href={`/hsk/${level}/${next.id}`} className="border-b-2 border-seal pb-1 font-medium hover:text-seal">
            Bài {next.id}: {next.title} <span aria-hidden>→</span>
          </Link>
        )}
      </footer>
    </div>
  );
}
