import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Database Tools - Core-Termux",
  description: "PostgreSQL, MariaDB, SQLite, MongoDB, and Redis database management for your Termux environment.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
