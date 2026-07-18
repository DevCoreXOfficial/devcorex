import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NPM Modules - Core-Termux",
  description: "Global npm packages for your development workflow on Termux including TypeScript, Prettier, and Vercel CLI.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
