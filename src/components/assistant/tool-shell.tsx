import { AlertTriangle, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

export function ToolHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">{eyebrow}</p>
      <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
      <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
    </header>
  );
}

export function ErrorNotice({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground"
    >
      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
      <p>{message}</p>
    </div>
  );
}

export function ResponsibleAiNote({ children }: { children?: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-border bg-muted/50 p-4 text-xs leading-relaxed text-muted-foreground">
      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-secondary" />
      <p>
        {children ?? (
          <>
            <strong className="font-semibold text-foreground">Responsible AI:</strong> outputs are
            AI-generated and may be incomplete or wrong. Check facts, figures and dates before you act
            on them, keep a human in the loop for any decision that affects people, and never paste
            personal information (ID numbers, banking or medical details) — that is your duty under
            POPIA. This tool does not provide legal, medical, tax or financial advice.
          </>
        )}
      </p>
    </div>
  );
}

export function FormCard({ children, onSubmit }: { children: ReactNode; onSubmit: () => void }) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="space-y-4 rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-6"
    >
      {children}
    </form>
  );
}
