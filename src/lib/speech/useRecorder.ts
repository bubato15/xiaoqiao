"use client";

import { useRef, useState } from "react";
import { startRecording, type Recording } from "./recorder";

/** Press once to start, press again to stop and receive the recording. */
export function useRecorder() {
  const [busy, setBusy] = useState(false);
  const stopRef = useRef<(() => Promise<Recording>) | null>(null);
  const levelRef = useRef<() => number>(() => 0);

  const toggle = async (onDone: (r: Recording) => void, onError: (msg: string) => void) => {
    if (stopRef.current) {
      const stop = stopRef.current;
      stopRef.current = null;
      levelRef.current = () => 0;
      setBusy(false);
      try {
        onDone(await stop());
      } catch {
        onError("Không đọc được bản thu, hãy thử lại.");
      }
      return;
    }
    try {
      const session = await startRecording();
      stopRef.current = session.stop;
      levelRef.current = session.level;
      setBusy(true);
    } catch {
      onError("Trình duyệt chưa cho dùng micro. Hãy bấm cho phép ở thanh địa chỉ.");
    }
  };

  const level = () => levelRef.current();
  return { busy, toggle, level };
}
