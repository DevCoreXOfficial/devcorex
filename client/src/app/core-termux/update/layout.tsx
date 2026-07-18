import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core Update - Module Updates",
  description: "Update modules or the complete Core-Termux framework to keep your tools and CLI up to date.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
