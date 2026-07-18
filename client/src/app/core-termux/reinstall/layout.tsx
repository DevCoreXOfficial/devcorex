import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core Reinstall - Module Reinstallation",
  description: "Reinstall modules or specific tools in Core-Termux by uninstalling and installing from scratch.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
