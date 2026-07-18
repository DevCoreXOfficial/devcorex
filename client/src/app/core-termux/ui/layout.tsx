import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI Customization - Core-Termux",
  description: "Customize your Termux experience with fonts, cursors, extra keys, and banner configurations.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
