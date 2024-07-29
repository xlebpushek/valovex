'use client'

import { createClient } from '@/shared/api/supabase/client'
import { useAuth } from '@/shared/lib/user/hook'
import { Database } from '@/shared/types/supabase'
import { PuffLoader } from '@/shared/ui/puff-loader'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'
import { AgentsWidget } from './agents'
import { LobbySettingsWidget } from './lobby-settings'
import { $lobby, setLobby } from './model'
import { PlayerReadyButtonFeature } from './player-ready-button'
import { AttachersPlayersReadyWidget, DefendersPlayersReadyWidget } from './players-ready'
import { SideSelectFeature } from './side-select'

interface LobbyPageProps {
  params: {
    code: string
  }
}

const supabase = createClient()

export default function LobbyPage({ params }: LobbyPageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const lobby = useUnit($lobby)
  const auth = useAuth()

  useEffect(() => {
    const fetchLobby = async () => {
      setIsLoading(true)

      await supabase
        .from('lobbies')
        .select('*')
        .eq('invite_code', params.code)
        .single()
        .then(({ data, error }) => {
          setIsLoading(false)

          if (error) {
            console.error(error.message)
            return
          } else {
            setLobby(data)
          }
        })
    }

    fetchLobby()

    const subscription = supabase
      .channel('lobbies')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'lobbies' }, (payload) => {
        setLobby(payload.new as Database['public']['Tables']['lobbies']['Row'])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [params.code])

  return (
    auth.user && (
      <>
        <section className="flex h-full w-full items-center justify-center p-12">
          {isLoading ? (
            <PuffLoader />
          ) : lobby ? (
            <div className="flex h-full w-full flex-col items-center justify-between">
              <div className="flex w-full justify-between">
                <AttachersPlayersReadyWidget />
                <LobbySettingsWidget />
                <DefendersPlayersReadyWidget />
              </div>
              <div className="flex flex-col items-center gap-y-6">
                <PlayerReadyButtonFeature />
                <AgentsWidget />
              </div>
            </div>
          ) : (
            <h1 className="text-xl font-bold">There is no such lobby</h1>
          )}
        </section>
        <SideSelectFeature />
      </>
    )
  )
}
