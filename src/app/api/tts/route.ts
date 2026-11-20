import { connection, NextResponse } from "next/server";
import { findVoice } from "@/data/voices";
import { hasAzure, MAX_TTS_CHARS, synthesize } from "@/lib/azure-tts";
import { rateLimited } from "@/lib/llm";

// Each chat reply is spoken once and maybe replayed a few times, so this sits well above the chat budget.
const MAX_TTS_REQUESTS = 120;

/** Lets the picker decide between all Azure voices and only the browser's own. */
export async function GET() {
  // Cache Components would otherwise prerender this at build time, freezing a key added later.
  await connection();
  return NextResponse.json({ enabled: hasAzure() });
}

export async function POST(request: Request) {
  if (!hasAzure()) {
    return NextResponse.json({ error: "Chưa cấu hình AZURE_SPEECH_KEY và AZURE_SPEECH_REGION" }, { status: 503 });
  }
  if (rateLimited(request, "tts", MAX_TTS_REQUESTS)) {
    return NextResponse.json({ error: "Nghe nhiều quá rồi, nghỉ vài phút nhé." }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as { voice?: string; text?: string } | null;
  // Only voices from our list, so the key cannot be used for arbitrary Azure voices.
  const voice = findVoice(String(body?.voice ?? ""));
  const text = String(body?.text ?? "").trim();
  if (!voice || !text || text.length > MAX_TTS_CHARS || !/\p{Script=Han}/u.test(text)) {
    return NextResponse.json({ error: "Yêu cầu không hợp lệ" }, { status: 400 });
  }

  const audio = await synthesize(voice, text);
  if (!audio) return NextResponse.json({ error: "Không tạo được giọng đọc" }, { status: 502 });
  return new Response(audio, { headers: { "Content-Type": "audio/mpeg", "Cache-Control": "private, max-age=86400" } });
}
