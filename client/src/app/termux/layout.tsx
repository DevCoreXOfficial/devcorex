import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termux - Android Development Environment",
  description: "Turn your Android device into a complete development workstation with Termux and Core-Termux.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
