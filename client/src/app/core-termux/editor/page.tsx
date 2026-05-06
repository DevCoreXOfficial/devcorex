'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Terminal, Copy, Check, ExternalLink, Sparkles, Code2, BookOpen, Box, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TerminalBlock, CommandBlock } from '@/components/terminal-block'

const keybindings = [
  {
    category: 'General',
    items: [
      { key: ';', mode: 'Normal', desc: 'Enter command mode' },
      { key: 'jk', mode: 'Insert', desc: 'Exit insert mode' },
      { key: '<Space>', mode: 'Normal', desc: 'Leader key' },
    ],
  },
  {
    category: 'Line Movement',
    items: [
      { key: '<A-j>', mode: 'Normal/Insert', desc: 'Move line down' },
      { key: '<A-k>', mode: 'Normal/Insert', desc: 'Move line up' },
      { key: '<A-j>', mode: 'Visual', desc: 'Move selection down' },
      { key: '<A-k>', mode: 'Visual', desc: 'Move selection up' },
    ],
  },
  {
    category: 'Window Navigation',
    items: [
      { key: '<S-h>', mode: 'Normal', desc: 'Go to left split / Previous buffer' },
      { key: '<S-l>', mode: 'Normal', desc: 'Go to right split / Next buffer' },
      { key: '<S-j>', mode: 'Normal', desc: 'Go to bottom split' },
      { key: '<S-k>', mode: 'Normal', desc: 'Go to top split' },
      { key: '<leader>sv', mode: 'Normal', desc: 'Split vertically' },
      { key: '<leader>sh', mode: 'Normal', desc: 'Split horizontally' },
      { key: '<leader>sq', mode: 'Normal', desc: 'Close current split' },
      { key: '<leader>so', mode: 'Normal', desc: 'Close other splits' },
    ],
  },
  {
    category: 'Code Formatting',
    items: [
      { key: '<leader>fm', mode: 'Normal', desc: 'Format file with Prettier/conform.nvim' },
      { key: '<leader>fs', mode: 'Normal', desc: 'Format Bash script with shfmt' },
      { key: '<leader>fq', mode: 'Normal', desc: 'Format SQL with pg_format' },
    ],
  },
  {
    category: 'AI Assistants',
    items: [
      { key: '<leader>aa', mode: 'Normal/Visual', desc: 'CodeCompanion: Open chat' },
      { key: '<leader>ai', mode: 'Normal/Visual', desc: 'CodeCompanion: Transform/create inline code' },
      { key: '<leader>at', mode: 'Normal', desc: 'CodeCompanion: Toggle chat (show/hide)' },
      { key: '<leader>am', mode: 'Normal', desc: 'CodeCompanion: Actions menu' },
      { key: '<leader>as', mode: 'Normal', desc: 'CodeCompanion: Change adapter/provider' },
    ],
  },
  {
    category: 'GitHub Copilot (Insert Mode)',
    items: [
      { key: 'Ctrl+l', mode: 'Insert', desc: 'Accept suggestion' },
      { key: 'Ctrl+j', mode: 'Insert', desc: 'Next suggestion' },
      { key: 'Ctrl+k', mode: 'Insert', desc: 'Previous suggestion' },
      { key: 'Ctrl+h', mode: 'Insert', desc: 'Dismiss suggestion' },
    ],
  },
  {
    category: 'Search & Navigation (Telescope)',
    items: [
      { key: '<leader>ff', mode: 'Normal', desc: 'Find files' },
      { key: '<leader>fg', mode: 'Normal', desc: 'Live grep (search text)' },
      { key: '<leader>fb', mode: 'Normal', desc: 'Search buffers' },
      { key: '<leader>fh', mode: 'Normal', desc: 'Search help tags' },
    ],
  },
  {
    category: 'Diagnostics (LSP)',
    items: [
      { key: '[d', mode: 'Normal', desc: 'Go to previous diagnostic' },
      { key: ']d', mode: 'Normal', desc: 'Go to next diagnostic' },
      { key: '<leader>e', mode: 'Normal', desc: 'Show diagnostic in floating window' },
      { key: '<leader>q', mode: 'Normal', desc: 'Open diagnostic location list' },
    ],
  },
  {
    category: 'Utilities',
    items: [
      { key: '<leader>y', mode: 'Normal', desc: 'Yank entire file to clipboard' },
      { key: '<leader>sr', mode: 'Normal', desc: 'Reload configuration' },
      { key: '<leader>ch', mode: 'Normal', desc: 'Clear search highlight' },
      { key: '<leader>tw', mode: 'Normal', desc: 'Toggle line wrap' },
      { key: '<leader>tn', mode: 'Normal', desc: 'Toggle relative line numbers' },
    ],
  },
  {
    category: 'Autocompletion (Insert Mode)',
    items: [
      { key: 'Tab', mode: 'Insert', desc: 'Next completion item / Expand snippet' },
      { key: 'Shift+Tab', mode: 'Insert', desc: 'Previous completion item' },
      { key: 'Ctrl+Space', mode: 'Insert', desc: 'Manual trigger completion' },
      { key: 'Enter', mode: 'Insert', desc: 'Confirm selection' },
      { key: 'Ctrl+d', mode: 'Insert', desc: 'Scroll docs up' },
      { key: 'Ctrl+f', mode: 'Insert', desc: 'Scroll docs down' },
    ],
  },
]

