/**
 * Server-only Lovable AI Gateway helper.
 * Uses the OpenAI-compatible Responses API with streaming (required for
 * reasoning models) and accumulates the final text server-side.
 */

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/responses";
const MODEL = "openai/gpt-5.6-sol";

export type AiTurn = { role: "user" | "assistant"; content: string };

export class AiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "AiError";
  }
}

function messageForStatus(status: number, fallback: string): string {
  switch (status) {
    case 401:
      return "The AI service is not configured correctly. Please contact the site administrator.";
    case 402:
      return "The workspace has run out of AI credits. Please add credits to continue using the AI features.";
    case 403:
      return "AI access is currently blocked by workspace policy. Please contact the administrator.";
    case 429:
      return "Too many requests right now. Please wait a moment and try again.";
    default:
      return fallback || "The AI service could not complete this request.";
  }
}

export async function callGateway(options: {
  system: string;
  turns: AiTurn[];
  effort?: "low" | "medium" | "high";
}): Promise<string> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new AiError(401, messageForStatus(401, ""));

  const input = [
    { role: "developer" as const, content: [{ type: "input_text", text: options.system }] },
    ...options.turns.map((turn) =>
      turn.role === "user"
        ? { role: "user" as const, content: [{ type: "input_text", text: turn.content }] }
        : { role: "assistant" as const, content: [{ type: "output_text", text: turn.content }] },
    ),
  ];

  const res = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "fetch",
    },
    body: JSON.stringify({
      model: MODEL,
      input,
      stream: true,
      store: false,
      reasoning: { effort: options.effort ?? "low", summary: "auto" },
    }),
  });

  if (!res.ok || !res.body) {
    let detail = "";
    try {
      const body = (await res.json()) as { error?: { message?: string }; message?: string };
      detail = body.error?.message ?? body.message ?? "";
    } catch {
      detail = "";
    }
    throw new AiError(res.status, messageForStatus(res.status, detail));
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const payload = trimmed.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        const event = JSON.parse(payload) as {
          type?: string;
          delta?: string;
          response?: { output_text?: string | string[] };
        };
        if (event.type === "response.output_text.delta" && typeof event.delta === "string") {
          text += event.delta;
        } else if (event.type === "response.completed" && !text) {
          const out = event.response?.output_text;
          if (typeof out === "string") text = out;
          else if (Array.isArray(out)) text = out.join("");
        }
      } catch {
        // ignore non-JSON keepalive lines
      }
    }
  }

  if (!text.trim()) {
    throw new AiError(502, "The AI returned an empty response. Please try again with more detail.");
  }
  return text.trim();
}

/** Shared guardrails applied to every feature prompt (incl. South African compliance). */
export const SA_GUARDRAILS = `
OPERATING CONTEXT & COMPLIANCE (South Africa):
- The user is a South African professional. Use South African English spelling, ZAR (R) for currency,
  the DD/MM/YYYY date format, SAST (UTC+2) times, and the metric system.
- Respect POPIA (Protection of Personal Information Act 4 of 2013): never invent, request, or repeat
  unnecessary personal information such as ID numbers, banking details, medical or biometric data.
  If the user's input contains such data, do not echo it back in full.
- Respect the Basic Conditions of Employment Act, the Labour Relations Act, the Employment Equity Act,
  the Consumer Protection Act and the Electronic Communications and Transactions Act where relevant.
- Never give binding legal, medical, tax or financial advice. Provide general guidance and explicitly
  recommend a suitably qualified South African professional for regulated matters.
- Refuse to produce misleading, discriminatory, defamatory or deceptive content.
- Do not fabricate facts, statistics, citations or quotations. If something is unknown or depends on
  information you were not given, say so plainly and list the assumption.
- Keep a professional, respectful and inclusive tone at all times.
`.trim();
