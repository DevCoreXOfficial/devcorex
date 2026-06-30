"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolTerminal } from "@/components/terminal-block";

const languages = [
  {
    name: "Node.js LTS",
    pkg: "nodejs-lts",
    desc: "Long-term support release of Node.js",
    install: "core install lang --nodejs",
  },
  {
    name: "Python",
    pkg: "python",
    desc: "Python 3 interpreter",
    install: "core install lang --python",
  },
  {
    name: "Perl",
    pkg: "perl",
    desc: "Perl scripting language",
    install: "core install lang --perl",
  },
  {
    name: "PHP",
    pkg: "php",
    desc: "PHP interpreter",
    install: "core install lang --php",
  },
  {
    name: "Rust",
    pkg: "rust",
    desc: "Rust compiler and Cargo",
    install: "core install lang --rust",
  },
  {
    name: "C/C++",
    pkg: "clang",
    desc: "LLVM C/C++ compiler",
    install: "core install lang --clang",
  },
  {
    name: "Go",
    pkg: "golang",
    desc: "Go programming language",
    install: "core install lang --golang",
  },
];

export default function LanguagePage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyInstall = (id: string, cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <section className="border-border border-b px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="outline" className="mb-4">
              <Code2 className="mr-1.5 h-3 w-3" />
              Language Packages
            </Badge>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
              Languages
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl text-lg sm:text-xl">
              Programming languages and runtimes for Termux development.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="border-border relative max-w-full overflow-hidden rounded-xl border bg-neutral-900 dark:bg-neutral-950">
                <div className="overflow-x-auto p-4">
                  <pre className="font-mono text-sm whitespace-nowrap text-[#00FF00]">
                    <code>core install lang</code>
                  </pre>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link href="/core-termux">View CORE-TERMUX Docs &larr;</Link>
              </Button>
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
              Available Languages
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              {languages.length} programming languages
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {languages.map((lang, index) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border-border bg-background rounded-xl border p-4"
              >
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-medium">{lang.name}</h3>
                  <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-[10px]">
                    {lang.pkg}
                  </code>
                </div>
                <p className="text-muted-foreground mb-3 text-xs">
                  {lang.desc}
                </p>
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
            className="border-border bg-muted/30 mt-8 rounded-xl border p-6"
          >
            <h3 className="mb-2 text-lg font-semibold">
              Individual Installation
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Install specific languages:
            </p>
            <div className="border-border/50 overflow-x-auto rounded-lg border bg-neutral-900 p-3">
              <pre className="font-mono text-xs whitespace-nowrap text-[#00FF00]">
                <code>{`core install lang --python --rust --golang`}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
