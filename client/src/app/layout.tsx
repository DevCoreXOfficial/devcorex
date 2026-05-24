import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "DevCoreX - Software Development Community",
  description:
    "DevCoreX is a software development community focused on Termux/Android. We develop everything using Termux, featuring our CORE-TERMUX framework.",
  keywords: [
    "DevCoreX",
    "Termux",
    "Android development",
    "CORE-TERMUX",
    "programming community",
  ],
  authors: [{ name: "DevCoreX" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/devcorex.png",
  },
  openGraph: {
    title: "DevCoreX - Software Development Community",
    description:
      "DevCoreX is a software development community focused on Termux/Android.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

