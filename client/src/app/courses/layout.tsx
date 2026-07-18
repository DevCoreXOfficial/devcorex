import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programming Courses - DevCoreX",
  description: "Learn Termux, Neovim, HTML, CSS, and JavaScript through free YouTube tutorials from beginner to advanced.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
