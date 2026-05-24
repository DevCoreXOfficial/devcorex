# DevCoreX — Frontend

Next.js frontend for the DevCoreX community website. Located in the `client/` directory of the monorepo.

## Scripts

```bash
pnpm dev       # Development server (port 3000)
pnpm build     # Production build
pnpm start     # Start production server
pnpm lint      # Run ESLint
```

## Tech Stack

**Next.js 16** (App Router), **React 19**, **TypeScript 5**, **Tailwind CSS v4**, **shadcn/ui v4** (Radix UI), **Zustand**, **framer-motion**.

## Structure

```
src/
├── app/           # App Router pages (home, termux, core-termux/*, courses)
├── components/    # UI components (layout, ui, terminal-block, theme-provider)
├── hooks/         # use-theme
├── lib/           # Utilities (cn, cnWords)
└── store/         # Zustand stores (theme)
```

See the [root README](../README.md) for full project documentation.
