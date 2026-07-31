"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ExternalLink, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ToolTerminal } from "@/components/terminal-block";

interface AIModel {
  name: string;
  size: string;
  description: string;
}

interface AITool {
  id: string;
  name: string;
  description: string;
  install: string;
  source: string;
  color: string;
  bgColor: string;
  npm?: string;
  pip?: string;
  pkg?: string;
  builtin?: boolean;
  models?: AIModel[];
}

const aiTools: AITool[] = [
  {
    id: "qwen-code",
    name: "Qwen Code",
    description: "Alibaba's AI coding assistant",
    install: "core install ai --qwen-code",
    source: "https://github.com/QwenLM/qwen-code",
    color: "text-purple-400/80",
    bgColor: "bg-purple-400/10",
    npm: "@qwen-code/qwen-code",
  },
  {
    id: "gemini-cli",
    name: "Gemini CLI",
    description: "Google's AI assistant with Gemini",
    install: "core install ai --gemini-cli",
    source: "https://github.com/google-gemini/gemini-cli",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    npm: "@google/gemini-cli",
  },
  {
    id: "mistral-vibe",
    name: "Mistral Vibe",
    description:
      "Mistral Vibe is a command-line coding assistant powered by Mistral's models",
    install: "core install ai --mistral-vibe",
    source: "https://github.com/mistralai/mistral-vibe",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    pip: "mistral-vibe",
  },
  {
    id: "openclaude",
    name: "OpenClaude",
    description: "Open source Claude Code alternative",
    install: "core install ai --openclaude",
    source: "https://github.com/Gitlawb/openclaude",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    npm: "@gitlawb/openclaude",
  },
  {
    id: "claude-code",
    name: "Claude Code",
    description: "Anthropic's CLI tool with Claude AI",
    install: "core install ai --claude-code",
    source: "https://github.com/anthropics/claude-code",
    color: "text-orange-600",
    bgColor: "bg-orange-600/10",
    npm: "@anthropic-ai/claude-code",
  },
  {
    id: "openclaw",
    name: "OpenClaw",
    description: "OpenClaw — Personal AI Assistant",
    install: "core install ai --openclaw",
    source: "https://github.com/openclaw/openclaw",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    npm: "openclaw",
  },
  {
    id: "ollama",
    name: "Ollama",
    description: "Run open-source LLMs locally on Termux",
    install: "core install ai --ollama",
    source: "https://ollama.com",
    color: "text-neutral-800 dark:text-white",
    bgColor: "bg-neutral-200/50 dark:bg-white/10",
    pkg: "ollama",
    models: [
      {
        name: "qwen2.5:3b",
        size: "1.9GB",
        description:
          "Qwen2.5 models are pretrained on Alibaba's latest large-scale dataset, encompassing up to 18 trillion tokens. The model supports up to 128K tokens and has multilingual support.",
      },
      {
        name: "glm-5.2",
        size: "240GB",
        description:
          "GLM-5.2 is Z.ai’s flagship model for the era of long-horizon tasks.",
      },
      {
        name: "kimi-k3",
        size: "590GB",
        description:
          "Kimi K3 is an open-weight, native multimodal agentic model and our most capable model to date.",
      },
    ],
  },
  {
    id: "codex",
    name: "Codex CLI",
    description:
      "Codex CLI is a coding agent from OpenAI that runs locally on your computer",
    install: "core install ai --codex",
    source: "https://github.com/openai/codex",
    color: "text-blue-300",
    bgColor: "bg-white/9",
    pkg: "codex",
  },
  {
    id: "opencode",
    name: "OpenCode",
    description:
      "OpenCode is an open-source agent that helps you write code in your terminal",
    install: "core install ai --opencode",
    source: "https://github.com/anomalyco/opencode",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    id: "engram",
    name: "Engram",
    description:
      "Persistent memory system for coding agents - remembers your codebase across sessions",
    install: "core install ai --engram",
    source: "https://github.com/Gentleman-Programming/engram",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    builtin: true,
  },
  {
    id: "codegraph",
    name: "CodeGraph",
    description:
      "Analyzes your codebase structure and dependencies to improve navigation",
    install: "core install ai --codegraph",
    source: "https://github.com/colbymchenry/codegraph",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    builtin: true,
  },
  {
    id: "pi",
    name: "Pi Coding Agent",
    description:
      "Pi is a minimal terminal coding harness. Adapt Pi to your workflows, not the other way around",
    install: "core install ai --pi",
    source: "https://github.com/earendil-works/pi",
    color: "text-green-600",
    bgColor: "bg-green-600/10",
    builtin: true,
  },
  {
    id: "antigravity-cli",
    name: "Antigravity CLI",
    description:
      "The lightweight, fast, terminal-first surface to work with Antigravity agents",
    install: "core install ai --antigravity-cli",
    source: "https://antigravity.google",
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
    builtin: true,
  },
  {
    id: "minimax",
    name: "MiniMax CLI",
    description:
      "Generate text, images, video, speech, and music — from any agent or terminal",
    install: "core install ai --minimax-cli",
    source: "https://github.com/MiniMax-AI/cli",
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    builtin: true,
  },
  {
    id: "gentle-ai",
    name: "Gentle AI",
    description:
      "Gentle-AI — Ecosystem, Frameworks, Workflows for AI coding agents",
    install: "core install ai --gentle-ai",
    source: "https://github.com/Gentleman-Programming/gentle-ai",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    builtin: true,
  },
  {
    id: "gga",
    name: "Gentleman Guardian Angel",
    description:
      "Provider-agnostic code review using AI. Use Claude, Gemini, Codex, Ollama to enforce your coding standards",
    install: "core install ai --gga",
    source: "https://github.com/Gentleman-Programming/gentleman-guardian-angel",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    builtin: true,
  },
  {
    id: "hermes-agent",
    name: "Hermes Agent",
    description: "The self-improving AI agent built by Nous Research",
    install: "core install ai --hermes-agent",
    source: "https://github.com/nousresearch/hermes-agent",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    builtin: true,
  },
  {
    id: "mimocode",
    name: "MiMoCode",
    description: "Xiaomi's AI coding agent — fast, local, and open-source",
    install: "core install ai --mimocode",
    source: "https://github.com/XiaomiMiMo/MiMo-Code",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    builtin: true,
  },
  {
    id: "kimi-code",
    name: "Kimi Code",
    description:
      "Kimi Code CLI is an AI coding agent that runs in your terminal — it can read and edit code",
    install: "core install ai --kimi-code",
    source: "https://github.com/MoonshotAI/kimi-code",
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
    builtin: true,
  },
  {
    id: "command-code",
    name: "Command Code",
    description:
      "The coding agent that does it all. Learns the way you code. Until coding feels like thinking",
    install: "core install ai --command-code",
    source: "https://github.com/CommandCodeAI/command-code",
    color: "text-indigo-400",
    bgColor: "bg-indigo-400/10",
    builtin: true,
  },
  {
    id: "freebuff",
    name: "Freebuff",
    description:
      "A 100% free coding agent, right from your terminal. No subscription, no setup, no lock-in.",
    install: "core install ai --freebuff",
    source: "https://github.com/CodebuffAI/codebuff",
    color: "text-[#00FF00]",
    bgColor: "bg-green-400/10",
    builtin: true,
  },
  {
    id: "kimchi",
    name: "Kimchi",
    description:
      "kimchi gives you an AI-powered development assistant in your terminal that connects to kimchi's LLM infrastructure",
    install: "core install ai --kimchi",
    source: "https://github.com/getkimchi/kimchi",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    builtin: true,
  },
  {
    id: "kilocode-cli",
    name: "KiloCode CLI",
    description:
      "The open source coding agent for building with AI in VS Code, JetBrains, or the CLI",
    install: "core install ai --kilocode-cli",
    source: "https://github.com/Kilo-Org/kilocode",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    builtin: true,
  },
  {
    id: "ctx7",
    name: "Context7",
    description:
      "Up-to-date documentation for AI coding agents — eliminates stale knowledge by providing real-time, version-specific docs via MCP",
    install: "core install ai --ctx7",
    source: "https://github.com/upstash/context7",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    npm: "ctx7",
    builtin: true,
  },
  {
    id: "openspec",
    name: "OpenSpec",
    description:
      "Spec-Driven Development framework — forces structured specifications so AI agents produce accurate, maintainable code instead of guess-based coding",
    install: "core install ai --openspec",
    source: "https://github.com/Fission-AI/openspec",
    color: "text-neutral-800 dark:text-white",
    bgColor: "bg-neutral-200/50 dark:bg-white/10",
    npm: "@fission-ai/openspec",
    builtin: true,
  },
  {
    id: "qoder",
    name: "Qoder CLI",
    description:
      "A terminal-native AI coding partner — and an agent engine you can build on. Work with Qoder around your codebase from the terminal. Turn ideas into working software — from building and debugging to shipping.",
    install: "core install ai --qoder",
    source: "https://qoder.com",
    color: "text-lime-500",
    bgColor: "bg-lime-500/10",
    pkg: "qodercli",
    builtin: true,
  },
  {
    id: "cline",
    name: "Cline CLI",
    description:
      "Autonomous coding agent as an SDK, IDE extension, or CLI assistant. Run Cline in your terminal",
    install: "core install ai --cline",
    source: "https://github.com/cline/cline",
    color: "text-blue-300",
    bgColor: "bg-white/9",
    builtin: true,
  },
  {
    id: "oh-my-pi",
    name: "Oh-My-Pi",
    description:
      "Enhanced AI coding agent — improved version of Pi, built as a standalone binary with native Rust addons",
    install: "core install ai --oh-my-pi",
    source: "https://github.com/can1357/oh-my-pi",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    builtin: true,
  },
  {
    id: "cursor-cli",
    name: "Cursor CLI",
    description:
      "Cursor CLI is an AI-powered coding agent from Cursor that runs in your terminal",
    install: "core install ai --cursor-cli",
    source: "https://cursor.com",
    color: "text-neutral-800 dark:text-white",
    bgColor: "bg-neutral-200/50 dark:bg-white/10",
    pkg: "cursor-cli",
    builtin: true,
  },
  {
    id: "supercode",
    name: "SuperCode CLI",
    description:
      "The open source SWE agent — AI-powered coding assistant with multi-model support",
    install: "core install ai --supercode",
    source: "https://github.com/yashdev9274/supercli",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    builtin: true,
  },
];

