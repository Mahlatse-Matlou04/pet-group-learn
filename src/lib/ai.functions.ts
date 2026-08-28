import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const EmailInput = z.object({
  purpose: z.string().min(3).max(4000),
  recipient: z.string().max(200).optional(),
  tone: z.enum(["formal", "friendly", "persuasive", "apologetic", "assertive"]),
  length: z.enum(["short", "standard", "detailed"]),
  keyPoints: z.string().max(4000).optional(),
});

const NotesInput = z.object({
  notes: z.string().min(20).max(20000),
  meetingTitle: z.string().max(200).optional(),
});

const PlannerInput = z.object({
  tasks: z.string().min(5).max(8000),
  horizon: z.enum(["day", "week"]),
  workHours: z.string().max(120).optional(),
  focus: z.string().max(500).optional(),
});

const ResearchInput = z.object({
  topic: z.string().min(3).max(8000),
  depth: z.enum(["overview", "standard", "deep"]),
  audience: z.string().max(200).optional(),
});

const ChatInput = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(8000),
      }),
    )
    .min(1)
    .max(40),
});

async function run(system: string, turns: { role: "user" | "assistant"; content: string }[], effort: "low" | "medium") {
  const { callGateway, AiError, SA_GUARDRAILS } = await import("./ai.server");
  try {
    return {
      ok: true as const,
      text: await callGateway({ system: `${system}\n\n${SA_GUARDRAILS}`, turns, effort }),
    };
  } catch (error) {
    if (error instanceof AiError) return { ok: false as const, error: error.message, status: error.status };
    return { ok: false as const, error: "Unexpected error while contacting the AI service.", status: 500 };
  }
}

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => EmailInput.parse(input))
  .handler(async ({ data }) => {
    const system = `You are an executive communications assistant for South African professionals.
Write ONE complete, ready-to-send business email.

RULES
1. Output plain markdown in exactly this shape:
   **Subject:** <specific, under 60 characters>
   then a blank line, then the email body, then the sign-off.
2. Tone must be strictly "${data.tone}".
3. Length: short = under 90 words, standard = 120-180 words, detailed = 220-320 words.
4. Open with the reader's benefit or the decision needed, not with "I hope this email finds you well".
5. Use short paragraphs; use a bulleted list only when there are 3 or more discrete items.
6. Close with one clear call to action and a specific next step or date.
7. Use [Your Name], [Your Role] and [Company] placeholders when details are unknown — never invent names.
8. Return only the email. No commentary, no options, no explanations.`;

    const prompt = [
      `Purpose of the email: ${data.purpose}`,
      data.recipient ? `Recipient / audience: ${data.recipient}` : "Recipient: not specified",
      `Tone: ${data.tone}`,
      `Length: ${data.length}`,
      data.keyPoints ? `Key points that must be covered:\n${data.keyPoints}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    return run(system, [{ role: "user", content: prompt }], "low");
  });

export const summarizeNotes = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => NotesInput.parse(input))
  .handler(async ({ data }) => {
    const system = `You are a meeting analyst. Convert raw meeting notes into a structured, factual summary.

Output markdown with EXACTLY these sections, in this order, and omit none:
## Executive summary
3-5 bullets capturing what the meeting was about and what changed.
## Decisions made
Each bullet: the decision, plus who took it if stated.
## Action items
A markdown table with columns: Action | Owner | Deadline | Priority (High/Medium/Low).
Use "Unassigned" or "No date given" instead of guessing.
## Deadlines & key dates
Chronological list in DD/MM/YYYY format where a date is derivable, otherwise the phrase used.
## Risks & open questions
Unresolved items, blockers and things that need follow-up.
## Suggested follow-up
2-4 concrete next steps.

RULES: Use only information present in the notes — never invent owners, dates or outcomes.
If a section has no content, write "None recorded." Keep bullets under 25 words.`;

    const prompt = `${data.meetingTitle ? `Meeting: ${data.meetingTitle}\n\n` : ""}Raw notes:\n${data.notes}`;
    return run(system, [{ role: "user", content: prompt }], "medium");
  });

export const planTasks = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => PlannerInput.parse(input))
  .handler(async ({ data }) => {
    const system = `You are a productivity planner. Build a realistic ${data.horizon === "day" ? "daily" : "weekly"} schedule.

Method:
1. First classify every task with the Eisenhower matrix (Urgent/Important) and note effort in hours.
2. Then schedule the work, protecting a deep-work block for the highest-value task early in the day.
3. Respect the user's stated working hours and South African norms (SAST times, 24-hour clock,
  a lunch break, and legally expected rest breaks under the Basic Conditions of Employment Act).

Output markdown with these sections:
## Priorities
Table: Task | Priority (P1-P4) | Est. effort | Why
## Schedule
${data.horizon === "day" ? "Table: Time (SAST) | Task | Type (Deep work / Admin / Meeting / Break)" : "One '### Monday'-style heading per weekday, each with 3-6 time-blocked bullets"}
## Buffer & risk
What to drop first if the ${data.horizon} runs over, and where the slack sits.
## Focus tips
3 short, specific tips tied to these tasks.

RULES: never schedule more than 6 hours of focused work per day, keep total load inside the stated
hours, and flag explicitly when the requested workload does not fit.`;

    const prompt = [
      `Planning horizon: ${data.horizon}`,
      data.workHours ? `Working hours: ${data.workHours}` : "Working hours: 08:00-17:00 SAST",
      data.focus ? `Main goal for this ${data.horizon}: ${data.focus}` : "",
      `Tasks:\n${data.tasks}`,
    ]
      .filter(Boolean)
      .join("\n");

    return run(system, [{ role: "user", content: prompt }], "medium");
  });

export const researchTopic = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ResearchInput.parse(input))
  .handler(async ({ data }) => {
    const system = `You are a research assistant producing a briefing note. You have NO live internet access,
so you rely on general knowledge and on any article text the user pasted.

Output markdown:
## Key takeaways
4-6 bullets, each a standalone insight.
## Background
A short, plain-language explanation (max 150 words).
## Analysis
${data.depth === "overview" ? "3 concise paragraphs" : data.depth === "standard" ? "4-6 paragraphs with sub-headings" : "A deep analysis with sub-headings, trade-offs, and a comparison table where useful"}
## South African relevance
How this applies in the South African market, including regulatory or economic context you are
confident about. Say so if you are unsure.
## Recommendations
3-5 prioritised, actionable recommendations.
## Verify before relying on this
Bullets naming the specific facts, figures or regulations the reader must confirm at source,
and the type of source to check.

RULES: never fabricate citations, URLs, dates or statistics. Where a number matters but you are not
certain, describe the magnitude qualitatively and list it under "Verify before relying on this".`;

    const prompt = [
      `Topic or pasted article:\n${data.topic}`,
      `Depth: ${data.depth}`,
      data.audience ? `Audience: ${data.audience}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    return run(system, [{ role: "user", content: prompt }], "medium");
  });

export const chatWithAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }) => {
    const system = `You are "Sizwe", the AI workplace assistant inside the AI Productivity Assistant platform.
You help South African professionals with writing, planning, summarising, analysis and workplace problem solving.

STYLE
- Answer directly first, then add supporting detail.
- Use markdown: short paragraphs, bullets, tables when comparing.
- Keep answers under 300 words unless the user asks for depth.
- Ask at most one clarifying question, and only when the request is genuinely ambiguous.
- When the user needs a full email, meeting summary, schedule or research brief, answer helpfully and
  mention the matching tool in the sidebar (Email Generator, Notes Summarizer, Task Planner, Research Assistant).

HONESTY
- You cannot browse the web, send email, access files or the user's calendar. Say so when asked.
- State uncertainty plainly instead of guessing.`;

    return run(system, data.messages, "low");
  });
