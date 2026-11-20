"use client";

import dynamic from "next/dynamic";

// Microphone, localStorage and the random sentence pick only exist in the browser.
const loading = () => <p className="text-sm text-ink-soft">Đang tải...</p>;
export const LevelCheck = dynamic(() => import("./LevelCheck").then((m) => m.LevelCheck), { ssr: false, loading });
export const FreeRead = dynamic(() => import("./FreeRead").then((m) => m.FreeRead), { ssr: false, loading });