const plugins = [
  { name: 'nvim-cmp', desc: 'Intelligent autocompletion engine', category: 'Completion' },
  { name: 'LuaSnip', desc: 'Snippet engine with HTML/JSX/TSX snippets', category: 'Completion' },
  { name: 'nvim-lspconfig', desc: 'LSP configuration', category: 'LSP' },
  { name: 'mason.nvim', desc: 'LSP installer', category: 'LSP' },
  { name: 'nvim-treesitter', desc: 'Syntax highlighting and code navigation', category: 'Syntax' },
  { name: 'nvim-treesitter-textobjects', desc: 'Incremental selection', category: 'Syntax' },
  { name: 'conform.nvim', desc: 'Code formatter', category: 'Formatting' },
  { name: 'copilot.vim', desc: 'GitHub Copilot integration', category: 'AI' },
  { name: 'codecompanion.nvim', desc: 'Multi-provider AI chat assistant', category: 'AI' },
  { name: 'telescope.nvim', desc: 'Fuzzy finder for files and text', category: 'Navigation' },
  { name: 'trouble.nvim', desc: 'Diagnostic list viewer', category: 'Navigation' },
  { name: 'lualine.nvim', desc: 'Status bar', category: 'UI' },
  { name: 'bufferline.nvim', desc: 'Buffer tabs', category: 'UI' },
  { name: 'indent-blankline.nvim', desc: 'Visual indentation guides', category: 'UI' },
  { name: 'nvim-notify', desc: 'Beautiful notifications', category: 'UI' },
  { name: 'which-key.nvim', desc: 'Keybinding helper', category: 'UI' },
]

const languages = [
  { name: 'JavaScript/TypeScript', lsp: 'ts_ls', formatter: 'Prettier', features: 'Autocompletion, diagnostics, inlay hints' },
  { name: 'HTML', lsp: 'html-lsp', formatter: 'Prettier', features: 'Auto-tags, completion' },
  { name: 'CSS/Tailwind', lsp: 'cssls', formatter: 'Prettier', features: 'Autocompletion, Tailwind support' },
  { name: 'Lua', lsp: 'lua-language-server', formatter: 'stylua', features: 'Autocompletion, diagnostics' },
  { name: 'Bash', lsp: 'bashls', formatter: 'shfmt', features: 'Shell formatting' },
  { name: 'SQL', lsp: '-', formatter: 'pg_format', features: 'SQL formatting' },
  { name: 'JSON', lsp: '-', formatter: 'Prettier', features: 'Formatting' },
  { name: 'Markdown', lsp: '-', formatter: 'Prettier', features: 'Formatting' },
]

