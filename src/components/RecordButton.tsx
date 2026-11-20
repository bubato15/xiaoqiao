"use client";

import { useEffect, useRef } from "react";

export function RecordButton({
  busy,
  onClick,
  label,
  level,
  size = "lg",
}: {
  busy: boolean;
  onClick: () => void;
  label: string;
  /** Current microphone loudness, 0 to 1; drives the ring while recording. */
  level?: () => number;
  size?: "lg" | "sm";
}) {
  const ref = useRef<HTMLButtonElement>(null);

  // Update a CSS variable every frame instead of React state, so the meter costs no re-renders.
  useEffect(() => {
    const el = ref.current;
    if (!busy || !level || !el) return;
    let frame = 0;
    const tick = () => {
      el.style.setProperty("--level", level().toFixed(3));
      frame = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(frame);
      el.style.setProperty("--level", "0");
    };
  }, [busy, level]);

  const box = size === "lg" ? "h-24 w-24 text-sm" : "h-14 w-20 text-xs";
  return (
    <button
      ref={ref}
      onClick={onClick}
      aria-pressed={busy}
      className={`seal relative ${box} shrink-0 font-medium transition-transform active:scale-95`}
    >
      {busy && <span className="mic-ring" aria-hidden />}
      {busy ? (
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-paper motion-safe:animate-pulse" aria-hidden /> Dừng
        </span>
      ) : (
        label
      )}
    </button>
  );
}
