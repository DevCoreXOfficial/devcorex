import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programming Languages - Core-Termux",
  description: "Install programming languages and runtimes for Termux development including Node.js, Python, Rust, and Go.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
