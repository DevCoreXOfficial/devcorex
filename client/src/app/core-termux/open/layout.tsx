import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core Open - Documentation Browser",
  description: "Open official documentation in your browser for all Core-Termux modules and development tools.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
