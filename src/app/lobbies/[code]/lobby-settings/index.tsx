import { GameModeSelectEntity } from './game-mode-select'
import { PlayersSelectEntity } from './players-select'
import { TimerSelectEntity } from './timer-select'

export function LobbySettingsWidget() {
  return (
    <div className="flex h-min w-full justify-center gap-x-5">
      <PlayersSelectEntity />
      <GameModeSelectEntity />
      <TimerSelectEntity />
    </div>
  )
}
