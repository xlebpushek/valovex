import { AuthContext } from '@/shared/lib/user/context'
import { User } from '@/shared/types/user'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { ReactNode, useEffect, useState } from 'react'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setIsLoading(true)

    const fetchUserId = async () => {
      const fp = await FingerprintJS.load()
      const result = await fp.get()

      setUser({ id: result.visitorId })
      setIsLoading(false)
    }

    fetchUserId()
  }, [])

  const value = {
    isLoading,
    user: user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
