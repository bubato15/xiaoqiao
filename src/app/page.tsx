import Link from "next/link";
import { LEVELS } from "@/data/hsk";
import { SCENARIOS } from "@/data/scenarios";
import { InkMountains } from "@/components/InkMountains";
import { Panda } from "@/components/Panda";
import { ToneCurve, toneColor } from "@/components/ToneCurve";

const FOUR = [
  { tone: 1, py: "mā", han: "妈", vi: "mẹ" },
  { tone: 2, py: "má", han: "麻", vi: "cây gai" },
  { tone: 3, py: "mǎ", han: "马", vi: "con ngựa" },
  { tone: 4, py: "mà", han: "骂", vi: "mắng" },
] as const;

const WORD_COUNT = Object.values(LEVELS)
  .flat()
  .reduce((n, l) => n + l.words.length, 0);
const LEVEL_KEYS = Object.keys(LEVELS);
const LEVEL_NAMES = LEVEL_KEYS.length > 2 ? `${LEVEL_KEYS[0]} đến ${LEVEL_KEYS.at(-1)}` : LEVEL_KEYS.join(" và ");

const STATS = [
  { value: String(WORD_COUNT), label: `từ HSK ${LEVEL_NAMES} có pinyin, nghĩa Việt và âm Hán Việt` },
  { value: "4", label: "thanh, kèm quy tắc biến điệu 3+3, 不 và 一" },
  { value: String(SCENARIOS.length), label: "tình huống hội thoại với XiaoQiao" },
  { value: "0đ", label: "chấm giọng ngay trên trình duyệt, không cần cài đặt" },
];

const CHAPTERS = [
  {
    num: "一",
    bg: "bg-mint/70",
    title: "Thanh điệu",
    vertical: "声调",
    text: "Bốn thanh, luyện nghe phân biệt và đọc từng cặp thanh, có vẽ đường cao độ giọng bạn.",
    href: "/tones",
    motif: (
      <span className="flex gap-1">
        {([1, 2, 3, 4] as const).map((t) => (
          <ToneCurve key={t} tone={t} size={34} axis={false} />
        ))}
      </span>
    ),
  },
  {
    num: "二",
    bg: "bg-peach/70",
    title: "Bài học HSK",
    vertical: "课本",
    text: "Từ vựng theo chủ đề, kèm pinyin, nghĩa tiếng Việt và âm Hán Việt. Đọc theo và được chấm từng thanh.",
    href: "/hsk",
    motif: (
      <span lang="zh-CN" className="han flex gap-3 text-2xl text-ink-soft">
        <span>学习</span>
        <span>朋友</span>
        <span>喝茶</span>
      </span>
    ),
  },
  {
    num: "三",
    bg: "bg-mint/50",
    title: "Bài tập & Phản xạ",
    vertical: "练习",
    text: "Thẻ Flashcard nhớ từ nhanh, trắc nghiệm phản xạ 2 chiều và luyện dịch câu nói thực chiến theo chủ đề.",
    href: "/practice",
    motif: (
      <span className="flex flex-col items-center gap-1 text-sm font-semibold text-seal">
        <span>🏭 Công xưởng</span>
        <span className="text-xs text-ink-soft">39 từ · 10 câu phản xạ</span>
      </span>
    ),
  },
  {
    num: "四",
    bg: "bg-paper-deep",
    title: "Hội thoại",
    vertical: "对话",
    text: "Nói chuyện với XiaoQiao trong các tình huống: gọi trà sữa, đi taxi, mua đồ ở chợ.",
    href: "/talk",
    motif: (
      <span className="flex flex-col items-start gap-1 text-sm">
        <span lang="zh-CN" className="han rounded-2xl rounded-bl-sm bg-mint px-3 py-1">
          你想喝什么？
        </span>
        <span lang="zh-CN" className="han ml-8 rounded-2xl rounded-br-sm bg-peach px-3 py-1">
          我要一杯奶茶。
        </span>
      </span>
    ),
  },
  {
    num: "五",
    bg: "bg-blush/40",
    title: "Đo trình độ",
    vertical: "测试",
    text: "Đọc 6 câu từ HSK 1 đến HSK 6, nhận điểm giọng đọc trên thang 100 và để XiaoQiao đoán trình độ của bạn.",
    href: "/level",
    motif: (
      <span className="flex items-baseline gap-2">
        <span className="font-serif text-3xl font-bold text-seal">86</span>
        <span className="text-sm">/100 · HSK 3</span>
      </span>
    ),
  },
];

