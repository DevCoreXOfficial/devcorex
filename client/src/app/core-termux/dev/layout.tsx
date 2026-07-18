import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dev Tools - Core-Termux",
  description: "Essential CLI tools for development on Termux including gh, wget, curl, fzf, bat, tmux, and more.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
