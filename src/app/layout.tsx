import type { Metadata } from 'next'

import '@/styles/globals.css'
import { Quicksand } from 'next/font/google'

import { ClerkProvider } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { Toaster } from "@/components/ui/toaster"



const font = Quicksand({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NiXTT - A simple todo app',
  description: 'Boost your productivity with Factum, a unique to-do list app integrating social features. Manage tasks, connect with friends, and experience shared achievements. Try Factum today to redefine your success journey!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className='bg-neutral-50 text-neutral-950'>
        <body className={cn('max-h-screen', font.className)}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>

  )
}
