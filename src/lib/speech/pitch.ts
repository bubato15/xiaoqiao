import { PitchDetector } from "pitchy";

export interface PitchFrame {
  /** Frame centre in seconds. */
  t: number;
  /** Fundamental frequency in Hz, or null when the frame is unvoiced. */
  hz: number | null;
  rms: number;
}

// 40 ms covers two periods of a 70 Hz voice while staying shorter than a pause between syllables.
const FRAME_SECONDS = 0.04;
const HOP_SECONDS = 0.01;
const MIN_HZ = 70;
const MAX_HZ = 500;
const MIN_CLARITY = 0.8;

export function extractPitch(samples: Float32Array, sampleRate: number): PitchFrame[] {
  const frameSize = Math.round(FRAME_SECONDS * sampleRate);
  const detector = PitchDetector.forFloat32Array(frameSize);
  const hop = Math.round(HOP_SECONDS * sampleRate);
  const frames: PitchFrame[] = [];

  for (let start = 0; start + frameSize <= samples.length; start += hop) {
    const window = samples.subarray(start, start + frameSize);
    let sum = 0;
    for (let i = 0; i < window.length; i++) sum += window[i] * window[i];
    const rms = Math.sqrt(sum / window.length);
    const [hz, clarity] = detector.findPitch(window, sampleRate);
    const voiced = clarity >= MIN_CLARITY && hz >= MIN_HZ && hz <= MAX_HZ;
    frames.push({ t: (start + frameSize / 2) / sampleRate, hz: voiced ? hz : null, rms });
  }

  // Silence gate relative to the loudest frame, so mic gain does not matter.
  const peak = Math.max(...frames.map((f) => f.rms), 1e-9);
  for (const f of frames) if (f.rms < peak * 0.08) f.hz = null;

  return removeOctaveJumps(frames);
}

/** Drops isolated frames that jump more than 7 semitones from both neighbours (octave errors). */
function removeOctaveJumps(frames: PitchFrame[]): PitchFrame[] {
  const st = (a: number, b: number) => Math.abs(12 * Math.log2(a / b));
  return frames.map((f, i) => {
    const prev = frames[i - 1]?.hz;
    const next = frames[i + 1]?.hz;
    if (f.hz && prev && next && st(f.hz, prev) > 7 && st(f.hz, next) > 7) return { ...f, hz: null };
    return f;
  });
}

export const toSemitones = (hz: number, refHz: number) => 12 * Math.log2(hz / refHz);

export function median(values: number[]): number {
  if (values.length === 0) return NaN;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = sorted.length >> 1;
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
