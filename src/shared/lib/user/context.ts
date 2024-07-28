import { createContext } from 'react'

interface User {
  id: string
}

interface AuthContext {
  isLoading: boolean
  user: User | null
}

export const AuthContext = createContext<AuthContext | undefined>(undefined)
