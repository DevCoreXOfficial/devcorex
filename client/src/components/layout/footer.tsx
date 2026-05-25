"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Terminal, Home, BookOpen, Sparkles, Code2, Zap } from "lucide-react";
import Image from "next/image";
import {
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaTelegram,
  FaGithub,
} from "react-icons/fa6";

const quickLinks = [
  { key: "home", href: "/", icon: Home },
  { key: "termux", href: "/termux", icon: Terminal },
  { key: "coreTermux", href: "/core-termux", icon: Zap },
  { key: "courses", href: "/courses", icon: BookOpen },
  { key: "ai", href: "/core-termux/ai", icon: Sparkles },
  { key: "editor", href: "/core-termux/editor", icon: Code2 },
];

const socialLinks = [
  { label: "YouTube", href: "https://youtube.com/@DevCoreX", icon: FaYoutube },
  {
    label: "Facebook",
    href: "https://facebook.com/devcorexofficial",
    icon: FaFacebook,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/devcorex_",
    icon: FaInstagram,
  },
  { label: "TikTok", href: "https://tiktok.com/@devcorex", icon: FaTiktok },
  { label: "X", href: "https://x.com/@DevCoreX", icon: FaXTwitter },
  {
    label: "Telegram",
    href: "https://t.me/devcorexofficial",
    icon: FaTelegram,
  },
  {
    label: "GitHub",
    href: "https://github.com/DevCoreXOfficial",
    icon: FaGithub,
  },
];

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-border bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-14 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 md:grid-cols-4">
          <div className="sm:col-span-2 md:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <Image
                src="/devcorex.png"
                alt="DevCoreX"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-lg font-bold">DevCoreX</span>
            </Link>
            <p className="text-muted-foreground mb-5 max-w-md text-sm sm:text-base">
              DevCoreX - Software Development Community focused on
              Termux/Android
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-muted hover:bg-accent rounded-lg p-2 transition-colors"
                >
                  <link.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold sm:text-lg">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm capitalize transition-colors sm:text-base"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.key === "coreTermux" ? "Core-Termux" : link.key}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 sm:my-10" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-muted-foreground text-center text-sm sm:text-left sm:text-base">
            Made with ❤ by DevCoreX {currentYear}
          </p>
          <p className="text-muted-foreground flex items-center gap-2 text-sm sm:text-base">
            Built with <Terminal className="h-4 w-4" /> using DevCoreX Tools
          </p>
        </div>
      </div>
    </footer>
  );
}
