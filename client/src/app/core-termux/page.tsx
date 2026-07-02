"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Code2,
  Sparkles,
  Database,
  Wrench,
  Layers,
  ChevronDown,
  ChevronUp,
  Package,
  Box,
  Palette,
  Workflow,
  ArrowRight,
  Copy,
  Check,
  RotateCcw,
  Brain,
  Mic,
  Settings,
  Eye,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaGithub } from "react-icons/fa6";
import { ToolTerminal } from "@/components/terminal-block";

const installCommand =
  "curl -fsSL https://raw.githubusercontent.com/DevCoreXOfficial/core-termux/main/install.sh | bash";

interface Tool {
  name: string;
  desc: string;
  pkg?: string;
  npm?: string;
  pip?: string;
  git?: string;
  special?: string;
  cmd?: string;
}

const modules: Array<{
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  command: string;
  href: string;
  tools: Tool[];
  installCmd: string;
  pgCommand?: string;
}> = [
  {
    id: "lang",
    title: "Language Packages",
    description: "Programming languages and runtimes via pkg",
    icon: Code2,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    command: "core install lang",
    href: "/core-termux/lang",
    tools: [
      {
        name: "Node.js LTS",
        pkg: "nodejs",
        desc: "Long-term support release of Node.js",
      },
      { name: "Python", pkg: "python", desc: "Python 3 interpreter" },
      { name: "Perl", pkg: "perl", desc: "Perl scripting language" },
      { name: "PHP", pkg: "php", desc: "PHP interpreter" },
      { name: "Rust", pkg: "rust", desc: "Rust compiler and Cargo" },
      { name: "C/C++", pkg: "clang", desc: "LLVM C/C++ compiler" },
      { name: "Go", pkg: "golang", desc: "Go programming language" },
    ],
    installCmd: "core install lang",
  },
  {
    id: "db",
    title: "Databases",
    description: "PostgreSQL, MariaDB, SQLite, MongoDB",
    icon: Database,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    command: "core install db",
    href: "/core-termux/db",
    tools: [
      {
        name: "PostgreSQL",
        pkg: "postgresql",
        desc: "Advanced relational database",
      },
      {
        name: "MariaDB",
        pkg: "mariadb",
        desc: "MySQL-compatible relational database",
      },
      { name: "SQLite", pkg: "sqlite", desc: "Lightweight embedded database" },
      { name: "MongoDB", pkg: "mongodb", desc: "NoSQL document database" },
    ],
    installCmd: "core install db",
    pgCommand: "core pg",
  },
  {
    id: "ai",
    title: "AI Tools",
    description: "AI coding assistants and chat tools",
    icon: Sparkles,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    command: "core install ai",
    href: "/core-termux/ai",
    tools: [
      {
        name: "Qwen Code",
        npm: "@qwen-code/qwen-code",
        desc: "Alibaba's AI coding assistant",
      },
      {
        name: "Gemini CLI",
        npm: "@google/gemini-cli",
        desc: "Google's AI assistant with Gemini",
      },
      {
        name: "Mistral Vibe",
        pip: "mistral-vibe",
        desc: "Mistral's open-source CLI coding assistant.",
      },
      {
        name: "OpenClaude",
        npm: "@gitlawb/openclaude",
        desc: "Open source Claude Code alternative",
      },
      {
        name: "Codex CLI",
        pkg: "codex",
        desc: "OpenAI's Codex command-line tool",
      },
      {
        name: "Claude Code",
        special: "claude-code",
        desc: "Anthropic's CLI tool with Claude AI",
      },
      {
        name: "OpenClaw",
        npm: "openclaw",
        desc: "OpenClaw — Personal AI Assistant",
      },
      { name: "Ollama", pkg: "ollama", desc: "Run open-source LLMs locally" },
      { name: "Codex", pkg: "codex", desc: "AI code generation tool" },
      {
        name: "OpenCode",
        special: "opencode",
        desc: "The open-source AI coding agent",
      },
      {
        name: "Engram",
        special: "engram",
        desc: "Persistent memory system for AI coding agents",
      },
      {
        name: "CodeGraph",
        npm: "@colbymchenry/codegraph",
        desc: "Analyzes your codebase structure and dependencies to improve navigation",
      },
      {
        name: "Pi Coding Agent",
        npm: "pi-coding-agent",
        desc: "Pi is a minimal terminal coding harness",
      },
      {
        name: "Antigravity CLI",
        special: "antigravity-cli",
        desc: "Experience liftoff with the next-gen agent platform",
      },
      {
        name: "MiniMax CLI",
        npm: "mmx-cli",
        desc: "The official CLI for the MiniMax AI Platform",
      },
      {
        name: "Gentle AI",
        special: "gentle-ai",
        desc: "Ecosystem, Frameworks, Workflows for AI coding agents",
      },
      {
        name: "Gentleman Guardian Angel",
        special: "gga",
        desc: "Provider-agnostic code review using AI",
      },
      {
        name: "Hermes Agent",
        special: "hermes",
        desc: "The agent that grows with you",
      },
      {
        name: "MiMoCode",
        special: "mimocode",
        desc: "Xiaomi's AI coding agent — fast, local, and open-source",
      },
      {
        name: "Kimi Code",
        npm: "@moonshot-ai/kimi-code",
        desc: "Kimi Code CLI — The Starting Point for Next-Gen Agents",
      },
      {
        name: "Command Code",
        npm: "command-code",
        desc: "The coding agent that learns your coding taste",
      },
      {
        name: "Freebuff",
        special: "freebuff",
        desc: "100% free coding agent — right from your terminal",
      },
      {
        name: "Kimchi",
        special: "kimchi",
        desc: "Terminal coding agent powered by Kimchi's multi-model orchestration",
      },
    ],
    installCmd: "core install ai",
  },
  {
    id: "editor",
    title: "Code Editor",
    description: "Neovim with NvChad configuration",
    icon: Terminal,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    command: "core install editor",
    href: "/core-termux/editor",
    tools: [
      { name: "Neovim", pkg: "neovim", desc: "Fast, extensible code editor" },
      {
        name: "NvChad",
        git: "DevCoreXOfficial/nvchad-termux",
        desc: "Modern Neovim configuration framework",
      },
      {
        name: "GitHub Copilot",
        npm: "@githubnext/copilot",
        desc: "AI-powered code completion",
      },
      {
        name: "CodeCompanion",
        npm: "codecompanion",
        desc: "Multi-provider AI chat assistant",
      },
      { name: "LSP Support", desc: "TypeScript, HTML, CSS, Lua, Bash, JSON" },
    ],
    installCmd: "core install editor",
  },
  {
    id: "dev",
    title: "Development Tools",
    description: "Essential CLI tools for development",
    icon: Wrench,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    command: "core install dev",
    href: "/core-termux/dev",
    tools: [
      {
        name: "GitHub CLI",
        pkg: "gh",
        desc: "Official GitHub command-line tool",
      },
      { name: "Wget", pkg: "wget", desc: "File downloader" },
      { name: "Curl", pkg: "curl", desc: "HTTP client and transfer tool" },
      { name: "Fzf", pkg: "fzf", desc: "Command-line fuzzy finder" },
      { name: "LSD", pkg: "lsd", desc: "Modern ls replacement with icons" },
      {
        name: "Bat",
        pkg: "bat",
        desc: "Modern cat replacement with syntax highlighting",
      },
      { name: "jq", pkg: "jq", desc: "Lightweight JSON processor" },
      { name: "Tree", pkg: "tree", desc: "Recursive directory listing" },
      {
        name: "Proot",
        pkg: "proot",
        desc: "Chroot alternative for user-space",
      },
      {
        name: "Cloudflared",
        pkg: "cloudflared",
        desc: "Cloudflare Tunnel client",
      },
      {
        name: "ImageMagick",
        pkg: "imagemagick",
        desc: "Image manipulation suite",
      },
      { name: "Shfmt", pkg: "shfmt", desc: "Shell script formatter" },
      { name: "Make", pkg: "make", desc: "Build automation tool" },
      {
        name: "Udocker",
        pkg: "udocker",
        desc: "Run Docker containers without root",
      },
      {
        name: "Ncurses Utils",
        pkg: "ncurses-utils",
        desc: "Terminal UI manipulation tools",
      },
      { name: "Tmate", pkg: "tmate", desc: "Instant terminal sharing" },
      {
        name: "Translate Shell",
        pkg: "translate-shell",
        desc: "Command-line translator",
      },
      {
        name: "html2text",
        pkg: "html2text",
        desc: "HTML to plain text converter",
      },
      { name: "Bc", pkg: "bc", desc: "Arbitrary precision calculator" },
    ],
    installCmd: "core install dev",
  },
  {
    id: "npm",
    title: "Node.js Modules",
    description: "Global npm packages",
    icon: Package,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    command: "core install npm",
    href: "/core-termux/npm",
    tools: [
      {
        name: "TypeScript",
        npm: "typescript",
        cmd: "tsc",
        desc: "TypeScript compiler",
      },
      { name: "Prettier", npm: "prettier", desc: "Code formatter" },
      {
        name: "NestJS CLI",
        npm: "@nestjs/cli",
        cmd: "nest",
        desc: "NestJS framework CLI",
      },
      {
        name: "Vercel CLI",
        npm: "vercel",
        cmd: "vercel",
        desc: "Vercel deployment CLI",
      },
      { name: "Ngrok", npm: "ngrok", desc: "Secure tunnel to localhost" },
      {
        name: "Live Server",
        npm: "live-server",
        desc: "Development server with live reload",
      },
      {
        name: "Localtunnel",
        npm: "localtunnel",
        cmd: "lt",
        desc: "Expose localhost to internet",
      },
      {
        name: "NPM Check Updates",
        npm: "ncu",
        desc: "Find outdated dependencies",
      },
      {
        name: "Markserv",
        npm: "markserv",
        desc: "Markdown live-preview server",
      },
      {
        name: "PSQL Format",
        npm: "psqlformat",
        desc: "PostgreSQL query formatter",
      },
      {
        name: "Turbopack",
        npm: "turbopack",
        desc: "Next.js bundler",
      },
    ],
    installCmd: "core install npm",
  },
  {
    id: "shell",
    title: "ZSH Shell",
    description: "ZSH + Oh My Zsh + plugins",
    icon: Layers,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    command: "core install shell",
    href: "/core-termux/shell",
    tools: [
      { name: "powerlevel10k", desc: "Modern and fast ZSH theme" },
      { name: "zsh-autosuggestions", desc: "Smart autocompletion" },
      {
        name: "zsh-syntax-highlighting",
        desc: "Syntax highlighting in terminal",
      },
      {
        name: "zsh-history-substring-search",
        desc: "History search with arrow keys",
      },
      { name: "zsh-completions", desc: "Additional completions" },
      { name: "fzf-tab", desc: "Fuzzy navigation in completions" },
      { name: "zsh-you-should-use", desc: "Command suggestions" },
      { name: "zsh-autopair", desc: "Auto-close parentheses and quotes" },
      { name: "zsh-better-npm-completion", desc: "Better npm completion" },
    ],
    installCmd: "core install shell",
  },
  {
    id: "ui",
    title: "Termux UI",
    description: "UI customization for Termux",
    icon: Palette,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    command: "core install ui",
    href: "/core-termux/ui",
    tools: [
      { name: "Font", desc: "Meslo Nerd Font for Termux" },
      { name: "Cursor", desc: "Custom cursor style" },
      { name: "Extra Keys", desc: "Custom extra keys row" },
      { name: "Banner", desc: "Core-Termux Banner" },
    ],
    installCmd: "core install ui",
  },
  {
    id: "auto",
    title: "Automation",
    description: "Automation tools like n8n",
    icon: Workflow,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    command: "core install auto",
    href: "/core-termux/auto",
    tools: [{ name: "n8n", npm: "n8n", desc: "Workflow automation platform" }],
    installCmd: "core install auto",
  },
];

