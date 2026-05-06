'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Database, ExternalLink, Copy, Check, Box } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const databases = [
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    description: 'Advanced relational database system with ACID compliance, foreign keys, triggers, and stored procedures.',
    install: 'pkg install postgresql',
    source: 'https://www.postgresql.org/',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    pkg: 'postgresql',
    features: ['ACID Compliant', 'Foreign Keys', 'Triggers & Stored Procedures', 'JSON Support', 'Full-Text Search'],
    commands: [
      { cmd: 'core pg start', desc: 'Start PostgreSQL server' },
      { cmd: 'core pg stop', desc: 'Stop PostgreSQL server' },
      { cmd: 'core pg status', desc: 'Check server status' },
      { cmd: 'core pg init', desc: 'Initialize database' },
      { cmd: 'core pg create <name>', desc: 'Create database' },
      { cmd: 'core pg drop <name>', desc: 'Drop database' },
      { cmd: 'core pg list', desc: 'List databases' },
      { cmd: 'core pg shell', desc: 'Open psql console' },
    ],
  },
  {
    id: 'mariadb',
    name: 'MariaDB',
    description: 'MySQL-compatible relational database, fast, scalable and robust.',
    install: 'pkg install mariadb',
    source: 'https://mariadb.org/',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    pkg: 'mariadb',
    features: ['MySQL Compatible', 'High Performance', 'ACID Compliant', 'Row-level Locking', 'Automatic Recovery'],
  },
  {
    id: 'sqlite',
    name: 'SQLite',
    description: 'Lightweight, disk-based database that does not require a separate server process.',
    install: 'pkg install sqlite',
    source: 'https://sqlite.org/',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    pkg: 'sqlite',
    features: ['Zero-Configuration', 'Serverless', 'Transactional', 'Small Footprint', 'Standard SQL'],
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    description: 'NoSQL document database with JSON-like documents and dynamic schema.',
    install: 'pkg install mongodb',
    source: 'https://www.mongodb.com/',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    pkg: 'mongodb',
    features: ['Document-Oriented', 'JSON-like Documents', 'Dynamic Schema', 'Horizontal Scaling', 'Rich Query Language'],
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

export default function DatabasesPage() {
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
              <Database className="w-3 h-3 mr-1.5" />
              Databases
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Database Tools</h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8">
              PostgreSQL, MariaDB, SQLite, and MongoDB for your Termux development environment.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="relative rounded-xl bg-neutral-900 dark:bg-neutral-950 border border-border overflow-hidden max-w-full">
                <div className="p-4 overflow-x-auto">
                  <pre className="font-mono text-sm text-green-400 whitespace-nowrap">
                    <code>core install db</code>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Available Databases</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              4 database management systems
            </p>
          </motion.div>

          <div className="space-y-6">
            {databases.map((db, index) => (
              <motion.div
                key={db.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-border bg-background overflow-hidden"
              >
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className={`shrink-0 w-12 h-12 ${db.bgColor} rounded-lg flex items-center justify-center`}>
                      <Box className={`w-6 h-6 ${db.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg sm:text-xl font-semibold">{db.name}</h3>
                        <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">{db.pkg}</code>
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground mb-4">
                        {db.description}
                      </p>

                      <div className="mb-4">
                        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                          Features
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {db.features.map((feature) => (
                            <span key={feature} className="text-xs px-2 py-1 rounded-md bg-muted">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                            Installation
                          </p>
                          <ToolTerminal
                            command={db.install}
                            copied={copiedId === db.id + '-install'}
                            onCopy={() => copyInstall(db.id + '-install', db.install)}
                          />
                        </div>

                        {db.commands && (
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                              PostgreSQL Manager Commands
                            </p>
                            <div className="rounded-lg bg-muted/50 border border-border p-3">
                              <div className="space-y-2">
                                {db.commands.map((cmd) => (
                                  <div key={cmd.cmd} className="flex items-center gap-3">
                                    <code className="font-mono text-xs text-green-400">{cmd.cmd}</code>
                                    <span className="text-xs text-muted-foreground">— {cmd.desc}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        <div>
                          <a
                            href={db.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                          >
                            Documentation
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
        </div>
      </section>
    </div>
  )
}