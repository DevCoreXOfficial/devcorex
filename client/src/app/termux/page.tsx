"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Download,
  ArrowRight,
  Code2,
  Database,
  Sparkles,
  Wrench,
  Package,
  Layers,
  Palette,
  Workflow,
  Brain,
  Cpu,
  TerminalSquare,
  Circle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const coreModules = [
  {
    name: "Languages",
    icon: Code2,
    count: 7,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    items: "Node.js, Python, Rust, Go...",
  },
  {
    name: "Databases",
    icon: Database,
    count: 5,
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    items: "PostgreSQL, Redis, MongoDB...",
  },
  {
    name: "AI Agents",
    icon: Sparkles,
    count: 18,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    items: "Claude Code, OpenCode, Ollama...",
  },
  {
    name: "Editor",
    icon: TerminalSquare,
    count: 3,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    items: "Neovim, NvChad, Copilot...",
  },
  {
    name: "Dev Tools",
    icon: Wrench,
    count: 20,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    items: "gh, fzf, bat, tmux, curl...",
  },
  {
    name: "NPM",
    icon: Package,
    count: 11,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    items: "TypeScript, Prettier, Vercel...",
  },
  {
    name: "Shell",
    icon: Layers,
    count: 9,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    items: "powerlevel10k, fzf-tab...",
  },
  {
    name: "UI",
    icon: Palette,
    count: 4,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    items: "Font, Cursor, Extra Keys...",
  },
  {
    name: "Automation",
    icon: Workflow,
    count: 1,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    items: "n8n workflow platform",
  },
];

const terminalCommands = [
  {
    cmd: "core install ai --opencode --claude-code",
    output: "Installing OpenCode... done\nInstalling Claude Code... done",
    color: "#39ff14",
  },
  {
    cmd: "core brain save",
    output: "? Title: React patterns\n✔ Memory saved to frontend/react-patterns.md",
    color: "#00bcd4",
  },
  {
    cmd: "core pg start",
    output: "Starting PostgreSQL server... done\nServer running on port 5432",
    color: "#39ff14",
  },
  {
    cmd: "core init next",
    output: "? Package manager: pnpm\n✔ Next.js configured with Turbopack",
    color: "#00bcd4",
  },
  {
    cmd: "core voice opencode",
    output: "Listening through microphone...\nLaunching opencode with prompt...",
    color: "#39ff14",
  },
];

const coreStats = [
  { label: "Modules", value: 9, icon: Layers },
  { label: "AI Agents", value: 18, icon: Sparkles },
  { label: "Commands", value: 13, icon: Terminal },
  { label: "Tips", value: 65, icon: Brain },
];

function useTypingAnimation(
  commands: typeof terminalCommands,
  typingSpeed = 40,
  pauseAfterType = 1200,
  pauseAfterOutput = 2000
) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  const current = commands[currentIndex];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isTyping && displayText.length < current.cmd.length) {
      timeout = setTimeout(() => {
        setDisplayText(current.cmd.slice(0, displayText.length + 1));
      }, typingSpeed);
    } else if (isTyping && displayText.length === current.cmd.length) {
      timeout = setTimeout(() => {
        setIsTyping(false);
        setShowOutput(true);
      }, pauseAfterType);
    } else if (!isTyping && showOutput) {
      timeout = setTimeout(() => {
        setShowOutput(false);
        setDisplayText("");
        setIsTyping(true);
        setCurrentIndex((prev) => (prev + 1) % commands.length);
      }, pauseAfterOutput);
    }

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isTyping,
    showOutput,
    current,
    commands,
    typingSpeed,
    pauseAfterType,
    pauseAfterOutput,
  ]);

  return { displayText, showOutput, current, isTyping, currentIndex };
}

function AnimatedCounter({ value, label, icon: Icon }: {
  value: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-1">
      <Icon className="text-primary mb-1 h-5 w-5" />
      <span className="text-foreground text-3xl font-bold tracking-tight">
        {count}+
      </span>
      <span className="text-muted-foreground text-xs">{label}</span>
    </div>
  );
}

