import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import {
  Bot,
  CalendarClock,
  LayoutDashboard,
  Mail,
  Menu,
  NotebookPen,
  Search,
  Sparkles,
} from "lucide-react";
import { useState, type ComponentType } from "react";

import { ResponsibleAiNote } from "@/components/assistant/tool-shell";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export const Route = createFileRoute("/assistant")({
  component: AssistantLayout,
});

type NavItem = {
  to: string;
  label: string;
  hint: string;
  icon: ComponentType<{ className?: string }>;
};

export const navItems: NavItem[] = [
  { to: "/assistant", label: "Dashboard", hint: "Overview of every tool", icon: LayoutDashboard },
  { to: "/assistant/email", label: "Email Generator", hint: "Professional emails by tone", icon: Mail },
  {
    to: "/assistant/notes",
    label: "Notes Summarizer",
    hint: "Decisions, actions, deadlines",
    icon: NotebookPen,
  },
  { to: "/assistant/planner", label: "Task Planner", hint: "Prioritised day or week", icon: CalendarClock },
  { to: "/assistant/research", label: "Research Assistant", hint: "Briefings and insights", icon: Search },
  { to: "/assistant/chat", label: "AI Chatbot", hint: "Ask the workplace assistant", icon: Bot },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="space-y-1" aria-label="Assistant tools">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          activeOptions={{ exact: item.to === "/assistant" }}
          className="group flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-muted data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
        >
          <item.icon className="mt-0.5 size-4 shrink-0" />
          <span>
            <span className="block font-semibold">{item.label}</span>
            <span className="block text-xs text-muted-foreground group-data-[status=active]:text-primary-foreground/75">
              {item.hint}
            </span>
          </span>
        </Link>
      ))}
    </nav>
  );
}

function Brand() {
  return (
    <Link to="/assistant" className="flex items-center gap-2.5">
      <span className="flex size-9 items-center justify-center rounded-xl bg-hero-gradient text-primary-foreground">
        <Sparkles className="size-4" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-sm font-bold">AI Productivity</span>
        <span className="block text-xs text-muted-foreground">Assistant · South Africa</span>
      </span>
    </Link>
  );
}

function AssistantLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background lg:flex">
      <aside className="hidden w-72 shrink-0 border-r border-border bg-card px-4 py-6 lg:flex lg:flex-col lg:gap-6">
        <Brand />
        <NavLinks />
        <div className="mt-auto space-y-3">
          <ResponsibleAiNote>
            <strong className="font-semibold text-foreground">Human in the loop.</strong> Every output
            is a draft. You review, edit and approve before it leaves this screen.
          </ResponsibleAiNote>
          <Link to="/" className="block text-xs text-muted-foreground underline-offset-4 hover:underline">
            ← Back to PET Group website
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-card/95 px-4 py-3 backdrop-blur lg:hidden">
          <Brand />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open navigation">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto p-4">
              <SheetTitle className="sr-only">Assistant navigation</SheetTitle>
              <div className="mb-6">
                <Brand />
              </div>
              <NavLinks onNavigate={() => setOpen(false)} />
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="mt-6 block text-xs text-muted-foreground underline-offset-4 hover:underline"
              >
                ← Back to PET Group website
              </Link>
            </SheetContent>
          </Sheet>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
          <Outlet />
        </main>

        <footer className="border-t border-border px-4 py-6 text-center text-xs text-muted-foreground sm:px-6">
          AI Productivity Assistant · AI-generated content must be reviewed by a human before use ·
          Personal information is never stored by this app (POPIA)
        </footer>
      </div>
    </div>
  );
}
