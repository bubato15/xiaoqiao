import { createLocalStore } from "@/lib/local-store";
import { extractPitch, median } from "./pitch";

/** The learner's natural mid pitch in Hz, measured once from 妈麻马骂; 0 = not measured yet. */
export const speakerMid = createLocalStore<number>("xq.speakerMidHz", 0);

/** Returns the median voiced pitch, or null when the recording holds too little voice. */
export function measureSpeakerMid(samples: Float32Array, sampleRate: number): number | null {
  const voiced = extractPitch(samples, sampleRate).flatMap((f) => (f.hz ? [f.hz] : []));
  return voiced.length < 30 ? null : Math.round(median(voiced));
}
