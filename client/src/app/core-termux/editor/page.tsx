"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Terminal,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Code2,
  BookOpen,
  Box,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const keybindings = [
  {
    category: "General",
    items: [
      { key: ";", mode: "Normal", desc: "Enter command mode" },
      { key: "jk", mode: "Insert", desc: "Exit insert mode" },
      { key: "<Space>", mode: "Normal", desc: "Leader key" },
    ],
  },
  {
    category: "Line Movement",
    items: [
      { key: "<A-j>", mode: "Normal/Insert", desc: "Move line down" },
      { key: "<A-k>", mode: "Normal/Insert", desc: "Move line up" },
      { key: "<A-j>", mode: "Visual", desc: "Move selection down" },
      { key: "<A-k>", mode: "Visual", desc: "Move selection up" },
    ],
  },
  {
    category: "Window Navigation",
    items: [
      {
        key: "<S-h>",
        mode: "Normal",
        desc: "Go to left split / Previous buffer",
      },
      { key: "<S-l>", mode: "Normal", desc: "Go to right split / Next buffer" },
      { key: "<S-j>", mode: "Normal", desc: "Go to bottom split" },
      { key: "<S-k>", mode: "Normal", desc: "Go to top split" },
      { key: "<leader>sv", mode: "Normal", desc: "Split vertically" },
      { key: "<leader>sh", mode: "Normal", desc: "Split horizontally" },
      { key: "<leader>sq", mode: "Normal", desc: "Close current split" },
      { key: "<leader>so", mode: "Normal", desc: "Close other splits" },
    ],
  },
  {
    category: "Code Formatting",
    items: [
      {
        key: "<leader>fm",
        mode: "Normal",
        desc: "Format file with Prettier/conform.nvim",
      },
      {
        key: "<leader>fs",
        mode: "Normal",
        desc: "Format Bash script with shfmt",
      },
      { key: "<leader>fq", mode: "Normal", desc: "Format SQL with pg_format" },
    ],
  },
  {
    category: "AI Assistants",
    items: [
      {
        key: "<leader>aa",
        mode: "Normal/Visual",
        desc: "CodeCompanion: Open chat",
      },
      {
        key: "<leader>ai",
        mode: "Normal/Visual",
        desc: "CodeCompanion: Transform/create inline code",
      },
      {
        key: "<leader>at",
        mode: "Normal",
        desc: "CodeCompanion: Toggle chat (show/hide)",
      },
      {
        key: "<leader>am",
        mode: "Normal",
        desc: "CodeCompanion: Actions menu",
      },
      {
        key: "<leader>as",
        mode: "Normal",
        desc: "CodeCompanion: Change adapter/provider",
      },
    ],
  },
  {
    category: "GitHub Copilot (Insert Mode)",
    items: [
      { key: "Ctrl+l", mode: "Insert", desc: "Accept suggestion" },
      { key: "Ctrl+j", mode: "Insert", desc: "Next suggestion" },
      { key: "Ctrl+k", mode: "Insert", desc: "Previous suggestion" },
      { key: "Ctrl+h", mode: "Insert", desc: "Dismiss suggestion" },
    ],
  },
  {
    category: "Search & Navigation (Telescope)",
    items: [
      { key: "<leader>ff", mode: "Normal", desc: "Find files" },
      { key: "<leader>fg", mode: "Normal", desc: "Live grep (search text)" },
      { key: "<leader>fb", mode: "Normal", desc: "Search buffers" },
      { key: "<leader>fh", mode: "Normal", desc: "Search help tags" },
    ],
  },
  {
    category: "Diagnostics (LSP)",
    items: [
      { key: "[d", mode: "Normal", desc: "Go to previous diagnostic" },
      { key: "]d", mode: "Normal", desc: "Go to next diagnostic" },
      {
        key: "<leader>e",
        mode: "Normal",
        desc: "Show diagnostic in floating window",
      },
      {
        key: "<leader>q",
        mode: "Normal",
        desc: "Open diagnostic location list",
      },
    ],
  },
  {
    category: "Utilities",
    items: [
      {
        key: "<leader>y",
        mode: "Normal",
        desc: "Yank entire file to clipboard",
      },
      { key: "<leader>sr", mode: "Normal", desc: "Reload configuration" },
      { key: "<leader>ch", mode: "Normal", desc: "Clear search highlight" },
      { key: "<leader>tw", mode: "Normal", desc: "Toggle line wrap" },
      {
        key: "<leader>tn",
        mode: "Normal",
        desc: "Toggle relative line numbers",
      },
    ],
  },
  {
    category: "Code Folding",
    items: [
      { key: "<leader>z", mode: "Normal", desc: "Toggle fold under cursor" },
      {
        key: "<leader>zR",
        mode: "Normal",
        desc: "Open all folds",
      },
      {
        key: "<leader>zM",
        mode: "Normal",
        desc: "Close all folds",
      },
    ],
  },
  {
    category: "Autocompletion (Insert Mode)",
    items: [
      {
        key: "Tab",
        mode: "Insert",
        desc: "Next completion item / Expand snippet",
      },
      { key: "Shift+Tab", mode: "Insert", desc: "Previous completion item" },
      { key: "Ctrl+Space", mode: "Insert", desc: "Manual trigger completion" },
      { key: "Enter", mode: "Insert", desc: "Confirm selection" },
      { key: "Ctrl+d", mode: "Insert", desc: "Scroll docs up" },
      { key: "Ctrl+f", mode: "Insert", desc: "Scroll docs down" },
    ],
  },
];

