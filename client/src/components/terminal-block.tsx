"use client";

import { Copy, Check } from "lucide-react";

interface ToolTerminalProps {
  command: string;
  copied: boolean;
  onCopy: () => void;
}

export function ToolTerminal({
  command,
  copied,
  onCopy,
}: ToolTerminalProps) {
  return (
    <div className="border-border/50 relative max-w-full overflow-hidden rounded-lg border bg-neutral-900 dark:bg-neutral-950">
      <div className="overflow-x-auto p-3 pr-12">
        <pre className="font-mono text-xs whitespace-nowrap text-green-400 sm:text-sm">
          <code>{command}</code>
        </pre>
      </div>
      <button
        onClick={onCopy}
        className={`absolute top-2 right-2 cursor-pointer rounded-md p-1.5 transition-colors ${
          copied
            ? "bg-green-400/20 text-green-400"
            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white"
        }`}
        title="Copy"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

interface CodeBlockProps {
  lines: string[];
  copyCommand?: string;
  copied: boolean;
  onCopy: () => void;
}

function extractCommands(lines: string[]): string {
  return lines
    .filter((line) => {
      const t = line.trimStart();
      if (t.startsWith("#") || t.startsWith("//")) return false;
      if (t.startsWith("├") || t.startsWith("└") || t.startsWith("│")) return false;
      if (t.startsWith("←")) return false;
      return true;
    })
    .map((line) => {
      let cmd = line.trimStart();
      cmd = cmd.replace(/^\$\s*/, "");
      cmd = cmd.replace(/\s+#.*$/, "");
      cmd = cmd.replace(/\s+←.*$/, "");
      return cmd.trim();
    })
    .filter(Boolean)
    .join("\n");
}

export function CodeBlock({
  lines,
  copyCommand,
  copied,
  onCopy,
}: CodeBlockProps) {
  const resolvedCommand = copyCommand ?? extractCommands(lines);

  return (
    <div className="border-border/50 relative max-w-full overflow-hidden rounded-lg border bg-neutral-900 dark:bg-neutral-950">
      <div className="overflow-x-auto p-3 pr-12">
        <pre className="font-mono text-xs text-green-400 sm:text-sm">
          {lines.map((line, i) => {
            const trimmed = line.trimStart();
            const isComment =
              trimmed.startsWith("#") ||
              trimmed.startsWith("//") ||
              trimmed.startsWith("├") ||
              trimmed.startsWith("└") ||
              trimmed.startsWith("│");
            const isOutput =
              trimmed.startsWith("/") ||
              trimmed.startsWith("http") ||
              trimmed.startsWith("←");
            return (
              <code key={i} className={`block ${isComment ? "text-muted-foreground" : isOutput ? "text-amber-400" : "text-green-400"}`}>
                {line}
              </code>
            );
          })}
        </pre>
      </div>
      <button
        onClick={onCopy}
        className={`absolute top-2 right-2 cursor-pointer rounded-md p-1.5 transition-colors ${
          copied
            ? "bg-green-400/20 text-green-400"
            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white"
        }`}
        title="Copy"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
