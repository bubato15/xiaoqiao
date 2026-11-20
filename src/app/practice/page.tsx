import type { Metadata } from "next";
import Link from "next/link";
import { PRACTICE_TOPICS } from "@/data/practice";
import { PageHeader } from "@/components/PageHeader";
import { PracticeProgressSummary } from "./PracticeProgressSummary";

export const metadata: Metadata = {
  title: "Bài tập ghi nhớ từ vựng & phản xạ giao tiếp · XiaoQiao",
  description:
    "Luyện tập từ vựng tiếng Trung theo chuyên đề: Flashcard ghi nhớ, trắc nghiệm phản xạ 2 chiều và luyện dịch câu nói thực chiến.",
};

const UPCOMING_TOPICS = [
  {
    title: "Tiếng Trung văn phòng & công sở",
    chineseTitle: "办公室汉语",
    icon: "💼",
    desc: "Giao tiếp đồng nghiệp, email, báo cáo tiến độ, xin nghỉ phép và họp hành.",
  },
  {
    title: "Tiếng Trung thương mại & xuất nhập khẩu",
    chineseTitle: "外贸商务汉语",
    icon: "🚢",
    desc: "Đàm phán giá cả, hợp đồng, vận đơn, thanh toán quốc tế và hải quan.",
  },
];

export default function PracticePage() {
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Mục bài tập & phản xạ"
        title="Bài tập ghi nhớ từ mới & Luyện phản xạ"
        lead={
          <>
            Phương pháp học từ mới kết hợp <b>Thẻ ghi nhớ Flashcard</b>, <b>Trắc nghiệm phản xạ 2 chiều</b>,{" "}
            <b>Luyện dịch câu thực tế</b> và <b>chấm điểm giọng nói trực tiếp</b> với bé gấu trúc XiaoQiao.
          </>
        }
        glyph="练"
        vertical="练习"
      />

      <PracticeProgressSummary topics={PRACTICE_TOPICS} />

      {/* Topics section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-rule pb-2">
          <h2 className="font-serif text-2xl font-bold text-ink">Chủ đề bài tập hiện có</h2>
          <span className="text-xs text-ink-soft">Chọn chủ đề để bắt đầu luyện tập</span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {PRACTICE_TOPICS.map((topic) => (
            <Link
              key={topic.id}
              href={`/practice/${topic.id}`}
              className="group relative rounded-3xl border-3 border-ink bg-paper p-6 sm:p-8 transition-all shadow-[0_6px_0_var(--ink)] hover:translate-y-[-2px] hover:shadow-[0_8px_0_var(--ink)] active:translate-y-[2px] active:shadow-[0_2px_0_var(--ink)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-4xl">{topic.icon}</span>
                <span className="rounded-full bg-peach px-3 py-1 text-xs font-bold text-seal">
                  {topic.tag}
                </span>
              </div>

              <div className="mt-4">
                <h3 className="font-serif text-2xl font-bold text-ink group-hover:text-seal transition-colors">
                  {topic.title}
                </h3>
                <p lang="zh-CN" className="han text-sm font-semibold text-seal mt-0.5">
                  {topic.chineseTitle}
                </p>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{topic.description}</p>
              </div>

              {/* Categories tags preview */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {topic.categories.map((c) => (
                  <span
                    key={c}
                    className="rounded-lg bg-paper-deep px-2.5 py-1 text-xs font-medium text-ink-soft"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-rule pt-4 text-xs font-semibold">
                <span className="text-ink-soft">
                  {topic.words.length} từ vựng · {topic.sentences.length} câu phản xạ
                </span>
                <span className="seal px-4 py-1.5 text-xs text-white">
                  Vào luyện ngay →
                </span>
              </div>
            </Link>
          ))}

          {/* Upcoming topics */}
          {UPCOMING_TOPICS.map((u) => (
            <div
              key={u.title}
              className="relative rounded-3xl border-2 border-dashed border-rule bg-paper/60 p-6 sm:p-8 opacity-75"
            >
              <div className="flex items-center justify-between">
                <span className="text-4xl grayscale opacity-70">{u.icon}</span>
                <span className="rounded-full border border-rule bg-paper px-3 py-1 text-xs font-semibold text-ink-soft">
                  Sắp ra mắt
                </span>
              </div>
              <div className="mt-4">
                <h3 className="font-serif text-xl font-bold text-ink-soft">{u.title}</h3>
                <p lang="zh-CN" className="han text-sm font-semibold text-ink-soft/80 mt-0.5">
                  {u.chineseTitle}
                </p>
                <p className="mt-2 text-xs text-ink-soft leading-relaxed">{u.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guide & tips section */}
      <section className="rounded-3xl border-2 border-rule bg-paper p-6 sm:p-8">
        <h3 className="font-serif text-xl font-bold text-ink mb-4">
          💡 Cách học bài tập hiệu quả cùng XiaoQiao
        </h3>
        <div className="grid gap-4 sm:grid-cols-3 text-sm">
          <div className="rounded-2xl bg-paper-deep p-4">
            <h4 className="font-bold text-ink mb-1">1. Ghi nhớ bằng Thẻ Flashcard</h4>
            <p className="text-xs text-ink-soft leading-relaxed">
              Lướt qua các từ mới, nghe âm thanh chuẩn và lật thẻ để ghi nhớ mặt chữ, pinyin và nghĩa. Đánh dấu từ đã nhớ để theo dõi tiến độ.
            </p>
          </div>
          <div className="rounded-2xl bg-paper-deep p-4">
            <h4 className="font-bold text-ink mb-1">2. Kiểm tra phản xạ trắc nghiệm</h4>
            <p className="text-xs text-ink-soft leading-relaxed">
              Luyện chọn nhanh đáp án theo cả 2 chiều (Hán $\rightarrow$ Việt và Việt $\rightarrow$ Hán) để tạo phản xạ nhận diện từ vựng tức thì.
            </p>
          </div>
          <div className="rounded-2xl bg-paper-deep p-4">
            <h4 className="font-bold text-ink mb-1">3. Phản xạ câu dịch & Luyện nói</h4>
            <p className="text-xs text-ink-soft leading-relaxed">
              Đọc tình huống tiếng Việt, tự ghép câu tiếng Trung trong đầu, xem gợi ý từ khóa rồi bật mic đọc câu để XiaoQiao chấm điểm phát âm!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
