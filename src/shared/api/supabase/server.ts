import { env } from '@/shared/config/env'
import { Database } from '@/shared/types/supabase'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { type cookies } from 'next/headers'

export function createClient(cookieStore: ReturnType<typeof cookies>) {
  return createServerClient<Database>(env.SUPABASE_URL!, env.SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {}
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options })
        } catch (error) {}
      },
    },
  })
}
