import type { Syllable } from "@/lib/speech/sandhi";
import { toneColor } from "./ToneCurve";

const SIZES = {
  lg: { pinyin: "text-xl", hanzi: "text-7xl sm:text-8xl" },
  md: { pinyin: "text-base", hanzi: "text-5xl" },
  sm: { pinyin: "text-sm", hanzi: "text-3xl sm:text-4xl" },
};

/** Hanzi with tone-coloured pinyin above each character, plus a note for syllables whose tone changes by sandhi. */
export function WordFace({ syllables, size = "lg" }: { syllables: Syllable[]; size?: keyof typeof SIZES }) {
  const changed = syllables.filter((s) => s.surface !== s.citation && s.surface !== 0);
  return (
    <div className="text-center">
      <div className="flex flex-wrap justify-center gap-x-1 gap-y-3">
        {syllables.map((s, i) => (
          <div key={i}>
            <div className={`pinyin ${SIZES[size].pinyin}`} style={{ color: toneColor(s.citation) }}>
              {s.marked}
            </div>
            <div lang="zh-CN" className={`han leading-none ${SIZES[size].hanzi}`}>
              {s.hanzi}
            </div>
          </div>
        ))}
      </div>
      {changed.length > 0 && (
        <p className="mx-auto mt-3 max-w-72 text-xs text-ink-soft">
          Khi nói:{" "}
          {changed.map((s, i) => (
            <span key={i}>
              {i > 0 && ", "}
              <span lang="zh-CN" className="han text-ink">
                {s.hanzi}
              </span>{" "}
              đổi sang thanh <b style={{ color: toneColor(s.surface) }}>{s.surface}</b>
            </span>
          ))}{" "}
          theo quy tắc biến điệu.
        </p>
      )}
    </div>
  );
}
