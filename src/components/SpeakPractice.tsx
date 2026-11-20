"use client";

import { useStore } from "@/lib/local-store";
import Link from "next/link";
import { useRef, useState } from "react";
import { analyzeTones, isErhua, spokenCount, type Analysis } from "@/lib/speech/analyze";
import type { Recording } from "@/lib/speech/recorder";
import type { Syllable } from "@/lib/speech/sandhi";
import { speakerMid } from "@/lib/speech/speaker";
import { useRecorder } from "@/lib/speech/useRecorder";
import { checkPronunciation, type PronunciationResult } from "@/lib/speech/pronunciation";
import { mistakesOf, readingScore, scoreVerdict, type Mistake, type ReadingScore } from "@/lib/speech/score";
import { canRecognize, listenOnce, speak, type Heard } from "@/lib/speech/webspeech";
import { PitchChart } from "./PitchChart";
import { RecordButton } from "./RecordButton";
import { Panda, type PandaMood } from "./Panda";
import { Stamp } from "./Stamp";
import { toneColor } from "./ToneCurve";
import { TONE_HINT } from "@/lib/speech/tone-hint";

export interface PracticeResult {
  analysis: Analysis;
  /** Share of scored (non-neutral) syllables read with the right tone. */
  score: number;
}

/**
 * Record, score tones and show the pitch chart with per-syllable advice in Vietnamese.
 * `onScore` fires once the overall reading score is ready (after speech recognition settles);
 * `onListen` fires when the learner plays the model reading.
 */
