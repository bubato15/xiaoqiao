// Server only: reads API keys. Import it from route handlers, never from client components.

/** Groq exposes an OpenAI-compatible endpoint; OpenRouter is the last fallback with the same shape. */
const PROVIDERS = [
  {
    url: "https://api.groq.com/openai/v1/chat/completions",
    key: process.env.GROQ_API_KEY,
    model: process.env.GROQ_MODEL,
  },
  // Groq rate limits are per model, so a second Groq model keeps the chat alive when the first runs out.
  {
    url: "https://api.groq.com/openai/v1/chat/completions",
    key: process.env.GROQ_API_KEY,
    model: process.env.GROQ_FALLBACK_MODEL,
  },
  {
    url: "https://openrouter.ai/api/v1/chat/completions",
    key: process.env.OPENROUTER_API_KEY,
    model: process.env.OPENROUTER_MODEL,
  },
].filter((p) => p.key && p.model);

export const hasProvider = () => PROVIDERS.length > 0;

export interface Turn {
  role: "user" | "assistant";
  content: string;
}

const MAX_TURNS = 20;
const MAX_CHARS = 300;

/** Keeps only well-formed turns from the client, trimmed to the last MAX_TURNS. */
export const readTurns = (raw: unknown): Turn[] =>
  (Array.isArray(raw) ? (raw as Turn[]) : [])
    .filter((t) => (t?.role === "user" || t?.role === "assistant") && typeof t.content === "string")
    .slice(-MAX_TURNS)
    .map((t) => ({ role: t.role, content: t.content.slice(0, MAX_CHARS) }));

/**
 * Free LLM quotas are shared by every visitor, so each IP gets a small budget.
 * In memory per server instance: good enough until a shared store (e.g. Upstash) is added.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 40;
const hits = new Map<string, number[]>();

/** `bucket` keeps separate budgets per feature, e.g. replaying audio should not use up chat turns. */
export function rateLimited(request: Request, bucket = "llm", max = MAX_REQUESTS): boolean {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > max;
}

/** Asks each provider in turn for a JSON answer; the first one that `accept` turns into a value wins. */
export async function askJSON<T>(
  messages: { role: "system" | "user" | "assistant"; content: string }[],
  accept: (raw: unknown) => T | null,
  temperature = 0.7,
): Promise<T | null> {
  for (const p of PROVIDERS) {
    const res = await fetch(p.url, {
      method: "POST",
      headers: { Authorization: `Bearer ${p.key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: p.model, temperature, response_format: { type: "json_object" }, messages }),
      signal: AbortSignal.timeout(20000),
    }).catch(() => null);
    if (!res?.ok) continue;

    try {
      const data = await res.json();
      const value = accept(JSON.parse(data.choices[0].message.content));
      if (value !== null) return value;
    } catch {}
  }
  return null;
}
