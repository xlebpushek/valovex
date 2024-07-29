import { PlayerReadyEntity } from '@/entities/player-ready'
import { useAuth } from '@/shared/lib/user'
import { useUnit } from 'effector-react'
import { $lobby } from './model'

export function AttachersPlayersReadyWidget() {
  const lobby = useUnit($lobby)
  const auth = useAuth()

  const countReady = (lobby && lobby.users_ready.filter((id) => lobby.attachers.includes(id)).length) || 0

  return (
    lobby &&
    auth.user && (
      <div className="flex flex-col gap-y-3">
        {Array.from({ length: lobby.attachers_limit }).map((_, index) => (
          <PlayerReadyEntity
            isReady={index + 1 <= countReady}
            borderColor="#8d3342"
            shadowColor="#ad8483"
            key={index}
          />
        ))}
      </div>
    )
  )
}

export function DefendersPlayersReadyWidget() {
  const lobby = useUnit($lobby)
  const auth = useAuth()

  const countReady = (lobby && lobby.users_ready.filter((id) => lobby.defenders.includes(id)).length) || 0

  return (
    lobby &&
    auth.user && (
      <div className="flex flex-col gap-y-3">
        {Array.from({ length: lobby.defenders_limit }).map((_, index) => (
          <PlayerReadyEntity
            isReady={index + 1 <= countReady}
            borderColor="#3b7979"
            shadowColor="#397773"
            key={index}
          />
        ))}
      </div>
    )
  )
}
