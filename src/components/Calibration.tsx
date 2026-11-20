"use client";

import { useStore } from "@/lib/local-store";
import { useState } from "react";
import { measureSpeakerMid, speakerMid } from "@/lib/speech/speaker";
import { useRecorder } from "@/lib/speech/useRecorder";
import { Panda } from "./Panda";
import { RecordButton } from "./RecordButton";

/** One-time voice measurement so tones are judged against the learner's own pitch range. */
export function Calibration({ compact = false }: { compact?: boolean }) {
  const mid = useStore(speakerMid);
  const rec = useRecorder();
  const [error, setError] = useState("");

  const onDone = ({ samples, sampleRate }: { samples: Float32Array; sampleRate: number }) => {
    const hz = measureSpeakerMid(samples, sampleRate);
    if (!hz) return setError("Chưa nghe rõ, hãy đọc to hơn và đủ cả bốn tiếng.");
    setError("");
    speakerMid.set(hz);
  };

  if (compact && mid) return null;

  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-4 rounded-3xl border-2 border-dashed border-ink/40 bg-mint/60 p-4 sm:grid-cols-[auto_1fr_auto] sm:p-5">
      <Panda mood={rec.busy ? "listen" : "wave"} size={64} />
      <div>
        <p className="font-serif text-xl font-bold">Cho XiaoQiao nghe giọng bạn nhé!</p>
        <p className="mt-1 text-sm text-ink-soft">
          Bấm nút rồi đọc chậm{" "}
          <span lang="zh-CN" className="han text-ink">
            妈 麻 马 骂
          </span>{" "}
          (mā má mǎ mà). Việc này giúp chấm thanh theo đúng độ cao giọng của riêng bạn.
          {mid ? ` Đã đo: ${mid} Hz.` : ""}
        </p>
        {error && (
          <p className="mt-2 text-sm text-seal" role="alert">
            {error}
          </p>
        )}
      </div>
      <div className="col-span-2 flex justify-center sm:col-span-1">
        <RecordButton
          size="sm"
          busy={rec.busy}
          level={rec.level}
          onClick={() => rec.toggle(onDone, setError)}
          label={mid ? "Đo lại" : "Bắt đầu đo"}
        />
      </div>
    </div>
  );
}