export default function AIToolsPage() {
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
              <Sparkles className="mr-1.5 h-3 w-3" />
              AI Development
            </Badge>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
              AI Development Tools
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl text-lg sm:text-xl">
              AI coding assistants and tools adapted for Termux. Boost your
              productivity with AI-powered code generation, debugging, and more.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="border-border relative max-w-full overflow-hidden rounded-xl border bg-neutral-900 dark:bg-neutral-950">
                <div className="overflow-x-auto p-4">
                  <pre className="font-mono text-sm whitespace-nowrap text-[#00FF00]">
                    <code>core install ai</code>
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
              Available AI Tools
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              29 AI coding assistants and tools
            </p>
          </motion.div>

          <div className="space-y-6">
            {aiTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="border-border bg-background hover:border-foreground/20 overflow-hidden rounded-xl border transition-colors"
              >
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div
                      className={`h-12 w-12 shrink-0 ${tool.bgColor} flex items-center justify-center rounded-lg`}
                    >
                      <Box className={`h-6 w-6 ${tool.color}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <h3 className="text-lg font-semibold sm:text-xl">
                          {tool.name}
                        </h3>
                      </div>
                      <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                        {tool.description}
                      </p>

                      <div className="space-y-3">
                        <div>
                          <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
                            Installation
                          </p>
                          <ToolTerminal
                            command={tool.install}
                            copied={copiedId === tool.id}
                            onCopy={() => copyInstall(tool.id, tool.install)}
                          />
                        </div>

                        {tool.models && (
                          <div>
                            <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
                              Available Models
                            </p>
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                              {tool.models.map((model) => (
                                <div
                                  key={model.name}
                                  className="bg-muted/50 border-border rounded-lg border p-3"
                                >
                                  <div className="mb-1 flex items-center justify-between">
                                    <code className="text-foreground text-sm font-semibold">
                                      {model.name}
                                    </code>
                                    <span className="text-muted-foreground text-xs">
                                      {model.size}
                                    </span>
                                  </div>
                                  <p className="text-muted-foreground text-xs">
                                    {model.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                            <div className="mt-3">
                              <p className="text-muted-foreground mb-1 text-xs font-medium">
                                Usage:
                              </p>
                              <div className="border-border/50 relative max-w-full overflow-hidden rounded-lg border bg-neutral-900">
                                <div className="overflow-x-auto p-3">
                                  <pre className="font-mono text-xs whitespace-nowrap text-[#00FF00]">
                                    <code>
                                      ollama run {tool.models[0].name}
                                    </code>
                                  </pre>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div>
                          <a
                            href={tool.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary border-primary/20 bg-primary/10 hover:border-primary/40 hover:bg-primary/20 inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all hover:shadow-sm"
                          >
                            Source
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-border bg-muted/30 mt-12 rounded-xl border p-6 text-center"
          >
            <h3 className="mb-2 text-lg font-semibold">
              Ollama - Available Models & Usage
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Run open-source LLMs locally on your Termux environment
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <div className="border-border/50 relative max-w-full overflow-hidden rounded-lg border bg-neutral-900">
                <div className="overflow-x-auto p-3">
                  <pre className="font-mono text-xs whitespace-nowrap text-[#00FF00]">
                    <code>ollama pull llama3</code>
                  </pre>
                </div>
              </div>
              <div className="border-border/50 relative max-w-full overflow-hidden rounded-lg border bg-neutral-900">
                <div className="overflow-x-auto p-3">
                  <pre className="font-mono text-xs whitespace-nowrap text-[#00FF00]">
                    <code>ollama run llama3</code>
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
