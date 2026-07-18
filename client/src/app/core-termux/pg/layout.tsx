import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core PG - PostgreSQL Manager",
  description: "PostgreSQL database manager for Termux. Start, stop, create databases, and manage your PostgreSQL instance.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
