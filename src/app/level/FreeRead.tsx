"use client";

import { useState } from "react";
import { MAX_SPOKEN_HAN, hanCount, syllabifyPhrases } from "@/lib/speech/spoken";
import { SpeakPractice } from "@/components/SpeakPractice";
import { WordFace } from "@/components/WordFace";

const SAMPLES = [
  "我每天早上七点起床。",
  "今天天气很好，我们一起去公园吧。",
  "学习汉语不难，多听多说就会进步。",
];
const MAX_HAN = MAX_SPOKEN_HAN;

/** Paste or type any Chinese text, read it aloud and get the overall reading score. */
export function FreeRead() {
  const [draft, setDraft] = useState(SAMPLES[1]);
  const [text, setText] = useState(SAMPLES[1]);
  const [error, setError] = useState("");
  const syllables = syllabifyPhrases(text);

  const use = (value: string) => {
    const count = hanCount(value);
    if (!count) return setError("Hãy nhập ít nhất một chữ Hán.");
    if (count > MAX_HAN) return setError(`Đoạn văn dài ${count} chữ. Hãy cắt còn tối đa ${MAX_HAN} chữ để chấm chính xác hơn.`);
    setError("");
    setText(value.trim());
  };

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            use(draft);
          }}
        >
          <label htmlFor="free-text" className="text-sm font-semibold">
            Đoạn cần đọc (tối đa {MAX_HAN} chữ Hán)
          </label>
          <textarea
            id="free-text"
            lang="zh-CN"
            rows={3}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="han mt-2 w-full rounded-2xl border-2 border-ink bg-paper p-3 text-xl"
            aria-describedby="free-text-help"
          />
          <p id="free-text-help" className="mt-1 text-xs text-ink-soft">
            Pinyin do máy tự đoán, chữ có nhiều cách đọc đôi khi bị đoán sai.
          </p>
          {error && (
            <p role="alert" className="mt-2 text-sm text-seal">
              {error}
            </p>
          )}
          <button type="submit" className="seal mt-4 min-h-11 px-6 font-semibold">
            Chấm đoạn này
          </button>
        </form>
        <p className="mt-6 text-sm text-ink-soft">Hoặc chọn đoạn mẫu:</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {SAMPLES.map((s) => (
            <button
              key={s}
              lang="zh-CN"
              aria-pressed={text === s}
              onClick={() => {
                setDraft(s);
                use(s);
              }}
              className="chip han"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="paper-stack p-5 sm:p-6">
        <div className="mb-6 flex justify-center">
          <WordFace syllables={syllables} size="sm" />
        </div>
        <SpeakPractice text={text} syllables={syllables} />
      </div>
    </div>
  );
}
