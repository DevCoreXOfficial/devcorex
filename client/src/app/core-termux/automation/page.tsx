'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Workflow, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const features = [
  'Workflow automation platform',
  'No-code/low-code workflow builder',
  '8000+ integrations',
  'Self-hosted option',
  'Webhooks support',
  'Data transformation',
]

const commands = [
  { cmd: 'core install automation', desc: 'Install n8n' },
  { cmd: 'n8n start', desc: 'Start n8n server' },
  { cmd: 'n8n webhook', desc: 'Start n8n in webhook mode' },
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

export default function AutomationPage() {
  const [copied, setCopied] = useState(false)

  const copyInstall = (cmd: string) => {
    navigator.clipboard.writeText(cmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
              <Workflow className="w-3 h-3 mr-1.5" />
              Automation
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Automation Tools</h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8">
              n8n workflow automation platform for Termux. Automate tasks and connect your services.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="relative rounded-xl bg-neutral-900 dark:bg-neutral-950 border border-border overflow-hidden max-w-full">
                <div className="p-4 overflow-x-auto">
                  <pre className="font-mono text-sm text-green-400 whitespace-nowrap">
                    <code>core install automation</code>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">n8n Workflow Automation</h2>
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
            className="mb-8"
          >
            <h3 className="text-xl font-semibold mb-4">Installation</h3>
            <ToolTerminal
              command="npm install -g n8n"
              copied={copied}
              onCopy={() => copyInstall('npm install -g n8n')}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="text-xl font-semibold mb-4">Basic Commands</h3>
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="space-y-3">
                {commands.map((cmd) => (
                  <div key={cmd.cmd} className="flex items-center gap-4">
                    <code className="font-mono text-sm text-green-400">{cmd.cmd}</code>
                    <span className="text-sm text-muted-foreground">— {cmd.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl border border-border bg-muted/30"
          >
            <h3 className="text-lg font-semibold mb-2">Getting Started</h3>
            <p className="text-sm text-muted-foreground mb-4">
              After installation, start n8n and access the web interface:
            </p>
            <div className="rounded-lg bg-neutral-900 border border-border/50 p-3">
              <pre className="font-mono text-xs text-green-400">
                <code>{`# Start n8n
n8n start

# Access at
http://localhost:5678`}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}