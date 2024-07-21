'use client'

import { ReactNode } from 'react'

interface ContentProviderProps {
  children?: ReactNode
}

export function ContentProvider({ children }: ContentProviderProps) {
  return (
    <>
      <main className="flex min-h-full w-full flex-col items-center justify-center">{children}</main>
    </>
  )
}
