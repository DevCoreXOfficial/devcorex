import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core Install - Module Installation",
  description: "Install individual modules or specific tools within Core-Termux using command flags.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
