'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { AuthProvider } from './auth'
import { ContentProvider } from './content'

interface RootProviderProps {
  children?: ReactNode
}

export function RootProvider({ children }: RootProviderProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <ContentProvider>{children}</ContentProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