const plugins = [
  {
    name: "nvim-cmp",
    desc: "Intelligent autocompletion engine",
    category: "Completion",
  },
  {
    name: "LuaSnip",
    desc: "Snippet engine with HTML/JSX/TSX snippets",
    category: "Completion",
  },
  { name: "nvim-lspconfig", desc: "LSP configuration", category: "LSP" },
  { name: "mason.nvim", desc: "LSP installer", category: "LSP" },
  {
    name: "nvim-treesitter",
    desc: "Syntax highlighting and code navigation",
    category: "Syntax",
  },
  {
    name: "nvim-treesitter-textobjects",
    desc: "Incremental selection",
    category: "Syntax",
  },
  { name: "conform.nvim", desc: "Code formatter", category: "Formatting" },
  { name: "copilot.vim", desc: "GitHub Copilot integration", category: "AI" },
  {
    name: "codecompanion.nvim",
    desc: "Multi-provider AI chat assistant",
    category: "AI",
  },
  {
    name: "telescope.nvim",
    desc: "Fuzzy finder for files and text",
    category: "Navigation",
  },
  {
    name: "trouble.nvim",
    desc: "Diagnostic list viewer",
    category: "Navigation",
  },
  { name: "lualine.nvim", desc: "Status bar", category: "UI" },
  { name: "bufferline.nvim", desc: "Buffer tabs", category: "UI" },
  {
    name: "indent-blankline.nvim",
    desc: "Visual indentation guides",
    category: "UI",
  },
  { name: "nvim-notify", desc: "Beautiful notifications", category: "UI" },
  { name: "which-key.nvim", desc: "Keybinding helper", category: "UI" },
  { name: "nvim-ufo", desc: "Code folding with treesitter", category: "UI" },
  { name: "nvim-scrollbar", desc: "Scrollbar with diagnostics/git indicators", category: "UI" },
  { name: "nvim-web-devicons", desc: "File type icons", category: "UI" },
  { name: "nvim-ts-autotag", desc: "Auto close HTML/JSX tags", category: "Syntax" },
  {
    name: "symbols-outline.nvim",
    desc: "Symbols outline sidebar",
    category: "Navigation",
  },
  {
    name: "friendly-snippets",
    desc: "Predefined snippets collection",
    category: "Completion",
  },
  { name: "mason-lspconfig.nvim", desc: "Mason-lspconfig bridge", category: "LSP" },
];

