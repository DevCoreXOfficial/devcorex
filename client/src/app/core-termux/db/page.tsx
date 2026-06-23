"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Database, ExternalLink, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolTerminal } from "@/components/terminal-block";

const databases = [
  {
    id: "postgresql",
    name: "PostgreSQL",
    description:
      "Advanced relational database system with ACID compliance, foreign keys, triggers, and stored procedures.",
    install: "core install db --postgresql",
    source: "https://www.postgresql.org/",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    pkg: "postgresql",
    features: [
      "ACID Compliant",
      "Foreign Keys",
      "Triggers & Stored Procedures",
      "JSON Support",
      "Full-Text Search",
    ],
    commands: [
      { cmd: "core pg start", desc: "Start PostgreSQL server" },
      { cmd: "core pg stop", desc: "Stop PostgreSQL server" },
      { cmd: "core pg status", desc: "Check server status" },
      { cmd: "core pg init", desc: "Initialize database" },
      { cmd: "core pg create <name>", desc: "Create database" },
      { cmd: "core pg drop <name>", desc: "Drop database" },
      { cmd: "core pg list", desc: "List databases" },
      { cmd: "core pg shell", desc: "Open psql console" },
    ],
  },
  {
    id: "mariadb",
    name: "MariaDB",
    description:
      "MySQL-compatible relational database, fast, scalable and robust.",
    install: "core install db --mariadb",
    source: "https://mariadb.org/",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    pkg: "mariadb",
    features: [
      "MySQL Compatible",
      "High Performance",
      "ACID Compliant",
      "Row-level Locking",
      "Automatic Recovery",
    ],
  },
  {
    id: "sqlite",
    name: "SQLite",
    description:
      "Lightweight, disk-based database that does not require a separate server process.",
    install: "core install db --sqlite",
    source: "https://sqlite.org/",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    pkg: "sqlite",
    features: [
      "Zero-Configuration",
      "Serverless",
      "Transactional",
      "Small Footprint",
      "Standard SQL",
    ],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    description:
      "NoSQL document database with JSON-like documents and dynamic schema.",
    install: "core install db --mongodb",
    source: "https://www.mongodb.com/",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    pkg: "mongodb",
    features: [
      "Document-Oriented",
      "JSON-like Documents",
      "Dynamic Schema",
      "Horizontal Scaling",
      "Rich Query Language",
    ],
  },
];

export default function DatabasesPage() {
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
              <Database className="mr-1.5 h-3 w-3" />
              Databases
            </Badge>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
              Database Tools
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl text-lg sm:text-xl">
              PostgreSQL, MariaDB, SQLite, and MongoDB for your Termux
              development environment.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="border-border relative max-w-full overflow-hidden rounded-xl border bg-neutral-900 dark:bg-neutral-950">
                <div className="overflow-x-auto p-4">
                  <pre className="font-mono text-sm whitespace-nowrap text-emerald-600 dark:text-emerald-400">
                    <code>core install db</code>
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
              Available Databases
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              4 database management systems
            </p>
          </motion.div>

          <div className="space-y-6">
            {databases.map((db, index) => (
              <motion.div
                key={db.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border-border bg-background overflow-hidden rounded-xl border"
              >
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div
                      className={`h-12 w-12 shrink-0 ${db.bgColor} flex items-center justify-center rounded-lg`}
                    >
                      <Box className={`h-6 w-6 ${db.color}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <h3 className="text-lg font-semibold sm:text-xl">
                          {db.name}
                        </h3>
                        <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">
                          {db.pkg}
                        </code>
                      </div>
                      <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                        {db.description}
                      </p>

                      <div className="mb-4">
                        <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
                          Features
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {db.features.map((feature) => (
                            <span
                              key={feature}
                              className="bg-muted rounded-md px-2 py-1 text-xs"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
                            Installation
                          </p>
                          <ToolTerminal
                            command={db.install}
                            copied={copiedId === db.id + "-install"}
                            onCopy={() =>
                              copyInstall(db.id + "-install", db.install)
                            }
                          />
                        </div>

                        {db.commands && (
                          <div>
                            <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
                              PostgreSQL Manager Commands
                            </p>
                            <div className="bg-muted/50 border-border rounded-lg border p-3">
                              <div className="space-y-2">
                                {db.commands.map((cmd) => (
                                  <div
                                    key={cmd.cmd}
                                    className="flex items-center gap-3"
                                  >
                                    <code className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
                                      {cmd.cmd}
                                    </code>
                                    <span className="text-muted-foreground text-xs">
                                      — {cmd.desc}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        <div>
                          <a
                            href={db.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary inline-flex items-center gap-1.5 text-xs font-medium hover:underline"
                          >
                            Documentation
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

