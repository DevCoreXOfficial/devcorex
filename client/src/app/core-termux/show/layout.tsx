import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core Show - Tool Documentation",
  description: "Display help documentation for any installed tool loaded from its README.md file with syntax highlighting.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
