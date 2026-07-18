import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Software Development - DevCoreX",
  description: "Request custom software solutions including websites, mobile apps, and APIs built with modern tools.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
