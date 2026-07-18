import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core Voice - Speech to Agent",
  description: "Capture voice from the microphone, review in nvim, and launch AI agents for hands-free coding.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
