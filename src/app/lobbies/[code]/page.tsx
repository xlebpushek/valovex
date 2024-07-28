'use client'

import { $lobby, setLobby } from '@/app/lobbies/[code]/model'
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
        .from('Lobbies')
        .select('*')
        .eq('invite_code', params.code)
        .single()
        .then(({ data, error }) => {
          setIsLoading(false)

          if (error) {
            console.error('Error fetching lobby:', error)
          } else {
            setLobby(data)
          }
        })
    }

    fetchLobby()

    const subscription = supabase
      .channel('Lobbies')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'Lobbies' }, (payload) => {
        setLobby(payload.new as Database['public']['Tables']['Lobbies']['Row'])
        console.log(payload)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [params.code])

  return (
    <>
      {auth.user && (
        <section className="flex h-full w-full items-center justify-center p-12">
          {isLoading ? (
            <PuffLoader />
          ) : lobby ? (
            <div className="flex h-full w-full justify-center">
              <div className="flex h-min w-full justify-center gap-x-5">
                <PlayersEntity />
                <GameModeEntity />
                <TimerEntity />
              </div>
            </div>
          ) : (
            <h1>This lobby is not yet</h1>
          )}
        </section>
      )}
      <SideFeature />
    </>
  )
}
