"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Sentence } from "@/data/sentences";
import { useStore } from "@/lib/local-store";
import {
  AIDED_FACTOR,
  LEVEL_COUNT,
  effectiveScore,
  estimateLevel,
  lastLevelCheck,
  type LevelReading,
} from "@/lib/placement";
import { fromPinyin } from "@/lib/speech/sandhi";
import type { Mistake, ReadingScore } from "@/lib/speech/score";
import { Panda } from "@/components/Panda";
import { SpeakPractice } from "@/components/SpeakPractice";
import { toneColor } from "@/components/ToneCurve";
import { WordFace } from "@/components/WordFace";

const NUMERALS = ["一", "二", "三", "四", "五", "六"];

const pickSet = (pool: Record<string, Sentence[]>) =>
  Array.from({ length: LEVEL_COUNT }, (_, i) => {
    const list = pool[String(i + 1)];
    return list[Math.floor(Math.random() * list.length)];
  });

/** Best reading so far for the current sentence, kept apart for readings made with and without help. */
interface Best {
  plain: LevelReading | null;
  helped: LevelReading | null;
}
const NO_BEST: Best = { plain: null, helped: null };

function commit({ plain, helped }: Best): LevelReading | null {
  if (!plain || !helped) return plain ?? helped;
  return effectiveScore(plain) >= effectiveScore(helped) ? plain : helped;
}

const keepBetter = (old: LevelReading | null, next: LevelReading) => (old && old.score >= next.score ? old : next);

