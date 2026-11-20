"use client";

import { useEffect, useRef, useState } from "react";
import { SCENARIO_GROUPS, SCENARIOS, type ChatReply, type Scenario } from "@/data/scenarios";
import { canRecognize, listenOnce, speak } from "@/lib/speech/webspeech";
import { startRecording } from "@/lib/speech/recorder";
import { speakerMid } from "@/lib/speech/speaker";
import { scoreSpoken, type SpokenScore } from "@/lib/speech/spoken";
import { TONE_HINT } from "@/lib/speech/tone-hint";
import { toneColor } from "@/components/ToneCurve";
import { Panda } from "@/components/Panda";
import { sceneArt } from "@/data/scene-art";
import Image from "next/image";
import { useStore } from "@/lib/local-store";
import { MIN_SCORED_TURNS, SCORE_PARTS, type TalkScore } from "@/lib/talk-score";
import { recordTalkScore, talkScores } from "@/lib/talk-record";
import { scoreVerdict } from "@/lib/speech/score";
import { DEFAULT_VOICE, VOICE_KINDS, VOICE_SAMPLE, findVoice, voiceForLevel, type TalkVoice } from "@/data/voices";
import { azureStatus, browserVoiceIds, checkAzure, offeredVoices, speakAs, talkVoice } from "@/lib/speech/talk-voice";

type Message =
  | { role: "assistant"; reply: ChatReply }
  | { role: "user"; text: string; feedback?: string; better?: string; voice?: SpokenScore };

const toTurns = (messages: Message[]) =>
  messages.map((m) => ({ role: m.role, content: m.role === "assistant" ? m.reply.reply_hanzi : m.text }));

const castLine = (s: Scenario) => (s.learner ? `Bạn là ${s.learner}, XiaoQiao là ${s.role}` : `XiaoQiao là ${s.role}`);

export function TalkRoom() {
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [level, setLevel] = useState(1);
  // Bumping the round remounts the conversation, so "practise again" starts fresh.
  const [round, setRound] = useState(0);

  if (!scenario) return <ScenarioPicker level={level} setLevel={setLevel} onPick={setScenario} />;
  return (
    <Conversation
      key={round}
      scenario={scenario}
      level={level}
      onExit={() => setScenario(null)}
      onRetry={() => setRound((r) => r + 1)}
    />
  );
}

