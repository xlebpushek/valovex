'use client'

import { $lobby } from '@/app/lobbies/[code]/model'
import { createClient } from '@/shared/api/supabase/client'
import { useAuth } from '@/shared/lib/user/hook'
import { Select } from '@/shared/ui/select'

import { useUnit } from 'effector-react'
import { useCallback } from 'react'

const players = [
  { value: '1:1', label: '1:1' },
  { value: '2:2', label: '2:2' },
  { value: '3:3', label: '3:3' },
  { value: '4:4', label: '4:4' },
  { value: '5:5', label: '5:5' },
  { value: '1:2', label: '1:2' },
  { value: '1:3', label: '1:3' },
  { value: '1:4', label: '1:4' },
  { value: '1:5', label: '1:5' },
  { value: '2:1', label: '2:1' },
  { value: '2:3', label: '2:3' },
  { value: '2:4', label: '2:4' },
  { value: '2:5', label: '2:5' },
  { value: '3:1', label: '3:1' },
  { value: '3:2', label: '3:2' },
  { value: '3:4', label: '3:4' },
  { value: '3:5', label: '3:5' },
  { value: '4:1', label: '4:1' },
  { value: '4:2', label: '4:2' },
  { value: '4:3', label: '4:3' },
  { value: '4:5', label: '4:5' },
  { value: '5:1', label: '5:1' },
  { value: '5:2', label: '5:2' },
  { value: '5:3', label: '5:3' },
  { value: '5:4', label: '5:4' },
]



const supabase = createClient()

export function PlayersEntity() {
  const lobby = useUnit($lobby)
  const auth = useAuth()

  const handlePlayers = useCallback(
    async (players: string) => {
      if (lobby && auth.user && lobby.creator === auth.user.id) {
        const [attachersLimit, defendersLimit] = players.split(':').map(Number)
        await supabase
          .from('Lobbies')
          .update({ attachers_limit: attachersLimit, defenders_limit: defendersLimit })
          .eq('invite_code', lobby.invite_code)
      }
    },
    [lobby, auth.user],
  )

  return (
    lobby &&
    auth.user && (
      <Select
        options={players}
        value={`${lobby.attachers_limit}:${lobby.defenders_limit}`}
        onChange={handlePlayers}
        disabled={lobby.creator !== auth.user.id}
        classNames="w-16"
      />
    )
  )
}
