// Server only: reads the Azure Speech key. Import it from route handlers, never from client components.
import type { TalkVoice } from "../data/voices";

const KEY = process.env.AZURE_SPEECH_KEY;
const REGION = process.env.AZURE_SPEECH_REGION;

export const hasAzure = () => Boolean(KEY && REGION);

/** Longest text we synthesise; chat replies are one or two short sentences. */
export const MAX_TTS_CHARS = 200;

const escapeXml = (s: string) =>
  s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);

/** Slightly slower than native speed, like the browser voice (rate 0.85). */
export const buildSsml = (voice: TalkVoice, text: string) =>
  `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${voice.locale}">` +
  `<voice name="${voice.azure}"><prosody rate="-15%">${escapeXml(text)}</prosody></voice></speak>`;

// Learners press "Nghe lại" often, so recent clips stay in memory per server instance.
const CACHE_LIMIT = 200;
const cache = new Map<string, ArrayBuffer>();

/** Returns MP3 bytes, or null when Azure refuses or times out. */
export async function synthesize(voice: TalkVoice, text: string): Promise<ArrayBuffer | null> {
  const cacheKey = `${voice.id}\n${text}`;
  const hit = cache.get(cacheKey);
  if (hit) {
    // Re-insert so the Map's insertion order works as a least-recently-used list.
    cache.delete(cacheKey);
    cache.set(cacheKey, hit);
    return hit;
  }

  const res = await fetch(`https://${REGION}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": KEY!,
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
      "User-Agent": "xiaoqiao",
    },
    body: buildSsml(voice, text),
    signal: AbortSignal.timeout(10000),
  }).catch(() => null);
  if (!res?.ok) return null;

  const audio = await res.arrayBuffer();
  cache.set(cacheKey, audio);
  if (cache.size > CACHE_LIMIT) cache.delete(cache.keys().next().value!);
  return audio;
}
