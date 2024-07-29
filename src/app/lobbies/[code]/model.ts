import { Database } from '@/shared/types/supabase'
import { createEvent, createStore } from 'effector'

export const setLobby = createEvent<Database['public']['Tables']['Lobbies']['Row']>()
export const $lobby = createStore<Database['public']['Tables']['Lobbies']['Row'] | null>(null).on(
  setLobby,
  (_, payload) => payload,
)
