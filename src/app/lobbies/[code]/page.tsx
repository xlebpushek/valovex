'use client'

import { PlayerReadyEntity } from '@/app/entities/player-ready'
import { $lobby, setLobby } from '@/app/lobbies/[code]/model'
import { AgentsWidget } from '@/app/widgets/agents'
import { GameModeEntity, PlayersEntity, TimerEntity } from '@/features/lobby-settings'
import { SideFeature } from '@/features/side'
import { createClient } from '@/shared/api/supabase/client'
import { useAuth } from '@/shared/lib/user/hook'
import { Database } from '@/shared/types/supabase'
import { PuffLoader } from '@/shared/ui/puff-loader'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

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
                <div className="flex flex-col gap-y-3">
                  {Array.from({ length: lobby.attachers_limit }).map((_, index) => (
                    <PlayerReadyEntity
                      isReady={index + 1 <= lobby.attachers.length}
                      borderColor="#8d3342"
                      shadowColor="#ad8483"
                      key={index}
                    />
                  ))}
                </div>
                <div className="flex h-min w-full justify-center gap-x-5">
                  <PlayersEntity />
                  <GameModeEntity />
                  <TimerEntity />
                </div>
                <div className="flex flex-col gap-y-3">
                  {Array.from({ length: lobby.defenders_limit }).map((_, index) => (
                    <PlayerReadyEntity
                      isReady={index + 1 <= lobby.defenders.length}
                      borderColor="#3b7979"
                      shadowColor="#397773"
                      key={index}
                    />
                  ))}
                </div>
              </div>
              <AgentsWidget />
            </div>
          ) : (
            <h1>This lobby is not yet</h1>
          )}
        </section>
        <SideFeature />
      </>
    )
  )
}
