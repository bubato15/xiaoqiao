import { isErhua, type Analysis } from "@/lib/speech/analyze";
import { toSemitones } from "@/lib/speech/pitch";
import { toneColor } from "./ToneCurve";

const W = 640;
const H = 200;
const RANGE = 9; // semitones shown above and below the speaker mid

/** Learner's pitch over time; each syllable span is tinted with the tone it should have. */
export function PitchChart({ analysis }: { analysis: Analysis }) {
  const { frames, refHz, syllables } = analysis;
  if (frames.length === 0) return null;

  // Show only the spoken part plus a short margin, not the silence around it.
  const voiced = frames.flatMap((f, i) => (f.hz ? [i] : []));
  const from = Math.max(0, (voiced[0] ?? 0) - 10);
  const to = Math.min(frames.length - 1, (voiced.at(-1) ?? frames.length - 1) + 10);
  const x = (i: number) => ((i - from) / Math.max(1, to - from)) * W;
  const y = (st: number) => H / 2 - (Math.max(-RANGE, Math.min(RANGE, st)) / RANGE) * (H / 2 - 12);

  let d = "";
  frames.forEach((f, i) => {
    if (!f.hz) return;
    const cmd = frames[i - 1]?.hz ? "L" : "M";
    d += `${cmd}${x(i).toFixed(1)} ${y(toSemitones(f.hz, refHz)).toFixed(1)}`;
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Đường cao độ giọng nói">
      {[-6, 0, 6].map((st) => (
        <line
          key={st}
          x1={0}
          x2={W}
          y1={y(st)}
          y2={y(st)}
          stroke="var(--rule)"
          strokeDasharray={st ? "2 4" : undefined}
        />
      ))}
      {syllables.map(({ span, syllable }, i) =>
        // An erhua 儿 shares the previous syllable's span, so it is labelled there (会儿) instead.
        span && !isErhua(syllable, i) ? (
          <g key={i}>
            <rect
              x={x(span[0])}
              width={x(span[1]) - x(span[0])}
              y={0}
              height={H}
              fill={toneColor(syllable.surface)}
              opacity={0.1}
            />
            <text
              x={x(span[0]) + 6}
              y={20}
              lang="zh-CN"
              className="han"
              fontSize={18}
              fill={toneColor(syllable.surface)}
            >
              {syllable.hanzi}
              {syllables[i + 1] && isErhua(syllables[i + 1].syllable, i + 1) ? "儿" : ""}
            </text>
          </g>
        ) : null,
      )}
      <path d={d} fill="none" stroke="var(--ink)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
