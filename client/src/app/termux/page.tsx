'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Terminal, Download, Rocket, Shield, Zap, BookOpen, ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const benefits = [
  { icon: Shield, title: 'Secure', desc: 'Sandboxed Linux environment with built-in security features' },
  { icon: Zap, title: 'Fast', desc: 'Lightweight terminal that runs smoothly on any Android device' },
  { icon: Terminal, title: 'Powerful', desc: 'Access to a full Linux shell with package manager' },
  { icon: BookOpen, title: 'Flexible', desc: 'Install Python, Node.js, Git, and thousands of other packages' },
]

const whyCoreTermux = [
  'Automated installation of development environments',
  'Pre-configured tools and optimizations',
  'Easy updates and maintenance',
  'Community support and documentation',
  'Custom themes and UI enhancements',
  'Persistent configuration across sessions',
]

export default function TermuxPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="outline" className="mb-4">
              <Terminal className="w-3 h-3 mr-1.5" />
              What is Termux?
            </Badge>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-black border border-2">
                <Terminal className="w-16 h-16 sm:w-18 sm:h-18 text-white" />
              </div>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Termux</h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8">
              Termux is a Linux terminal emulator for Android that provides a secure, lightweight environment for running command-line programs. It turns your Android device into a powerful development workstation.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button size="lg" asChild className="text-base px-6 py-5">
                <Link href="https://github.com/termux/termux-app/releases/download/v0.118.3/termux-app_v0.118.3+github-debug_universal.apk">
                  <Download className="w-5 h-5 mr-2" />
                  Download Termux
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base px-6 py-5">
                <Link href="https://f-droid.org/packages/com.termux/">
                  Alternative Download (F-Droid)
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl border border-border"
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Why Use Core-Termux?</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              While Termux works great out of the box, Core-Termux enhances your experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-border bg-background p-6"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-primary" />
                Termux Only
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="mt-1 w-4 h-4 rounded-full bg-muted flex items-center justify-center text-xs">✕</span>
                  Manual setup required for each tool
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="mt-1 w-4 h-4 rounded-full bg-muted flex items-center justify-center text-xs">✕</span>
                  Basic terminal configuration
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="mt-1 w-4 h-4 rounded-full bg-muted flex items-center justify-center text-xs">✕</span>
                  No automated updates
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="mt-1 w-4 h-4 rounded-full bg-muted flex items-center justify-center text-xs">✕</span>
                  Default theme and fonts
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-primary/50 bg-primary/5 p-6"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Core-Termux
              </h3>
              <ul className="space-y-3">
                {whyCoreTermux.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Button size="lg" asChild className="text-base px-8 py-5">
              <Link href="/core-termux">
                Install Core-Termux
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Download Termux first, then install Core-Termux to unlock the full potential of your Android development environment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="text-base px-6 py-5">
                <Link href="https://github.com/termux/termux-app/releases/download/v0.118.3/termux-app_v0.118.3+github-debug_universal.apk">
                  <Download className="w-5 h-5 mr-2" />
                  Download Termux
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base px-6 py-5">
                <Link href="/core-termux">
                  View Core-Termux Docs
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
