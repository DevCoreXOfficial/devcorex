"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolTerminal } from "@/components/terminal-block";

const devTools = [
  {
    name: "GitHub CLI",
    pkg: "gh",
    desc: "Official GitHub command-line tool",
    install: "core install dev --gh",
  },
  {
    name: "Wget",
    pkg: "wget",
    desc: "File downloader",
    install: "core install dev --wget",
  },
  {
    name: "Curl",
    pkg: "curl",
    desc: "HTTP client and transfer tool",
    install: "core install dev --curl",
  },
  {
    name: "Fzf",
    pkg: "fzf",
    desc: "Command-line fuzzy finder",
    install: "core install dev --fzf",
  },
  {
    name: "LSD",
    pkg: "lsd",
    desc: "Modern ls replacement with icons and colors",
    install: "core install dev --lsd",
  },
  {
    name: "Bat",
    pkg: "bat",
    desc: "Modern cat replacement with syntax highlighting",
    install: "core install dev --bat",
  },
  {
    name: "jq",
    pkg: "jq",
    desc: "Lightweight JSON processor",
    install: "core install dev --jq",
  },
  {
    name: "Tree",
    pkg: "tree",
    desc: "Recursive directory listing",
    install: "core install dev --tree",
  },
  {
    name: "Proot",
    pkg: "proot",
    desc: "Chroot alternative for user-space",
    install: "core install dev --proot",
  },
  {
    name: "Cloudflared",
    pkg: "cloudflared",
    desc: "Cloudflare Tunnel client",
    install: "core install dev --cloudflared",
  },
  {
    name: "ImageMagick",
    pkg: "imagemagick",
    desc: "Image manipulation suite",
    install: "core install dev --imagemagick",
  },
  {
    name: "Shfmt",
    pkg: "shfmt",
    desc: "Shell script formatter",
    install: "core install dev --shfmt",
  },
  {
    name: "Make",
    pkg: "make",
    desc: "Build automation tool",
    install: "core install dev --make",
  },
  {
    name: "Udocker",
    pkg: "udocker",
    desc: "Run Docker containers without root",
    install: "core install dev --udocker",
  },
  {
    name: "Tmate",
    pkg: "tmate",
    desc: "Instant terminal sharing",
    install: "core install dev --tmate",
  },
  {
    name: "Ncurses Utils",
    pkg: "ncurses-utils",
    desc: "Terminal UI manipulation tools",
    install: "core install dev --ncurses-utils",
  },
  {
    name: "Translate Shell",
    pkg: "translate-shell",
    desc: "Command-line translator",
    install: "core install dev --translate-shell",
  },
  {
    name: "html2text",
    pkg: "html2text",
    desc: "HTML to plain text converter",
    install: "core install dev --html2text",
  },
  {
    name: "Bc",
    pkg: "bc",
    desc: "Arbitrary precision calculator",
    install: "core install dev --bc",
  },
];

export default function ToolsPage() {
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
              <Wrench className="mr-1.5 h-3 w-3" />
              Development Tools
            </Badge>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
              Dev Tools
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl text-lg sm:text-xl">
              Essential CLI tools for development on Termux. Git, fuzzy finders,
              JSON processors, and more.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="border-border relative max-w-full overflow-hidden rounded-xl border bg-neutral-900 dark:bg-neutral-950">
                <div className="overflow-x-auto p-4">
                  <pre className="font-mono text-sm whitespace-nowrap text-emerald-600 dark:text-emerald-400">
                    <code>core install dev</code>
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
              Available Tools
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              {devTools.length} development tools
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {devTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="border-border bg-background rounded-xl border p-4"
              >
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-medium">{tool.name}</h3>
                  <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-[10px]">
                    {tool.pkg}
                  </code>
                </div>
                <p className="text-muted-foreground mb-3 text-xs">
                  {tool.desc}
                </p>
                <ToolTerminal
                  command={tool.install}
                  copied={copiedId === tool.name}
                  onCopy={() => copyInstall(tool.name, tool.install)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
