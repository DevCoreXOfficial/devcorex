'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Code2, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const languages = [
  { name: 'Node.js LTS', pkg: 'nodejs-lts', desc: 'Long-term support release of Node.js', install: 'pkg install nodejs-lts' },
  { name: 'Python', pkg: 'python', desc: 'Python 3 interpreter', install: 'pkg install python' },
  { name: 'Perl', pkg: 'perl', desc: 'Perl scripting language', install: 'pkg install perl' },
  { name: 'PHP', pkg: 'php', desc: 'PHP interpreter', install: 'pkg install php' },
  { name: 'Rust', pkg: 'rust', desc: 'Rust compiler and Cargo', install: 'pkg install rust' },
  { name: 'C/C++', pkg: 'clang', desc: 'LLVM C/C++ compiler', install: 'pkg install clang' },
  { name: 'Go', pkg: 'golang', desc: 'Go programming language', install: 'pkg install golang' },
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

export default function LanguagePage() {
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
              <Code2 className="w-3 h-3 mr-1.5" />
              Language Packages
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Languages</h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8">
              Programming languages and runtimes for Termux development.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="relative rounded-xl bg-neutral-900 dark:bg-neutral-950 border border-border overflow-hidden max-w-full">
                <div className="p-4 overflow-x-auto">
                  <pre className="font-mono text-sm text-green-400 whitespace-nowrap">
                    <code>core install language</code>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Available Languages</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {languages.length} programming languages
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {languages.map((lang, index) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-border bg-background p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">{lang.name}</h3>
                  <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono">{lang.pkg}</code>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{lang.desc}</p>
                <ToolTerminal
                  command={lang.install}
                  copied={copiedId === lang.name}
                  onCopy={() => copyInstall(lang.name, lang.install)}
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
            <h3 className="text-lg font-semibold mb-2">Individual Installation</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Install specific languages:
            </p>
            <div className="rounded-lg bg-neutral-900 border border-border/50 p-3 overflow-x-auto">
              <pre className="font-mono text-xs text-green-400 whitespace-nowrap">
                <code>{`pkg install nodejs-lts python perl php rust clang golang`}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}