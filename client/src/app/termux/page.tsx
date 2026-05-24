"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Terminal,
  Download,
  Rocket,
  Shield,
  Zap,
  BookOpen,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const benefits = [
  {
    icon: Shield,
    title: "Secure",
    desc: "Sandboxed Linux environment with built-in security features",
  },
  {
    icon: Zap,
    title: "Fast",
    desc: "Lightweight terminal that runs smoothly on any Android device",
  },
  {
    icon: Terminal,
    title: "Powerful",
    desc: "Access to a full Linux shell with package manager",
  },
  {
    icon: BookOpen,
    title: "Flexible",
    desc: "Install Python, Node.js, Git, and thousands of other packages",
  },
];

const whyCoreTermux = [
  "Automated installation of development environments",
  "Pre-configured tools and optimizations",
  "Easy updates and maintenance",
  "Community support and documentation",
  "Custom themes and UI enhancements",
  "Persistent configuration across sessions",
];

export default function TermuxPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <section className="border-border border-b px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="outline" className="mb-4">
              <Terminal className="mr-1.5 h-3 w-3" />
              What is Termux?
            </Badge>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4"
            >
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-2 bg-black sm:h-24 sm:w-24">
                <Terminal className="h-16 w-16 text-white sm:h-18 sm:w-18" />
              </div>
            </motion.div>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
              Termux
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl text-lg sm:text-xl">
              Termux is a Linux terminal emulator for Android that provides a
              secure, lightweight environment for running command-line programs.
              It turns your Android device into a powerful development
              workstation.
            </p>

            <div className="mb-8 flex flex-wrap gap-4">
              <Button size="lg" asChild className="px-6 py-5 text-base">
                <Link href="https://github.com/termux/termux-app/releases/download/v0.118.3/termux-app_v0.118.3+github-debug_universal.apk">
                  <Download className="mr-2 h-5 w-5" />
                  Download Termux
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="px-6 py-5 text-base"
              >
                <Link href="https://f-droid.org/packages/com.termux/">
                  Alternative Download (F-Droid)
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-border flex items-start gap-3 rounded-xl border p-4"
                >
                  <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <benefit.icon className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {benefit.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-muted/30 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Why Use Core-Termux?
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              While Termux works great out of the box, Core-Termux enhances your
              experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border-border bg-background rounded-xl border p-6"
            >
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <Rocket className="text-primary h-5 w-5" />
                Termux Only
              </h3>
              <ul className="space-y-3">
                <li className="text-muted-foreground flex items-start gap-2">
                  <span className="bg-muted mt-1 flex h-4 w-4 items-center justify-center rounded-full text-xs">
                    ✕
                  </span>
                  Manual setup required for each tool
                </li>
                <li className="text-muted-foreground flex items-start gap-2">
                  <span className="bg-muted mt-1 flex h-4 w-4 items-center justify-center rounded-full text-xs">
                    ✕
                  </span>
                  Basic terminal configuration
                </li>
                <li className="text-muted-foreground flex items-start gap-2">
                  <span className="bg-muted mt-1 flex h-4 w-4 items-center justify-center rounded-full text-xs">
                    ✕
                  </span>
                  No automated updates
                </li>
                <li className="text-muted-foreground flex items-start gap-2">
                  <span className="bg-muted mt-1 flex h-4 w-4 items-center justify-center rounded-full text-xs">
                    ✕
                  </span>
                  Default theme and fonts
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border-primary/50 bg-primary/5 rounded-xl border p-6"
            >
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <Zap className="text-primary h-5 w-5" />
                Core-Termux
              </h3>
              <ul className="space-y-3">
                {whyCoreTermux.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-green-400" />
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
            <Button size="lg" asChild className="px-8 py-5 text-base">
              <Link href="/core-termux">
                Install Core-Termux
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-base sm:text-lg">
              Download Termux first, then install Core-Termux to unlock the full
              potential of your Android development environment.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild className="px-6 py-5 text-base">
                <Link href="https://github.com/termux/termux-app/releases/download/v0.118.3/termux-app_v0.118.3+github-debug_universal.apk">
                  <Download className="mr-2 h-5 w-5" />
                  Download Termux
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="px-6 py-5 text-base"
              >
                <Link href="/core-termux">View Core-Termux Docs</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
