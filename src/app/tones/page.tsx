import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Calibration } from "@/components/Calibration";
import { PairGrid, ToneIntro } from "./ToneTrainer";
import { ListenQuiz } from "./ListenQuizClient";

export const metadata: Metadata = { title: "Luyện thanh điệu · Luyện nói cùng XiaoQiao" };

const SECTIONS = [
  {
    num: "一",
    title: "Bốn thanh",
    lead: "Nhìn hình dáng của từng thanh, so với thanh tiếng Việt, rồi đọc thử.",
    body: <ToneIntro />,
  },
  {
    num: "二",
    title: "Nghe và chọn thanh",
    lead: "Tai nghe ra được thì miệng mới nói đúng được. Nghe một tiếng rồi chọn thanh của nó.",
    body: <ListenQuiz />,
  },
  {
    num: "三",
    title: "Cặp thanh",
    lead: "Tiếng Trung hay đi theo từng cặp hai tiếng. Mỗi ô là một từ HSK có đúng cặp thanh đó khi nói.",
    body: <PairGrid />,
  },
];

export default function TonesPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        eyebrow="Luyện thanh điệu"
        title="Bốn thanh, luyện cho quen tai"
        glyph="声"
        vertical="四声练习"
        lead="Người Việt có lợi thế vì tiếng mẹ đẻ cũng có thanh. Chỗ khó là thanh tiếng Trung khác về độ cao và độ dài, nhất là thanh 3."
      />
      <Calibration compact />
      {SECTIONS.map((s) => (
        <section key={s.num}>
          <h2 className="rule-double mb-3 flex items-center gap-3 font-serif text-3xl font-bold">
            <span lang="zh-CN" className="seal han-cute h-10 w-10 text-xl" aria-hidden>
              {s.num}
            </span>{" "}
            {s.title}
          </h2>
          <p className="mb-8 max-w-2xl text-sm text-ink-soft">{s.lead}</p>
          {s.body}
        </section>
      ))}
    </div>
  );
}
