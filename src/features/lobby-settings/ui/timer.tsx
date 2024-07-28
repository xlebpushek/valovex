'use client'

import { $lobby } from '@/app/lobbies/[code]/model'
import { createClient } from '@/shared/api/supabase/client'
import { useAuth } from '@/shared/lib/user/hook'
import { Select } from '@/shared/ui/select'
import { useUnit } from 'effector-react'
import { useCallback } from 'react'

const times = [
  { value: 5, label: '5s' },
  { value: 10, label: '10s' },
  { value: 15, label: '15s' },
  { value: 20, label: '20s' },
  { value: 30, label: '30s' },
]

const supabase = createClient()

export function TimerEntity() {
  const lobby = useUnit($lobby)
  const auth = useAuth()

  const handleTimer = useCallback(
    async (votingTime: number) => {
      if (lobby && auth.user && lobby.creator === auth.user.id) {
        await supabase.from('Lobbies').update({ voting_time: votingTime }).eq('invite_code', lobby.invite_code)
      }
    },
    [lobby, auth.user],
  )

  return (
    lobby &&
    auth.user && (
      <Select
        options={times}
        value={lobby.voting_time}
        onChange={handleTimer}
        disabled={lobby.creator !== auth.user.id}
        classNames="w-16"
      />
    )
  )
}
