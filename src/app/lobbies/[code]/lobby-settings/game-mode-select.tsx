import { $lobby } from '@/app/lobbies/[code]/model'
import { createClient } from '@/shared/api/supabase/client'
import { useAuth } from '@/shared/lib/user/hook'
import { Database } from '@/shared/types/supabase'
import { Select } from '@/shared/ui/select'
import { useUnit } from 'effector-react'
import { useCallback } from 'react'

const gameMods = [
  { value: 'swiftplay', label: 'Swiftplay' },
  { value: 'standard', label: 'Standard' },
  { value: 'deathmatch', label: 'Deathmatch' },
  { value: 'escalation', label: 'Escalation' },
  { value: 'team_deathmatch', label: 'Team Deathmatch' },
  { value: 'spike_rush', label: 'Spike Rush' },
]

const supabase = createClient()

export function GameModeSelectEntity() {
  const lobby = useUnit($lobby)
  const auth = useAuth()

  const handleGameMode = useCallback(
    async (gameMode: Database['public']['Enums']['game_mods']) => {
      if (lobby && auth.user && lobby.creator === auth.user.id) {
        await supabase
          .from('lobbies')
          .update({ game_mode: gameMode as Database['public']['Enums']['game_mods'] })
          .eq('invite_code', lobby.invite_code)
      }
    },
    [lobby, auth.user],
  )

  return (
    lobby &&
    auth.user && (
      <Select
        options={gameMods}
        value={lobby.game_mode}
        onChange={handleGameMode}
        disabled={lobby.creator !== auth.user.id}
        classNames="w-72"
      />
    )
  )
}
