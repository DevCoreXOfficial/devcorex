import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core Uninstall - Remove Modules",
  description: "Remove installed modules or specific tools from Core-Termux. Only remove what you need.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