export default function CoreTermuxPage() {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [moduleCopied, setModuleCopied] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/DevCoreXOfficial/core-termux")
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count))
      .catch(() => {});
  }, []);

  const copyModule = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setModuleCopied(true);
    setTimeout(() => setModuleCopied(false), 2000);
  };

  const toggleModule = (id: string) => {
    setExpandedModule(expandedModule === id ? null : id);
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
              Modular Framework
            </Badge>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
              CORE-TERMUX
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl text-lg sm:text-xl">
              Modular Dev Environment for Termux (Android). Automate
              installations, updates, and configurations with simple commands.
            </p>

            <div className="border-border relative mb-6 overflow-hidden rounded-xl border bg-neutral-900 dark:bg-neutral-950">
              <div className="border-border/50 flex items-center justify-between border-b bg-neutral-800/50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-muted-foreground ml-2 text-xs">
                    Quick Installation
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyInstall}
                  className="h-7 text-neutral-300 hover:text-white"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-[#00FF00] dark:text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="overflow-x-auto p-4">
                <pre className="font-mono text-sm whitespace-nowrap text-[#00FF00] dark:text-green-500">
                  <code className="pr-5">{installCommand}</code>
                </pre>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={() =>
                  document
                    .getElementById("modules")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Box className="mr-2 h-5 w-5" />
                Modules
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link
                  href="https://github.com/DevCoreXOfficial/core-termux"
                  target="_blank"
                  className="gap-2"
                >
                  GitHub Repository
                  {stars !== null && (
                    <span className="flex items-center gap-1 text-xs font-normal">
                      <FaGithub className="h-3.5 w-3.5" />
                      {stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars}
                    </span>
                  )}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="modules"
        className="bg-muted/30 px-4 py-16 sm:px-6 md:py-24 lg:px-8"
      >
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Modules
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Click on a module to see all tools included
            </p>
          </motion.div>

          <div className="space-y-4">
            {modules.map((mod, index) => (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border-border bg-background overflow-hidden rounded-xl border"
              >
                <button
                  onClick={() => toggleModule(mod.id)}
                  className="hover:bg-muted/50 flex w-full items-center gap-4 p-4 text-left transition-colors sm:p-5"
                >
                  <div className={`rounded-lg p-2 sm:p-3 ${mod.bgColor}`}>
                    <mod.icon
                      className={`h-5 w-5 sm:h-6 sm:w-6 ${mod.color}`}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="text-base font-semibold sm:text-lg">
                        {mod.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {mod.description}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {mod.href && (
                      <Link
                        href={mod.href}
                        onClick={(e) => e.stopPropagation()}
                        className="text-primary bg-primary/10 hover:bg-primary/20 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                      >
                        View Docs
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                    <pre className="bg-muted hidden rounded px-2 py-1 font-mono text-xs sm:block">
                      <code className="text-[#00FF00]">{mod.command}</code>
                    </pre>
                    {expandedModule === mod.id ? (
                      <ChevronUp className="text-muted-foreground h-5 w-5" />
                    ) : (
                      <ChevronDown className="text-muted-foreground h-5 w-5" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {expandedModule === mod.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="border-border bg-muted/30 border-t p-4 sm:p-5">
                        <div className="mb-4">
                          <p className="mb-3 text-sm font-medium">Tools:</p>
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {mod.tools.map((tool) => (
                              <div
                                key={tool.name}
                                className="bg-background border-border rounded-lg border p-3"
                              >
                                <div className="mb-1 flex items-start justify-between">
                                  <h4 className="text-sm font-medium">
                                    {tool.name}
                                  </h4>
                                  {tool.pkg && (
                                    <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-[10px]">
                                      {tool.pkg}
                                    </code>
                                  )}
                                  {tool.npm && (
                                    <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-[10px]">
                                      {tool.npm}
                                    </code>
                                  )}
                                  {tool.pip && (
                                    <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-[10px]">
                                      {tool.pip}
                                    </code>
                                  )}
                                  {tool.git && (
                                    <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-[10px]">
                                      {tool.git}
                                    </code>
                                  )}
                                  {tool.special && (
                                    <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-[10px]">
                                      {tool.special}
                                    </code>
                                  )}
                                </div>
                                <p className="text-muted-foreground text-xs">
                                  {tool.desc}
                                </p>
                                {tool.cmd && (
                                  <code className="mt-1 block text-xs text-slate-900 dark:text-[#00FF00]">
                                    Command: {tool.cmd}
                                  </code>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="mb-2 text-sm font-medium">
                            Installation:
                          </p>
                          <ToolTerminal
                            command={mod.installCmd}
                            copied={moduleCopied}
                            onCopy={() => copyModule(mod.installCmd)}
                          />
                        </div>
                        {mod.pgCommand && (
                          <div className="mt-3">
                            <p className="mb-2 text-sm font-medium">
                              PostgreSQL Manager:
                            </p>
                            <pre className="bg-muted inline-block rounded px-2 py-1 font-mono text-xs">
                              <code className="text-slate-900 dark:text-[#00FF00]">
                                {mod.pgCommand}
                              </code>
                            </pre>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
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
              Main Commands
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Click on any command to see full documentation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                cmd: "core --version",
                desc: "Show current version",
                icon: Terminal,
                href: "/core-termux/version",
              },
              {
                cmd: "core brain",
                desc: "Second brain — save and search memories",
                icon: Brain,
                href: "/core-termux/brain",
              },
              {
                cmd: "core env",
                desc: "Manage environment variables",
                icon: Settings,
                href: "/core-termux/env",
              },
              {
                cmd: "core install",
                desc: "Install specific modules",
                icon: Package,
                href: "/core-termux/install",
              },
              {
                cmd: "core show",
                desc: "Show tool documentation",
                icon: Eye,
                href: "/core-termux/show",
              },
              {
                cmd: "core update",
                desc: "Update modules or framework",
                icon: ArrowRight,
                href: "/core-termux/update",
              },
              {
                cmd: "core uninstall",
                desc: "Remove installed modules",
                icon: Trash2,
                href: "/core-termux/uninstall",
              },
              {
                cmd: "core reinstall",
                desc: "Reinstall specific tools or modules",
                icon: RotateCcw,
                href: "/core-termux/reinstall",
              },
              {
                cmd: "core voice",
                desc: "Speech-to-agent via microphone",
                icon: Mic,
                href: "/core-termux/voice",
              },
              {
                cmd: "core open",
                desc: "Open documentation in browser",
                icon: Palette,
                href: "/core-termux/open",
              },
              {
                cmd: "core list",
                desc: "List available tools in modules",
                icon: Layers,
                href: "/core-termux/list",
              },
              {
                cmd: "core pg",
                desc: "PostgreSQL database manager",
                icon: Database,
                href: "/core-termux/pg",
              },
              {
                cmd: "core init",
                desc: "Configure existing projects",
                icon: Code2,
                href: "/core-termux/init",
              },
            ].map((item) => (
              <Link key={item.cmd} href={item.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50 group cursor-pointer rounded-xl border p-4 transition-all"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="bg-primary/10 group-hover:bg-primary/20 rounded-lg p-2 transition-colors">
                      <item.icon className="text-primary h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <code className="font-mono text-sm font-semibold text-slate-900 dark:text-[#00FF00]">
                        {item.cmd}
                      </code>
                    </div>
                    <ArrowRight className="text-muted-foreground group-hover:text-primary h-4 w-4 opacity-0 transition-all group-hover:opacity-100" />
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    {item.desc}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
