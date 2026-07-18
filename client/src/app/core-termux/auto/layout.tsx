import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automation Tools - Core-Termux",
  description: "n8n workflow automation platform for Termux. Automate tasks and connect your services without code.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
