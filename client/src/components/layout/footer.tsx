'use client'

import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Terminal, Home, BookOpen, Sparkles, Code2, Zap } from 'lucide-react'
import Image from 'next/image'
import { FaYoutube, FaFacebook, FaInstagram, FaTiktok, FaXTwitter, FaTelegram, FaGithub } from 'react-icons/fa6'

const quickLinks = [
  { key: 'home', href: '/', icon: Home },
  { key: 'termux', href: '/termux', icon: Terminal },
  { key: 'coreTermux', href: '/core-termux', icon: Zap },
  { key: 'courses', href: '/courses', icon: BookOpen },
  { key: 'ai', href: '/core-termux/ai', icon: Sparkles },
  { key: 'editor', href: '/core-termux/editor', icon: Code2 },
]

const socialLinks = [
  { label: 'YouTube', href: 'https://youtube.com/@DevCoreX', icon: FaYoutube },
  { label: 'Facebook', href: 'https://facebook.com/devcorexofficial', icon: FaFacebook },
  { label: 'Instagram', href: 'https://instagram.com/devcorex_', icon: FaInstagram },
  { label: 'TikTok', href: 'https://tiktok.com/@devcorex', icon: FaTiktok },
  { label: 'X', href: 'https://x.com/@DevCoreX', icon: FaXTwitter },
  { label: 'Telegram', href: 'https://t.me/devcorexofficial', icon: FaTelegram },
  { label: 'GitHub', href: 'https://github.com/DevCoreXOfficial', icon: FaGithub },
]

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          <div className="sm:col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/devcorex.png" alt="DevCoreX" width={32} height={32} className="w-8 h-8" />
              <span className="font-bold text-lg">DevCoreX</span>
            </Link>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md mb-5">
              DevCoreX - Software Development Community focused on Termux/Android
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
                >
                  <link.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-base sm:text-lg">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors capitalize"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.key === 'coreTermux' ? 'Core-Termux' : link.key}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 sm:my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm sm:text-base text-muted-foreground text-center sm:text-left">
            Made with ❤ by DevCoreX {currentYear}
          </p>
          <p className="text-sm sm:text-base text-muted-foreground flex items-center gap-2">
            Built with <Terminal className="h-4 w-4" /> using DevCoreX tools
          </p>
        </div>
      </div>
    </footer>
  )
}
