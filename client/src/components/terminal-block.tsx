"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface TerminalBlockProps {
  command: string;
  language?: string;
  output?: string[];
  showOutput?: boolean;
}

export function TerminalBlock({
  command,
  output,
  showOutput = true,
}: TerminalBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    toast.success("Command copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group border-border relative my-4 overflow-hidden rounded-xl border bg-neutral-900 dark:bg-neutral-950">
      <div className="border-border/50 flex items-center gap-2 border-b px-4 py-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <span className="text-muted-foreground ml-2 text-xs">terminal</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="absolute top-1/2 right-2 ml-auto h-7 -translate-y-1/2 px-2 opacity-0 transition-opacity group-hover:opacity-100"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="max-w-full overflow-x-auto p-4">
        <pre className="font-mono text-sm whitespace-nowrap text-white">
          <code>{command}</code>
        </pre>
        {showOutput && output && output.length > 0 && (
          <div className="border-border/50 mt-3 border-t pt-3">
            {output.map((line, i) => (
              <p
                key={i}
                className={`font-mono text-sm ${line.startsWith("$") ? "text-muted-foreground" : "text-green-400"}`}
              >
                {line}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface CommandBlockProps {
  title?: string;
  description?: string;
  commands: Array<{
    command: string;
    description?: string;
    output?: string[];
  }>;
}

export function CommandBlock({
  title,
  description,
  commands,
}: CommandBlockProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (cmd: string, index: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIndex(index);
    toast.success("Command copied!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-4">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}
      <div className="space-y-3">
        {commands.map((item, index) => (
          <div
            key={index}
            className="group border-border relative overflow-hidden rounded-xl border bg-neutral-900 dark:bg-neutral-950"
          >
            <div className="border-border/50 flex items-center justify-between border-b bg-neutral-800/50 px-4 py-2">
              <span className="text-muted-foreground text-xs">
                {item.description || "Command"}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(item.command, index)}
                className="h-6 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
              >
                {copiedIndex === index ? (
                  <Check className="h-3 w-3 text-green-400" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </div>
            <div className="overflow-x-auto p-4">
              <pre className="font-mono text-sm whitespace-nowrap text-green-400">
                <code>{item.command}</code>
              </pre>
              {item.output && item.output.length > 0 && (
                <div className="border-border/50 mt-3 border-t pt-3">
                  {item.output.map((line, i) => (
                    <p
                      key={i}
                      className="text-muted-foreground font-mono text-xs"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

