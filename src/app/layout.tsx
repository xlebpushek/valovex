import { clsx } from 'clsx'
import type { Metadata, Viewport } from 'next'
import Image from 'next/image'
import { ReactNode } from 'react'
import mainBackground from '../../public/images/main-background.jpg'
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
    <html lang="en" data-theme="dark" className={clsx('hide-scrollbar h-full w-full', dinnext.className)}>
      <body className="h-full w-full tracking-wide">
        <Image src={mainBackground} alt="v" className="absolute -z-50 h-full w-full object-cover" />
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
