'use client'

import { $lobby } from '@/app/lobbies/[code]/model'
import { createClient } from '@/shared/api/supabase/client'
import { useAuth } from '@/shared/lib/user/hook'
import Button from '@/shared/ui/button'
import { useUnit } from 'effector-react'
import { useCallback } from 'react'

const supabase = createClient()

export function PlayerReadyButtonFeature() {
  const lobby = useUnit($lobby)
  const auth = useAuth()

  const handleReady = useCallback(async () => {
    if (auth.user && lobby) {
      await supabase
        .rpc('append_to_array', {
          table_name: 'lobbies',
          column_name: 'users_ready',
          value: auth.user.id,
          condition_column: 'invite_code',
          condition_value: lobby.invite_code,
        })
        .then(({ error }) => {
          if (error) {
            console.error(error.message)
          }
        })
    }
  }, [auth.user, lobby])

  return (
    lobby &&
    auth.user && (
      <Button
        backgroundColor={lobby.users_ready.includes(auth.user.id) ? '#be123c' : '#3f9c9b'}
        hoverBackgroundColor="#be123c"
        hoverColor="white"
        onClick={handleReady}
        disabled={lobby.users_ready.includes(auth.user.id)}
      >
        Ready
      </Button>
    )
  )
}
