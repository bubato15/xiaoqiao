"use client";

import { useEffect, useState } from "react";
import { canRecognize, chineseVoices, listenOnce, speak, type Heard } from "@/lib/speech/webspeech";

interface Reply {
  reply_hanzi: string;
  reply_pinyin: string;
  reply_vi: string;
  feedback_vi: string;
  better_hanzi: string;
}

export function SpeechLab() {
  const [supported] = useState(canRecognize);
  const [voices, setVoices] = useState(chineseVoices);
  const [heard, setHeard] = useState<Heard | null>(null);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Chrome fills the voice list asynchronously.
    const load = () => setVoices(chineseVoices());
    if (typeof speechSynthesis !== "undefined") speechSynthesis.addEventListener("voiceschanged", load);
    return () => {
      if (typeof speechSynthesis !== "undefined") speechSynthesis.removeEventListener("voiceschanged", load);
    };
  }, []);

  const listen = async () => {
    setError("");
    setListening(true);
    try {
      setHeard(await listenOnce().result);
    } catch (e) {
      setError(`Không nhận dạng được: ${(e as Error).message}`);
    } finally {
      setListening(false);
    }
  };

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <h3 className="font-serif text-lg">Nhận dạng giọng nói</h3>
        <p className="mt-1 text-sm text-ink-soft">
          {!supported
            ? "Trình duyệt này không hỗ trợ Web Speech. Hãy thử Chrome, Edge hoặc Safari."
            : "Nói một câu tiếng Trung, máy sẽ ghi lại thành chữ."}
        </p>
        <button
          disabled={!supported || listening}
          onClick={listen}
          className="mt-4 border border-ink px-4 py-2 text-sm hover:bg-ink hover:text-paper disabled:opacity-40"
        >
          {listening ? "Đang nghe..." : "Nói"}
        </button>
        <div aria-live="polite">
          {error && <p className="mt-3 text-sm text-seal">{error}</p>}
          {heard && (
            <ol className="mt-4 space-y-1 text-sm">
              {heard.alternatives.length === 0 && <li className="text-ink-soft">Không nghe được gì.</li>}
              {heard.alternatives.map((a, i) => (
                <li key={i}>
                  <span lang="zh-CN" className="han text-lg">
                    {a.transcript}
                  </span>
                  <span className="ml-2 text-ink-soft">{Math.round(a.confidence * 100)}%</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-serif text-lg">Giọng đọc có sẵn trên máy</h3>
        <p className="mt-1 text-sm text-ink-soft">{voices.length} giọng tiếng Trung.</p>
        <ul className="mt-3 space-y-1 text-sm">
          {voices.map((v) => (
            <li key={v.voiceURI} className="flex items-center justify-between gap-3 border-b border-rule py-1">
              <span>
                {v.name} <span className="text-ink-soft">({v.lang})</span>
              </span>
              <button onClick={() => speak("你好，我是小乔。很高兴认识你。", v)} className="text-xs underline">
                Nghe
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ChatLab() {
  const [text, setText] = useState("你好，我想要一杯茶。");
  const [level, setLevel] = useState(1);
  const [reply, setReply] = useState<Reply | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario: "tea",
          level,
          turns: [{ role: "user", content: text }],
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setReply(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <input
          aria-label="Câu bạn muốn nói"
          value={text}
          onChange={(e) => setText(e.target.value)}
          lang="zh-CN"
          className="han min-w-0 flex-1 border-b border-ink bg-transparent py-2 text-lg outline-none"
        />
        <select
          aria-label="Cấp độ HSK"
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          className="border-b border-ink bg-transparent text-sm"
        >
          {[1, 2, 3, 4, 5, 6].map((l) => (
            <option key={l} value={l}>
              HSK {l}
            </option>
          ))}
        </select>
        <button
          onClick={send}
          disabled={loading}
          className="border border-ink px-4 py-2 text-sm hover:bg-ink hover:text-paper disabled:opacity-40"
        >
          {loading ? "Đang gửi..." : "Gửi"}
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-seal">{error}</p>}
      {reply && (
        <div className="mt-6 space-y-2 border-l-2 border-seal pl-4">
          <p lang="zh-CN" className="han text-2xl">
            {reply.reply_hanzi}
          </p>
          <p className="pinyin text-ink-soft">{reply.reply_pinyin}</p>
          <p className="text-sm">{reply.reply_vi}</p>
          {reply.feedback_vi && <p className="pt-2 text-sm text-seal">Góp ý: {reply.feedback_vi}</p>}
          {reply.better_hanzi && (
            <p lang="zh-CN" className="han text-sm">
              Nói tự nhiên hơn: {reply.better_hanzi}
            </p>
          )}
          <button onClick={() => speak(reply.reply_hanzi)} className="text-xs underline">
            Nghe câu đáp
          </button>
        </div>
      )}
    </div>
  );
}
