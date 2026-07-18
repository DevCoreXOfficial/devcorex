import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core Brain - Second Brain",
  description: "Save and search personal learnings as markdown memories with optional GitHub sync for backup.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
