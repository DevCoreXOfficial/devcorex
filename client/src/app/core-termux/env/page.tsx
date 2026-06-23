"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Settings, ExternalLink, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const commands = [
  { cmd: "core env", desc: "Show help" },
  { cmd: "core env set", desc: "Add or update a variable (value hidden while typing)" },
  { cmd: "core env unset", desc: "Remove a variable (shows list to choose from)" },
  { cmd: "core env ls", desc: "List all user-defined variables" },
];

const features = [
  {
    title: "Hidden Values",
    desc: "Values are hidden with ● when typing — safe for API keys and tokens",
  },
  {
    title: "Smart Detection",
    desc: "Detects existing variables and warns before replacing",
  },
  {
    title: "Clean Removal",
    desc: "Removes all definitions of the same variable name",
  },
  {
    title: "Shell Aware",
    desc: "Writes to .zshrc if it exists, otherwise .bashrc",
  },
];

export default function EnvPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCommand = (id: string, cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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
              <Settings className="mr-1.5 h-3 w-3" />
              Environment
            </Badge>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
              Core Env
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl text-lg sm:text-xl">
              Manage environment variables in your shell rc file. All operations
              are interactive with hidden input for sensitive values.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="border-border relative max-w-full overflow-hidden rounded-xl border bg-neutral-900 dark:bg-neutral-950">
                <div className="overflow-x-auto p-4">
                  <pre className="font-mono text-sm whitespace-nowrap text-emerald-600 dark:text-emerald-400">
                    <code>core env set</code>
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
              Features
            </h2>
          </motion.div>

          <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border-border bg-background rounded-xl border p-5"
              >
                <h3 className="mb-2 text-base font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Commands
            </h2>
          </motion.div>

          <div className="space-y-3">
            {commands.map((cmd, index) => (
              <motion.div
                key={cmd.cmd}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="border-border bg-background hover:border-foreground/20 rounded-xl border p-4 transition-colors"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                      <Terminal className="text-muted-foreground h-4 w-4" />
                    </div>
                    <div>
                      <code className="font-mono text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        {cmd.cmd}
                      </code>
                      <p className="text-muted-foreground mt-0.5 text-xs">
                        {cmd.desc}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyCommand(cmd.cmd, cmd.cmd)}
                    className="text-muted-foreground hover:text-foreground shrink-0 text-xs"
                  >
                    {copiedId === cmd.cmd ? "Copied!" : "Copy"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="mb-6 text-2xl font-bold sm:text-3xl">
              Example Session
            </h2>
            <div className="border-border/50 overflow-hidden rounded-xl border bg-neutral-900 dark:bg-neutral-950">
              <div className="overflow-x-auto p-4">
                <pre className="font-mono text-xs text-emerald-600 dark:text-emerald-400 sm:text-sm">
                  <code>{`$ core env set

    ┌─────────────────────────────────────────┐
    │         Set Environment Variable          │
    └─────────────────────────────────────────┘

    ┌─ Variable name
    └─▶ OPENAI_API_KEY

    ┌─ Value for OPENAI_API_KEY
    │  (input will be hidden)
    └─▶ ●●●●●●●●●●●●●●

    ✔ Variable OPENAI_API_KEY set in .zshrc
    • Run: source .zshrc to apply

$ core env ls

    ─────── Environment Variables ───────

    File: .zshrc

    OPENAI_API_KEY              = sk-...
    DATABASE_URL                = postgresql://...

    ──────────────────────────────────────
    2 variable(s) in .zshrc`}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
