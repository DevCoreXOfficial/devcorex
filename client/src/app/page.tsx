"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaBrain, FaCode } from "react-icons/fa6";
import {
  Terminal,
  BookOpen,
  Code2,
  Rocket,
  Copy,
  Check,
  ArrowRight,
  Send,
  Phone,
  FileCode,
  Globe,
  Palette,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const installCommand =
  "curl -fsSL https://raw.githubusercontent.com/DevCoreXOfficial/core-termux/main/install.sh | bash";

const words = ["Websites", "Mobile Apps", "CLI Apps", "Web Apps", "APIs & Backend"];

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      <section
        id="hero"
        className="px-4 py-16 sm:px-6 sm:py-20 md:py-32 lg:px-8"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8 text-center sm:mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 mb-8 sm:mt-0 sm:mb-12"
            >
              <Image
                src="/devcorex.webp"
                alt="DevCoreX Logo"
                width={160}
                height={160}
                className="mx-auto h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge
                variant="outline"
                className="mb-4 px-3 py-1 text-xs sm:px-4 sm:text-sm"
              >
                Software Development Community
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              DevCoreX
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mb-4 h-8 text-lg sm:text-xl md:text-2xl"
            >
              <span className="text-primary font-semibold">Build</span>{" "}
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[wordIndex]}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground/70 mx-auto mb-8 max-w-2xl text-sm sm:mb-10 sm:text-base md:text-lg"
            >
              We develop everything using Termux on Android. Join our community
              and start building amazing projects today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-8 flex flex-col items-center justify-center gap-3 sm:mb-12 sm:flex-row sm:gap-4"
            >
              <Button
                size="lg"
                asChild
                className="w-full px-6 py-4 text-sm sm:w-auto sm:px-8 sm:py-5 sm:text-base"
              >
                <Link href="/termux">
                  <Rocket className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Get Started
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full px-6 py-4 text-sm sm:w-auto sm:px-8 sm:py-5 sm:text-base"
              >
                <Link href="/core-termux">
                  <BookOpen className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
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


        </div>
      </section>

      <section className="relative overflow-hidden border-t px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent" />
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4">
              <Code2 className="mr-1.5 h-3 w-3" />
              Custom Software Development
            </Badge>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
                  Need a Custom Solution?
                </h2>
                <p className="text-muted-foreground mb-6 text-base leading-relaxed sm:text-lg">
                  From landing pages to mobile apps, I build custom software
                  tailored to your needs. Websites, web apps, mobile apps,
                  bash scripts, APIs &mdash; whatever you need, built from
                  scratch with modern tools.
                </p>
                <ul className="space-y-2">
                  {[
                    "Websites & Web Applications",
                    "Mobile Apps (Expo + React Native)",
                    "CLI Apps & Automation",
                    "APIs & Backend Services",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Check className="h-4 w-4 flex-shrink-0 text-green-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-center gap-4">
                <Button
                  size="lg"
                  asChild
                  className="w-full px-6 py-5 text-base sm:w-auto"
                >
                  <Link href="/software">
                    <Rocket className="mr-2 h-5 w-5" />
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    size="lg"
                    variant="secondary"
                    asChild
                    className="flex-1 px-6 py-5 text-base"
                  >
                    <Link href="https://t.me/DarlinMunoz" target="_blank">
                      <Send className="mr-2 h-5 w-5" />
                      Telegram
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="flex-1 px-6 py-5 text-base"
                  >
                    <Link
                      href="https://wa.me/+593959167797"
                      target="_blank"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      WhatsApp
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="sm:px-6 lg:px-8 overflow-hidden px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <Badge variant="outline" className="mb-4">
              <BookOpen className="mr-1.5 h-3 w-3" />
              Courses
            </Badge>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Learn to Code
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
              Programming tutorials from beginner to advanced &mdash; all on
              our YouTube channel
            </p>
          </motion.div>

          <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {[
              { title: "Termux", icon: Terminal, color: "text-neutral-600", bgColor: "bg-neutral-600/10", level: "Beginner" },
              { title: "Neovim", icon: FileCode, color: "text-green-400", bgColor: "bg-green-400/10", level: "Intermediate" },
              { title: "HTML", icon: Globe, color: "text-orange-500", bgColor: "bg-orange-500/10", level: "Beginner" },
              { title: "CSS", icon: Palette, color: "text-blue-500", bgColor: "bg-blue-500/10", level: "Beginner" },
              { title: "JavaScript", icon: Code, color: "text-yellow-500", bgColor: "bg-yellow-500/10", level: "Intermediate" },
            ].map((course, i) => {
              const Icon = course.icon;
              return (
                <motion.div
                  key={course.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                >
                  <Link
                    href="/courses"
                    className="border-border bg-background hover:border-foreground/20 group flex h-full flex-col items-center gap-3 rounded-xl border p-5 text-center transition-colors"
                  >
                    <div className={`${course.bgColor} rounded-lg p-2.5`}>
                      <Icon className={`${course.color} h-5 w-5`} />
                    </div>
                    <div>
                      <p className="mb-0.5 text-sm font-semibold">
                        {course.title}
                      </p>
                      <span className="text-muted-foreground text-xs">
                        {course.level}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button asChild>
              <Link href="/courses">
                View All Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Featured Core-Termux Modules
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              The most powerful tools in the ecosystem
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border bg-gradient-to-br from-purple-500/5 to-transparent p-6 sm:p-8"
            >
              <div className="bg-purple-500/10 mb-4 inline-flex rounded-xl p-3">
                <FaBrain className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold">AI Tools</h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                18+ AI coding assistants pre-configured: Claude Code,
                OpenCode, Ollama, Codex CLI, and more. Run open-source LLMs
                locally on your Termux.
              </p>
              <ul className="mb-6 space-y-1.5">
                {[
                  "Claude Code, OpenCode, Codex CLI",
                  "Ollama — run LLMs locally",
                  "Smart completions with Copilot",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <Check className="h-3 w-3 flex-shrink-0 text-green-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant="outline" asChild className="w-full">
                <Link href="/core-termux/ai">
                  Explore AI Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border bg-gradient-to-br from-pink-500/5 to-transparent p-6 sm:p-8"
            >
              <div className="bg-pink-500/10 mb-4 inline-flex rounded-xl p-3">
                <FaCode className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Code Editor</h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                Fully configured Neovim with NvChad, optimized for Termux on
                Android. LSP support for 16+ languages, GitHub Copilot, and a
                beautiful UI.
              </p>
              <ul className="mb-6 space-y-1.5">
                {[
                  "16+ language LSPs (TS, Python, Go, Rust)",
                  "GitHub Copilot + CodeCompanion AI",
                  "NvChad with Eldritch theme",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <Check className="h-3 w-3 flex-shrink-0 text-green-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant="outline" asChild className="w-full">
                <Link href="/core-termux/editor">
                  Explore Code Editor
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <Button variant="ghost" asChild>
              <Link href="/core-termux">
                View All Modules
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section
        id="community"
        className="px-4 py-12 sm:px-6 sm:py-16 md:py-24 lg:px-8"
      >
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl">
              Join Our Community
            </h2>
            <p className="text-muted-foreground mb-6 text-sm sm:mb-8 sm:text-base md:text-lg">
              For help and support, join our Telegram chat and connect with
              other developers
            </p>
            <Button size="lg" asChild>
              <Link href="https://t.me/devcorex_chat" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                Telegram Chat
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function HomeTerminal({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-border relative overflow-hidden rounded-xl border bg-neutral-900 dark:bg-neutral-950">
      <div className="border-border/50 flex items-center justify-between border-b bg-neutral-800/50 px-3 py-2 sm:px-4 sm:py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500 sm:h-3 sm:w-3" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 sm:h-3 sm:w-3" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500 sm:h-3 sm:w-3" />
          </div>
          <span className="text-muted-foreground text-[10px] sm:text-xs">
            terminal
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={copyCommand} className="h-7 text-neutral-300 hover:text-white">
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="overflow-x-auto p-3 sm:p-4">
        <pre className="font-mono text-xs whitespace-nowrap text-green-400 sm:text-sm">
          <code className="pr-4 break-all">{command}</code>
        </pre>
      </div>
    </div>
  );
}
