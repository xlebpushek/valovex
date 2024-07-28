import { $lobby } from '@/app/lobbies/[code]/model'
import { createClient } from '@/shared/api/supabase/client'
import { useAuth } from '@/shared/lib/user/hook'
import { Select } from '@/shared/ui/select'
import { useUnit } from 'effector-react'
import { useCallback } from 'react'

const gameMods = [
  { value: 'Swiftplay', label: 'Swiftplay' },
  { value: 'Standard', label: 'Standard' },
  { value: 'Deathmatch', label: 'Deathmatch' },
  { value: 'Escalation', label: 'Escalation' },
  { value: 'Team Deathmatch', label: 'Team Deathmatch' },
  { value: 'Spike Rush', label: 'Spike Rush' },
]

const supabase = createClient()

export function GameModeEntity() {
  const lobby = useUnit($lobby)
  const auth = useAuth()

  const handleGameMode = useCallback(
    async (gameMode: string) => {
      if (lobby && auth.user && lobby.creator === auth.user.id) {
        await supabase.from('Lobbies').update({ game_mode: gameMode }).eq('invite_code', lobby.invite_code)
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
