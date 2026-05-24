"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const nodeModules = [
  {
    name: "TypeScript",
    npm: "typescript",
    cmd: "tsc",
    desc: "TypeScript compiler",
    install: "core install node --typescript",
  },
  {
    name: "NestJS CLI",
    npm: "@nestjs/cli",
    cmd: "nest",
    desc: "NestJS framework CLI",
    install: "core install node --nestjs",
  },
  {
    name: "Prettier",
    npm: "prettier",
    desc: "Code formatter",
    install: "core install node --prettier",
  },
  {
    name: "Live Server",
    npm: "live-server",
    desc: "Development server with live reload",
    install: "core install node --live-server",
  },
  {
    name: "Localtunnel",
    npm: "localtunnel",
    cmd: "lt",
    desc: "Expose localhost to the internet",
    install: "core install node --localtunnel",
  },
  {
    name: "Vercel CLI",
    npm: "vercel",
    cmd: "vercel",
    desc: "Vercel deployment CLI",
    install: "core install node --vercel",
  },
  {
    name: "Markserv",
    npm: "markserv",
    desc: "Markdown live-preview server",
    install: "core install node --markserv",
  },
  {
    name: "PSQL Format",
    npm: "psqlformat",
    desc: "PostgreSQL query formatter",
    install: "core install node --psqlformat",
  },
  {
    name: "NPM Check Updates",
    npm: "ncu",
    desc: "Find outdated dependencies",
    install: "core install node --ncu",
  },
  {
    name: "Ngrok",
    npm: "ngrok",
    desc: "Secure tunnel to localhost",
    install: "core install node --ngrok",
  },
];

const features = [
  "Global npm packages for development",
  "Android-compatible localtunnel fix",
  "Pre-configured for Termux",
  "TypeScript, Prettier, Vercel CLI included",
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

export default function NodePage() {
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
              <Package className="mr-1.5 h-3 w-3" />
              Node.js Modules
            </Badge>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
              Node Modules
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl text-lg sm:text-xl">
              Global npm packages for your development workflow on Termux.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="border-border relative max-w-full overflow-hidden rounded-xl border bg-neutral-900 dark:bg-neutral-950">
                <div className="overflow-x-auto p-4">
                  <pre className="font-mono text-sm whitespace-nowrap text-green-400">
                    <code>core install node</code>
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

          <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
              Available Packages
            </h2>
            <p className="text-muted-foreground text-base">
              {nodeModules.length} global npm packages
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {nodeModules.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="border-border bg-background rounded-xl border p-4"
              >
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-medium">{pkg.name}</h3>
                  <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-[10px]">
                    {pkg.npm}
                  </code>
                </div>
                <p className="text-muted-foreground mb-1 text-xs">{pkg.desc}</p>
                {pkg.cmd && (
                  <code className="text-xs text-green-400">
                    Command: {pkg.cmd}
                  </code>
                )}
                <div className="mt-3">
                  <ToolTerminal
                    command={pkg.install}
                    copied={copiedId === pkg.name}
                    onCopy={() => copyInstall(pkg.name, pkg.install)}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-border bg-muted/30 mt-8 rounded-xl border p-6"
          >
            <h3 className="mb-2 text-lg font-semibold">
              Localtunnel for Android
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              The localtunnel package includes an automatic fix for Android that
              replaces <code>openurl</code> with <code>termux-open-url</code>.
            </p>
            <div className="border-border/50 max-w-full overflow-hidden rounded-lg border bg-neutral-900 p-3">
              <pre className="font-mono text-xs whitespace-nowrap text-green-400">
                <code>{`# No extra setup needed - fix is applied automatically
lt --port 3000`}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