function ScenarioPicker({
  level,
  setLevel,
  onPick,
}: {
  level: number;
  setLevel: (l: number) => void;
  onPick: (s: Scenario) => void;
}) {
  const open = SCENARIOS.filter((s) => s.minLevel <= level);
  const scores = useStore(talkScores);
  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="mb-3 text-sm text-ink-soft">Trình độ của bạn</legend>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6].map((l) => (
            <label
              key={l}
              className={`flex min-h-11 cursor-pointer items-center rounded-full border-2 px-4 text-sm font-medium has-focus-visible:outline-2 ${
                level === l ? "border-ink bg-ink text-paper" : "border-rule bg-paper hover:border-ink"
              }`}
            >
              <input
                type="radio"
                name="level"
                value={l}
                checked={level === l}
                onChange={() => setLevel(l)}
                className="sr-only"
              />
              HSK {l}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-soft">
          Mở được <b className="text-ink">{open.length}</b> trên {SCENARIOS.length} tình huống ở HSK {level}
        </p>
        <button
          type="button"
          onClick={() => onPick(open[Math.floor(Math.random() * open.length)])}
          className="btn-soft text-sm"
        >
          Chọn ngẫu nhiên
        </button>
      </div>

      {SCENARIO_GROUPS.map((g) => (
        <section key={g.id} aria-labelledby={`group-${g.id}`}>
          <h2 id={`group-${g.id}`} className="mb-3 flex items-baseline gap-3 font-serif text-xl font-bold">
            {g.title}
            <span lang="zh-CN" className="han-cute text-base font-normal text-seal">
              {g.hanzi}
            </span>
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SCENARIOS.filter((s) => s.group === g.id)
              .sort((a, b) => a.minLevel - b.minLevel)
              .map((s) => {
                const locked = level < s.minLevel;
                const best = scores[s.id]?.best;
                return (
                  <li key={s.id}>
                    <button
                      onClick={() => onPick(s)}
                      disabled={locked}
                      className="grid h-full w-full grid-cols-[1fr_auto] content-start items-start gap-3 rounded-3xl border-2 border-ink bg-paper p-3 pb-5 text-left shadow-[0_4px_0_var(--ink)] transition-transform hover:-translate-y-1 hover:bg-mint/60 disabled:cursor-not-allowed disabled:border-rule disabled:shadow-none disabled:hover:translate-y-0 disabled:hover:bg-paper"
                    >
                      <Image
                        src={sceneArt(s.id)}
                        width={480}
                        height={300}
                        sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                        alt=""
                        aria-hidden
                        className={`col-span-2 aspect-[16/10] w-full rounded-2xl ${
                          sceneArt(s.id).startsWith("/xiaoqiao") ? "bg-mint/50 object-contain p-2" : "object-cover"
                        } ${locked ? "opacity-50 grayscale" : ""}`}
                      />
                      <span className="pl-2">
                        <span className="font-serif text-lg font-bold">{s.title}</span>
                        <span className="mt-1 block text-sm">{s.goal}</span>
                        <span className="mt-2 block text-xs text-ink-soft">
                          {locked ? `Mở từ HSK ${s.minLevel}` : castLine(s)}
                        </span>
                        {best !== undefined && (
                          <span className="chip mt-2 inline-block text-xs">Điểm cao nhất {best}/100</span>
                        )}
                      </span>
                      <span lang="zh-CN" className={`han-cute pr-2 text-2xl ${locked ? "text-ink-soft" : "text-seal"}`}>
                        {s.hanzi}
                      </span>
                    </button>
                  </li>
                );
              })}
          </ul>
        </section>
      ))}
    </div>
  );
}

