import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core Env - Environment Variables",
  description: "Manage environment variables in your shell rc file with interactive prompts and hidden input for secrets.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
