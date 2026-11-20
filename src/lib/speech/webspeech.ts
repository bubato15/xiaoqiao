// Minimal typings: SpeechRecognition is not in TypeScript's DOM lib yet.
interface RecognitionResultEvent {
  results: ArrayLike<ArrayLike<{ transcript: string; confidence: number }>>;
}
interface Recognition {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((e: RecognitionResultEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}
type RecognitionCtor = new () => Recognition;

function recognitionCtor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export const canRecognize = () => recognitionCtor() !== null;

export interface Heard {
  alternatives: { transcript: string; confidence: number }[];
}

/** Listens once in Mandarin and resolves with the recognised alternatives. */
export function listenOnce(): { result: Promise<Heard>; stop: () => void } {
  const Ctor = recognitionCtor();
  if (!Ctor) return { result: Promise.reject(new Error("unsupported")), stop: () => {} };

  const rec = new Ctor();
  rec.lang = "zh-CN";
  rec.interimResults = false;
  rec.maxAlternatives = 5;

  const result = new Promise<Heard>((resolve, reject) => {
    let heard: Heard = { alternatives: [] };
    rec.onresult = (e) => {
      const first = e.results[0];
      heard = { alternatives: Array.from(first, (a) => ({ transcript: a.transcript, confidence: a.confidence })) };
    };
    rec.onerror = (e) => reject(new Error(e.error));
    rec.onend = () => resolve(heard);
  });
  rec.start();
  return { result, stop: () => rec.stop() };
}

export function chineseVoices(): SpeechSynthesisVoice[] {
  if (typeof speechSynthesis === "undefined") return [];
  return speechSynthesis.getVoices().filter((v) => /^zh[-_](CN|Hans)/i.test(v.lang) || v.lang === "cmn-CN");
}

// Neural and vendor voices sound far more natural than the OS defaults.
const PREFERRED = [/Natural/i, /Xiaoxiao/i, /Google.*(普通话|Mandarin)/i, /Tingting/i, /Xiaoyi|Yunxi/i];

// Edge lists regional voices (e.g. Xiaobei, lang zh-CN-liaoning) among zh-CN ones; they must not become the default.
const REGIONAL = /liaoning|shaanxi|sichuan|henan|shandong|guangxi|Northeastern|Zhongyuan|Jilu|Southwestern/i;

function bestVoice(): SpeechSynthesisVoice | undefined {
  const voices = chineseVoices().filter((v) => !REGIONAL.test(`${v.lang} ${v.name}`));
  for (const pattern of PREFERRED) {
    const hit = voices.find((v) => pattern.test(v.name));
    if (hit) return hit;
  }
  return voices[0];
}

export const canSpeak = () => typeof speechSynthesis !== "undefined";

/** A browser voice for a regional choice: first by name (e.g. Edge's Xiaobei), then by language. */
export function regionalVoice(lang: string, name?: RegExp): SpeechSynthesisVoice | undefined {
  if (!canSpeak()) return undefined;
  const all = speechSynthesis.getVoices();
  const sameLang = (v: SpeechSynthesisVoice) => v.lang.replace("_", "-").toLowerCase() === lang.toLowerCase();
  return (
    (name && all.find((v) => name.test(v.name))) ??
    (lang === "zh-CN"
      ? bestVoice()
      : (all.find((v) => sameLang(v) && /Natural|Online/i.test(v.name)) ?? all.find(sameLang)))
  );
}

export function speak(text: string, voice?: SpeechSynthesisVoice, rate = 0.85) {
  if (!canSpeak()) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = voice?.lang ?? "zh-CN";
  u.rate = rate;
  const chosen = voice ?? bestVoice();
  if (chosen) u.voice = chosen;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}