export default function TermuxPage() {
  const { displayText, showOutput, current, isTyping, currentIndex } = useTypingAnimation(terminalCommands);

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Section 1: Termux — unchanged */}
      <section className="border-border border-b px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="outline" className="mb-4">
              <Terminal className="mr-1.5 h-3 w-3" />
              What is Termux?
            </Badge>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4"
            >
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-2 bg-black sm:h-24 sm:w-24">
                <Terminal className="h-16 w-16 text-white sm:h-18 sm:w-18" />
              </div>
            </motion.div>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
              Termux
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl text-lg sm:text-xl">
              Termux is a Linux terminal emulator for Android that provides a
              secure, lightweight environment for running command-line programs.
              It turns your Android device into a powerful development
              workstation.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="px-6 py-5 text-base">
                <Link href="https://github.com/termux/termux-app/releases/download/v0.118.3/termux-app_v0.118.3+github-debug_universal.apk">
                  <Download className="mr-2 h-5 w-5" />
                  Download Termux
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="px-6 py-5 text-base"
              >
                <Link href="/termux/api">
                  <Terminal className="mr-2 h-5 w-5" />
                  Termux:API
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Core-Termux */}
      <section className="border-border relative overflow-hidden border-y bg-muted/30 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        {/* Background circuit pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="circuit-bg" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 20 H12 M28 20 H40 M20 0 V12 M20 28 V40" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="20" cy="20" r="1.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit-bg)" className="text-foreground" />
          </svg>
        </div>

        <div className="container relative mx-auto max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <Badge variant="outline" className="mb-4">
              <Cpu className="mr-1.5 h-3 w-3" />
              Modular Framework
            </Badge>
            <h2 className="mb-3 text-3xl font-bold tracking-foreground sm:text-4xl md:text-5xl">
              <span className="bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent dark:to-emerald-400">
                CORE-TERMUX
              </span>
            </h2>
            <p className="text-muted-foreground mx-auto max-w-xl text-base sm:text-lg">
              Turn your Android device into a complete development workstation.
              One command. Full stack.
            </p>
          </motion.div>

          {/* Terminal + Stats Row */}
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Terminal — always dark */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="overflow-hidden rounded-xl border border-border bg-neutral-900 shadow-lg dark:bg-neutral-950">
                {/* Terminal header */}
                <div className="border-border flex items-center justify-between border-b bg-neutral-800/50 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-muted-foreground ml-2 text-xs">
                      core — termux
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Circle className="h-2 w-2 fill-green-500 text-green-500" />
                    <span className="text-muted-foreground text-[10px]">active</span>
                  </div>
                </div>

                {/* Terminal body */}
                <div className="min-h-[220px] p-4 font-mono text-sm">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Command line */}
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-[#00FF00] dark:text-green-500">~</span>
                        <span className="text-[#00FF00] dark:text-green-500">$</span>
                        <span className="text-white">
                          {displayText}
                          {isTyping && (
                            <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-[#00FF00] dark:bg-green-500" />
                          )}
                        </span>
                      </div>

                      {/* Output */}
                      {showOutput && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="whitespace-pre-line text-xs text-neutral-400"
                        >
                          {current.output}
                        </motion.div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Static prompt at bottom */}
                  <div className="mt-4 flex items-center gap-2 border-t border-neutral-800 pt-3">
                    <span className="text-[#00FF00] dark:text-green-500">~</span>
                    <span className="text-[#00FF00] dark:text-green-500">$</span>
                    <span className="h-4 w-2 animate-pulse bg-[#00FF00]/60 dark:bg-green-500/60" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center gap-6 lg:col-span-2"
            >
              <div className="grid grid-cols-2 gap-4">
                {coreStats.map((stat) => (
                  <AnimatedCounter
                    key={stat.label}
                    value={stat.value}
                    label={stat.label}
                    icon={stat.icon}
                  />
                ))}
              </div>

              {/* Quick command preview */}
              <div className="border-border bg-muted/50 rounded-lg border p-4">
                <p className="text-muted-foreground mb-2 text-[10px] font-medium uppercase tracking-wider">
                  Quick start
                </p>
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00FF00] dark:text-green-500">$</span>
                    <span className="text-foreground/80">core install ai</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#00FF00] dark:text-green-500">$</span>
                    <span className="text-foreground/80">core brain save</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#00FF00] dark:text-green-500">$</span>
                    <span className="text-foreground/80">core pg start</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Module Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground mb-4 text-center text-[10px] font-medium uppercase tracking-widest">
              9 Modules · Full Stack
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {coreModules.map((mod, i) => (
                <motion.div
                  key={mod.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -3, scale: 1.03 }}
                  className={`group relative cursor-default overflow-hidden rounded-lg border border-border bg-background p-3 transition-all hover:shadow-lg`}
                >
                  {/* Glow on hover */}
                  <div className={`absolute inset-0 ${mod.bg} opacity-0 transition-opacity group-hover:opacity-100`} />

                  <div className="relative">
                    <div className="mb-2 flex items-center justify-between">
                      <mod.icon className={`h-4 w-4 ${mod.color}`} />
                      <span className={`text-[10px] font-bold ${mod.color}`}>
                        {mod.count}
                      </span>
                    </div>
                    <h4 className="text-foreground mb-0.5 text-xs font-semibold">
                      {mod.name}
                    </h4>
                    <p className="text-muted-foreground text-[10px] leading-tight">
                      {mod.items}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Button size="lg" asChild className="group px-8 py-5 text-base">
              <Link href="/core-termux">
                Install Core-Termux
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <p className="text-muted-foreground mt-3 font-mono text-xs">
              curl -fsSL .../install.sh | bash
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Ready to Get Started — unchanged */}
      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-base sm:text-lg">
              Download Termux first, then install Core-Termux to unlock the full
              potential of your Android development environment.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild className="px-6 py-5 text-base">
                <Link href="https://github.com/termux/termux-app/releases/download/v0.118.3/termux-app_v0.118.3+github-debug_universal.apk">
                  <Download className="mr-2 h-5 w-5" />
                  Download Termux
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="px-6 py-5 text-base"
              >
                <Link href="/core-termux">View Core-Termux Docs</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
