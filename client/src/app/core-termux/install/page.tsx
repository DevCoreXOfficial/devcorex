"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolTerminal, CodeBlock } from "@/components/terminal-block";

const modules = [
  { name: "lang", desc: "Programming languages and runtimes", example: "core install lang --python --rust" },
  { name: "db", desc: "Databases (PostgreSQL, MariaDB, SQLite, MongoDB)", example: "core install db --postgresql --sqlite" },
  { name: "ai", desc: "AI agents and coding assistants", example: "core install ai --opencode --ollama" },
  { name: "editor", desc: "Code editor components (Neovim, NvChad)", example: "core install editor" },
  { name: "dev", desc: "Development tools (gh, wget, curl, fzf, etc.)", example: "core install dev --gh --fzf --jq" },
  { name: "npm", desc: "Global npm packages", example: "core install npm --typescript --prettier" },
  { name: "shell", desc: "ZSH plugins", example: "core install shell" },
  { name: "ui", desc: "Termux UI components", example: "core install ui" },
  { name: "auto", desc: "Automation tools (n8n)", example: "core install auto" },
];

export default function InstallPage() {
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
              <Package className="mr-1.5 h-3 w-3" />
              Install
            </Badge>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
              Core Install
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl text-lg sm:text-xl">
              Install individual modules or specific tools within modules. Use
              flags to select only what you need.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="border-border relative max-w-full overflow-hidden rounded-xl border bg-neutral-900 dark:bg-neutral-950">
                <div className="overflow-x-auto p-4">
                  <pre className="font-mono text-sm whitespace-nowrap text-emerald-600 dark:text-emerald-400">
                    <code>core install &lt;module&gt; --tool1 --tool2</code>
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
              { cmd: "core install", desc: "Show help" },
              { cmd: "core install <module>", desc: "Install entire module" },
              { cmd: "core install <module> --tool1 --tool2", desc: "Install specific tools" },
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
                    <code className="font-mono text-sm font-semibold text-emerald-600 dark:text-emerald-400">
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
              Available Modules
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {modules.map((mod, index) => (
                <motion.div
                  key={mod.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="border-border bg-background rounded-xl border p-4"
                >
                  <code className="font-mono text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    {mod.name}
                  </code>
                  <p className="text-muted-foreground mt-1 text-xs">{mod.desc}</p>
                  <ToolTerminal
                    command={mod.example}
                    copied={copiedId === mod.name}
                    onCopy={() => copyCommand(mod.name, mod.example)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="mb-6 text-2xl font-bold sm:text-3xl">
              Examples
            </h2>
            <CodeBlock
              lines={[
                "# Install entire module",
                "core install ai",
                "core install db",
                "",
                "# Install specific tools",
                "core install ai --qwen-code --ollama",
                "core install db --postgresql --sqlite",
                "core install dev --gh --fzf --jq",
                "core install npm --typescript --prettier",
              ]}
              copyCommand="core install ai --qwen-code --ollama"
              copied={copiedId === "examples"}
              onCopy={() => copyCommand("examples", "core install ai --qwen-code --ollama")}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
