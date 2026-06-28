"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/terminal-block";

const commands = [
  { cmd: "core pg", desc: "Show help" },
  { cmd: "core pg start", desc: "Start server" },
  { cmd: "core pg stop", desc: "Stop server" },
  { cmd: "core pg restart", desc: "Restart server" },
  { cmd: "core pg status", desc: "Check status" },
  { cmd: "core pg init", desc: "Initialize database" },
  { cmd: "core pg create <name>", desc: "Create database" },
  { cmd: "core pg drop <name>", desc: "Drop database" },
  { cmd: "core pg list", desc: "List databases" },
  { cmd: "core pg shell", desc: "Open psql console" },
];

const features = [
  "Automatic data directory detection",
  "Support for existing installations",
  "Logs in ~/.cache/core-termux/postgresql.log",
];

export default function PgPage() {
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
              <Database className="mr-1.5 h-3 w-3" />
              PostgreSQL
            </Badge>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
              Core PG
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl text-lg sm:text-xl">
              PostgreSQL database manager. Start, stop, create databases, and
              manage your PostgreSQL instance.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="border-border relative max-w-full overflow-hidden rounded-xl border bg-neutral-900 dark:bg-neutral-950">
                <div className="overflow-x-auto p-4">
                  <pre className="font-mono text-sm whitespace-nowrap text-[#00FF00]">
                    <code>core pg</code>
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

          <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
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
                      <Database className="text-muted-foreground h-4 w-4" />
                    </div>
                    <div>
                      <code className="font-mono text-sm font-semibold text-slate-900 dark:text-[#00FF00]">
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
            <CodeBlock
              lines={[
                "# First time setup",
                "core pg init",
                "",
                "# Start and create database",
                "core pg start",
                "core pg create mydb",
                "core pg shell",
                "",
                "# When done",
                "core pg stop",
              ]}
              copyCommand="core pg init"
              copied={copiedId === "example"}
              onCopy={() => copyCommand("example", "core pg init")}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