/** Reads one sentence per HSK level, then estimates the learner's level from the reading scores. */
export function LevelCheck({ pool, goals }: { pool: Record<string, Sentence[]>; goals: Record<string, string> }) {
  const last = useStore(lastLevelCheck);
  const [set, setSet] = useState(() => pickSet(pool));
  const [phase, setPhase] = useState<"intro" | "test" | "done">("intro");
  const [step, setStep] = useState(0);
  const [readings, setReadings] = useState<(LevelReading | null)[]>([]);
  const [best, setBest] = useState<Best>(NO_BEST);
  const [helped, setHelped] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);

  const sentence = set[step];
  const syllables = fromPinyin(sentence.hanzi, sentence.pinyin);
  const read = best.plain !== null || best.helped !== null;
  const revealed = helped || read;

  const focusHeading = () => requestAnimationFrame(() => heading.current?.focus());

  const start = () => {
    setPhase("test");
    setStep(0);
    setReadings([]);
    setBest(NO_BEST);
    setHelped(false);
    focusHeading();
  };

  const restart = () => {
    setSet(pickSet(pool));
    start();
  };

  const finish = (list: (LevelReading | null)[]) => {
    setReadings(list);
    setPhase("done");
    const scores = Array.from({ length: LEVEL_COUNT }, (_, i) => effectiveScore(list[i] ?? null));
    lastLevelCheck.set({ level: estimateLevel(list).level, scores, at: new Date().toISOString() });
    focusHeading();
  };

  const advance = (reading: LevelReading | null) => {
    const list = [...readings, reading];
    if (step === LEVEL_COUNT - 1) return finish(list);
    setReadings(list);
    setStep(step + 1);
    setBest(NO_BEST);
    setHelped(false);
    focusHeading();
  };

  // Pinyin and meaning show after the first reading, so later attempts count as helped too.
  const onScore = (s: ReadingScore, mistakes: Mistake[]) => {
    const reading = { score: s.total, aided: revealed, mistakes };
    setBest((b) =>
      revealed ? { ...b, helped: keepBetter(b.helped, reading) } : { ...b, plain: keepBetter(b.plain, reading) },
    );
  };

  if (phase === "intro") {
    return (
      <div className="paper-stack grid gap-6 p-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:p-8">
        <Panda mood="happy" size={110} className="mx-auto" />
        <div>
          <h3 ref={heading} tabIndex={-1} className="font-serif text-2xl font-bold">
            Đọc 6 câu, XiaoQiao đoán trình độ
          </h3>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
            <li>Mỗi câu ứng với một cấp, từ HSK 1 đến HSK 6, câu sau dài và khó hơn câu trước.</li>
            <li>
              Câu chỉ hiện chữ Hán. Bạn có thể xem pinyin hoặc nghe mẫu, nhưng khi đó điểm câu ấy chỉ tính{" "}
              {Math.round(AIDED_FACTOR * 100)}%.
            </li>
            <li>Mỗi câu được đọc lại nhiều lần, XiaoQiao lấy lượt tốt nhất. Câu nào khó quá thì cứ bỏ qua.</li>
          </ol>
          {last && (
            <p className="mt-4 text-sm text-ink-soft">
              Lần trước ({new Date(last.at).toLocaleDateString("vi-VN")}):{" "}
              <b className="text-ink">{last.level ? `HSK ${last.level}` : "mới bắt đầu"}</b>
            </p>
          )}
          <button onClick={start} className="seal mt-6 min-h-12 px-7 text-base font-semibold">
            Bắt đầu kiểm tra
          </button>
        </div>
      </div>
    );
  }

  if (phase === "done") {
    const { level, close } = estimateLevel(readings);
    const next = Math.min(LEVEL_COUNT, Math.max(1, level + (level < LEVEL_COUNT ? 1 : 0)));
    return (
      <div className="paper-stack p-6 sm:p-8">
        <div className="grid items-center gap-6 sm:grid-cols-[auto_minmax(0,1fr)]">
          <Panda mood={level >= 3 ? "cheer" : level ? "happy" : "encourage"} size={120} className="mx-auto" />
          <div aria-live="polite">
            <p className="text-sm font-semibold text-ink-soft">Trình độ nói ước lượng</p>
            <h3 ref={heading} tabIndex={-1} className="mt-1 flex items-center gap-3 font-serif text-4xl font-bold">
              {level ? (
                <>
                  <span lang="zh-CN" className="seal han-cute h-12 w-12 text-2xl" aria-hidden>
                    {NUMERALS[level - 1]}
                  </span>
                  HSK {level}
                </>
              ) : (
                "Mới bắt đầu"
              )}
            </h3>
            <p className="mt-3 max-w-xl leading-relaxed">
              {level
                ? `Bạn đọc tốt các câu tới cấp HSK ${level}. ${goals[level]}`
                : "Bạn chưa đọc vững câu HSK 1. Hãy luyện bốn thanh trước, rồi học các bài HSK 1 nhé."}
              {close && ` Câu HSK ${level + 1} cũng đã khá, bạn sắp lên cấp rồi!`}
            </p>
          </div>
        </div>

        <ul className="mt-8 space-y-3" aria-label="Điểm từng câu">
          {set.map((s, i) => {
            const r = readings[i] ?? null;
            const value = effectiveScore(r);
            return (
              <li key={i} className="grid grid-cols-[4.5rem_minmax(0,1fr)_3rem] items-start gap-3 text-sm">
                <span className="font-semibold">HSK {i + 1}</span>
                <span className="min-w-0">
                  <MarkedSentence text={s.hanzi} mistakes={r?.mistakes ?? []} />
                  <span className="mt-1 block h-2 overflow-hidden rounded-full bg-paper-deep" aria-hidden>
                    <span
                      className="block h-full rounded-full"
                      style={{
                        width: `${Math.max(2, value)}%`,
                        background: value >= 65 ? "var(--tone-2)" : value >= 40 ? "var(--tone-3)" : "var(--seal)",
                      }}
                    />
                  </span>
                  <span className="text-xs text-ink-soft">
                    {r ? (r.aided ? `đã xem gợi ý, ${r.score} điểm tính ${value}` : "tự đọc") : "bỏ qua"}
                    {r?.mistakes && r.mistakes.length === 0 && ", không có tiếng nào sai"}
                  </span>
                  {r?.mistakes && r.mistakes.length > 0 && <MistakeList mistakes={r.mistakes} />}
                </span>
                <b className="text-right text-base">{value}</b>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-xs leading-relaxed text-ink-soft">
          Đây là ước lượng dựa trên giọng đọc của bạn (thanh điệu, phát âm và độ trôi chảy). Bài thi HSK thật còn có nghe
          hiểu, đọc hiểu và viết.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link href={level ? `/hsk/${next}` : "/tones"} className="seal min-h-12 px-7 text-base font-semibold">
            {level ? `Học HSK ${next}` : "Luyện bốn thanh"}
          </Link>
          <button onClick={restart} className="btn-soft">
            Làm lại với bộ câu khác
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="paper-stack p-5 sm:p-8">
      <ol className="flex flex-wrap gap-2" aria-label="Tiến độ">
        {set.map((_, i) => (
          <li
            key={i}
            aria-current={i === step ? "step" : undefined}
            className={`rounded-full border-2 px-3 py-1 text-xs font-semibold ${
              i === step ? "border-ink bg-peach" : i < step ? "border-transparent bg-mint" : "border-rule text-ink-soft"
            }`}
          >
            HSK {i + 1}
          </li>
        ))}
      </ol>

      <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div>
          <h3 ref={heading} tabIndex={-1} className="text-sm font-semibold text-ink-soft">
            Câu {step + 1} trên {LEVEL_COUNT} · HSK {step + 1}
          </h3>
          <div className="mt-4">
            {revealed ? (
              <WordFace syllables={syllables} size="sm" />
            ) : (
              <p lang="zh-CN" className="han text-center text-3xl leading-relaxed sm:text-4xl">
                {sentence.hanzi}
              </p>
            )}
          </div>
          {read ? (
            <p className="mt-4 text-sm">
              <span className="text-ink-soft">Nghĩa:</span> {sentence.vi}
            </p>
          ) : (
            !helped && (
              <button onClick={() => setHelped(true)} className="btn-soft mt-5 text-sm">
                Xem pinyin
              </button>
            )
          )}
          {helped && !read && (
            <p className="mt-3 text-xs text-ink-soft">Đã xem gợi ý: điểm câu này tính {Math.round(AIDED_FACTOR * 100)}%.</p>
          )}
        </div>

        <div>
          <SpeakPractice
            text={sentence.hanzi}
            syllables={syllables}
            onScore={onScore}
            onListen={() => setHelped(true)}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t-2 border-dashed border-rule pt-5">
        <button
          onClick={() => finish([...readings, commit(best)])}
          className="min-h-11 px-2 text-sm underline decoration-rule underline-offset-4 hover:decoration-ink"
        >
          Dừng và xem kết quả
        </button>
        <div className="flex flex-wrap gap-3">
          {!read && (
            <button onClick={() => advance(null)} className="btn-soft text-sm">
              Bỏ qua câu này
            </button>
          )}
          <button onClick={() => advance(commit(best))} disabled={!read} className="seal min-h-11 px-6 font-semibold disabled:opacity-50">
            {step === LEVEL_COUNT - 1 ? "Xem kết quả" : "Câu tiếp theo"}
          </button>
        </div>
      </div>
    </div>
  );
}

/** The sentence with every wrongly read character marked in red and underlined. */
function MarkedSentence({ text, mistakes }: { text: string; mistakes: Mistake[] }) {
  const wrong = new Set(mistakes.map((m) => m.index));
  let han = -1;
  return (
    <span lang="zh-CN" className="han block text-base leading-relaxed">
      {[...text].map((c, i) => {
        const isHan = /\p{Script=Han}/u.test(c);
        if (isHan) han++;
        return isHan && wrong.has(han) ? (
          <mark key={i} className="bg-transparent font-bold text-seal underline decoration-2 underline-offset-4">
            {c}
          </mark>
        ) : (
          <span key={i}>{c}</span>
        );
      })}
    </span>
  );
}

/** One line per wrong syllable: which tone or sound was expected and what XiaoQiao heard. */
function MistakeList({ mistakes }: { mistakes: Mistake[] }) {
  return (
    <ul className="mt-2 space-y-1 text-xs leading-relaxed" aria-label="Các tiếng đọc chưa đúng">
      {mistakes.map((m) => (
        <li key={m.index} className="flex flex-wrap items-baseline gap-x-2">
          <span lang="zh-CN" className="han text-sm font-bold text-seal">
            {m.hanzi}
          </span>
          <span className="pinyin">{m.pinyin}</span>
          <span className="text-ink">
            {m.tone && (
              <>
                cần thanh <b style={{ color: toneColor(m.tone.want) }}>{m.tone.want}</b>, nghe ra thanh{" "}
                <b style={{ color: toneColor(m.tone.heard) }}>{m.tone.heard}</b>
              </>
            )}
            {m.tone && m.sound && "; "}
            {m.sound && (
              <>
                cần âm <b className="pinyin">{m.sound.want}</b>,{" "}
                {m.sound.heard ? (
                  <>
                    máy nghe ra <b className="pinyin text-seal">{m.sound.heard}</b>
                  </>
                ) : (
                  "máy chưa nghe rõ"
                )}
              </>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
