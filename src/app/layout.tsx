import valorantBackground from '@/public/images/valorant-background.jpg'
import { clsx } from 'clsx'
import type { Metadata, Viewport } from 'next'
import Image from 'next/image'
import { ReactNode } from 'react'
import { dinnext } from './fonts'
import { RootProvider } from './provides/provider'
import './styles.css'

export const viewport: Viewport = {
  themeColor: '#be123c',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'VALOVEX',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={clsx('hide-scrollbar h-full w-full', dinnext.className)}
      suppressHydrationWarning
    >
      <body className="relative h-full w-full tracking-wide">
        <Image src={valorantBackground} alt="v" className="absolute left-0 top-0 -z-50 h-full w-full object-cover" />
        <div className="absolute left-0 top-0 -z-40 h-full w-full bg-black/30" />
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
