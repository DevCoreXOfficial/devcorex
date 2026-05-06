'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ExternalLink, Copy, Check, Box } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

const aiTools = [
  {
    id: 'qwen-code',
    name: 'Qwen Code',
    description: "Alibaba's AI coding assistant",
    install: 'npm install -g @qwen-code/qwen-code',
    source: 'https://www.npmjs.com/package/@qwen-code/qwen-code',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    npm: '@qwen-code/qwen-code',
  },
  {
    id: 'gemini-cli',
    name: 'Gemini CLI',
    description: "Google's AI assistant with Gemini",
    install: 'npm install -g @google/gemini-cli',
    source: 'https://www.npmjs.com/package/@google/gemini-cli',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    npm: '@google/gemini-cli',
  },
  {
    id: 'mistral-vibe',
    name: 'Mistral Vibe',
    description: 'Conversational AI for coding assistance',
    install: 'pip install mistral-vibe',
    source: 'https://github.com/MistralAI/mistral-vibe',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    pip: 'mistral-vibe',
  },
  {
    id: 'open-claude',
    name: 'OpenClaude',
    description: 'Open source Claude alternative',
    install: 'npm install -g @gitlawb/openclaude',
    source: 'https://www.npmjs.com/package/@gitlawb/openclaude',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    npm: '@gitlawb/openclaude',
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    description: "Anthropic's CLI tool with Claude AI",
    install: 'npm install -g @anthropic-ai/claude-code',
    source: 'https://www.npmjs.com/package/@anthropic-ai/claude-code',
    color: 'text-orange-600',
    bgColor: 'bg-orange-600/10',
    npm: '@anthropic-ai/claude-code',
  },
  {
    id: 'open-claw',
    name: 'OpenClaw',
    description: 'Multi-platform CLI with AI capabilities',
    install: 'npm install -g openclaw',
    source: 'https://www.npmjs.com/package/openclaw',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    npm: 'openclaw',
  },
  {
    id: 'ollama',
    name: 'Ollama',
    description: 'Run open-source LLMs locally on Termux',
    install: 'pkg install ollama',
    source: 'https://ollama.com',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    pkg: 'ollama',
    models: [
      { name: 'llama3', size: '8B parameters', description: 'General purpose model' },
      { name: 'llama3.2', size: '3B parameters', description: 'Lightweight general purpose' },
      { name: 'mistral', size: '7B parameters', description: 'Efficient and capable' },
      { name: 'codellama', size: '7B parameters', description: 'Code generation and completion' },
      { name: 'phi', size: '2.7B parameters', description: 'Small but powerful' },
      { name: 'qwen2.5', size: '7B parameters', description: 'Multilingual support' },
      { name: 'nomic-embed-text', size: '137M parameters', description: 'Text embedding model' },
    ],
  },
  {
    id: 'codex',
    name: 'Codex',
    description: 'AI code generation tool',
    install: 'pkg install codex',
    source: 'https://github.com/openai/codex',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    pkg: 'codex',
  },
  {
    id: 'open-code',
    name: 'OpenCode',
    description: 'Coding agent for code generation and review',
    install: 'curl -fsSL https://raw.githubusercontent.com/anomalyco/opencode/main/install.sh | bash',
    source: 'https://github.com/anomalyco/opencode',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    id: 'engram',
    name: 'Engram',
    description: 'Persistent memory system for coding agents - remembers your codebase across sessions',
    install: 'pkg install golang git sqlite && git clone https://github.com/Gentleman-Programming/engram ~/.cache/core-termux/engram && go build -C ~/.cache/core-termux/engram/cmd/engram -o $PREFIX/bin/engram',
    source: 'https://github.com/Gentleman-Programming/engram',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    builtin: true,
  },
]

function ToolTerminal({ command, copied, onCopy }: { command: string; copied: boolean; onCopy: () => void }) {
  return (
    <div className="relative rounded-lg bg-neutral-900 dark:bg-neutral-950 border border-border/50 max-w-full overflow-hidden">
      <div className="p-3 pr-12 overflow-x-auto">
        <pre className="font-mono text-xs sm:text-sm text-green-400 whitespace-nowrap">
          <code>{command}</code>
        </pre>
      </div>
      <button
        onClick={onCopy}
        className={`absolute top-2 right-2 p-1.5 rounded-md transition-colors ${copied ? 'bg-green-400/20 text-green-400' : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-400'}`}
        title="Copy"
      >
        {copied ? (
          <Check className="w-4 h-4" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  )
}

export default function AIToolsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyInstall = (id: string, cmd: string) => {
    navigator.clipboard.writeText(cmd)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="outline" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1.5" />
              AI Development
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">AI Development Tools</h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8">
              AI coding assistants and tools adapted for Termux. Boost your productivity with AI-powered code generation, debugging, and more.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="relative rounded-xl bg-neutral-900 dark:bg-neutral-950 border border-border overflow-hidden max-w-full">
                <div className="p-4 overflow-x-auto">
                  <pre className="font-mono text-sm text-green-400 whitespace-nowrap">
                    <code>core install ai</code>
                  </pre>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link href="/core-termux">
                  View CORE-TERMUX Docs &larr;
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Available AI Tools</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              10 AI coding assistants and tools
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
                className="rounded-xl border border-border bg-background overflow-hidden"
              >
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className={`shrink-0 w-12 h-12 ${tool.bgColor} rounded-lg flex items-center justify-center`}>
                      <Box className={`w-6 h-6 ${tool.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg sm:text-xl font-semibold">{tool.name}</h3>
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground mb-4">
                        {tool.description}
                      </p>

                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
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
                            <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                              Available Models
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                              {tool.models.map((model) => (
                                <div
                                  key={model.name}
                                  className="p-3 rounded-lg bg-muted/50 border border-border"
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <code className="text-sm font-semibold text-foreground">
                                      {model.name}
                                    </code>
                                    <span className="text-xs text-muted-foreground">
                                      {model.size}
                                    </span>
                                  </div>
                                  <p className="text-xs text-muted-foreground">
                                    {model.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                            <div className="mt-3">
                              <p className="text-xs font-medium text-muted-foreground mb-1">
                                Usage:
                              </p>
                              <div className="relative rounded-lg bg-neutral-900 border border-border/50 overflow-hidden max-w-full">
                                <div className="p-3 overflow-x-auto">
                                  <pre className="font-mono text-xs text-green-400 whitespace-nowrap">
                                    <code>ollama run {tool.models[0].name}</code>
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
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                          >
                            Source
                            <ExternalLink className="w-3 h-3" />
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
            className="mt-12 p-6 rounded-xl border border-border bg-muted/30 text-center"
          >
            <h3 className="text-lg font-semibold mb-2">
              Ollama - Available Models & Usage
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Run open-source LLMs locally on your Termux environment
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="relative rounded-lg bg-neutral-900 border border-border/50 overflow-hidden max-w-full">
                <div className="p-3 overflow-x-auto">
                  <pre className="font-mono text-xs text-green-400 whitespace-nowrap">
                    <code>ollama pull llama3</code>
                  </pre>
                </div>
              </div>
              <div className="relative rounded-lg bg-neutral-900 border border-border/50 overflow-hidden max-w-full">
                <div className="p-3 overflow-x-auto">
                  <pre className="font-mono text-xs text-green-400 whitespace-nowrap">
                    <code>ollama run llama3</code>
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
