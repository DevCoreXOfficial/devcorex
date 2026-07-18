import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neovim + NvChad - Code Editor",
  description: "Fully configured Neovim with NvChad for Termux. LSP for 16+ languages, AI assistants, and beautiful UI.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
