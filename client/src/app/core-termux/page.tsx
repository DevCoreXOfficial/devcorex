'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Code2, Sparkles, Database, Wrench, Layers, ChevronDown, ChevronUp, Package, Box, Zap, Palette, Workflow, ArrowRight, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const installCommand = 'curl -fsSL https://raw.githubusercontent.com/DevCoreXOfficial/core-termux/main/install.sh | bash'

interface Tool {
  name: string
  desc: string
  pkg?: string
  npm?: string
  pip?: string
  git?: string
  special?: string
  cmd?: string
}

const modules: Array<{
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgColor: string
  command: string
  href: string
  tools: Tool[]
  installCmd: string
  pgCommand?: string
}> = [
  {
    id: 'language',
    title: 'Language Packages',
    description: 'Programming languages and runtimes via pkg',
    icon: Code2,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    command: 'core install language',
    href: '/core-termux/language',
    tools: [
      { name: 'Node.js LTS', pkg: 'nodejs-lts', desc: 'Long-term support release of Node.js' },
      { name: 'Python', pkg: 'python', desc: 'Python 3 interpreter' },
      { name: 'Perl', pkg: 'perl', desc: 'Perl scripting language' },
      { name: 'PHP', pkg: 'php', desc: 'PHP interpreter' },
      { name: 'Rust', pkg: 'rust', desc: 'Rust compiler and Cargo' },
      { name: 'C/C++', pkg: 'clang', desc: 'LLVM C/C++ compiler' },
    ],
    installCmd: 'pkg install nodejs-lts python perl php rust clang',
  },
  {
    id: 'db',
    title: 'Databases',
    description: 'PostgreSQL, MariaDB, SQLite, MongoDB',
    icon: Database,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    command: 'core install db',
    href: '/core-termux/db',
    tools: [
      { name: 'PostgreSQL', pkg: 'postgresql', desc: 'Advanced relational database' },
      { name: 'MariaDB', pkg: 'mariadb', desc: 'MySQL-compatible relational database' },
      { name: 'SQLite', pkg: 'sqlite', desc: 'Lightweight embedded database' },
      { name: 'MongoDB', pkg: 'mongodb', desc: 'NoSQL document database' },
    ],
    installCmd: 'pkg install postgresql mariadb sqlite mongosh',
    pgCommand: 'core pg',
  },
  {
    id: 'ai',
    title: 'AI Tools',
    description: 'AI coding assistants and chat tools',
    icon: Sparkles,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    command: 'core install ai',
    href: '/core-termux/ai',
    tools: [
      { name: 'Qwen Code', npm: '@qwen-code/qwen-code', desc: "Alibaba's AI coding assistant" },
      { name: 'Gemini CLI', npm: '@google/gemini-cli', desc: "Google's AI assistant with Gemini" },
      { name: 'Mistral Vibe', pip: 'mistral-vibe', desc: 'Conversational AI for coding assistance' },
      { name: 'OpenClaude', npm: '@gitlawb/openclaude', desc: 'Open source Claude alternative' },
      { name: 'Claude Code', npm: '@anthropic-ai/claude-code', desc: "Anthropic's CLI tool with Claude AI" },
      { name: 'OpenClaw', npm: 'openclaw', desc: 'Multi-platform CLI with AI capabilities' },
      { name: 'Ollama', pkg: 'ollama', desc: 'Run open-source LLMs locally' },
      { name: 'Codex', pkg: 'codex', desc: 'AI code generation tool' },
      { name: 'OpenCode', special: 'proot-distro', desc: 'Coding agent for code generation and review' },
      { name: 'Engram', desc: 'Persistent memory system for AI coding agents' },
    ],
    installCmd: 'npm install -g @qwen-code/qwen-code @google/gemini-cli @anthropic-ai/claude-code && pip install mistral-vibe && pkg install ollama codex',
  },
  {
    id: 'editor',
    title: 'Code Editor',
    description: 'Neovim with NvChad configuration',
    icon: Terminal,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    command: 'core install editor',
    href: '/core-termux/editor',
    tools: [
      { name: 'Neovim', pkg: 'neovim', desc: 'Fast, extensible code editor' },
      { name: 'NvChad', git: 'DevCoreXOfficial/nvchad-termux', desc: 'Modern Neovim configuration framework' },
      { name: 'GitHub Copilot', npm: '@githubnext/copilot', desc: 'AI-powered code completion' },
      { name: 'CodeCompanion', npm: 'codecompanion', desc: 'Multi-provider AI chat assistant' },
      { name: 'LSP Support', desc: 'TypeScript, HTML, CSS, Lua, Bash, JSON' },
    ],
    installCmd: 'git clone https://github.com/DevCoreXOfficial/nvchad-termux.git ~/.config/nvchad',
  },
  {
    id: 'tools',
    title: 'Development Tools',
    description: 'Essential CLI tools for development',
    icon: Wrench,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    command: 'core install tools',
    href: '/core-termux/tools',
    tools: [
      { name: 'GitHub CLI', pkg: 'gh', desc: 'Official GitHub command-line tool' },
      { name: 'Wget', pkg: 'wget', desc: 'File downloader' },
      { name: 'Curl', pkg: 'curl', desc: 'HTTP client and transfer tool' },
      { name: 'Fzf', pkg: 'fzf', desc: 'Command-line fuzzy finder' },
      { name: 'LSD', pkg: 'lsd', desc: 'Modern ls replacement with icons' },
      { name: 'Bat', pkg: 'bat', desc: 'Modern cat replacement with syntax highlighting' },
      { name: 'jq', pkg: 'jq', desc: 'Lightweight JSON processor' },
      { name: 'Tree', pkg: 'tree', desc: 'Recursive directory listing' },
      { name: 'Proot', pkg: 'proot', desc: 'Chroot alternative for user-space' },
      { name: 'Cloudflared', pkg: 'cloudflared', desc: 'Cloudflare Tunnel client' },
      { name: 'ImageMagick', pkg: 'imagemagick', desc: 'Image manipulation suite' },
      { name: 'Shfmt', pkg: 'shfmt', desc: 'Shell script formatter' },
    ],
    installCmd: 'pkg install gh wget curl fzf lsd bat jq tree proot cloudflared imagemagick shfmt',
  },
  {
    id: 'node',
    title: 'Node.js Modules',
    description: 'Global npm packages',
    icon: Package,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    command: 'core install node',
    href: '/core-termux/node',
    tools: [
      { name: 'TypeScript', npm: 'typescript', cmd: 'tsc', desc: 'TypeScript compiler' },
      { name: 'Prettier', npm: 'prettier', desc: 'Code formatter' },
      { name: 'NestJS CLI', npm: '@nestjs/cli', cmd: 'nest', desc: 'NestJS framework CLI' },
      { name: 'Vercel CLI', npm: 'vercel', cmd: 'vercel', desc: 'Vercel deployment CLI' },
      { name: 'Ngrok', npm: 'ngrok', desc: 'Secure tunnel to localhost' },
      { name: 'Live Server', npm: 'live-server', desc: 'Development server with live reload' },
      { name: 'Localtunnel', npm: 'localtunnel', cmd: 'lt', desc: 'Expose localhost to internet' },
      { name: 'NPM Check Updates', npm: 'ncu', desc: 'Find outdated dependencies' },
    ],
    installCmd: 'npm install -g typescript prettier @nestjs/cli vercel ngrok live-server localtunnel ncu',
  },
  {
    id: 'shell',
    title: 'ZSH Shell',
    description: 'ZSH + Oh My Zsh + plugins',
    icon: Layers,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    command: 'core install shell',
    href: '/core-termux/shell',
    tools: [
      { name: 'powerlevel10k', desc: 'Modern and fast ZSH theme' },
      { name: 'zsh-autosuggestions', desc: 'Smart autocompletion' },
      { name: 'zsh-syntax-highlighting', desc: 'Syntax highlighting in terminal' },
      { name: 'zsh-history-substring-search', desc: 'History search with arrow keys' },
      { name: 'zsh-completions', desc: 'Additional completions' },
      { name: 'fzf-tab', desc: 'Fuzzy navigation in completions' },
      { name: 'zsh-you-should-use', desc: 'Command suggestions' },
      { name: 'zsh-autopair', desc: 'Auto-close parentheses and quotes' },
      { name: 'zsh-better-npm-completion', desc: 'Better npm completion' },
    ],
    installCmd: 'pkg install zsh && sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"',
  },
  {
    id: 'ui',
    title: 'Termux UI',
    description: 'UI customization for Termux',
    icon: Palette,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    command: 'core install ui',
    href: '/core-termux/ui',
    tools: [
      { name: 'Font', desc: 'Meslo Nerd Font for Termux' },
      { name: 'Cursor', desc: 'Custom cursor style' },
      { name: 'Extra Keys', desc: 'Custom extra keys row' },
    ],
    installCmd: 'core install ui',
  },
  {
    id: 'automation',
    title: 'Automation',
    description: 'Automation tools like n8n',
    icon: Workflow,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    command: 'core install automation',
    href: '/core-termux/automation',
    tools: [
      { name: 'n8n', npm: 'n8n', desc: 'Workflow automation platform' },
    ],
    installCmd: 'npm install -g n8n',
  },
]

