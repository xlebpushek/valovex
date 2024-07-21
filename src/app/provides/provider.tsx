'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { ContentProvider } from './content'

interface RootProviderProps {
  children?: ReactNode
}

export function RootProvider({ children }: RootProviderProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ContentProvider>{children}</ContentProvider>
    </ThemeProvider>
  )
}
