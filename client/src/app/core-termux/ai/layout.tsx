import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Development Tools - Core-Termux",
  description: "AI coding assistants and tools adapted for Termux including Claude Code, OpenCode, Ollama, and more.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
