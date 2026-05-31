"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Terminal,
  BookOpen,
  Code2,
  Sparkles,
  Rocket,
  Database,
  Wrench,
  Layers,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const modules = [
  {
    icon: Code2,
    key: "language",
    href: "/core-termux/language",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Database,
    key: "db",
    href: "/core-termux/db",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Sparkles,
    key: "ai",
    href: "/core-termux/ai",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Wrench,
    key: "tools",
    href: "/core-termux/tools",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Terminal,
    key: "editor",
    href: "/core-termux/editor",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: Layers,
    key: "shell",
    href: "/core-termux/shell",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
];

const installCommand =
  "curl -fsSL https://raw.githubusercontent.com/DevCoreXOfficial/core-termux/main/install.sh | bash";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section
        id="hero"
        className="px-4 py-16 sm:px-6 sm:py-20 md:py-32 lg:px-8"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8 text-center sm:mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 mb-8 sm:mt-0 sm:mb-12"
            >
              <Image
                src="/devcorex.png"
                alt="DevCoreX Logo"
                width={160}
                height={160}
                className="mx-auto h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge
                variant="outline"
                className="mb-4 px-3 py-1 text-xs sm:px-4 sm:text-sm"
              >
                Software Development Community
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              DevCoreX
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mb-4 text-lg sm:text-xl md:text-2xl"
            >
              Software Development Community
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground/70 mx-auto mb-8 max-w-2xl text-sm sm:mb-10 sm:text-base md:text-lg"
            >
              We develop everything using Termux on Android. Join our community
              and start building amazing projects today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-8 flex flex-col items-center justify-center gap-3 sm:mb-12 sm:flex-row sm:gap-4"
            >
              <Button
                size="lg"
                asChild
                className="w-full px-6 py-4 text-sm sm:w-auto sm:px-8 sm:py-5 sm:text-base"
              >
                <Link href="/termux">
                  <Rocket className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Get Started
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full px-6 py-4 text-sm sm:w-auto sm:px-8 sm:py-5 sm:text-base"
              >
                <Link href="/core-termux">
                  <BookOpen className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  View Documentation
                </Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-12 sm:mb-16"
          >
            <HomeTerminal command={installCommand} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-8 text-center sm:mb-10"
          >
            <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl">
              Explore Core-Termux
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-sm sm:text-base md:text-lg">
              A modular framework for setting up and managing development
              environments on Termux
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:gap-4 lg:grid-cols-6"
          >
            {modules.map((mod, index) => (
              <motion.div
                key={mod.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.05 }}
              >
                <Link
                  href={mod.href}
                  className="border-border bg-muted/30 hover:bg-muted/50 hover:border-foreground/20 group flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-all sm:gap-3 sm:p-4 md:p-5"
                >
                  <div
                    className={`rounded-lg p-2 sm:p-3 ${mod.bgColor} transition-transform group-hover:scale-110`}
                  >
                    <mod.icon
                      className={`h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 ${mod.color}`}
                    />
                  </div>
                  <span className="text-[10px] font-medium capitalize sm:text-xs md:text-sm">
                    {mod.key}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-muted/30 px-4 py-12 sm:px-6 sm:py-16 md:py-24 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-center sm:mb-12"
          >
            <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl">
              Available Modules
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-sm sm:text-base md:text-lg">
              Everything you need for development on Termux
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:gap-6 lg:grid-cols-3">
            {[
              {
                title: "Languages",
                desc: "Node.js, Python, Rust, PHP, Perl, C/C++, Go",
                href: "/core-termux/language",
                icon: Code2,
                color: "text-blue-500",
                bgColor: "bg-blue-500/10",
              },
              {
                title: "AI Tools",
                desc: "OpenCode, Claude Code, Mistral Vibe, Ollama and more",
                href: "/core-termux/ai",
                icon: Sparkles,
                color: "text-purple-500",
                bgColor: "bg-purple-500/10",
              },
              {
                title: "Databases",
                desc: "PostgreSQL, MariaDB, SQLite, MongoDB",
                href: "/core-termux/db",
                icon: Database,
                color: "text-green-500",
                bgColor: "bg-green-500/10",
              },
              {
                title: "Code Editor",
                desc: "Neovim with NvChad configuration",
                href: "/core-termux/editor",
                icon: Terminal,
                color: "text-pink-500",
                bgColor: "bg-pink-500/10",
              },
              {
                title: "Dev Tools",
                desc: "GitHub CLI, Vercel, TypeScript, Prettier",
                href: "/core-termux/tools",
                icon: Wrench,
                color: "text-orange-500",
                bgColor: "bg-orange-500/10",
              },
              {
                title: "Courses",
                desc: "HTML, CSS, JavaScript tutorials",
                href: "/courses",
                icon: BookOpen,
                color: "text-cyan-500",
                bgColor: "bg-cyan-500/10",
                highlight: true,
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`bg-background hover:bg-muted/50 hover:border-foreground/20 block rounded-xl border p-4 transition-all sm:p-5 md:p-6 ${item.highlight ? "border-primary/50" : "border-border"}`}
                >
                  <div
                    className={`h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 ${item.bgColor} mb-3 flex items-center justify-center rounded-lg sm:mb-4`}
                  >
                    <item.icon
                      className={`h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 ${item.color}`}
                    />
                  </div>
                  <h3 className="mb-1 text-base font-semibold sm:mb-2 sm:text-lg md:text-xl">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm md:text-base">
                    {item.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="community"
        className="px-4 py-12 sm:px-6 sm:py-16 md:py-24 lg:px-8"
      >
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl">
              Join Our Community
            </h2>
            <p className="text-muted-foreground mb-6 text-sm sm:mb-8 sm:text-base md:text-lg">
              For help and support, join our Telegram chat and connect with
              other developers
            </p>
            <Button size="lg" asChild>
              <Link href="https://t.me/devcorex_chat" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                Telegram Chat
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function HomeTerminal({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-border relative overflow-hidden rounded-xl border bg-neutral-900 dark:bg-neutral-950">
      <div className="border-border/50 flex items-center justify-between border-b bg-neutral-800/50 px-3 py-2 sm:px-4 sm:py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500 sm:h-3 sm:w-3" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 sm:h-3 sm:w-3" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500 sm:h-3 sm:w-3" />
          </div>
          <span className="text-muted-foreground text-[10px] sm:text-xs">
            terminal
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={copyCommand} className="h-7">
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="overflow-x-auto p-3 sm:p-4">
        <pre className="font-mono text-xs whitespace-nowrap text-green-400 sm:text-sm">
          <code className="pr-4 break-all">{command}</code>
        </pre>
      </div>
    </div>
  );
}
