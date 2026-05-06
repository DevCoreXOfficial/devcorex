'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Terminal, BookOpen, Code2, Sparkles, Rocket, Database, Wrench, Layers, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

const modules = [
  { icon: Code2, key: 'language', href: '/core-termux/language', color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  { icon: Database, key: 'db', href: '/core-termux/db', color: 'text-green-500', bgColor: 'bg-green-500/10' },
  { icon: Sparkles, key: 'ai', href: '/core-termux/ai', color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
  { icon: Wrench, key: 'tools', href: '/core-termux/tools', color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
  { icon: Terminal, key: 'editor', href: '/core-termux/editor', color: 'text-pink-500', bgColor: 'bg-pink-500/10' },
  { icon: Layers, key: 'shell', href: '/core-termux/shell', color: 'text-cyan-500', bgColor: 'bg-cyan-500/10' },
]

const installCommand = 'curl -fsSL https://raw.githubusercontent.com/DevCoreXOfficial/core-termux/main/install.sh | bash'

export default function Home() {
  return (
    <div className="min-h-screen">
      <section id="hero" className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 sm:mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 mt-6 sm:mt-0 sm:mb-12"
            >
              <Image
                src="/devcorex.png"
                alt="DevCoreX Logo"
                width={160}
                height={160}
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge variant="outline" className="mb-4 text-xs sm:text-sm px-3 sm:px-4 py-1">
                Software Development Community
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
            >
              DevCoreX
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-4"
            >
              Software Development Community
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm sm:text-base md:text-lg text-muted-foreground/70 max-w-2xl mx-auto mb-8 sm:mb-10"
            >
              We develop everything using Termux on Android. Join our community and start building amazing projects today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
            >
              <Button size="lg" asChild className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-4 sm:py-5">
                <Link href="/termux">
                  <Rocket className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Get Started
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-4 sm:py-5">
                <Link href="/core-termux">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  View Documentation
                </Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-12 sm:mb-16"
          >
            <HomeTerminal command={installCommand} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-8 sm:mb-10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Explore Core-Termux
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              A modular framework for setting up and managing development environments on Termux
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4"
          >
            {modules.map((mod, index) => (
              <motion.div
                key={mod.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.05 }}
              >
                <Link
                  href={mod.href}
                  className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 md:p-5 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 hover:border-foreground/20 transition-all text-center group"
                >
                  <div className={`p-2 sm:p-3 rounded-lg ${mod.bgColor} group-hover:scale-110 transition-transform`}>
                    <mod.icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 ${mod.color}`} />
                  </div>
                  <span className="text-[10px] sm:text-xs md:text-sm font-medium capitalize">{mod.key}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 bg-muted/30 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Available Modules
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for development on Termux
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {[
              { title: 'Languages', desc: 'Node.js, Python, Rust, PHP, Perl, C/C++', href: '/core-termux/language', icon: Code2, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
              { title: 'AI Tools', desc: 'OpenCode, Claude Code, Mistral Vibe, Ollama and more', href: '/core-termux/ai', icon: Sparkles, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
              { title: 'Databases', desc: 'PostgreSQL, MariaDB, SQLite, MongoDB', href: '/core-termux/db', icon: Database, color: 'text-green-500', bgColor: 'bg-green-500/10' },
              { title: 'Code Editor', desc: 'Neovim with NvChad configuration', href: '/core-termux/editor', icon: Terminal, color: 'text-pink-500', bgColor: 'bg-pink-500/10' },
              { title: 'Dev Tools', desc: 'GitHub CLI, Vercel, TypeScript, Prettier', href: '/core-termux/tools', icon: Wrench, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
              { title: 'Courses', desc: 'HTML, CSS, JavaScript tutorials', href: '/courses', icon: BookOpen, color: 'text-cyan-500', bgColor: 'bg-cyan-500/10', highlight: true },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`block p-4 sm:p-5 md:p-6 rounded-xl border bg-background hover:bg-muted/50 hover:border-foreground/20 transition-all ${item.highlight ? 'border-primary/50' : 'border-border'}`}
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 ${item.bgColor} rounded-lg flex items-center justify-center mb-3 sm:mb-4`}>
                    <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${item.color}`} />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground">{item.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

<section id="community" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
  <div className="container mx-auto max-w-3xl text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
        Join Our Community
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8">
        For help and support, join our Telegram chat and connect with other developers
      </p>
      <Button size="lg" asChild>
        <Link href="https://t.me/devcorex_chat" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          Telegram Chat
        </Link>
      </Button>
    </motion.div>
  </div>
</section>
    </div>
  )
}

function HomeTerminal({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)

  const copyCommand = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-xl bg-neutral-900 dark:bg-neutral-950 border border-border overflow-hidden">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 border-b border-border/50 bg-neutral-800/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-[10px] sm:text-xs text-muted-foreground">terminal</span>
        </div>
        <Button variant="ghost" size="sm" onClick={copyCommand} className="h-7">
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </Button>
      </div>
      <div className="p-3 sm:p-4 overflow-x-auto">
        <pre className="font-mono text-xs sm:text-sm text-green-400 whitespace-nowrap">
          <code className="break-all pr-4">{command}</code>
        </pre>
      </div>
    </div>
  )
}
