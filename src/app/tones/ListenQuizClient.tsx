"use client";

import dynamic from "next/dynamic";

// Speech synthesis only exists in the browser.
export const ListenQuiz = dynamic(() => import("./ToneTrainer").then((m) => m.ListenQuiz), {
  ssr: false,
  loading: () => <p className="text-sm text-ink-soft">Đang tải...</p>,
});
