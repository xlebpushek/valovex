'use client'

import { $lobby } from '@/app/lobbies/[code]/model'
import { createClient } from '@/shared/api/supabase/client'
import { useAuth } from '@/shared/lib/user/hook'
import { Database } from '@/shared/types/supabase'
import { Select } from '@/shared/ui/select'
import { useUnit } from 'effector-react'
import { useCallback } from 'react'

const times = [
  { value: '5', label: '5s' },
  { value: '10', label: '10s' },
  { value: '15', label: '15s' },
  { value: '20', label: '20s' },
  { value: '30', label: '30s' },
]

const supabase = createClient()

export function TimerEntity() {
  const lobby = useUnit($lobby)
  const auth = useAuth()

  const handleTimer = useCallback(
    async (votingTime: Database['public']['Enums']['voting_times']) => {
      if (lobby && auth.user && lobby.creator === auth.user.id) {
        await supabase
          .from('lobbies')
          .update({ voting_time: votingTime as Database['public']['Enums']['voting_times'] })
          .eq('invite_code', lobby.invite_code)
          .then(({ error }) => {
            if (error) {
              console.error(error.message)
              return
            }
          })
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
