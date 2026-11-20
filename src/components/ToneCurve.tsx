import type { Tone } from "@/lib/speech/sandhi";

/** Chao pitch levels (1 low, 5 high) for each tone. */
const SHAPES: Record<Tone, number[]> = {
  0: [3, 3],
  1: [5, 5],
  2: [3, 5],
  3: [2, 1, 4],
  4: [5, 1],
};

export const toneColor = (tone: Tone) => `var(--tone-${tone})`;

/** The tone's pitch shape drawn as a brush stroke: a faint bleed underneath, a textured line on top. */
export function ToneCurve({ tone, size = 48, axis = true }: { tone: Tone; size?: number; axis?: boolean }) {
  const pts = SHAPES[tone];
  const y = (level: number) => 5 + ((5 - level) / 4) * 30;
  const x = (i: number) => 7 + (i / (pts.length - 1)) * 34;
  const d = pts
    .map((l, i) =>
      i === 0 ? `M${x(i)} ${y(l)}` : `Q${x(i - 0.5)} ${y(pts[i - 1] + (l - pts[i - 1]) * 0.15)} ${x(i)} ${y(l)}`,
    )
    .join(" ");
  return (
    <svg viewBox="0 0 48 40" width={size} height={(size * 40) / 48} aria-hidden>
      {axis && <path d="M2 4V36" stroke="var(--rule)" strokeWidth="1" />}
      <path d={d} fill="none" stroke={toneColor(tone)} strokeOpacity="0.18" strokeWidth="8" strokeLinecap="round" />
      <path
        d={d}
        fill="none"
        stroke={toneColor(tone)}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#xq-brush)"
      />
    </svg>
  );
}
