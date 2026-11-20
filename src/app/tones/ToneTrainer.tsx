"use client";

import { useState } from "react";
import { HSK1 } from "@/data/hsk1";
import { HSK2 } from "@/data/hsk2";
import { fromPinyin, type Syllable } from "@/lib/speech/sandhi";
import { canSpeak, speak } from "@/lib/speech/webspeech";
import { SpeakPractice } from "@/components/SpeakPractice";
import { ToneCurve, toneColor } from "@/components/ToneCurve";
import { WordFace } from "@/components/WordFace";

type Lexical = 1 | 2 | 3 | 4;
const TONES: Lexical[] = [1, 2, 3, 4];

// Only HSK 1 and 2: this is a client component, and the higher levels would bloat its bundle.
const ALL_WORDS = [...HSK1, ...HSK2]
  .flatMap((l) => l.words)
  .map((w) => ({ ...w, syllables: fromPinyin(w.hanzi, w.pinyin) }));
const SINGLES = ALL_WORDS.filter((w) => w.syllables.length === 1 && w.syllables[0].surface !== 0);

const INTRO: Record<Lexical, { name: string; vi: string; example: { hanzi: string; pinyin: string; vi: string } }> = {
  1: {
    name: "Ngang cao",
    vi: "Giống thanh ngang tiếng Việt nhưng cao hơn hẳn, giữ phẳng và đều đến hết.",
    example: { hanzi: "妈", pinyin: "ma1", vi: "mẹ" },
  },
  2: {
    name: "Đi lên",
    vi: "Gần với thanh sắc. Bắt đầu ở giữa rồi kéo lên một mạch, như khi hỏi lại “hả?”.",
    example: { hanzi: "麻", pinyin: "ma2", vi: "cây gai" },
  },
  3: {
    name: "Trầm, xuống rồi lên",
    vi: "Gần với thanh hỏi nhưng trầm hơn. Khi đứng trước tiếng khác, thường chỉ đọc nửa đầu: thấp và trầm.",
    example: { hanzi: "马", pinyin: "ma3", vi: "con ngựa" },
  },
  4: {
    name: "Rơi mạnh",
    vi: "Bắt đầu thật cao rồi rơi nhanh và dứt khoát, như khi ra lệnh. Đừng đọc thành thanh huyền.",
    example: { hanzi: "骂", pinyin: "ma4", vi: "mắng" },
  },
};

export function ToneIntro() {
  const [tone, setTone] = useState<Lexical>(1);
  const { example } = INTRO[tone];
  const syllables = fromPinyin(example.hanzi, example.pinyin);

  return (
    <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div role="radiogroup" aria-label="Chọn thanh" className="space-y-2">
        {TONES.map((t) => (
          <button
            key={t}
            role="radio"
            aria-checked={tone === t}
            onClick={() => setTone(t)}
            className={`grid w-full grid-cols-[3.5rem_1fr] items-center gap-4 rounded-3xl border-2 px-4 py-3 text-left transition-transform ${
              tone === t
                ? "border-ink bg-paper shadow-[0_3px_0_var(--ink)]"
                : "border-transparent hover:-translate-y-0.5 hover:bg-paper-deep/70"
            }`}
          >
            <ToneCurve tone={t} size={52} />
            <span>
              <span className="font-serif text-xl font-bold" style={{ color: toneColor(t) }}>
                Thanh {t}
              </span>{" "}
              <span className="text-sm text-ink-soft">· {INTRO[t].name}</span>
              <span className="mt-1 block text-sm leading-relaxed">{INTRO[t].vi}</span>
            </span>
          </button>
        ))}
      </div>
      <div>
        <WordFace syllables={syllables} />
        <p className="mt-2 mb-8 text-center text-sm text-ink-soft">{example.vi}</p>
        <SpeakPractice text={example.hanzi} syllables={syllables} />
      </div>
    </div>
  );
}

