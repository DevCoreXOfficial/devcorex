import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core-Termux - Modular Dev Environment",
  description: "Automate installations, updates, and configurations for your Termux development environment on Android.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
