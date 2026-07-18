import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core Init - Project Templates",
  description: "Configure existing projects with predefined dependencies for Next.js, React, NestJS, and Express templates.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
