# DevCoreX

**DevCoreX** is a software development community website focused on **Termux/Android**. It features the **CORE-TERMUX** framework, which provides automated setup scripts and comprehensive documentation for configuring a full development environment on Termux.

## Project Structure

```
devcorex/
├── client/          # Next.js frontend (web)
└── server/          # Future backend (not yet implemented)
```

The frontend lives in `client/` and the project is designed as a monorepo for a future backend in `server/`.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) (strict mode) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + CSS variables (OKLCH) |
| UI Components | [shadcn/ui v4](https://ui.shadcn.com/) (Radix UI, radix-nova style) |
| State Management | [Zustand](https://zustand-demo.pmnd.rs/) with persist middleware |
| Animations | [framer-motion](https://www.framer.com/motion/) |
| Icons | [lucide-react](https://lucide.dev/) + [react-icons](https://react-icons.github.io/react-icons/) |
| Notifications | [sonner](https://sonner.emilkowal.ski/) |
| Package Manager | [pnpm](https://pnpm.io/) |
| Linting | ESLint v9 (flat config) + `eslint-config-next` |
| Formatting | Prettier + `prettier-plugin-tailwindcss` |
| Build | Webpack (via `--webpack` flag) |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (>= 18)
- [pnpm](https://pnpm.io/) (>= 8)

### Install

```bash
pnpm install
```

### Development

```bash
pnpm --filter client dev
```

Or from within `client/`:

```bash
pnpm dev
```

Starts the development server at [http://localhost:3000](http://localhost:3000).

### Build

```bash
pnpm --filter client build
```

### Lint

```bash
pnpm --filter client lint
```

## Features

### Pages

| Route | Description |
|-------|-------------|
| `/` | **Home** — Hero, install terminal, module grid, community links |
| `/termux` | **Termux** — What is Termux, benefits, Core-Termux comparison |
| `/core-termux` | **Core-Termux** — Full documentation with modules and clickable commands |
| `/core-termux/<module>` | **Module pages** — Detailed guides for: ai, auto, db, editor, lang, npm, shell, ui |
| `/core-termux/<command>` | **Command pages** — Dedicated docs for: brain, env, voice, install, show, update, uninstall, reinstall, open, list, pg, init, version |
| `/courses` | **Courses** — Programming courses with YouTube embed facade pattern |

### Core-Termux Modules

The CORE-TERMUX framework provides automated setup for these development tools on Termux:

- **lang** — Node.js, Python, Perl, PHP, Rust, C/C++, Go
- **db** — PostgreSQL, MariaDB, SQLite, MongoDB
- **ai** — Ollama, Codex, Claude Code, OpenCode, Engram, CodeGraph, and more
- **editor** — Neovim + NvChad with Copilot and CodeCompanion
- **dev** — GitHub CLI, Curl, LSD, Bat, jq, Fzf, Make, udocker, and more CLI essentials
- **npm** — TypeScript, Prettier, NestJS CLI, Vercel CLI, Ngrok, Live Server, Markserv
- **shell** — ZSH with powerlevel10k, autosuggestions, syntax highlighting
- **ui** — Termux font, cursor, extra keys customization
- **auto** — n8n workflow automation

### Core-Termux Commands

| Command | Description |
|---------|-------------|
| `core --version` | Show current version |
| `core brain` | Second brain — save and search memories |
| `core env` | Manage environment variables |
| `core voice` | Speech-to-agent via microphone |
| `core install` | Install specific modules or tools |
| `core show` | Show tool documentation |
| `core update` | Update modules or framework |
| `core uninstall` | Remove installed modules |
| `core reinstall` | Reinstall specific tools or modules |
| `core open` | Open documentation in browser |
| `core list` | List available tools in modules |
| `core pg` | PostgreSQL database manager |
| `core init` | Configure existing projects with templates |

## Architecture Decisions

- **All pages are `"use client"`** — no React Server Components are used
- **Zustand + persist** for theme state (stored in localStorage as `devcorex-theme`)
- **Theming via CSS variables** using OKLCH color space with `.dark` class toggle and system preference support
- **React Compiler** enabled in `next.config.ts` for automatic memoization
- **YouTube facade pattern** on the courses page to defer iframe loading for performance
- **No i18n** — the site is English-only
- **No API routes or middleware** — purely a static/content site

## Configuration Files

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js config (React Compiler enabled) |
| `tsconfig.json` | TypeScript config (strict, `@/*` path alias) |
| `components.json` | shadcn/ui configuration (radix-nova style) |
| `globals.css` | Tailwind v4 imports + full CSS variable theming |
| `eslint.config.mjs` | ESLint v9 flat config (Next.js core-web-vitals + TS) |
| `.prettierrc` | Prettier with Tailwind CSS plugin |
| `pnpm-workspace.yaml` | pnpm workspace settings (allowBuilds) |

## Environment Variables

No environment variables are currently configured. `.env*` files are gitignored.

## License

[MIT](LICENSE).
