'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Palette, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const uiComponents = [
  {
    id: 'font',
    name: 'Font',
    description: 'Meslo Nerd Font for Termux - A customized font with Nerd Fonts glyphs',
    install: 'core install ui --font',
    features: ['Nerd Fonts glyphs', 'Powerline symbols', 'Monospace design', 'Better readability'],
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'Custom cursor style for Termux with improved visibility',
    install: 'core install ui --cursor',
    features: ['Improved visibility', 'Custom shape', 'Smooth animation', 'Theme-aware'],
  },
  {
    id: 'extra-keys',
    name: 'Extra Keys',
    description: 'Custom extra keys row with essential shortcuts for development',
    install: 'core install ui --extra-keys',
    features: ['ESC key', 'Tab key', 'Ctrl/Alt keys', 'Arrow navigation', 'Customizable'],
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
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  )
}

export default function UIPage() {
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
              <Palette className="w-3 h-3 mr-1.5" />
              Termux UI
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">UI Customization</h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8">
              Customize your Termux experience with fonts, cursors, and extra keys.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="relative rounded-xl bg-neutral-900 dark:bg-neutral-950 border border-border overflow-hidden max-w-full">
                <div className="p-4 overflow-x-auto">
                  <pre className="font-mono text-sm text-green-400 whitespace-nowrap">
                    <code>core install ui</code>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Available Customizations</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              3 UI components
            </p>
          </motion.div>

          <div className="space-y-6">
            {uiComponents.map((component, index) => (
              <motion.div
                key={component.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-border bg-background overflow-hidden"
              >
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{component.name}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">
                    {component.description}
                  </p>

                  <div className="mb-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                      Features
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {component.features.map((feature) => (
                        <span key={feature} className="text-xs px-2 py-1 rounded-md bg-muted">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                      Installation
                    </p>
                    <ToolTerminal
                      command={component.install}
                      copied={copiedId === component.id}
                      onCopy={() => copyInstall(component.id, component.install)}
                    />
                  </div>
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
            <h3 className="text-lg font-semibold mb-2">Individual Installation</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Install only the components you need:
            </p>
            <div className="rounded-lg bg-neutral-900 border border-border/50 p-3 max-w-full overflow-hidden">
              <pre className="font-mono text-xs text-green-400 whitespace-nowrap">
                <code>{`core install ui --font      # Install only font
core install ui --cursor   # Install only cursor
core install ui --extra-keys  # Install only extra keys`}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}