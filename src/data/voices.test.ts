import { describe, expect, it } from "vitest";
import { DEFAULT_VOICE, TALK_VOICES, VOICE_KINDS, voiceForLevel } from "./voices";
import { buildSsml } from "../lib/azure-tts";

describe("talk voices", () => {
  it("has unique ids and Azure names", () => {
    expect(new Set(TALK_VOICES.map((v) => v.id)).size).toBe(TALK_VOICES.length);
    expect(new Set(TALK_VOICES.map((v) => v.azure)).size).toBe(TALK_VOICES.length);
  });

  it("names each Azure voice after its own locale", () => {
    for (const v of TALK_VOICES) expect(v.azure.startsWith(`${v.locale}-`)).toBe(true);
  });

  it("starts with standard Mandarin open at HSK 1, and every kind has a voice", () => {
    expect(DEFAULT_VOICE).toMatchObject({ kind: "standard", minLevel: 1 });
    for (const k of VOICE_KINDS) expect(TALK_VOICES.some((v) => v.kind === k.kind)).toBe(true);
  });

  it("falls back to standard Mandarin when the voice is locked or unknown", () => {
    expect(voiceForLevel("sichuan", 2)).toBe(DEFAULT_VOICE);
    expect(voiceForLevel("sichuan", 4).id).toBe("sichuan");
    expect(voiceForLevel("nope", 6)).toBe(DEFAULT_VOICE);
  });
});

describe("buildSsml", () => {
  it("escapes the text so it cannot inject SSML", () => {
    const ssml = buildSsml(DEFAULT_VOICE, `你好<voice name="x">&'`);
    expect(ssml).toContain("你好&lt;voice name=&quot;x&quot;&gt;&amp;&apos;");
    expect(ssml.match(/<voice /g)).toHaveLength(1);
    expect(ssml).toContain('xml:lang="zh-CN"');
  });
});