/** Static illustration of the pitch chart: target shape for 你好 (2 + 3) and a learner's attempt. */
function DemoChart() {
  return (
    <svg viewBox="0 0 320 170" className="h-auto w-full" role="img" aria-label="Ví dụ: đường giọng của bạn so với mẫu">
      {[50, 85, 120].map((y) => (
        <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="var(--rule)" strokeDasharray={y === 85 ? "" : "2 4"} />
      ))}
      <rect x="30" y="10" width="120" height="150" fill="var(--tone-2)" opacity="0.08" />
      <rect x="170" y="10" width="120" height="150" fill="var(--tone-3)" opacity="0.08" />
      <text x="38" y="32" lang="zh-CN" className="han" fontSize="20" fill="var(--tone-2)">
        你
      </text>
      <text x="178" y="32" lang="zh-CN" className="han" fontSize="20" fill="var(--tone-3)">
        好
      </text>
      <path
        d="M40 90 Q95 85 140 45"
        fill="none"
        stroke="var(--tone-2)"
        strokeWidth="9"
        strokeOpacity="0.25"
        strokeLinecap="round"
      />
      <path
        d="M180 100 Q215 140 240 135 T285 70"
        fill="none"
        stroke="var(--tone-3)"
        strokeWidth="9"
        strokeOpacity="0.25"
        strokeLinecap="round"
      />
      <path
        d="M40 92 Q80 95 100 105 T140 80 M180 98 Q215 130 245 128 T285 78"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#xq-brush)"
      />
    </svg>
  );
}

const STAT_BG = ["bg-mint", "bg-peach", "bg-paper-deep", "bg-blush/50"];