const languages = [
  {
    name: "JavaScript/TypeScript",
    lsp: "ts_ls",
    formatter: "Prettier",
    features: "Autocompletion, diagnostics, inlay hints",
  },
  {
    name: "HTML",
    lsp: "html-lsp",
    formatter: "Prettier",
    features: "Auto-tags, completion",
  },
  {
    name: "CSS/Tailwind",
    lsp: "cssls",
    formatter: "Prettier",
    features: "Autocompletion, Tailwind support",
  },
  {
    name: "Lua",
    lsp: "lua-language-server",
    formatter: "stylua",
    features: "Autocompletion, diagnostics",
  },
  {
    name: "Bash",
    lsp: "bashls",
    formatter: "shfmt",
    features: "Shell formatting",
  },
  {
    name: "Python",
    lsp: "pyright",
    formatter: "black",
    features: "Autocompletion, diagnostics",
  },
  {
    name: "Go",
    lsp: "gopls",
    formatter: "gofmt/goimports",
    features: "Autocompletion, diagnostics",
  },
  {
    name: "Rust",
    lsp: "rust_analyzer",
    formatter: "rustfmt",
    features: "Autocompletion, diagnostics",
  },
  {
    name: "C/C++",
    lsp: "clangd",
    formatter: "clang-format",
    features: "Autocompletion, diagnostics",
  },
  {
    name: "PHP",
    lsp: "intelephense",
    formatter: "-",
    features: "Autocompletion, diagnostics",
  },
  {
    name: "Kotlin",
    lsp: "kotlin_language_server",
    formatter: "ktfmt",
    features: "Autocompletion, diagnostics",
  },
  { name: "C#", lsp: "omnisharp", formatter: "-", features: "Autocompletion, diagnostics" },
  {
    name: "YAML",
    lsp: "yamlls",
    formatter: "Prettier",
    features: "Formatting",
  },
  {
    name: "Dockerfile",
    lsp: "dockerls",
    formatter: "-",
    features: "Diagnostics",
  },
  {
    name: "SQL",
    lsp: "sqls",
    formatter: "pg_format",
    features: "SQL formatting",
  },
  { name: "JSON", lsp: "-", formatter: "Prettier", features: "Formatting" },
  { name: "Markdown", lsp: "-", formatter: "Prettier", features: "Formatting" },
];

