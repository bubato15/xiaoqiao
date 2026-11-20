"use client";

import dynamic from "next/dynamic";

// Speech recognition and synthesis only exist in the browser.
export const TalkRoomClient = dynamic(() => import("./TalkRoom").then((m) => m.TalkRoom), {
  ssr: false,
  loading: () => <p className="text-sm text-ink-soft">Đang tải...</p>,
});