export default function Home() {
  return (
    <div className="space-y-20">
      <section className="relative isolate grid gap-12 pt-2 md:grid-cols-[1.15fr_1fr] md:items-center">
        <span lang="zh-CN" aria-hidden className="watermark -top-10 -left-4 text-[14rem] sm:text-[18rem]">
          说
        </span>
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-peach px-3 py-1 text-sm font-semibold">
            Tiếng Trung cho người Việt
          </p>
          <h1 className="mt-5 font-serif text-5xl leading-[1.05] font-bold sm:text-6xl">
            Nói đúng thanh,
            <br />
            <span className="text-seal">rồi nói thành câu.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            Người Việt quen sáu thanh nên hay đọc lẫn thanh 2 với thanh 3, và đọc thanh 4 chưa đủ dứt khoát. Bé gấu trúc
            XiaoQiao nghe bạn nói, vẽ lại giọng của bạn và chỉ ra chỗ cần sửa.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/tones" className="seal min-h-12 px-7 text-base font-semibold">
              Bắt đầu luyện thanh
            </Link>
            <Link href="/talk" className="btn-soft">
              Trò chuyện với XiaoQiao <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="relative flex flex-col items-center">
          <div className="flex items-end gap-1">
            <Panda mood="wave" size={150} label="Bé gấu trúc XiaoQiao vẫy tay chào" />
            <p className="pop-in relative mb-24 rounded-3xl border-2 border-ink bg-paper px-4 py-2 shadow-[0_3px_0_var(--ink)]">
              <span lang="zh-CN" className="han-cute block text-2xl text-seal">
                你好呀！
              </span>
              <span className="text-sm font-medium">Cùng luyện nói nhé!</span>
              <span
                className="absolute -bottom-[8px] left-5 h-3.5 w-3.5 rotate-45 border-r-2 border-b-2 border-ink bg-paper"
                aria-hidden
              />
            </p>
          </div>
          <figure className="paper-stack relative -mt-4 w-full max-w-sm p-6 pr-14">
            <p
              lang="zh-CN"
              aria-hidden
              className="vertical han-cute absolute top-5 right-4 rounded-full border-2 border-seal px-1 py-2 text-sm text-seal"
            >
              四声
            </p>
            <ul className="space-y-3">
              {FOUR.map((f) => (
                <li key={f.tone} className="grid grid-cols-[3.5rem_3rem_1fr] items-center gap-3">
                  <ToneCurve tone={f.tone} size={52} />
                  <span lang="zh-CN" className="han text-4xl">
                    {f.han}
                  </span>
                  <span>
                    <span className="pinyin text-xl" style={{ color: toneColor(f.tone) }}>
                      {f.py}
                    </span>
                    <span className="ml-2 text-sm text-ink-soft">{f.vi}</span>
                  </span>
                </li>
              ))}
            </ul>
            <figcaption className="mt-4 border-t-2 border-dashed border-rule pt-3 text-xs text-ink-soft">
              Một âm “ma”, bốn thanh, bốn nghĩa.
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="-mx-4 sm:-mx-8">
        <InkMountains />
      </div>

      <section aria-label="Có gì trong XiaoQiao">
        <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={s.label} className={`rounded-3xl border-2 border-ink p-5 ${STAT_BG[i]}`}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-serif text-4xl font-bold text-seal">{s.value}</span>
                <span className="mt-1 block text-sm leading-snug">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="grid gap-12 md:grid-cols-[1fr_1fr] md:items-center">
        <div className="paper-stack p-5">
          <DemoChart />
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink-soft">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-6 rounded-full bg-tone-2/40" aria-hidden /> đường mẫu
            </span>
            <span className="flex items-center gap-2">
              <span className="h-0.5 w-6 bg-ink" aria-hidden /> giọng của bạn
            </span>
          </div>
        </div>
        <div>
          <h2 className="font-serif text-3xl font-bold">Nhìn thấy giọng mình</h2>
          <ol className="mt-6 space-y-5">
            {[
              ["Nghe mẫu", "Nghe từ hoặc câu với giọng đọc chuẩn, chậm và rõ."],
              ["Đọc theo", "Bấm nút đỏ và đọc. XiaoQiao tách từng tiếng và đo độ cao giọng."],
              ["Xem và sửa", "Đường giọng của bạn hiện chồng lên đường mẫu, kèm gợi ý sửa bằng tiếng Việt."],
            ].map(([title, text], i) => (
              <li key={title} className="grid grid-cols-[2.75rem_1fr] gap-4">
                <span className="seal h-11 w-11 font-serif text-lg font-bold">{i + 1}</span>
                <span>
                  <span className="font-serif text-xl font-bold">{title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-soft">{text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <h2 className="mb-5 font-serif text-3xl font-bold">Hôm nay học gì nhỉ?</h2>
        <ol className="grid gap-4">
          {CHAPTERS.map((c) => (
            <li key={c.num}>
              <Link
                href={c.href}
                className={`group grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-5 rounded-3xl border-2 border-ink p-5 shadow-[0_4px_0_var(--ink)] transition-transform hover:-translate-y-1 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto_auto] sm:p-6 ${c.bg}`}
              >
                <span className="seal han-cute h-14 w-14 self-start text-3xl" aria-hidden>
                  {c.num}
                </span>
                <span>
                  <span className="font-serif text-2xl font-bold">{c.title}</span>
                  <span className="mt-1 block max-w-md text-sm leading-relaxed">{c.text}</span>
                  <span className="mt-4 block">{c.motif}</span>
                </span>
                <span lang="zh-CN" aria-hidden className="vertical han-cute hidden text-2xl text-seal/50 sm:block">
                  {c.vertical}
                </span>
                <span className="text-2xl text-seal transition-transform group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