function pick<T>(items: T[], not?: T): T {
  const pool = items.length > 1 && not !== undefined ? items.filter((x) => x !== not) : items;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function ListenQuiz() {
  const [item, setItem] = useState(() => SINGLES[0]);
  const [answer, setAnswer] = useState<Lexical | null>(null);
  const [score, setScore] = useState({ right: 0, total: 0 });
  const tone = item.syllables[0].surface as Lexical;

  if (!canSpeak()) {
    return <p className="text-sm text-seal">Trình duyệt này không có giọng đọc. Hãy thử Chrome, Edge hoặc Safari.</p>;
  }

  const choose = (t: Lexical) => {
    if (answer) return;
    setAnswer(t);
    setScore((s) => ({ right: s.right + (t === tone ? 1 : 0), total: s.total + 1 }));
  };
  const next = () => {
    const n = pick(SINGLES, item);
    setItem(n);
    setAnswer(null);
    speak(n.hanzi, undefined, 0.75);
  };

  return (
    <div className="mx-auto max-w-xl text-center">
      <button
        onClick={() => speak(item.hanzi, undefined, 0.75)}
        className="seal h-20 w-20 text-sm font-semibold"
        aria-label="Nghe tiếng cần đoán"
      >
        Nghe
      </button>
      <p className="mt-3 text-sm text-ink-soft">Bấm nghe, có thể nghe lại nhiều lần.</p>

      <div className="mt-6 grid grid-cols-4 gap-2" role="group" aria-label="Chọn thanh bạn nghe được">
        {TONES.map((t) => {
          const state = !answer ? "" : t === tone ? "right" : t === answer ? "wrong" : "dim";
          return (
            <button
              key={t}
              onClick={() => choose(t)}
              aria-disabled={!!answer}
              className={`flex flex-col items-center gap-1 rounded-2xl border-2 bg-paper py-3 transition-transform ${
                state === "right"
                  ? "border-tone-2 bg-tone-2/10"
                  : state === "wrong"
                    ? "border-seal bg-seal/10"
                    : state === "dim"
                      ? "border-rule text-ink-soft"
                      : "border-rule hover:-translate-y-0.5 hover:border-ink"
              }`}
            >
              <ToneCurve tone={t} size={40} />
              <span className="text-sm">Thanh {t}</span>
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="mt-6 min-h-24">
        {answer && (
          <div className="space-y-3">
            <p className={answer === tone ? "text-tone-2" : "text-seal"}>
              {answer === tone ? "Đúng rồi." : `Chưa đúng, đây là thanh ${tone}.`}{" "}
              <span lang="zh-CN" className="han text-ink">
                {item.hanzi}
              </span>{" "}
              <span className="pinyin" style={{ color: toneColor(tone) }}>
                {item.syllables[0].marked}
              </span>{" "}
              <span className="text-ink-soft">({item.vi})</span>
            </p>
            <button onClick={next} className="btn-soft text-sm">
              Tiếng tiếp theo
            </button>
          </div>
        )}
      </div>
      <p className="text-xs text-ink-soft tabular-nums">
        Đúng {score.right}/{score.total}
      </p>
    </div>
  );
}

/** Two-syllable HSK 1 words grouped by the tones actually spoken (after sandhi). */
const PAIRS = (() => {
  const grid = new Map<string, (typeof ALL_WORDS)[number]>();
  for (const w of ALL_WORDS) {
    if (w.syllables.length !== 2) continue;
    const key = w.syllables.map((s) => s.surface).join("");
    if (!grid.has(key)) grid.set(key, w);
  }
  return grid;
})();

export function PairGrid() {
  const [key, setKey] = useState<string | null>(null);
  const chosen = key ? PAIRS.get(key) : undefined;

  return (
    <div className="grid gap-10 lg:grid-cols-[auto_minmax(0,1fr)]">
      <table className="w-full max-w-md border-separate border-spacing-1.5 text-center lg:w-auto">
        <caption className="sr-only">Bảng cặp thanh: dòng là thanh tiếng đầu, cột là thanh tiếng sau</caption>
        <thead>
          <tr>
            <th className="p-2 text-xs font-normal text-ink-soft">
              <span className="sr-only">Tiếng đầu \ tiếng sau</span>
            </th>
            {[...TONES, 0].map((t) => (
              <th key={t} scope="col" className="p-2 text-sm" style={{ color: toneColor(t as Lexical) }}>
                {t || "nhẹ"}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TONES.map((a) => (
            <tr key={a}>
              <th scope="row" className="p-2 text-sm" style={{ color: toneColor(a) }}>
                {a}
              </th>
              {[...TONES, 0].map((b) => {
                const k = `${a}${b}`;
                const w = PAIRS.get(k);
                return (
                  <td key={b} className="p-0">
                    {w ? (
                      <button
                        onClick={() => setKey(k)}
                        aria-pressed={key === k}
                        aria-label={`Thanh ${a} và ${b || "nhẹ"}: ${w.hanzi}, ${w.vi}`}
                        lang="zh-CN"
                        className={`han block min-h-12 w-full min-w-14 rounded-2xl border-2 px-2 text-lg transition-transform ${
                          key === k
                            ? "border-ink bg-ink text-paper"
                            : "border-rule bg-paper hover:-translate-y-0.5 hover:border-ink"
                        }`}
                      >
                        {w.hanzi}
                      </button>
                    ) : (
                      <span
                        className="block min-h-12 min-w-14 rounded-2xl border-2 border-dashed border-rule leading-[2.8rem] text-rule"
                        aria-label="Chưa có từ"
                      >
                        ·
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {chosen ? (
          <>
            <WordFace syllables={chosen.syllables as Syllable[]} size="md" />
            <p className="mt-2 mb-8 text-center text-sm text-ink-soft">{chosen.vi}</p>
            <SpeakPractice text={chosen.hanzi} syllables={chosen.syllables} />
          </>
        ) : (
          <p className="rounded-3xl border-2 border-dashed border-rule p-4 text-sm text-ink-soft">
            Chọn một ô trong bảng để luyện. Thanh 3 đứng trước thanh 3 sẽ đọc thành thanh 2, nên ô 3 + 3 nằm ở dòng 2.
          </p>
        )}
      </div>
    </div>
  );
}
