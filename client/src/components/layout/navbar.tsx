'use client'

import Link from 'next/link'
import { Menu, Sun, Moon, Monitor, Home, Terminal, BookOpen, Users, Zap } from 'lucide-react'
import { FaYoutube, FaFacebook, FaInstagram, FaTiktok, FaXTwitter, FaTelegram, FaGithub } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/hooks/use-theme'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

const navItems = [
  { key: 'home', href: '/', icon: Home },
  { key: 'termux', href: '/termux', icon: Terminal },
  { key: 'coreTermux', href: '/core-termux', icon: Zap },
  { key: 'courses', href: '/courses', icon: BookOpen },
  { key: 'community', href: '/#community', icon: Users },
]

const socialLinks = [
  { label: 'YouTube', href: 'https://youtube.com/@DevCoreX', icon: FaYoutube },
  { label: 'Facebook', href: 'https://facebook.com/devcorexofficial', icon: FaFacebook },
  { label: 'Instagram', href: 'https://instagram.com/devcorex_', icon: FaInstagram },
  { label: 'TikTok', href: 'https://tiktok.com/@devcorex', icon: FaTiktok },
  { label: 'X', href: 'https://x.com/@DevCoreX', icon: FaXTwitter },
  { label: 'Telegram', href: 'https://t.me/devcorexofficial', icon: FaTelegram },
  { label: 'Community', href: 'https://t.me/devcorex_chat', icon: FaTelegram },
  { label: 'GitHub', href: 'https://github.com/DevCoreXOfficial', icon: FaGithub },
]

const sheetVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: '100%' },
}

const sheetTransition = {
  duration: 0.3,
  ease: 'easeInOut' as const,
}

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
}

export function Navbar() {
  const { theme, setTheme, themes } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const themeIcons = { light: Sun, dark: Moon, system: Monitor }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md"
    >
      <nav className="h-14 sm:h-16 flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/devcorex.png" alt="DevCoreX" width={28} height={28} className="w-7 h-7 sm:w-8 sm:h-8" />
          <span className="font-bold text-base sm:text-lg">DevCoreX</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.key === 'coreTermux' ? 'Core-Termux' : item.key.charAt(0).toUpperCase() + item.key.slice(1)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
                {(() => {
                  const Icon = themeIcons[theme]
                  return <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                })()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {themes.map((t) => (
                <DropdownMenuItem key={t} onClick={() => setTheme(t)} className={cn(theme === t && 'bg-accent')}>
                  {t === 'light' && <Sun className="mr-2 h-4 w-4" />}
                  {t === 'dark' && <Moon className="mr-2 h-4 w-4" />}
                  {t === 'system' && <Monitor className="mr-2 h-4 w-4" />}
                  <span className="capitalize">{t}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

<Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8 sm:h-9 sm:w-9">
                <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Button>
            </SheetTrigger>
            <AnimatePresence>
              <SheetContent side="right" className="w-[300px] sm:w-[340px] p-0 overflow-y-auto">
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={sheetVariants}
                  transition={sheetTransition}
                  className="h-full"
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <Image src="/devcorex.png" alt="DevCoreX" width={28} height={28} className="w-7 h-7" />
                      <span className="text-lg font-semibold">DevCoreX</span>
                    </div>
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: { transition: { staggerChildren: 0.05 } },
                      }}
                      className="flex flex-col gap-1"
                    >
                      {navItems.map((item) => (
                        <motion.div key={item.key} variants={itemVariants}>
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg p-3 transition-colors"
                          >
                            <item.icon className="w-5 h-5" />
                            {item.key === 'coreTermux' ? 'Core-Termux' : item.key.charAt(0).toUpperCase() + item.key.slice(1)}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                      }}
                    >
                      <h3 className="font-semibold text-sm mt-6 mb-3">Follow Us</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {socialLinks.map((link) => (
                          <motion.div key={link.label} variants={itemVariants}>
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg p-2 transition-colors"
                            >
                              <link.icon className="w-4 h-4" />
                              {link.label}
                            </a>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </SheetContent>
            </AnimatePresence>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  )
}