export function SpeakPractice({
  text,
  syllables,
  onResult,
  onScore,
  onListen,
}: {
  text: string;
  syllables: Syllable[];
  onResult?: (r: PracticeResult) => void;
  onScore?: (s: ReadingScore, mistakes: Mistake[]) => void;
  onListen?: () => void;
}) {
  const mid = useStore(speakerMid);
  const rec = useRecorder();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [pron, setPron] = useState<PronunciationResult | null>(null);
  const [score, setScore] = useState<ReadingScore | null>(null);
  const listening = useRef<{ result: Promise<Heard>; stop: () => void } | null>(null);
  // Drop the previous result when the word changes, without an effect.
  const [shownFor, setShownFor] = useState(text);
  if (shownFor !== text) {
    setShownFor(text);
    setAnalysis(null);
    setPron(null);
    setScore(null);
    setError("");
  }

  // Speech recognition runs alongside the recording to check initials and finals.
  // It is optional: browsers without it, or a recognition error, simply skip this part.
  const startListening = () => {
    if (!canRecognize()) return;
    const session = listenOnce();
    session.result.catch(() => {});
    listening.current = session;
  };

  const finishListening = async () => {
    const session = listening.current;
    listening.current = null;
    if (!session) return null;
    session.stop();
    const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000));
    const heard = await Promise.race([session.result.catch(() => null), timeout]);
    // No transcript at all means recognition did not run properly, not that every sound was wrong.
    return heard?.alternatives.some((a) => a.transcript.trim())
      ? checkPronunciation(
          text,
          heard.alternatives.map((a) => a.transcript),
        )
      : null;
  };

  const onClick = () => {
    if (!rec.busy) {
      setPron(null);
      setScore(null);
      startListening();
    }
    void rec.toggle(onRecorded, (msg) => {
      listening.current?.stop();
      listening.current = null;
      setError(msg);
    });
  };

  const onRecorded = ({ samples, sampleRate }: Recording) => {
    const pronunciation = finishListening();
    const result = analyzeTones(samples, sampleRate, syllables, mid || undefined);
    // A bad recording is not a wrong tone: do not score it. That includes a toned syllable with too little pitch to read.
    if (result.syllables.some((s) => !s.span || (s.syllable.surface !== 0 && !s.guess))) {
      setAnalysis(null);
      setError(
        result.frames.some((f) => f.hz)
          ? `Mới nghe được một phần. Hãy đọc đủ ${spokenCount(syllables)} tiếng, mỗi tiếng rõ ràng.`
          : "Chưa nghe thấy giọng nói. Hãy nói gần micro hơn và đọc to rõ.",
      );
      return;
    }
    const scored = result.syllables.filter((s) => s.correct !== null);
    const score = scored.length ? scored.filter((s) => s.correct).length / scored.length : 1;
    setAnalysis(result);
    setAttempt((a) => a + 1);
    setError("");
    onResult?.({ analysis: result, score });
    void pronunciation.then((p) => {
      const overall = readingScore(result, p, text);
      setPron(p);
      setScore(overall);
      onScore?.(overall, mistakesOf(result, p));
    });
  };

  const scored = analysis?.syllables.filter((s) => s.correct !== null) ?? [];
  const allRight = scored.length > 0 && scored.every((s) => s.correct);

  const mood: PandaMood = rec.busy
    ? "listen"
    : analysis
      ? allRight
        ? "cheer"
        : "encourage"
      : error
        ? "encourage"
        : "happy";
  const bubble = rec.busy
    ? "Mình đang nghe nè..."
    : analysis
      ? allRight
        ? "Chuẩn rồi! Giỏi quá!"
        : "Gần được rồi, thử lại nhé!"
      : error
        ? "Mình chưa nghe rõ, đọc lại nha."
        : "Bấm nút đỏ rồi đọc cho mình nghe nhé!";

  return (
    <div>
      <div className="mb-6 flex items-end justify-center gap-2">
        <Panda key={`${mood}-${attempt}`} mood={mood} size={84} />
        <p
          className="pop-in relative mb-10 rounded-2xl border-2 border-ink bg-paper px-3 py-2 text-sm font-medium"
          key={bubble}
        >
          {bubble}
          <span
            className="absolute -bottom-[7px] left-4 h-3 w-3 rotate-45 border-r-2 border-b-2 border-ink bg-paper"
            aria-hidden
          />
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5">
        <RecordButton busy={rec.busy} level={rec.level} onClick={onClick} label="Thu âm" />
        <button
          onClick={() => {
            speak(text);
            onListen?.();
          }}
          className="btn-soft text-sm"
        >
          Nghe mẫu
        </button>
      </div>

      <div aria-live="polite" className="mt-6">
        {error && <p className="text-center text-sm text-seal">{error}</p>}
        <p className="sr-only">{analysis ? bubble : ""}</p>
        {analysis && (
          <div className="space-y-4">
            {allRight && (
              <div className="flex justify-center">
                <Stamp key={attempt} text="好" size={56} label="Đóng dấu: chuẩn" />
              </div>
            )}
            {score ? (
              <ScoreCard score={score} />
            ) : (
              <p className="text-center text-sm text-ink-soft">Đang chấm điểm giọng đọc...</p>
            )}
            {analysis.calibrationIgnored && (
              <p className="rounded-2xl bg-mint/60 p-3 text-center text-sm text-ink">
                Giọng lần này cao thấp khác hẳn lần đo giọng ({mid} Hz), nên XiaoQiao chấm theo chính bản thu này. Bạn
                hãy{" "}
                <Link href="/lab" className="font-semibold underline underline-offset-4">
                  đo lại giọng
                </Link>{" "}
                để chấm chuẩn hơn nhé.
              </p>
            )}
            <PitchChart analysis={analysis} />
            <ul className="space-y-2">
              {analysis.syllables.map(({ syllable, guess, correct }, i) => {
                const hint = guess && correct === false ? TONE_HINT[`${syllable.surface}>${guess.tone}`] : undefined;
                return (
                  <li key={i} className="flex flex-wrap items-baseline gap-3 border-b border-rule pb-2 text-sm">
                    <span lang="zh-CN" className="han text-xl">
                      {syllable.hanzi}
                    </span>
                    {correct === null ? (
                      <span className="text-ink-soft">
                        {isErhua(syllable, i)
                          ? "âm cuốn lưỡi, đọc liền vào tiếng trước, không chấm"
                          : "thanh nhẹ, đọc ngắn và nhẹ, không chấm"}
                      </span>
                    ) : (
                      <>
                        <span>
                          cần thanh <b style={{ color: toneColor(syllable.surface) }}>{syllable.surface}</b>, nghe ra
                          thanh <b style={{ color: guess ? toneColor(guess.tone) : undefined }}>{guess?.tone ?? "?"}</b>
                        </span>
                        <span className={correct ? "text-tone-2" : "text-seal"}>{correct ? "Đúng" : "Chưa đúng"}</span>
                        {hint && <span className="w-full text-ink-soft">Gợi ý: {hint}</span>}
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
            {pron && <PronunciationNote result={pron} />}
          </div>
        )}
      </div>
    </div>
  );
}

const grade = (part: number) => (part >= 0.8 ? "var(--tone-2)" : part >= 0.5 ? "var(--tone-3)" : "var(--seal)");

/** Overall reading score out of 100 with one bar per part. */
export function ScoreCard({ score }: { score: ReadingScore }) {
  const parts = [
    { label: "Thanh điệu", value: score.tone },
    { label: "Phát âm", value: score.pronunciation },
    {
      label: "Độ trôi chảy",
      value: score.fluency,
      note:
        score.rate === null
          ? undefined
          : `${score.rate.toLocaleString("vi-VN", { maximumFractionDigits: 1 })} tiếng/giây` +
            (score.longPauses ? `, ngắt quãng ${score.longPauses} lần` : ""),
    },
  ].filter((p): p is { label: string; value: number; note?: string } => p.value !== null);

  return (
    <section
      aria-label="Điểm giọng đọc"
      className="grid items-center gap-4 rounded-3xl border-2 border-ink bg-paper p-4 shadow-[0_3px_0_var(--ink)] sm:grid-cols-[auto_minmax(0,1fr)]"
    >
      <p className="text-center sm:px-3">
        <span className="block text-xs font-semibold tracking-wide text-ink-soft uppercase">Điểm giọng đọc</span>
        <span className="font-serif text-5xl font-bold text-seal">{score.total}</span>
        <span className="text-sm text-ink-soft">/100</span>
        <span className="block text-sm font-semibold">{scoreVerdict(score.total)}</span>
      </p>
      <ul className="space-y-2 text-sm">
        {parts.map((p) => (
          <li key={p.label}>
            <span className="flex justify-between gap-2">
              <span>
                {p.label}
                {p.note && <span className="text-ink-soft"> · {p.note}</span>}
              </span>
              <b>{Math.round(p.value * 100)}</b>
            </span>
            <span className="mt-1 block h-2 overflow-hidden rounded-full bg-paper-deep" aria-hidden>
              <span
                className="block h-full rounded-full"
                style={{ width: `${Math.max(3, p.value * 100)}%`, background: grade(p.value) }}
              />
            </span>
          </li>
        ))}
      </ul>
      {score.pronunciation === null && (
        <p className="text-xs text-ink-soft sm:col-span-2">
          Lần này máy chưa nhận dạng được lời đọc, nên điểm chưa tính phần phát âm. Hãy đọc to, rõ hơn, và dùng Chrome hoặc Edge để được chấm đủ ba phần.
        </p>
      )}
    </section>
  );
}

function PronunciationNote({ result }: { result: PronunciationResult }) {
  if (result.status === "match") {
    return (
      <p className="text-sm">
        <span className="text-ink-soft">Phát âm:</span> máy nghe rõ{" "}
        <span lang="zh-CN" className="han">
          {result.heardText}
        </span>{" "}
        <span className="pinyin text-tone-2">({result.syllables.map((s) => s.target).join(" ")})</span>
      </p>
    );
  }
  if (result.status === "unclear") {
    return (
      <p className="text-sm text-ink-soft">
        Phát âm: máy chưa nhận ra từ này{result.heardText ? ` (nghe thành “${result.heardText}”)` : ""}. Hãy đọc to, rõ
        từng âm và thử lại.
      </p>
    );
  }
  return (
    <div className="border-l-2 border-tone-3 pl-3 text-sm">
      <p className="text-ink-soft">
        Phát âm: máy nghe thành{" "}
        <span lang="zh-CN" className="han text-ink">
          {result.heardText}
        </span>
      </p>
      <ul className="mt-1 space-y-1">
        {result.syllables
          .filter((s) => !s.ok)
          .map((s, i) => (
            <li key={i}>
              cần <b className="pinyin">{s.target}</b>, nghe ra <b className="pinyin text-seal">{s.heard}</b>
              {s.hint && <span className="block text-ink-soft">Gợi ý: {s.hint}</span>}
            </li>
          ))}
      </ul>
    </div>
  );
}
