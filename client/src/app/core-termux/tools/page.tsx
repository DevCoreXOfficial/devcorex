'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Wrench, ExternalLink, Copy, Check, Box } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const devTools = [
  { name: 'GitHub CLI', pkg: 'gh', desc: 'Official GitHub command-line tool', install: 'pkg install gh' },
  { name: 'Wget', pkg: 'wget', desc: 'File downloader', install: 'pkg install wget' },
  { name: 'Curl', pkg: 'curl', desc: 'HTTP client and transfer tool', install: 'pkg install curl' },
  { name: 'Fzf', pkg: 'fzf', desc: 'Command-line fuzzy finder', install: 'pkg install fzf' },
  { name: 'LSD', pkg: 'lsd', desc: 'Modern ls replacement with icons and colors', install: 'pkg install lsd' },
  { name: 'Bat', pkg: 'bat', desc: 'Modern cat replacement with syntax highlighting', install: 'pkg install bat' },
  { name: 'jq', pkg: 'jq', desc: 'Lightweight JSON processor', install: 'pkg install jq' },
  { name: 'Tree', pkg: 'tree', desc: 'Recursive directory listing', install: 'pkg install tree' },
  { name: 'Proot', pkg: 'proot', desc: 'Chroot alternative for user-space', install: 'pkg install proot' },
  { name: 'Cloudflared', pkg: 'cloudflared', desc: 'Cloudflare Tunnel client', install: 'pkg install cloudflared' },
  { name: 'ImageMagick', pkg: 'imagemagick', desc: 'Image manipulation suite', install: 'pkg install imagemagick' },
  { name: 'Shfmt', pkg: 'shfmt', desc: 'Shell script formatter', install: 'pkg install shfmt' },
  { name: 'Make', pkg: 'make', desc: 'Build automation tool', install: 'pkg install make' },
  { name: 'Udocker', pkg: 'udocker', desc: 'Run Docker containers without root', install: 'pkg install udocker' },
  { name: 'Tmate', pkg: 'tmate', desc: 'Instant terminal sharing', install: 'pkg install tmate' },
  { name: 'Ncurses Utils', pkg: 'ncurses-utils', desc: 'Terminal UI manipulation tools', install: 'pkg install ncurses-utils' },
  { name: 'Translate Shell', pkg: 'translate-shell', desc: 'Command-line translator', install: 'pkg install translate-shell' },
  { name: 'html2text', pkg: 'html2text', desc: 'HTML to plain text converter', install: 'pkg install html2text' },
  { name: 'bc', pkg: 'bc', desc: 'Arbitrary precision calculator', install: 'pkg install bc' },
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

export default function ToolsPage() {
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
              <Wrench className="w-3 h-3 mr-1.5" />
              Development Tools
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Dev Tools</h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8">
              Essential CLI tools for development on Termux. Git, fuzzy finders, JSON processors, and more.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="relative rounded-xl bg-neutral-900 dark:bg-neutral-950 border border-border overflow-hidden max-w-full">
                <div className="p-4 overflow-x-auto">
                  <pre className="font-mono text-sm text-green-400 whitespace-nowrap">
                    <code>core install tools</code>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Available Tools</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {devTools.length} development tools
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {devTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="rounded-xl border border-border bg-background p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">{tool.name}</h3>
                  <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono">{tool.pkg}</code>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{tool.desc}</p>
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
  )
}