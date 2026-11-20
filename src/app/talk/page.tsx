import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { TalkRoomClient } from "./TalkRoomClient";

export const metadata: Metadata = { title: "Hội thoại · Luyện nói cùng XiaoQiao" };

export default function TalkPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Hội thoại"
        title="Nói chuyện với XiaoQiao"
        glyph="话"
        vertical="情景对话"
        lead="Chọn trình độ và một tình huống. XiaoQiao sẽ mở lời trước. Bạn bấm Nói để trả lời bằng giọng, hoặc gõ chữ. Sau mỗi câu, XiaoQiao góp ý bằng tiếng Việt, gợi ý cách nói tự nhiên hơn, và chấm điểm giọng nói nếu bạn trả lời bằng giọng."
      />
      <TalkRoomClient />
    </div>
  );
}
