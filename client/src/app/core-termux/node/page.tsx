'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Package, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const nodeModules = [
  { name: 'TypeScript', npm: 'typescript', cmd: 'tsc', desc: 'TypeScript compiler', install: 'npm install -g typescript' },
  { name: 'NestJS CLI', npm: '@nestjs/cli', cmd: 'nest', desc: 'NestJS framework CLI', install: 'npm install -g @nestjs/cli' },
  { name: 'Prettier', npm: 'prettier', desc: 'Code formatter', install: 'npm install -g prettier' },
  { name: 'Live Server', npm: 'live-server', desc: 'Development server with live reload', install: 'npm install -g live-server' },
  { name: 'Localtunnel', npm: 'localtunnel', cmd: 'lt', desc: 'Expose localhost to the internet', install: 'npm install -g localtunnel' },
  { name: 'Vercel CLI', npm: 'vercel', cmd: 'vercel', desc: 'Vercel deployment CLI', install: 'npm install -g vercel' },
  { name: 'Markserv', npm: 'markserv', desc: 'Markdown live-preview server', install: 'npm install -g markserv' },
  { name: 'PSQL Format', npm: 'psqlformat', desc: 'PostgreSQL query formatter', install: 'npm install -g psqlformat' },
  { name: 'NPM Check Updates', npm: 'ncu', desc: 'Find outdated dependencies', install: 'npm install -g ncu' },
  { name: 'Ngrok', npm: 'ngrok', desc: 'Secure tunnel to localhost', install: 'npm install -g ngrok' },
]

const features = [
  'Global npm packages for development',
  'Android-compatible localtunnel fix',
  'Pre-configured for Termux',
  'TypeScript, Prettier, Vercel CLI included',
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

export default function NodePage() {
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
              <Package className="w-3 h-3 mr-1.5" />
              Node.js Modules
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Node Modules</h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8">
              Global npm packages for your development workflow on Termux.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="relative rounded-xl bg-neutral-900 dark:bg-neutral-950 border border-border overflow-hidden max-w-full">
                <div className="p-4 overflow-x-auto">
                  <pre className="font-mono text-sm text-green-400 whitespace-nowrap">
                    <code>core install node</code>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Available Packages</h2>
            <p className="text-base text-muted-foreground">
              {nodeModules.length} global npm packages
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nodeModules.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="rounded-xl border border-border bg-background p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">{pkg.name}</h3>
                  <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono">{pkg.npm}</code>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{pkg.desc}</p>
                {pkg.cmd && <code className="text-xs text-green-400">Command: {pkg.cmd}</code>}
                <div className="mt-3">
                  <ToolTerminal
                    command={pkg.install}
                    copied={copiedId === pkg.name}
                    onCopy={() => copyInstall(pkg.name, pkg.install)}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-6 rounded-xl border border-border bg-muted/30"
          >
            <h3 className="text-lg font-semibold mb-2">Localtunnel for Android</h3>
            <p className="text-sm text-muted-foreground mb-4">
              The localtunnel package includes an automatic fix for Android that replaces <code>openurl</code> with <code>termux-open-url</code>.
            </p>
            <div className="rounded-lg bg-neutral-900 border border-border/50 p-3 max-w-full overflow-hidden">
              <pre className="font-mono text-xs text-green-400 whitespace-nowrap">
                <code>{`# No extra setup needed - fix is applied automatically
lt --port 3000`}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}