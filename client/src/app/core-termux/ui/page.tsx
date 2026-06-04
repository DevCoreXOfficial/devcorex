"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Palette, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const uiComponents = [
  {
    id: "font",
    name: "Font",
    description:
      "Meslo Nerd Font for Termux - A customized font with Nerd Fonts glyphs",
    install: "core install ui --font",
    features: [
      "Nerd Fonts glyphs",
      "Powerline symbols",
      "Monospace design",
      "Better readability",
    ],
  },
  {
    id: "cursor",
    name: "Cursor",
    description: "Custom cursor style for Termux with improved visibility",
    install: "core install ui --cursor",
    features: [
      "Improved visibility",
      "Custom shape",
      "Smooth animation",
      "Theme-aware",
    ],
  },
  {
    id: "extra-keys",
    name: "Extra Keys",
    description:
      "Custom extra keys row with essential shortcuts for development",
    install: "core install ui --extra-keys",
    features: [
      "ESC key",
      "Tab key",
      "Ctrl/Alt keys",
      "Arrow navigation",
      "Customizable",
    ],
  },
  {
    id: "banner",
    name: "Banner",
    description: "Core-Termux & DevCoreX banner",
    install: "core install ui --banner",
    features: ["Welcome message", "Show version info", "Main command"],
  },
];

function ToolTerminal({
  command,
  copied,
  onCopy,
}: {
  command: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="border-border/50 relative max-w-full overflow-hidden rounded-lg border bg-neutral-900 dark:bg-neutral-950">
      <div className="overflow-x-auto p-3 pr-12">
        <pre className="font-mono text-xs whitespace-nowrap text-green-400 sm:text-sm">
          <code>{command}</code>
        </pre>
      </div>
      <button
        onClick={onCopy}
        className={`absolute top-2 right-2 rounded-md p-1.5 transition-colors ${copied ? "bg-green-400/20 text-green-400" : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"}`}
        title="Copy"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

export default function UIPage() {
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
              <Palette className="mr-1.5 h-3 w-3" />
              Termux UI
            </Badge>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
              UI Customization
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl text-lg sm:text-xl">
              Customize your Termux experience with fonts, cursors, and extra
              keys.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="border-border relative max-w-full overflow-hidden rounded-xl border bg-neutral-900 dark:bg-neutral-950">
                <div className="overflow-x-auto p-4">
                  <pre className="font-mono text-sm whitespace-nowrap text-green-400">
                    <code>core install ui</code>
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
              Available Customizations
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
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
                className="border-border bg-background overflow-hidden rounded-xl border"
              >
                <div className="p-5 sm:p-6">
                  <h3 className="mb-2 text-lg font-semibold sm:text-xl">
                    {component.name}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                    {component.description}
                  </p>

                  <div className="mb-4">
                    <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
                      Features
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {component.features.map((feature) => (
                        <span
                          key={feature}
                          className="bg-muted rounded-md px-2 py-1 text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
                      Installation
                    </p>
                    <ToolTerminal
                      command={component.install}
                      copied={copiedId === component.id}
                      onCopy={() =>
                        copyInstall(component.id, component.install)
                      }
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
            className="border-border bg-muted/30 mt-8 rounded-xl border p-6"
          >
            <h3 className="mb-2 text-lg font-semibold">
              Individual Installation
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Install only the components you need:
            </p>
            <div className="border-border/50 max-w-full overflow-hidden rounded-lg border bg-neutral-900 p-3">
              <pre className="font-mono text-xs whitespace-nowrap text-green-400">
                <code>{`core install ui --font      # Install only font
core install ui --cursor   # Install only cursor
core install ui --extra-keys  # Install only extra keys`}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
