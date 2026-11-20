import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ChatLab, SpeechLab, ToneLab } from "./LabSections";

export const metadata: Metadata = { title: "Phòng thử nghiệm · Luyện nói cùng XiaoQiao" };

const SECTIONS = [
  { num: "一", title: "Thanh điệu", body: <ToneLab /> },
  { num: "二", title: "Nghe và đọc", body: <SpeechLab /> },
  { num: "三", title: "Trò chuyện với AI", body: <ChatLab /> },
];

export default function LabPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        eyebrow="Phòng thử nghiệm"
        title="Kiểm tra trước khi xây"
        glyph="试"
        vertical="技术测试"
        lead="Trang này dùng để đo xem việc chấm thanh điệu ngay trên trình duyệt có đủ chính xác hay không. Mục tiêu là từ 80% trở lên với từ đơn. Bạn hãy đọc đúng thanh cho từng từ, rồi xem bảng độ chính xác ở cuối phần một."
      />
      {SECTIONS.map((s) => (
        <section key={s.num}>
          <h2 className="rule-double mb-8 flex items-center gap-3 font-serif text-3xl font-bold">
            <span lang="zh-CN" className="seal han-cute h-10 w-10 text-xl" aria-hidden>
              {s.num}
            </span>{" "}
            {s.title}
          </h2>
          {s.body}
        </section>
      ))}
    </div>
  );
}
