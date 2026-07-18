import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZSH Shell - Core-Termux",
  description: "ZSH + Oh My Zsh with 10 plugins including powerlevel10k theme, autosuggestions, and syntax highlighting.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
