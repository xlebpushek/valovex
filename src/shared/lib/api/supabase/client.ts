import { env } from '@/shared/config/env'
import { Database } from '@/shared/types/supabase'
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient<Database>(env.SUPABASE_URL!, env.SUPABASE_ANON_KEY!)
}