function ModuleTerminal({ command, onCopy }: { command: string; onCopy: () => void }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    onCopy()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-lg bg-neutral-900 text-green-400 p-3 max-w-full overflow-hidden">
      <button
        onClick={handleCopy}
        className={`absolute top-2 right-2 p-1.5 rounded-md transition-colors ${copied ? 'bg-green-400/20 text-green-400' : 'hover:bg-neutral-800 text-neutral-400'}`}
        title="Copy"
      >
        {copied ? (
          <Check className="w-4 h-4" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
      <pre className="font-mono text-xs whitespace-nowrap overflow-x-auto">
        <code className='pr-5'>{command}</code>
      </pre>
    </div>
  )
}

export default function CoreTermuxPage() {
  const [expandedModule, setExpandedModule] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const copyInstall = () => {
    navigator.clipboard.writeText(installCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd)
  }

  const toggleModule = (id: string) => {
    setExpandedModule(expandedModule === id ? null : id)
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="outline" className="mb-4">Modular Framework</Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">CORE-TERMUX</h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8">
              The ultimate framework for setting up and managing development environments on Termux (Android). Automate installations, updates, and configurations with simple commands.
            </p>

            <div className="relative rounded-xl bg-neutral-900 dark:bg-neutral-950 border border-border overflow-hidden mb-6">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-neutral-800/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">Quick Installation</span>
                </div>
                <Button variant="ghost" size="sm" onClick={copyInstall} className="h-7">
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <div className="p-4 overflow-x-auto">
                <pre className="font-mono text-sm text-green-400 whitespace-nowrap">
                  <code className='pr-5'>{installCommand}</code>
                </pre>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" onClick={() => document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' })}>
                <Box className="w-5 h-5 mr-2" />
                Modules
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="https://github.com/DevCoreXOfficial/core-termux" target="_blank">
                  GitHub Repository
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="modules" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Modules</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
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
                className="rounded-xl border border-border bg-background overflow-hidden"
              >
                <button
                  onClick={() => toggleModule(mod.id)}
                  className="w-full p-4 sm:p-5 flex items-center gap-4 text-left hover:bg-muted/50 transition-colors"
                >
                  <div className={`p-2 sm:p-3 rounded-lg ${mod.bgColor}`}>
                    <mod.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${mod.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base sm:text-lg font-semibold">{mod.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">{mod.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {mod.href && (
                      <Link
                        href={mod.href}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        View Docs
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                    <pre className="hidden sm:block font-mono text-xs bg-muted px-2 py-1 rounded">
                      <code className="text-green-400">{mod.command}</code>
                    </pre>
                    {expandedModule === mod.id ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {expandedModule === mod.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 sm:p-5 border-t border-border bg-muted/30">
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-3">Tools:</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {mod.tools.map((tool) => (
                              <div key={tool.name} className="p-3 rounded-lg bg-background border border-border">
                                <div className="flex items-start justify-between mb-1">
                                  <h4 className="font-medium text-sm">{tool.name}</h4>
                                  {tool.pkg && (
                                    <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono">{tool.pkg}</code>
                                  )}
                                  {tool.npm && (
                                    <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono">{tool.npm}</code>
                                  )}
                                  {tool.pip && (
                                    <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono">{tool.pip}</code>
                                  )}
                                  {tool.git && (
                                    <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono">{tool.git}</code>
                                  )}
                                  {tool.special && (
                                    <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono">{tool.special}</code>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground">{tool.desc}</p>
                                {tool.cmd && (
                                  <code className="text-xs text-green-400 mt-1 block">Command: {tool.cmd}</code>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Installation:</p>
                          <ModuleTerminal command={mod.installCmd} onCopy={() => copyCommand(mod.installCmd)} />
                        </div>
                        {mod.pgCommand && (
                          <div className="mt-3">
                            <p className="text-sm font-medium mb-2">PostgreSQL Manager:</p>
                            <pre className="font-mono text-xs bg-muted px-2 py-1 rounded inline-block">
                              <code className="text-green-400">{mod.pgCommand}</code>
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

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Main Commands</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { cmd: 'core setup', desc: 'Interactive installation wizard', icon: Zap },
              { cmd: 'core install <module>', desc: 'Install specific modules', icon: Package },
              { cmd: 'core update <module>', desc: 'Update modules or framework', icon: ArrowRight },
              { cmd: 'core uninstall <module>', desc: 'Remove installed modules', icon: Box },
              { cmd: 'core list <module>', desc: 'List available tools in modules', icon: Layers },
              { cmd: 'core pg', desc: 'PostgreSQL database manager', icon: Database },
              { cmd: 'core init <template>', desc: 'Configure existing projects', icon: Code2 },
            ].map((item) => (
              <motion.div
                key={item.cmd}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-4 rounded-xl border border-border bg-muted/30"
              >
                <div className="flex items-center gap-2 mb-2">
                  <item.icon className="w-4 h-4 text-primary" />
                  <code className="font-mono text-sm font-semibold text-green-400">{item.cmd}</code>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
