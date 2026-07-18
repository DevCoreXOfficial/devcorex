import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core Version - Version Info",
  description: "Display the installed version of Core-Termux framework with instructions to update to the latest release.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
