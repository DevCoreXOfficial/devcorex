"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolTerminal } from "@/components/terminal-block";

const shellPlugins = [
  {
    name: "powerlevel10k",
    desc: "Modern and fast ZSH theme with instant prompts",
    install: "core install shell --powerlevel10k",
  },
  {
    name: "zsh-autosuggestions",
    desc: "Smart autocompletion based on command history",
    install: "core install shell --zsh-autosuggestions",
  },
  {
    name: "zsh-syntax-highlighting",
    desc: "Syntax highlighting for ZSH commands",
    install: "core install shell --zsh-syntax-highlighting",
  },
  {
    name: "zsh-history-substring-search",
    desc: "History search with arrow keys",
    install: "core install shell --history-substring",
  },
  {
    name: "zsh-completions",
    desc: "Additional completions for ZSH",
    install: "core install shell --zsh-completions",
  },
  {
    name: "fzf-tab",
    desc: "Fuzzy navigation in ZSH completions",
    install: "core install shell --fzf-tab",
  },
  {
    name: "zsh-you-should-use",
    desc: "Command suggestions to use full command names",
    install: "core install shell --you-should-use",
  },
  {
    name: "zsh-autopair",
    desc: "Auto-close parentheses, quotes and brackets",
    install: "core install shell --zsh-autopair",
  },
  {
    name: "zsh-defer",
    desc: "Deferred plugin loading for faster startup",
    install: "core install shell --zsh-defer",
  },
  {
    name: "better-npm-completion",
    desc: "Better npm completion for ZSH",
    install: "core install shell --better-npm",
  },
];

const features = [
  "Oh My Zsh framework",
  "10 pre-configured plugins",
  "Powerlevel10k theme with instant prompts",
  "Persistent session (restores last directory)",
  "Custom font support",
];

export default function ShellPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyInstall = (id: string, cmd: string) => {
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
              <Layers className="mr-1.5 h-3 w-3" />
              Shell
            </Badge>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
              ZSH Shell
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl text-lg sm:text-xl">
              ZSH + Oh My Zsh with 10 plugins including powerlevel10k theme,
              autosuggestions, and syntax highlighting.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="border-border relative max-w-full overflow-hidden rounded-xl border bg-neutral-900 dark:bg-neutral-950">
                <div className="overflow-x-auto p-4">
                  <pre className="font-mono text-sm whitespace-nowrap text-[#00FF00]">
                    <code>core install shell</code>
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
            className="mb-8 text-center"
          >
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
              Installed Plugins
            </h2>
            <p className="text-muted-foreground text-base">
              {shellPlugins.length} ZSH plugins
            </p>
          </motion.div>

          <div className="space-y-4">
            {shellPlugins.map((plugin, index) => (
              <motion.div
                key={plugin.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="border-border bg-background rounded-xl border p-4"
              >
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-medium">{plugin.name}</h3>
                </div>
                <p className="text-muted-foreground mb-3 text-xs">
                  {plugin.desc}
                </p>
                <ToolTerminal
                  command={plugin.install}
                  copied={copiedId === plugin.name}
                  onCopy={() => copyInstall(plugin.name, plugin.install)}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-border bg-muted/30 mt-8 rounded-xl border p-6"
          >
            <h3 className="mb-2 text-lg font-semibold">Persistent Session</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              The shell saves your current directory and restores it when
              opening a new session.
            </p>
            <div className="border-border/50 max-w-full overflow-hidden rounded-lg border bg-neutral-900 p-3">
              <div className="overflow-x-auto">
                <pre className="font-mono text-xs text-[#00FF00]">
                  <code>{`# Session 1
$ cd projects/my-app
$ exit

# Session 2
$ pwd
/data/data/com.termux/files/home/projects/my-app  ← Same directory`}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
