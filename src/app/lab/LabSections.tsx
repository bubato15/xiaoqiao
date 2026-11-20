"use client";

import dynamic from "next/dynamic";

// Microphone, localStorage and Web Speech only exist in the browser, so these never render on the server.
const loading = () => <p className="text-sm text-ink-soft">Đang tải...</p>;
export const ToneLab = dynamic(() => import("./ToneLab").then((m) => m.ToneLab), { ssr: false, loading });
export const SpeechLab = dynamic(() => import("./SpeechLab").then((m) => m.SpeechLab), { ssr: false, loading });
export const ChatLab = dynamic(() => import("./SpeechLab").then((m) => m.ChatLab), { ssr: false, loading });
