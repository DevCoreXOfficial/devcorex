'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Layers, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const shellPlugins = [
  { name: 'powerlevel10k', desc: 'Modern and fast ZSH theme with instant prompts', install: 'git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/powerlevel10k' },
  { name: 'zsh-autosuggestions', desc: 'Smart autocompletion based on command history', install: 'git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh-plugins/zsh-autosuggestions' },
  { name: 'zsh-syntax-highlighting', desc: 'Syntax highlighting for ZSH commands', install: 'git clone https://github.com/zsh-users/zsh-syntax-highlighting ~/.zsh-plugins/zsh-syntax-highlighting' },
  { name: 'zsh-history-substring-search', desc: 'History search with arrow keys', install: 'git clone https://github.com/zsh-users/zsh-history-substring-search ~/.zsh-plugins/zsh-history-substring-search' },
  { name: 'zsh-completions', desc: 'Additional completions for ZSH', install: 'git clone https://github.com/zsh-users/zsh-completions ~/.zsh-plugins/zsh-completions' },
  { name: 'fzf-tab', desc: 'Fuzzy navigation in ZSH completions', install: 'git clone https://github.com/Aloxaf/fzf-tab ~/.zsh-plugins/fzf-tab' },
  { name: 'zsh-you-should-use', desc: 'Command suggestions to use full command names', install: 'git clone https://github.com/MichaelDae/zsh-you-should-use ~/.zsh-plugins/zsh-you-should-use' },
  { name: 'zsh-autopair', desc: 'Auto-close parentheses, quotes and brackets', install: 'git clone https://github.com/hlissner/zsh-autopair ~/.zsh-plugins/zsh-autopair' },
  { name: 'zsh-defer', desc: 'Deferred plugin loading for faster startup', install: 'git clone https://github.com/zimfw/zsh-defer ~/.zsh-plugins/zsh-defer' },
  { name: 'better-npm-completion', desc: 'Better npm completion for ZSH', install: 'git clone https://github.com/laradocs/better-npm-completion ~/.zsh-plugins/better-npm-completion' },
]

const features = [
  'Oh My Zsh framework',
  '10 pre-configured plugins',
  'Powerlevel10k theme with instant prompts',
  'Persistent session (restores last directory)',
  'Custom font support',
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
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  )
}

export default function ShellPage() {
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
              <Layers className="w-3 h-3 mr-1.5" />
              Shell
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">ZSH Shell</h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8">
              ZSH + Oh My Zsh with 10 plugins including powerlevel10k theme, autosuggestions, and syntax highlighting.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="relative rounded-xl bg-neutral-900 dark:bg-neutral-950 border border-border overflow-hidden max-w-full">
                <div className="p-4 overflow-x-auto">
                  <pre className="font-mono text-sm text-green-400 whitespace-nowrap">
                    <code>core install shell</code>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Features</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-xl border border-border bg-background"
              >
                <p className="text-sm">{feature}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Installed Plugins</h2>
            <p className="text-base text-muted-foreground">
              {shellPlugins.length} ZSH plugins
            </p>
          </motion.div>

          <div className="space-y-4">
            {shellPlugins.map((plugin, index) => (
              <motion.div
                key={plugin.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="rounded-xl border border-border bg-background p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">{plugin.name}</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{plugin.desc}</p>
                <ToolTerminal
                  command={plugin.install}
                  copied={copiedId === plugin.name}
                  onCopy={() => copyInstall(plugin.name, plugin.install)}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-6 rounded-xl border border-border bg-muted/30"
          >
            <h3 className="text-lg font-semibold mb-2">Persistent Session</h3>
            <p className="text-sm text-muted-foreground mb-4">
              The shell saves your current directory and restores it when opening a new session.
            </p>
            <div className="rounded-lg bg-neutral-900 border border-border/50 p-3 max-w-full overflow-hidden">
              <pre className="font-mono text-xs text-green-400 whitespace-nowrap">
                <code>{`# Session 1
$ cd projects/my-app
$ exit

# Session 2
$ pwd
/data/data/com.termux/files/home/projects/my-app  ← Same directory`}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}