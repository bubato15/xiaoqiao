import { createLocalStore, createMemoryStore, type LocalStore } from "@/lib/local-store";
import { DEFAULT_VOICE, TALK_VOICES, type TalkVoice } from "@/data/voices";
import { canSpeak, regionalVoice, speak } from "./webspeech";

/** The learner's chosen chat voice id (see TALK_VOICES). */
export const talkVoice = createLocalStore<string>("xq.talkVoice", DEFAULT_VOICE.id);

/**
 * Whether the server can synthesise with Azure. Memory only: when the owner adds the key later,
 * a reload picks Azure up again. "unknown" until checkAzure() answers; treated like "off".
 */
export const azureStatus = createMemoryStore<"unknown" | "on" | "off">("unknown");

let checking: Promise<void> | null = null;
export function checkAzure() {
  checking ??= fetch("/api/tts")
    .then((r) => r.json())
    .then((d: { enabled?: boolean }) => azureStatus.set(d.enabled ? "on" : "off"))
    .catch(() => azureStatus.set("off"));
  return checking;
}

/** True when this browser has a voice for the choice itself, not just a standard Mandarin stand-in. */
function browserHas(voice: TalkVoice): boolean {
  if (voice.id === DEFAULT_VOICE.id) return true;
  const all = speechSynthesis.getVoices();
  if (voice.browser.name) return all.some((v) => voice.browser.name!.test(v.name));
  return all.some((v) => v.lang.replace("_", "-").toLowerCase() === voice.browser.lang.toLowerCase());
}

/**
 * Space-separated ids of the voices this browser can speak. A string so the snapshot stays stable
 * for useSyncExternalStore; voices load asynchronously, so it updates on "voiceschanged".
 */
export const browserVoiceIds: LocalStore<string> = (() => {
  let cache: string | undefined;
  const compute = () =>
    canSpeak()
      ? TALK_VOICES.filter(browserHas)
          .map((v) => v.id)
          .join(" ")
      : DEFAULT_VOICE.id;
  return {
    get: () => (cache ??= compute()),
    set: () => {},
    subscribe: (listener) => {
      if (!canSpeak()) return () => {};
      const onChange = () => {
        cache = compute();
        listener();
      };
      speechSynthesis.addEventListener("voiceschanged", onChange);
      return () => speechSynthesis.removeEventListener("voiceschanged", onChange);
    },
    getServerSnapshot: () => DEFAULT_VOICE.id,
  };
})();

/** Voices worth offering: all of them with Azure, otherwise only those the browser really has. */
export const offeredVoices = (azure: "unknown" | "on" | "off", browserIds: string) =>
  azure === "on" ? TALK_VOICES : TALK_VOICES.filter((v) => browserIds.split(" ").includes(v.id));

// One clip at a time; object URLs are kept so "Nghe lại" does not hit the server again.
let current: HTMLAudioElement | null = null;
const clips = new Map<string, string>();

function stopAll() {
  current?.pause();
  current = null;
  if (canSpeak()) speechSynthesis.cancel();
}

function speakInBrowser(text: string, voice: TalkVoice) {
  speak(text, regionalVoice(voice.browser.lang, voice.browser.name));
}

/** Speaks with the Azure voice, falling back to the closest browser voice when the server cannot. */
export async function speakAs(text: string, voice: TalkVoice) {
  stopAll();
  await checkAzure();
  const key = `${voice.id}\n${text}`;
  let url = clips.get(key);
  if (!url && azureStatus.get() === "on") {
    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ voice: voice.id, text }),
    }).catch(() => null);
    if (res?.status === 503) azureStatus.set("off");
    if (res?.ok) {
      url = URL.createObjectURL(await res.blob());
      clips.set(key, url);
    }
  }
  if (!url) return speakInBrowser(text, voice);

  const audio = new Audio(url);
  current = audio;
  // Autoplay rules can block the very first clip; the browser voice is still better than silence.
  await audio.play().catch(() => {
    if (current === audio) speakInBrowser(text, voice);
  });
}
