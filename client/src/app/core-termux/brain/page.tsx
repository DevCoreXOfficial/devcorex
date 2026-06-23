"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  Save,
  Search,
  GitBranch,
  FileText,
  Trash2,
  Eye,
  Network,
  Sparkles,
  Link2,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const commands = [
  { cmd: "core brain", desc: "Dashboard with stats", icon: Brain },
  {
    cmd: "core brain init",
    desc: "Initialize brain directory and GitHub repo",
    icon: GitBranch,
  },
  {
    cmd: "core brain save",
    desc: "Interactive: save a new memory",
    icon: Save,
  },
  {
    cmd: "core brain search <query>",
    desc: "Search memories by keywords or tags",
    icon: Search,
  },
  {
    cmd: "core brain ls [category]",
    desc: "List memories by category",
    icon: FileText,
  },
  {
    cmd: "core brain edit",
    desc: "Edit a memory in your $EDITOR",
    icon: FileText,
  },
  {
    cmd: "core brain edit <slug>",
    desc: "Edit a memory by slug name",
    icon: FileText,
  },
  {
    cmd: "core brain delete",
    desc: "Delete a memory permanently",
    icon: Trash2,
  },
  {
    cmd: "core brain show <slug>",
    desc: "View a memory with its relations",
    icon: Eye,
  },
  { cmd: "core brain reset", desc: "Destroy the entire brain", icon: Trash2 },
  {
    cmd: "core brain graph",
    desc: "Visual map of all connections",
    icon: Network,
  },
  {
    cmd: "core brain skill",
    desc: "Create an AI skill from memories",
    icon: Sparkles,
  },
  {
    cmd: "core brain relate",
    desc: "Link two memories interactively",
    icon: Link2,
  },
  {
    cmd: "core brain sync",
    desc: "Push/pull to GitHub private repo",
    icon: RefreshCw,
  },
];

const features = [
  {
    title: "Categorized Storage",
    desc: "Organize memories in folders like frontend/, devops/, linux/ with tags for cross-relations",
  },
  {
    title: "Auto-Relations",
    desc: "Automatically suggests relations based on shared tags when saving",
  },
  {
    title: "Hidden Input",
    desc: "Values hidden with ● when typing for API keys and tokens",
  },
  {
    title: "GitHub Sync",
    desc: "Syncs to a private GitHub repo via gh for backup across devices",
  },
  {
    title: "AI-Ready Markdown",
    desc: "Markdown frontmatter consumable by AI agents",
  },
];

export default function BrainPage() {
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
              <Brain className="mr-1.5 h-3 w-3" />
              Second Brain
            </Badge>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
              Core Brain
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl text-lg sm:text-xl">
              Save and search personal learnings and memories — your second
              brain in markdown files. All operations are local, synced
              optionally to a private GitHub repo.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="border-border relative max-w-full overflow-hidden rounded-xl border bg-neutral-900 dark:bg-neutral-950">
                <div className="overflow-x-auto p-4">
                  <pre className="font-mono text-sm whitespace-nowrap text-emerald-600 dark:text-emerald-400">
                    <code>core brain</code>
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

          <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border-border bg-background rounded-xl border p-5"
              >
                <h3 className="mb-2 text-base font-semibold">
                  {feature.title}
                </h3>
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
              All Commands
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              14 commands to manage your second brain
            </p>
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
                      <cmd.icon className="text-muted-foreground h-4 w-4" />
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
              Memory Format
            </h2>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">
              Memories are stored as AI-consumable markdown files with
              frontmatter:
            </p>
            <div className="border-border/50 overflow-hidden rounded-xl border bg-neutral-900 dark:bg-neutral-950">
              <div className="overflow-x-auto p-4">
                <pre className="font-mono text-xs text-emerald-600 sm:text-sm dark:text-emerald-400">
                  <code>{`---
title: React Hook Form + Zod validation
tags: [react, forms, typescript, zod]
created: 2026-06-23
category: frontend
related: [nextjs-server-actions]
---

# React Hook Form + Zod validation

After hours of testing, the combination that worked...`}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
