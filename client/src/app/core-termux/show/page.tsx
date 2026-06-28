"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const examples = [
  { cmd: "core show ai --opencode", desc: "Show OpenCode documentation" },
  { cmd: "core show db --postgresql", desc: "Show PostgreSQL documentation" },
  { cmd: "core show npm --typescript", desc: "Show TypeScript documentation" },
];

export default function ShowPage() {
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
              <Eye className="mr-1.5 h-3 w-3" />
              Show
            </Badge>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
              Core Show
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl text-lg sm:text-xl">
              Display help documentation for any installed tool. Documentation is
              loaded from the tool&apos;s README.md file.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="border-border relative max-w-full overflow-hidden rounded-xl border bg-neutral-900 dark:bg-neutral-950">
                <div className="overflow-x-auto p-4">
                  <pre className="font-mono text-sm whitespace-nowrap text-[#00FF00]">
                    <code>core show &lt;module&gt; --&lt;tool&gt;</code>
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
              Commands
            </h2>
          </motion.div>

          <div className="mb-12 space-y-4">
            {[
              { cmd: "core show", desc: "Show help" },
              { cmd: "core show <module>", desc: "List all tools in a module" },
              { cmd: "core show <module> --<tool>", desc: "Show specific tool documentation" },
            ].map((item, index) => (
              <motion.div
                key={item.cmd}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border-border bg-background rounded-xl border p-4"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <code className="font-mono text-sm font-semibold text-slate-900 dark:text-[#00FF00]">
                      {item.cmd}
                    </code>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      {item.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => copyCommand(item.cmd, item.cmd)}
                    className="text-muted-foreground hover:text-foreground shrink-0 text-xs"
                  >
                    {copiedId === item.cmd ? "Copied!" : "Copy"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-2xl font-bold sm:text-3xl">
              Examples
            </h2>
            <div className="space-y-3">
              {examples.map((ex, index) => (
                <motion.div
                  key={ex.cmd}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="border-border bg-background rounded-xl border p-4"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <code className="font-mono text-sm font-semibold text-slate-900 dark:text-[#00FF00]">
                        {ex.cmd}
                      </code>
                      <p className="text-muted-foreground mt-0.5 text-xs">
                        {ex.desc}
                      </p>
                    </div>
                    <button
                      onClick={() => copyCommand(ex.cmd, ex.cmd)}
                      className="text-muted-foreground hover:text-foreground shrink-0 text-xs"
                    >
                      {copiedId === ex.cmd ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
              Colorized Output
            </h2>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">
              If <code>glow</code> is installed, documentation is displayed with syntax
              highlighting. Otherwise, plain text is shown.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