export default function EditorPage() {
  const [copied, setCopied] = useState(false)

  const copyInstall = () => {
    navigator.clipboard.writeText('git clone https://github.com/DevCoreXOfficial/nvchad-termux.git && cd nvchad-termux && bash nvchad.sh')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="outline" className="mb-4">Code Editor</Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Neovim + NvChad</h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8">
              A fully configured Neovim setup optimized for Termux on Android. Pre-configured language servers, AI assistants, code formatters, and a beautiful UI.
            </p>

            <div className="relative rounded-xl bg-neutral-900 dark:bg-neutral-950 border border-border overflow-hidden mb-6">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-neutral-800/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">Quick Install</span>
                </div>
                <Button variant="ghost" size="sm" onClick={copyInstall} className="h-7">
                  {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <div className="p-4 overflow-x-auto">
                <pre className="font-mono text-sm text-green-400">
                  <code>git clone https://github.com/DevCoreXOfficial/nvchad-termux.git && cd nvchad-termux && bash nvchad.sh</code>
                </pre>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" onClick={() => document.getElementById('keybindings')?.scrollIntoView({ behavior: 'smooth' })}>
                <Terminal className="w-5 h-5 mr-2" />
                View Keybindings
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="https://github.com/DevCoreXOfficial/nvchad-termux" target="_blank">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  GitHub Repository
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Features</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: Sparkles, title: 'AI Integration', desc: 'GitHub Copilot & CodeCompanion with multiple providers' },
              { icon: Code2, title: 'LSP Support', desc: 'TypeScript, HTML, CSS, Lua, Bash, and more' },
              { icon: Box, title: 'Code Formatting', desc: 'Prettier, stylua, shfmt, pg_format' },
              { icon: Terminal, title: 'Telescope', desc: 'Fuzzy finder for files, text, and buffers' },
              { icon: BookOpen, title: 'Treesitter', desc: 'Advanced syntax highlighting' },
              { icon: Sparkles, title: 'Beautiful UI', desc: 'Eldritch theme, lualine, bufferline' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-5 sm:p-6 rounded-xl border border-border bg-background"
              >
                <feature.icon className="w-8 h-8 text-purple-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="keybindings" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Keybindings</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Leader Key: <code className="bg-muted px-2 py-1 rounded">Space</code>
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
                <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
                <div className="rounded-xl border border-border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-3 font-semibold">Key</th>
                        <th className="text-left p-3 font-semibold">Mode</th>
                        <th className="text-left p-3 font-semibold">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.items.map((item, i) => (
                        <tr key={i} className="border-t border-border">
                          <td className="p-3">
                            <code className="bg-muted px-2 py-1 rounded text-xs">{item.key}</code>
                          </td>
                          <td className="p-3 text-muted-foreground">{item.mode}</td>
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

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Language Support</h2>
          </motion.div>

          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-semibold">Language</th>
                  <th className="text-left p-3 font-semibold">LSP</th>
                  <th className="text-left p-3 font-semibold">Formatter</th>
                  <th className="text-left p-3 font-semibold">Features</th>
                </tr>
              </thead>
              <tbody>
                {languages.map((lang, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="p-3 font-medium">{lang.name}</td>
                    <td className="p-3 text-muted-foreground">{lang.lsp}</td>
                    <td className="p-3 text-muted-foreground">{lang.formatter}</td>
                    <td className="p-3 text-muted-foreground">{lang.features}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Plugins</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {plugins.map((plugin, i) => (
              <motion.div
                key={plugin.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                className="p-4 rounded-xl border border-border bg-muted/30"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-md bg-background text-muted-foreground">
                    {plugin.category}
                  </span>
                </div>
                <h4 className="font-medium mb-1">{plugin.name}</h4>
                <p className="text-xs text-muted-foreground">{plugin.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Configuration Structure</h2>
            <div className="rounded-xl bg-neutral-900 dark:bg-neutral-950 border border-border p-4 sm:p-6 overflow-x-auto">
              <pre className="font-mono text-xs sm:text-sm text-green-400">
                <code>{`nvim/
├── init.lua                    # Main entry, lazy.nvim bootstrap
├── lua/
│   ├── chadrc.lua             # Theme & base46 settings
│   ├── mappings.lua           # Custom keybindings
│   ├── options.lua            # Neovim options
│   ├── configs/
│   │   ├── cmp.lua            # Autocompletion config
│   │   ├── conform.lua        # Code formatter config
│   │   ├── lspconfig.lua      # Language server config
│   │   └── lazy.lua           # lazy.nvim settings
│   └── plugins/
│       ├── ai/                # AI plugins
│       ├── completion/        # Completion plugins
│       ├── formatting/        # Formatting plugins
│       ├── lsp/               # LSP plugins
│       └── ui/                # UI plugins`}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}