"use client";

import { useState } from "react";
import { syllabify } from "@/lib/speech/sandhi";
import { LAB_WORDS } from "@/lib/lab-words";
import { Calibration } from "@/components/Calibration";
import { SpeakPractice, type PracticeResult } from "@/components/SpeakPractice";
import { toneColor } from "@/components/ToneCurve";
import { WordFace } from "@/components/WordFace";

interface LogRow {
  word: string;
  expected: number[];
  detected: (number | null)[];
}

export function ToneLab() {
  const [wordIndex, setWordIndex] = useState(4);
  const [log, setLog] = useState<LogRow[]>([]);
  const word = LAB_WORDS[wordIndex];
  const syllables = syllabify(word.text, word.neutral);

  const onResult = ({ analysis }: PracticeResult) =>
    setLog((rows) => [
      ...rows,
      {
        word: word.text,
        expected: syllables.map((s) => s.surface),
        detected: analysis.syllables.map((s) => s.guess?.tone ?? null),
      },
    ]);

  return (
    <div className="space-y-10">
      <Calibration />

      <div>
        <h3 className="font-serif text-lg">Đọc từ</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {LAB_WORDS.map((w, i) => (
            <button
              key={w.text}
              aria-pressed={i === wordIndex}
              aria-label={`${w.text}, ${w.vi}`}
              onClick={() => setWordIndex(i)}
              lang="zh-CN"
              className={`han min-h-11 min-w-11 border px-3 text-lg ${i === wordIndex ? "border-ink bg-ink text-paper" : "border-rule hover:border-ink"}`}
            >
              {w.text}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
          <div>
            <WordFace syllables={syllables} size="md" />
            <p className="mt-2 text-center text-sm text-ink-soft">{word.vi}</p>
          </div>
          <SpeakPractice text={word.text} syllables={syllables} onResult={onResult} />
        </div>
      </div>

      <AccuracyTable log={log} />
    </div>
  );
}

/** Per-tone accuracy over everything recorded in this session; the go/no-go number for the spike. */
function AccuracyTable({ log }: { log: LogRow[] }) {
  if (log.length === 0) return null;
  const tones = [1, 2, 3, 4];
  const confusion = tones.map(() => [0, 0, 0, 0]);
  let missed = 0;
  for (const row of log) {
    row.expected.forEach((t, i) => {
      if (t === 0) return;
      const d = row.detected[i];
      if (d === null) missed++;
      else confusion[t - 1][d - 1]++;
    });
  }
  const total = confusion.flat().reduce((a, b) => a + b, 0) + missed;
  const right = tones.reduce((a, t) => a + confusion[t - 1][t - 1], 0);

  const download = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(log, null, 2)], { type: "application/json" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: "xiaoqiao-tone-log.json" });
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border-t border-ink pt-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-serif text-lg">
          Độ chính xác phiên này: {total ? Math.round((right / total) * 100) : 0}% ({right}/{total} âm tiết)
        </h3>
        <button onClick={download} className="text-sm underline underline-offset-4">
          Tải nhật ký JSON
        </button>
      </div>
      <p className="mt-1 text-xs text-ink-soft">
        Chỉ đúng khi bạn chủ động đọc đúng thanh. Dòng là thanh cần đọc, cột là thanh máy nghe ra.
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="text-sm">
          <thead>
            <tr>
              <th className="px-3 py-1" />
              {tones.map((t) => (
                <th key={t} className="px-3 py-1" style={{ color: toneColor(t as 1) }}>
                  {t}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tones.map((t) => (
              <tr key={t} className="border-t border-rule">
                <th className="px-3 py-1" style={{ color: toneColor(t as 1) }}>
                  {t}
                </th>
                {tones.map((d) => (
                  <td key={d} className={`px-3 py-1 text-center ${t === d ? "font-semibold" : "text-ink-soft"}`}>
                    {confusion[t - 1][d - 1]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {missed > 0 && <p className="mt-2 text-xs text-ink-soft">{missed} âm tiết không đo được cao độ.</p>}
    </div>
  );
}
