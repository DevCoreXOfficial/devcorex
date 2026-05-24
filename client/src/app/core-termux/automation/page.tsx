"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Workflow, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  "Workflow automation platform",
  "No-code/low-code workflow builder",
  "8000+ integrations",
  "Self-hosted option",
  "Webhooks support",
  "Data transformation",
];

const commands = [
  { cmd: "core install automation", desc: "Install n8n" },
  { cmd: "n8n start", desc: "Start n8n server" },
  { cmd: "n8n webhook", desc: "Start n8n in webhook mode" },
];

function ToolTerminal({
  command,
  copied,
  onCopy,
}: {
  command: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="border-border/50 relative max-w-full overflow-hidden rounded-lg border bg-neutral-900 dark:bg-neutral-950">
      <div className="overflow-x-auto p-3 pr-12">
        <pre className="font-mono text-xs whitespace-nowrap text-green-400 sm:text-sm">
          <code>{command}</code>
        </pre>
      </div>
      <button
        onClick={onCopy}
        className={`absolute top-2 right-2 rounded-md p-1.5 transition-colors ${copied ? "bg-green-400/20 text-green-400" : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"}`}
        title="Copy"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

export default function AutomationPage() {
  const [copied, setCopied] = useState(false);

  const copyInstall = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <section className="border-border border-b px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="outline" className="mb-4">
              <Workflow className="mr-1.5 h-3 w-3" />
              Automation
            </Badge>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
              Automation Tools
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl text-lg sm:text-xl">
              n8n workflow automation platform for Termux. Automate tasks and
              connect your services.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="border-border relative max-w-full overflow-hidden rounded-xl border bg-neutral-900 dark:bg-neutral-950">
                <div className="overflow-x-auto p-4">
                  <pre className="font-mono text-sm whitespace-nowrap text-green-400">
                    <code>core install automation</code>
                  </pre>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link href="/core-termux">View CORE-TERMUX Docs &larr;</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-muted/30 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              n8n Workflow Automation
            </h2>
          </motion.div>

          <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border-border bg-background rounded-xl border p-4"
              >
                <p className="text-sm">{feature}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="mb-4 text-xl font-semibold">Installation</h3>
            <ToolTerminal
              command="core install automation --n8n"
              copied={copied}
              onCopy={() => copyInstall("core install automation --n8n")}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="mb-4 text-xl font-semibold">Basic Commands</h3>
            <div className="border-border bg-background rounded-xl border p-4">
              <div className="space-y-3">
                {commands.map((cmd) => (
                  <div key={cmd.cmd} className="flex items-center gap-4">
                    <code className="font-mono text-sm text-green-400">
                      {cmd.cmd}
                    </code>
                    <span className="text-muted-foreground text-sm">
                      — {cmd.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-border bg-muted/30 rounded-xl border p-6"
          >
            <h3 className="mb-2 text-lg font-semibold">Getting Started</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              After installation, start n8n and access the web interface:
            </p>
            <div className="border-border/50 rounded-lg border bg-neutral-900 p-3">
              <pre className="font-mono text-xs text-green-400">
                <code>{`# Start n8n
n8n start

# Access at
http://localhost:5678`}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
