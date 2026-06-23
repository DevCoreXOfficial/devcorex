"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mic, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const commands = [
  { cmd: "core voice", desc: "Show help" },
  { cmd: "core voice <agent>", desc: "Capture → nvim → launch agent" },
  { cmd: "core voice text", desc: "Capture → nvim → print to stdout" },
  { cmd: "core voice !", desc: "Alias for 'text'" },
];

const agents = [
  { name: "opencode", command: 'opencode run "prompt"' },
  { name: "claude-code", command: 'claude -p "prompt"' },
  { name: "codex", command: 'codex "prompt"' },
  { name: "gemini-cli", command: 'gemini -p "prompt"' },
  { name: "hermes-agent", command: 'hermes chat -q "prompt"' },
  { name: "kimi-code", command: 'kimi -p "prompt"' },
  { name: "mimocode", command: 'mimo run "prompt"' },
  { name: "mistral-vibe", command: 'vibe --prompt "prompt"' },
  { name: "openclaude", command: 'openclaude --bg "prompt"' },
  { name: "pi", command: 'pi -p "prompt"' },
  { name: "qwen-code", command: 'qwen -p "prompt"' },
  { name: "text", command: "Print prompt to stdout" },
];

export default function VoicePage() {
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
              <Mic className="mr-1.5 h-3 w-3" />
              Voice
            </Badge>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
              Core Voice
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl text-lg sm:text-xl">
              Capture voice from the microphone, review it in nvim, and launch an
              AI agent. Perfect for hands-free coding and quick prompts.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="border-border relative max-w-full overflow-hidden rounded-xl border bg-neutral-900 dark:bg-neutral-950">
                <div className="overflow-x-auto p-4">
                  <pre className="font-mono text-sm whitespace-nowrap text-emerald-600 dark:text-emerald-400">
                    <code>core voice opencode</code>
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

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Requirements
            </h2>
          </motion.div>

          <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border-border bg-muted/30 rounded-xl border p-5"
            >
              <h3 className="mb-2 text-base font-semibold">Termux:API</h3>
              <code className="bg-muted block rounded px-2 py-1 font-mono text-xs text-emerald-600 dark:text-emerald-400">
                pkg install termux-api
              </code>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="border-border bg-muted/30 rounded-xl border p-5"
            >
              <h3 className="mb-2 text-base font-semibold">Neovim</h3>
              <code className="bg-muted block rounded px-2 py-1 font-mono text-xs text-emerald-600 dark:text-emerald-400">
                core install editor
              </code>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="border-border bg-muted/30 rounded-xl border p-5"
            >
              <h3 className="mb-2 text-base font-semibold">Termux:API App</h3>
              <Link
                href="/termux/api"
                className="text-primary text-xs hover:underline"
              >
                Download from DevCoreX
              </Link>
            </motion.div>
          </div>
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

          <div className="mb-16 space-y-3">
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
          >
            <h2 className="mb-6 text-2xl font-bold sm:text-3xl">
              Supported Agents
            </h2>
            <p className="text-muted-foreground mb-6 text-sm sm:text-base">
              Voice works with all major AI coding agents:
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {agents.map((agent, index) => (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="border-border bg-background rounded-xl border p-4"
                >
                  <code className="font-mono text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    {agent.name}
                  </code>
                  <p className="text-muted-foreground mt-1 font-mono text-xs">
                    {agent.command}
                  </p>
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
              Example Session
            </h2>
            <div className="border-border/50 overflow-hidden rounded-xl border bg-neutral-900 dark:bg-neutral-950">
              <div className="overflow-x-auto p-4">
                <pre className="font-mono text-xs text-emerald-600 dark:text-emerald-400 sm:text-sm">
                  <code>{`$ core voice opencode

    ➜ Listening through the microphone...
    ➜ Review the prompt in nvim, fix mistakes, then save and quit
    ➜ Launching opencode with prompt…

    # opencode opens with the voice-transcribed prompt`}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
