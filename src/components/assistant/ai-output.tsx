import { Check, Copy, Download, Pencil, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  value: string;
  onChange: (next: string) => void;
  filename: string;
  emptyHint: string;
  loading?: boolean;
  onRegenerate?: () => void;
};

export function AiOutput({ value, onChange, filename, emptyHint, loading, onRegenerate }: Props) {
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const download = () => {
    const blob = new Blob([value], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="space-y-3">
          {[90, 100, 75, 95, 60].map((width) => (
            <div
              key={width}
              className="h-3 animate-pulse rounded-full bg-muted"
              style={{ width: `${width}%` }}
            />
          ))}
        </div>
        <p className="mt-5 text-sm text-muted-foreground">
          The assistant is thinking — complex requests can take up to a minute.
        </p>
      </div>
    );
  }

  if (!value) {
    return (
      <div className="flex min-h-52 items-center justify-center rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-center">
        <p className="max-w-sm text-sm text-muted-foreground">{emptyHint}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
        <p className="text-sm font-semibold">AI output — review and edit before you use it</p>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={() => setEditing((prev) => !prev)}>
            <Pencil className="mr-1.5 size-3.5" />
            {editing ? "Preview" : "Edit"}
          </Button>
          <Button size="sm" variant="outline" onClick={copy}>
            {copied ? <Check className="mr-1.5 size-3.5" /> : <Copy className="mr-1.5 size-3.5" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button size="sm" variant="outline" onClick={download}>
            <Download className="mr-1.5 size-3.5" />
            Save
          </Button>
          {onRegenerate ? (
            <Button size="sm" variant="secondary" onClick={onRegenerate}>
              <RotateCcw className="mr-1.5 size-3.5" />
              Regenerate
            </Button>
          ) : null}
        </div>
      </div>
      <div className="p-4 sm:p-6">
        {editing ? (
          <Textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="min-h-96 font-mono text-sm"
            aria-label="Edit AI output"
          />
        ) : (
          <article className="ai-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
          </article>
        )}
      </div>
    </div>
  );
}