export default function EditorPage() {
  const [copied, setCopied] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText("core install editor");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
              Code Editor
            </Badge>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
              Neovim + NvChad
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl text-lg sm:text-xl">
              A fully configured Neovim setup optimized for Termux on Android.
              Pre-configured language servers, AI assistants, code formatters,
              and a beautiful UI.
            </p>

            <div className="border-border relative mb-6 overflow-hidden rounded-xl border bg-neutral-900 dark:bg-neutral-950">
              <div className="border-border/50 flex items-center justify-between border-b bg-neutral-800/50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-muted-foreground ml-2 text-xs">
                    Quick Install
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyInstall}
                  className="h-7 text-neutral-300 hover:text-white"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="overflow-x-auto p-4">
                <pre className="font-mono text-sm text-green-400">
                  <code>core install editor</code>
                </pre>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={() =>
                  document
                    .getElementById("keybindings")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Terminal className="mr-2 h-5 w-5" />
                View Keybindings
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link
                  href="https://github.com/DevCoreXOfficial/nvchad-termux"
                  target="_blank"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  GitHub Repository
                </Link>
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
              Features
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: "AI Integration",
                desc: "Copilot + CodeCompanion w/ Mistral, OpenAI & Anthropic",
              },
              {
                icon: Code2,
                title: "LSP Support",
                desc: "20+ languages with lazy on-demand installation",
              },
              {
                icon: Box,
                title: "Code Formatting",
                desc: "Prettier, stylua, shfmt, pg_format, black, gofmt, rustfmt",
              },
              {
                icon: Terminal,
                title: "Telescope",
                desc: "Fuzzy finder for files, text, and buffers",
              },
              {
                icon: BookOpen,
                title: "Treesitter",
                desc: "Advanced syntax highlighting + incremental selection",
              },
              {
                icon: Sparkles,
                title: "Beautiful UI",
                desc: "Eldritch theme, lualine, bufferline, scrollbar",
              },
              {
                icon: Sparkles,
                title: "Auto-closing Tags",
                desc: "Auto close and rename HTML/JSX/TSX tags",
              },
              {
                icon: Box,
                title: "Code Folding",
                desc: "nvim-ufo with treesitter & indent providers",
              },
              {
                icon: Sparkles,
                title: "Custom Snippets",
                desc: "HTML/JSX/TSX snippets via LuaSnip + friendly-snippets",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border-border bg-background rounded-xl border p-5 sm:p-6"
              >
                <feature.icon className="mb-4 h-8 w-8 text-purple-500" />
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="keybindings" className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Keybindings
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Leader Key:{" "}
              <code className="bg-muted rounded px-2 py-1">Space</code>
            </p>
          </motion.div>

          <div className="space-y-8">
            {keybindings.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <h3 className="mb-4 text-xl font-semibold">
                  {category.category}
                </h3>
                <div className="border-border overflow-x-auto rounded-xl border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="p-3 text-left font-semibold">Key</th>
                        <th className="p-3 text-left font-semibold">Mode</th>
                        <th className="p-3 text-left font-semibold">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.items.map((item, i) => (
                        <tr key={i} className="border-border border-t">
                          <td className="p-3">
                            <code className="bg-muted rounded px-2 py-1 text-xs">
                              {item.key}
                            </code>
                          </td>
                          <td className="text-muted-foreground p-3">
                            {item.mode}
                          </td>
                          <td className="p-3">{item.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ))}
          </div>
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
              Language Support
            </h2>
          </motion.div>

          <div className="border-border overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-3 text-left font-semibold">Language</th>
                  <th className="p-3 text-left font-semibold">LSP</th>
                  <th className="p-3 text-left font-semibold">Formatter</th>
                  <th className="p-3 text-left font-semibold">Features</th>
                </tr>
              </thead>
              <tbody>
                {languages.map((lang, i) => (
                  <tr key={i} className="border-border border-t">
                    <td className="p-3 font-medium">{lang.name}</td>
                    <td className="text-muted-foreground p-3">{lang.lsp}</td>
                    <td className="text-muted-foreground p-3">
                      {lang.formatter}
                    </td>
                    <td className="text-muted-foreground p-3">
                      {lang.features}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Plugins
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {plugins.map((plugin, i) => (
              <motion.div
                key={plugin.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                className="border-border bg-muted/30 rounded-xl border p-4"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="bg-background text-muted-foreground rounded-md px-2 py-0.5 text-xs">
                    {plugin.category}
                  </span>
                </div>
                <h4 className="mb-1 font-medium">{plugin.name}</h4>
                <p className="text-muted-foreground text-xs">{plugin.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-8 text-center text-3xl font-bold sm:text-4xl">
              Configuration Structure
            </h2>
            <div className="border-border overflow-x-auto rounded-xl border bg-neutral-900 p-4 sm:p-6 dark:bg-neutral-950">
              <pre className="font-mono text-xs text-green-400 sm:text-sm">
                <code>{`nvim/
├── init.lua                    # Main entry, lazy.nvim bootstrap
├── lazy-lock.json             # Plugin lockfile
├── lua/
│   ├── chadrc.lua             # Theme & base46 settings
│   ├── mappings.lua           # Custom keybindings
│   ├── options.lua            # Neovim options + Termux TMPDIR fix
│   ├── configs/
│   │   ├── cmp.lua            # Autocompletion config
│   │   ├── conform.lua        # Code formatter config
│   │   ├── lazy.lua           # lazy.nvim settings
│   │   ├── lspconfig.lua      # Lazy LSP installer (on-demand)
│   │   ├── snippets.lua       # HTML/JSX/TSX custom snippets
│   │   ├── ui.lua             # UI central config
│   │   ├── formatters/
│   │   │   └── custom.lua     # Custom formatter definitions
│   │   └── servers/
│   │       ├── cssls.lua      # CSS language server
│   │       ├── eslint.lua     # ESLint LSP
│   │       ├── html.lua       # HTML language server
│   │       ├── tailwindcss.lua # Tailwind CSS language server
│   │       └── ts_ls.lua      # TypeScript language server
│   └── plugins/
│       ├── init.lua           # Plugin imports
│       ├── ai/                # AI plugins (Copilot, CodeCompanion)
│       ├── completion/        # Completion plugins (nvim-cmp, LuaSnip)
│       ├── formatting/        # Formatting plugins (conform.nvim)
│       ├── lsp/               # LSP plugins (lspconfig, mason, trouble, ufo, autotag)
│       └── ui/                # UI plugins (lualine, bufferline, notify, scrollbar)`}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
