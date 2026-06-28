"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolTerminal, CodeBlock } from "@/components/terminal-block";

const templates = [
  {
    name: "next",
    desc: "Next.js with preconfigured dependencies",
    example: "cd my-next-app && core init next",
    features: [
      "Axios, Lucide React, Framer Motion",
      "Zod, React Hook Form, TanStack Query",
      "Zustand, Tailwind CSS",
      "Prettier with Tailwind plugin",
      "DevCoreX landing page included",
    ],
  },
  {
    name: "react",
    desc: "React + Vite with modern structure",
    example: "cd my-react-app && core init react",
    features: [
      "Same deps as Next.js",
      "Custom Button component",
      "DevCoreX landing page",
      "src/App.tsx entry point",
    ],
  },
  {
    name: "nest",
    desc: "NestJS with additional configuration",
    example: "cd backend && core init nest",
    features: [
      "TypeORM, PostgreSQL",
      "JWT, Passport authentication",
      "Class validator/transformer",
      "Helmet, Cloudinary",
    ],
  },
  {
    name: "express",
    desc: "Express API with TypeScript + TypeORM",
    example: "cd api && core init express",
    features: [
      "TypeScript with path aliases",
      "TypeORM with migrations",
      "JWT, bcryptjs, helmet",
      "Full project structure",
    ],
  },
];

export default function InitPage() {
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
              <Code2 className="mr-1.5 h-3 w-3" />
              Init
            </Badge>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
              Core Init
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl text-lg sm:text-xl">
              Configure existing projects with predefined dependencies and
              structure. Run inside your project directory.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="border-border relative max-w-full overflow-hidden rounded-xl border bg-neutral-900 dark:bg-neutral-950">
                <div className="overflow-x-auto p-4">
                  <pre className="font-mono text-sm whitespace-nowrap text-[#00FF00]">
                    <code>cd my-project &amp;&amp; core init &lt;template&gt;</code>
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
              { cmd: "core init", desc: "Show help" },
              { cmd: "core init <template>", desc: "Configure with specific template" },
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
              Available Templates
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {templates.map((template, index) => (
                <motion.div
                  key={template.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="border-border bg-background rounded-xl border p-5"
                >
                  <code className="font-mono text-base font-semibold text-slate-900 dark:text-[#00FF00]">
                    core init {template.name}
                  </code>
                  <p className="text-muted-foreground mt-1 mb-3 text-sm">
                    {template.desc}
                  </p>
                  <div className="mb-3">
                    <ToolTerminal
                      command={template.example}
                      copied={copiedId === template.name}
                      onCopy={() => copyCommand(template.name, template.example)}
                    />
                  </div>
                  <div className="space-y-1">
                    {template.features.map((feature) => (
                      <p key={feature} className="text-muted-foreground text-xs">
                        • {feature}
                      </p>
                    ))}
                  </div>
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
              Usage Examples
            </h2>
            <CodeBlock
              lines={[
                "# Next.js project",
                "npx create-next-app@latest my-app",
                "cd my-app",
                "core init next",
                "",
                "# React + Vite project",
                "npm create vite@latest my-app -- --template react",
                "cd my-app",
                "core init react",
                "",
                "# Express API",
                "mkdir api && cd api",
                "core init express",
              ]}
              copyCommand="core init next"
              copied={copiedId === "examples"}
              onCopy={() => copyCommand("examples", "core init next")}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
