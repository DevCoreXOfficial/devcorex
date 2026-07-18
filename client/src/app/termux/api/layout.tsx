import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termux:API - Android Hardware Commands",
  description: "Access Android hardware features from the command line: clipboard, sensors, camera, notifications, and more.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
