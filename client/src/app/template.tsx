'use client'

import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'sonner'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
      <Toaster position="top-center" richColors />
    </>
  )
}