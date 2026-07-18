import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core List - Module Tools",
  description: "List available tools in a module and their installation status for Core-Termux.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
