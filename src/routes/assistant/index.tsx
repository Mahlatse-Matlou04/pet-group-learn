import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Bot,
  CalendarClock,
  Mail,
  NotebookPen,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { ResponsibleAiNote } from "@/components/assistant/tool-shell";

const title = "AI Productivity Assistant | PET Group (Pty) Ltd";
const description =
  "One AI workspace for PET Group: generate professional emails, summarise meeting notes into decisions and action items, plan a prioritised day or week, research any topic, and chat with an AI workplace assistant. Built for South African teams with POPIA-aware responsible AI practices.";

export const Route = createFileRoute("/assistant/")({
  component: AssistantDashboard,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const tools = [
  {
    to: "/assistant/email",
    label: "Smart Email Generator",
    icon: Mail,
    copy: "Parent updates, tutor offers, invoices reminders — in a formal, friendly or persuasive tone.",
    problem: "Admin staff spend hours rewriting the same parent and tutor emails.",
  },
  {
    to: "/assistant/notes",
    label: "Meeting Notes Summarizer",
    icon: NotebookPen,
    copy: "Turn messy staff or parent-meeting notes into decisions, an action table and deadlines.",
    problem: "Notes get taken but never turned into follow-up.",
  },
  {
    to: "/assistant/planner",
    label: "AI Task Planner",
    icon: CalendarClock,
    copy: "A prioritised, time-blocked day or week that respects your working hours and breaks.",
    problem: "Tutoring, marking and admin all compete for the same afternoon.",
  },
  {
    to: "/assistant/research",
    label: "AI Research Assistant",
    icon: Search,
    copy: "Briefings on curriculum topics, teaching methods or business questions, with what to verify.",
    problem: "Research is scattered across tabs with no clear recommendation.",
  },
  {
    to: "/assistant/chat",
    label: "AI Chatbot",
    icon: Bot,
    copy: "An interactive workplace assistant for quick questions, drafting and problem solving.",
    problem: "Small questions still cost a colleague's time.",
  },
] as const;

function AssistantDashboard() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl bg-hero-gradient p-6 text-primary-foreground shadow-soft sm:p-10">
        <p className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]">
          <Sparkles className="size-3.5" /> One integrated platform
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight sm:text-4xl">
          AI Productivity Assistant for PET Group
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
          Five AI-powered tools in one dashboard, built on carefully engineered prompts, to remove the
          repetitive admin behind running a tutoring company — writing, summarising, planning and
          researching — while keeping a human in control of every output.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/assistant/email"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-foreground px-4 py-2.5 text-sm font-semibold text-primary transition hover:opacity-90"
          >
            <Zap className="size-4" /> Start with an email
          </Link>
          <Link
            to="/assistant/chat"
            className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/40 px-4 py-2.5 text-sm font-semibold transition hover:bg-primary-foreground/10"
          >
            <Bot className="size-4" /> Ask the assistant
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.to}
            to={tool.to}
            className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-soft"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-secondary/12 text-secondary">
              <tool.icon className="size-5" />
            </span>
            <h2 className="mt-4 text-base font-bold group-hover:text-secondary">{tool.label}</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">{tool.copy}</p>
            <p className="mt-3 text-xs font-medium text-foreground/70">
              Problem solved: {tool.problem}
            </p>
          </Link>
        ))}
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h2 className="flex items-center gap-2 text-base font-bold">
          <ShieldCheck className="size-4 text-secondary" /> How we use AI responsibly
        </h2>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          <li>Every output is an editable draft — nothing is sent or published automatically.</li>
          <li>Prompts forbid fabricated facts, figures, citations and quotations.</li>
          <li>No personal information is stored: nothing you type is saved after you leave the page.</li>
          <li>POPIA-aware prompts avoid repeating ID, banking, medical or biometric data.</li>
          <li>No legal, medical, tax or financial advice — you are referred to a qualified professional.</li>
          <li>Research output always lists the facts you must verify at source.</li>
        </ul>
        <div className="mt-4">
          <ResponsibleAiNote />
        </div>
      </section>
    </div>
  );
}
