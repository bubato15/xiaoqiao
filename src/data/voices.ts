// Voices XiaoQiao can speak with in the role-play chat. Shared by the client picker and /api/tts,
// so the server only ever synthesises with a voice from this list.

export type VoiceKind = "standard" | "accent" | "dialect";

export interface TalkVoice {
  id: string;
  /** Vietnamese label shown in the picker. */
  label: string;
  hanzi: string;
  kind: VoiceKind;
  gender: "nữ" | "nam";
  minLevel: number;
  /** Azure neural voice name and its locale (used as xml:lang in SSML). */
  azure: string;
  locale: string;
  /** Browser fallback when the server has no Azure key: a voice name pattern and/or a BCP 47 lang. */
  browser: { lang: string; name?: RegExp };
}

export const VOICE_KINDS: { kind: VoiceKind; label: string }[] = [
  { kind: "standard", label: "Phổ thông" },
  { kind: "accent", label: "Phổ thông giọng vùng miền" },
  { kind: "dialect", label: "Phương ngữ (chỉ để nghe)" },
];

export const TALK_VOICES: TalkVoice[] = [
  {
    id: "putonghua",
    label: "Phổ thông chuẩn",
    hanzi: "普通话",
    kind: "standard",
    gender: "nữ",
    minLevel: 1,
    azure: "zh-CN-XiaoxiaoNeural",
    locale: "zh-CN",
    browser: { lang: "zh-CN" },
  },
  {
    id: "taiwan",
    label: "Đài Loan",
    hanzi: "台湾腔",
    kind: "accent",
    gender: "nữ",
    minLevel: 1,
    azure: "zh-TW-HsiaoChenNeural",
    locale: "zh-TW",
    browser: { lang: "zh-TW" },
  },
  {
    id: "dongbei",
    label: "Đông Bắc",
    hanzi: "东北话",
    kind: "accent",
    gender: "nữ",
    minLevel: 2,
    azure: "zh-CN-liaoning-XiaobeiNeural",
    locale: "zh-CN-liaoning",
    browser: { lang: "zh-CN", name: /Xiaobei/i },
  },
  {
    id: "guangxi",
    label: "Quảng Tây",
    hanzi: "广西口音",
    kind: "accent",
    gender: "nam",
    minLevel: 2,
    azure: "zh-CN-guangxi-YunqiNeural",
    locale: "zh-CN-guangxi",
    browser: { lang: "zh-CN", name: /Yunqi/i },
  },
  {
    id: "shandong",
    label: "Sơn Đông",
    hanzi: "山东话",
    kind: "accent",
    gender: "nam",
    minLevel: 3,
    azure: "zh-CN-shandong-YunxiangNeural",
    locale: "zh-CN-shandong",
    browser: { lang: "zh-CN", name: /Yunxiang/i },
  },
  {
    id: "henan",
    label: "Hà Nam",
    hanzi: "河南话",
    kind: "accent",
    gender: "nam",
    minLevel: 3,
    azure: "zh-CN-henan-YundengNeural",
    locale: "zh-CN-henan",
    browser: { lang: "zh-CN", name: /Yundeng/i },
  },
  {
    id: "shaanxi",
    label: "Thiểm Tây",
    hanzi: "陕西话",
    kind: "accent",
    gender: "nữ",
    minLevel: 3,
    azure: "zh-CN-shaanxi-XiaoniNeural",
    locale: "zh-CN-shaanxi",
    browser: { lang: "zh-CN", name: /Xiaoni/i },
  },
  {
    id: "sichuan",
    label: "Tứ Xuyên",
    hanzi: "四川话",
    kind: "accent",
    gender: "nam",
    minLevel: 4,
    azure: "zh-CN-sichuan-YunxiNeural",
    locale: "zh-CN-sichuan",
    browser: { lang: "zh-CN", name: /sichuan/i },
  },
  {
    id: "cantonese",
    label: "Quảng Đông",
    hanzi: "粤语",
    kind: "dialect",
    gender: "nữ",
    minLevel: 3,
    azure: "yue-CN-XiaoMinNeural",
    locale: "yue-CN",
    browser: { lang: "zh-HK" },
  },
  {
    id: "shanghai",
    label: "Thượng Hải",
    hanzi: "上海话",
    kind: "dialect",
    gender: "nữ",
    minLevel: 3,
    azure: "wuu-CN-XiaotongNeural",
    locale: "wuu-CN",
    browser: { lang: "wuu-CN" },
  },
];

export const DEFAULT_VOICE = TALK_VOICES[0];

export const findVoice = (id: string) => TALK_VOICES.find((v) => v.id === id);

/** The chosen voice if the learner's level has unlocked it, otherwise standard Mandarin. */
export const voiceForLevel = (id: string, level: number) => {
  const v = findVoice(id);
  return v && v.minLevel <= level ? v : DEFAULT_VOICE;
};

/** Line read when the learner previews a voice. */
export const VOICE_SAMPLE = "你好，我是小乔。很高兴认识你！";
