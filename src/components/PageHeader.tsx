import type { ReactNode } from "react";
import { Panda } from "./Panda";

/** Page opening: eyebrow, big serif title, lead text, a faint watermark glyph and a vertical caption. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  glyph,
  vertical,
}: {
  eyebrow: string;
  title: string;
  lead: ReactNode;
  glyph: string;
  vertical: string;
}) {
  return (
    <header className="relative isolate grid items-center gap-6 pb-4 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
      <span lang="zh-CN" aria-hidden className="watermark -top-6 right-24 text-[9rem] sm:-top-10 sm:text-[13rem]">
        {glyph}
      </span>
      <div className="max-w-2xl">
        <p className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-peach px-3 py-1 text-sm font-semibold">
          {eyebrow}
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight font-bold sm:text-5xl">{title}</h1>
        <div className="mt-5 leading-relaxed text-ink-soft">{lead}</div>
      </div>
      <Panda mood="wave" size={120} className="hidden sm:block" />
      <p
        lang="zh-CN"
        aria-hidden
        className="vertical han-cute hidden self-start rounded-full border-2 border-seal px-1 py-3 text-lg text-seal sm:block"
      >
        {vertical}
      </p>
    </header>
  );
}
