import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Calibration } from "@/components/Calibration";
import { LEVEL_INFO } from "@/data/hsk";
import { placementPool } from "@/data/placement";
import { FreeRead, LevelCheck } from "./LevelClient";

export const metadata: Metadata = { title: "Đo trình độ · Luyện nói cùng XiaoQiao" };

// Only a small sentence pool and the level goals reach the client, not the full lesson data.
const POOL = placementPool();
const GOALS = Object.fromEntries(Object.entries(LEVEL_INFO).map(([level, info]) => [level, info.goal]));

const SECTIONS = [
  {
    num: "一",
    title: "Nghe giọng đoán trình độ",
    lead: "Đọc to một câu cho mỗi cấp HSK. XiaoQiao chấm thanh điệu, phát âm và độ trôi chảy rồi đoán bạn đang ở cấp nào.",
    body: <LevelCheck pool={POOL} goals={GOALS} />,
  },
  {
    num: "二",
    title: "Chấm điểm giọng đọc",
    lead: "Nhập một đoạn tiếng Trung bất kỳ hoặc chọn đoạn mẫu, đọc to và nhận điểm trên thang 100.",
    body: <FreeRead />,
  },
];

export default function LevelPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        eyebrow="Đo trình độ"
        title="Đọc cho XiaoQiao nghe nào"
        glyph="测"
        vertical="水平测试"
        lead="Điểm giọng đọc gồm ba phần: thanh điệu (một nửa số điểm), phát âm phụ âm và vần, và độ trôi chảy khi đọc cả câu. Mọi việc chấm đều chạy ngay trên trình duyệt của bạn."
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