function Conversation({
  scenario,
  level,
  onExit,
  onRetry,
}: {
  scenario: Scenario;
  level: number;
  onExit: () => void;
  onRetry: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");
  const [showPinyin, setShowPinyin] = useState(true);
  const [showVi, setShowVi] = useState(true);
  const [score, setScore] = useState<TalkScore | null>(null);
  const [scoring, setScoring] = useState(false);
  const scoreRef = useRef<HTMLElement>(null);
  const userTurns = messages.filter((m) => m.role === "user").length;
  const started = useRef(false);
  const endRef = useRef<HTMLDivElement>(null);
  const micSupported = canRecognize();
  const mid = useStore(speakerMid);
  const stopListening = useRef<(() => void) | null>(null);
  const voiced = messages.flatMap((m) =>
    m.role === "user" && m.voice && "score" in m.voice ? [m.voice.score.total] : [],
  );
  const voiceAverage = voiced.length
    ? { total: Math.round(voiced.reduce((a, b) => a + b, 0) / voiced.length), count: voiced.length }
    : null;
  // Without Azure only the browser's own voices are offered, so nobody picks Sichuan and hears standard Mandarin.
  const azure = useStore(azureStatus);
  const offered = offeredVoices(azure, useStore(browserVoiceIds));
  // A voice above the chosen HSK level, or one not offered here, falls back to standard Mandarin
  // without changing the saved choice.
  const chosen = voiceForLevel(useStore(talkVoice), level);
  const voice = offered.includes(chosen) ? chosen : DEFAULT_VOICE;
  useEffect(() => void checkAzure(), []);

  const send = async (history: Message[]) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario: scenario.id, level, turns: toTurns(history) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      const reply = data as ChatReply;
      const next = [...history];
      const last = next.at(-1);
      if (last?.role === "user") {
        next[next.length - 1] = { ...last, feedback: reply.feedback_vi, better: reply.better_hanzi };
      }
      setMessages([...next, { role: "assistant", reply }]);
      void speakAs(reply.reply_hanzi, voice);
    } catch (e) {
      setError((e as Error).message || "Không kết nối được, thử lại nhé.");
    } finally {
      setLoading(false);
    }
  };

  // XiaoQiao speaks first; the ref guards against React's double effect run in development.
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    void send([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, loading]);

  const finish = async () => {
    setScoring(true);
    setError("");
    try {
      const res = await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario: scenario.id, level, turns: toTurns(messages) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setScore(data as TalkScore);
      recordTalkScore(scenario.id, (data as TalkScore).total);
    } catch (e) {
      setError((e as Error).message || "Không kết nối được, thử lại nhé.");
    } finally {
      setScoring(false);
    }
  };

  useEffect(() => {
    if (score) scoreRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [score]);

  const submit = (text: string, voice?: SpokenScore) => {
    const clean = text.trim();
    if (!clean || loading) return;
    const history: Message[] = [...messages, { role: "user", text: clean, voice }];
    setMessages(history);
    setDraft("");
    void send(history);
  };

  // The recording runs alongside recognition and stops when recognition ends, so every spoken
  // sentence also gets a tone and fluency score. Without a recording the sentence is still sent.
  const listen = async () => {
    setError("");
    setListening(true);
    const recording = startRecording().catch(() => null);
    const session = listenOnce();
    stopListening.current = session.stop;
    try {
      const heard = await session.result;
      const best = heard.alternatives[0]?.transcript.trim();
      const audio = await (await recording)?.stop().catch(() => null);
      if (!best) return setError("Chưa nghe rõ, bạn nói lại nhé.");
      submit(best, audio ? scoreSpoken(audio.samples, audio.sampleRate, best, mid || undefined) : undefined);
    } catch {
      void (await recording)?.stop().catch(() => null);
      setError("Không dùng được micro để nhận dạng. Bạn có thể gõ câu trả lời.");
    } finally {
      stopListening.current = null;
      setListening(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-3xl border-2 border-ink bg-mint/60 px-5 py-3">
        <div className="flex items-center gap-3">
          <Image
            src={sceneArt(scenario.id)}
            width={64}
            height={64}
            alt=""
            aria-hidden
            className="size-16 shrink-0 rounded-2xl object-cover"
          />
          <div>
            <p className="font-serif text-xl font-bold">{scenario.title}</p>
            <p className="text-xs text-ink-soft">
              HSK {level} · {castLine(scenario)}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={showPinyin} onChange={(e) => setShowPinyin(e.target.checked)} />
            Pinyin
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={showVi} onChange={(e) => setShowVi(e.target.checked)} />
            Nghĩa
          </label>
          <button onClick={onExit} className="underline decoration-rule underline-offset-4 hover:decoration-ink">
            Đổi tình huống
          </button>
        </div>
      </div>

      <VoicePicker voice={voice} voices={offered} azure={azure === "on"} level={level} />

      <ol className="space-y-6" aria-live="polite">
        {messages.map((m, i) =>
          m.role === "assistant" ? (
            <li key={i} className="flex max-w-[92%] items-start gap-2">
              <Panda mood={i === messages.length - 1 && !loading ? "wave" : "happy"} size={48} className="shrink-0" />
              <div className="rounded-3xl rounded-tl-md border-2 border-ink bg-paper px-4 py-3 shadow-[0_3px_0_var(--ink)]">
                <p className="mb-1 text-xs font-semibold text-seal">XiaoQiao</p>
                <p lang="zh-CN" className="han text-2xl leading-snug">
                  {m.reply.reply_hanzi}
                </p>
                {showPinyin && <p className="pinyin mt-1 text-ink-soft">{m.reply.reply_pinyin}</p>}
                {showVi && <p className="mt-1 text-sm">{m.reply.reply_vi}</p>}
                <button
                  onClick={() => void speakAs(m.reply.reply_hanzi, voice)}
                  className="mt-2 min-h-9 text-xs underline decoration-rule underline-offset-4 hover:decoration-ink"
                >
                  Nghe lại
                </button>
              </div>
            </li>
          ) : (
            <li key={i} className="ml-auto max-w-[90%] text-right">
              <p className="mb-1 text-xs text-ink-soft">Bạn</p>
              <p
                lang="zh-CN"
                className="han inline-block rounded-3xl rounded-tr-md border-2 border-ink bg-peach px-4 py-2 text-xl"
              >
                {m.text}
              </p>
              {m.voice && <VoiceNote voice={m.voice} />}
              {m.feedback && (
                <p className="mt-2 ml-auto max-w-md rounded-2xl bg-blush/40 px-3 py-2 text-left text-sm">
                  <b className="text-seal">Góp ý:</b> {m.feedback}
                </p>
              )}
              {m.better && (
                <p className="mt-1 ml-auto max-w-md rounded-2xl bg-mint/60 px-3 py-2 text-left text-sm">
                  Nói tự nhiên hơn:{" "}
                  <span lang="zh-CN" className="han">
                    {m.better}
                  </span>
                </p>
              )}
            </li>
          ),
        )}
        {loading && (
          <li className="flex items-center gap-2 text-sm text-ink-soft" aria-label="XiaoQiao đang trả lời">
            <Panda mood="listen" size={40} />
            XiaoQiao đang nghĩ…
          </li>
        )}
      </ol>
      <div ref={endRef} className="scroll-mb-28" />

      {error && (
        <p className="mt-6 text-sm text-seal" role="alert">
          {error}
        </p>
      )}

      {score ? (
        <TalkScoreCard ref={scoreRef} score={score} voice={voiceAverage} onRetry={onRetry} onExit={onExit} />
      ) : (
        <>
          <div className="mt-8 flex flex-wrap items-center justify-end gap-3 text-sm">
            {userTurns < MIN_SCORED_TURNS && (
              <span className="text-ink-soft">Nói thêm {MIN_SCORED_TURNS - userTurns} câu nữa để được chấm điểm</span>
            )}
            <button
              type="button"
              onClick={finish}
              disabled={loading || scoring || userTurns < MIN_SCORED_TURNS}
              className="btn-soft text-sm disabled:opacity-60"
            >
              {scoring ? "XiaoQiao đang chấm…" : "Kết thúc và chấm điểm"}
            </button>
          </div>
          <form
            className="sticky bottom-3 mt-8 flex flex-wrap items-center gap-3 rounded-full border-2 border-ink bg-paper p-2 pl-3 shadow-[0_4px_0_var(--ink)]"
            onSubmit={(e) => {
              e.preventDefault();
              submit(draft);
            }}
          >
            {micSupported && (
              <button
                type="button"
                onClick={() => (listening ? stopListening.current?.() : void listen())}
                disabled={loading}
                aria-pressed={listening}
                aria-label={listening ? "Đang nghe, bấm để nói xong" : "Nói"}
                className={`seal h-11 w-20 shrink-0 text-sm font-semibold disabled:opacity-60 ${listening ? "motion-safe:animate-pulse" : ""}`}
              >
                {listening ? "Xong" : "Nói"}
              </button>
            )}
            <input
              aria-label="Câu trả lời của bạn"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={micSupported ? "hoặc gõ chữ Hán / pinyin" : "Gõ câu trả lời"}
              lang="zh-CN"
              className="han min-w-0 flex-1 bg-transparent py-2 text-lg outline-none placeholder:font-sans placeholder:text-sm placeholder:text-ink-soft"
            />
            <button type="submit" disabled={loading || !draft.trim()} className="btn-soft text-sm">
              Gửi
            </button>
          </form>
        </>
      )}
    </div>
  );
}

/** Tone and fluency score of one spoken sentence, with the syllables whose tone was off. */
function VoiceNote({ voice }: { voice: SpokenScore }) {
  if ("skipped" in voice) return <p className="mt-1 ml-auto max-w-md text-xs text-ink-soft">{voice.skipped}</p>;
  const { score, analysis } = voice;
  const wrong = analysis.syllables.filter((s) => s.correct === false);
  const part = (label: string, v: number | null) => (v === null ? null : `${label} ${Math.round(v * 100)}`);
  const parts = [part("Thanh điệu", score.tone), part("Trôi chảy", score.fluency)].filter(Boolean).join(" · ");
  return (
    <div className="mt-2 ml-auto max-w-md rounded-2xl border-2 border-rule bg-paper px-3 py-2 text-left text-sm">
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span>Giọng nói</span>
        <b className="font-serif text-xl text-seal">{score.total}</b>
        <span className="text-ink-soft">/100 ·</span>
        <b>{scoreVerdict(score.total)}</b>
        {parts && <span className="w-full text-xs text-ink-soft">{parts}</span>}
      </p>
      {wrong.length === 0 ? (
        <p className="mt-1 text-tone-2">Thanh điệu đều đúng, giỏi lắm!</p>
      ) : (
        <ul className="mt-1 space-y-1">
          {wrong.map(({ syllable, guess }, i) => {
            const hint = guess ? TONE_HINT[`${syllable.surface}>${guess.tone}`] : undefined;
            return (
              <li key={i}>
                <span lang="zh-CN" className="han text-base">
                  {syllable.hanzi}
                </span>{" "}
                <span className="pinyin">{syllable.marked}</span>: cần thanh{" "}
                <b style={{ color: toneColor(syllable.surface) }}>{syllable.surface}</b>, nghe ra thanh{" "}
                <b style={{ color: guess ? toneColor(guess.tone) : undefined }}>{guess?.tone ?? "?"}</b>
                {hint && <span className="block text-xs text-ink-soft">Gợi ý: {hint}</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/** Lets the learner pick XiaoQiao's regional voice; choosing one plays a short greeting in it. */
function VoicePicker({
  voice,
  voices,
  azure,
  level,
}: {
  voice: TalkVoice;
  voices: TalkVoice[];
  azure: boolean;
  level: number;
}) {
  const choose = (id: string) => {
    const next = findVoice(id);
    if (!next) return;
    talkVoice.set(id);
    void speakAs(VOICE_SAMPLE, next);
  };
  const note =
    voice.kind === "dialect"
      ? `Giọng ${voice.label} đọc chữ Hán theo cách riêng nên sẽ khác pinyin bên dưới. Bạn nghe cho biết thôi, còn khi trả lời cứ nói tiếng phổ thông nhé.`
      : voice.kind === "accent"
        ? "Giọng vùng miền có thanh điệu và cách phát âm hơi khác chuẩn. Phần góp ý và chấm điểm vẫn theo tiếng phổ thông."
        : "";

  return (
    <div className="mb-6 rounded-3xl border-2 border-rule bg-paper px-4 py-3 text-sm">
      <div className="flex flex-wrap items-center gap-3">
        <label htmlFor="talk-voice" className="w-full font-semibold sm:w-auto">
          Giọng XiaoQiao
        </label>
        <select
          id="talk-voice"
          value={voice.id}
          onChange={(e) => choose(e.target.value)}
          className="min-h-11 min-w-0 flex-1 rounded-full border-2 border-ink bg-paper px-3 sm:flex-none"
        >
          {VOICE_KINDS.filter((k) => voices.some((v) => v.kind === k.kind)).map((k) => (
            <optgroup key={k.kind} label={k.label}>
              {voices
                .filter((v) => v.kind === k.kind)
                .map((v) => (
                  <option key={v.id} value={v.id} disabled={v.minLevel > level}>
                    {v.label} {v.hanzi} · giọng {v.gender}
                    {v.minLevel > level ? ` (mở từ HSK ${v.minLevel})` : ""}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
        <button type="button" onClick={() => void speakAs(VOICE_SAMPLE, voice)} className="btn-soft text-sm">
          Nghe thử
        </button>
      </div>
      {note && <p className="mt-2 text-ink-soft">{note}</p>}
      {!azure && (
        <p className="mt-2 text-ink-soft">
          {voices.length > 1
            ? "Danh sách giọng lấy từ trình duyệt của bạn."
            : "Trình duyệt này chưa có giọng vùng miền nào."}{" "}
          Edge trên máy tính có nhiều giọng nhất (Đông Bắc, Thiểm Tây, Đài Loan, Quảng Đông).
        </p>
      )}
    </div>
  );
}

const grade = (n: number) => (n >= 80 ? "var(--tone-2)" : n >= 50 ? "var(--tone-3)" : "var(--seal)");

/** End-of-conversation result: total out of 100, one bar per rubric part, notes and phrases to keep. */
function TalkScoreCard({
  score,
  voice,
  onRetry,
  onExit,
  ref,
}: {
  score: TalkScore;
  /** Average voice score of the spoken (not typed) sentences. */
  voice: { total: number; count: number } | null;
  onRetry: () => void;
  onExit: () => void;
  ref: React.Ref<HTMLElement>;
}) {
  return (
    <section
      ref={ref}
      aria-label="Kết quả hội thoại"
      className="mt-8 scroll-mt-6 space-y-5 rounded-3xl border-2 border-ink bg-paper p-5 shadow-[0_4px_0_var(--ink)]"
    >
      <div className="grid items-center gap-4 sm:grid-cols-[auto_auto_minmax(0,1fr)]">
        <Panda
          mood={score.total >= 80 ? "cheer" : score.total >= 55 ? "happy" : "encourage"}
          size={88}
          className="mx-auto"
        />
        <p className="text-center sm:px-2">
          <span className="block text-xs font-semibold tracking-wide text-ink-soft uppercase">Điểm hội thoại</span>
          <span className="font-serif text-5xl font-bold text-seal">{score.total}</span>
          <span className="text-sm text-ink-soft">/100</span>
          <span className="block text-sm font-semibold">{scoreVerdict(score.total)}</span>
        </p>
        <ul className="space-y-2 text-sm">
          {SCORE_PARTS.map((p) => (
            <li key={p.key}>
              <span className="flex justify-between gap-2">
                <span>
                  {p.label} <span className="text-ink-soft">· {Math.round(p.weight * 100)}%</span>
                </span>
                <b>{score.parts[p.key]}</b>
              </span>
              <span className="mt-1 block h-2 overflow-hidden rounded-full bg-paper-deep" aria-hidden>
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${Math.max(3, score.parts[p.key])}%`, background: grade(score.parts[p.key]) }}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>

      {score.summary && <p>{score.summary}</p>}

      {voice && (
        <p className="rounded-2xl border-2 border-rule px-4 py-3 text-sm">
          Giọng nói trung bình <b className="font-serif text-xl text-seal">{voice.total}</b>
          <span className="text-ink-soft">/100</span> qua {voice.count} câu bạn nói ({scoreVerdict(voice.total)}).
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {score.strengths.length > 0 && (
          <div className="rounded-2xl bg-mint/60 px-4 py-3 text-sm">
            <p className="mb-1 font-semibold">Bạn đã làm tốt</p>
            <ul className="list-disc space-y-1 pl-5">
              {score.strengths.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        )}
        {score.improve.length > 0 && (
          <div className="rounded-2xl bg-blush/40 px-4 py-3 text-sm">
            <p className="mb-1 font-semibold">Lần sau thử sửa</p>
            <ul className="list-disc space-y-1 pl-5">
              {score.improve.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {score.phrases.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-semibold">Mẫu câu nên nhớ</p>
          <ul className="space-y-2">
            {score.phrases.map((p) => (
              <li
                key={p.hanzi}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-2xl border-2 border-rule px-4 py-2"
              >
                <span lang="zh-CN" className="han text-xl">
                  {p.hanzi}
                </span>
                <span className="pinyin text-ink-soft">{p.pinyin}</span>
                <span className="text-sm">{p.vi}</span>
                <button
                  type="button"
                  onClick={() => speak(p.hanzi)}
                  className="ml-auto min-h-9 text-xs underline decoration-rule underline-offset-4 hover:decoration-ink"
                >
                  Nghe
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs text-ink-soft">
        Điểm hội thoại chấm nội dung bạn nói: làm được nhiệm vụ chưa, câu có đúng và tự nhiên không. Giọng nói được chấm
        riêng từng câu khi bạn bấm Nói (thanh điệu và độ trôi chảy, theo câu máy nghe được); câu gõ tay không chấm giọng.
      </p>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={onRetry} className="seal h-11 px-5 text-sm font-semibold">
          Luyện lại tình huống này
        </button>
        <button type="button" onClick={onExit} className="btn-soft text-sm">
          Chọn tình huống khác
        </button>
      </div>
    </section>
  );
}
