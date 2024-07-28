'use client'

import { $lobby } from '@/app/lobbies/[code]/model'
import { createClient } from '@/shared/api/supabase/client'
import { useAuth } from '@/shared/lib/user/hook'
import { useUnit } from 'effector-react'
import { useCallback, useEffect, useState } from 'react'

const sides = [
  { code: 'attachers', label: 'Attachers' },
  { code: 'defenders', label: 'Defenders' },
  { code: 'observers', label: 'Observers' },
]

const supabase = createClient()

export function SideFeature() {
  const lobby = useUnit($lobby)
  const auth = useAuth()
  const [isOpenSideModal, setIsOpenSideModal] = useState(false)

  useEffect(() => {
    if (
      lobby &&
      auth.user &&
      !lobby.attachers.includes(auth.user.id) &&
      !lobby.defenders.includes(auth.user.id) &&
      !lobby.observers.includes(auth.user.id)
    ) {
      setIsOpenSideModal(true)
    }
  }, [lobby, auth.user])

  const handleSelectSide = useCallback(
    async (columnName: string) => {
      if (auth.user && lobby) {
        await supabase
          .rpc('append_to_array', {
            table_name: 'Lobbies',
            column_name: columnName,
            value: auth.user.id,
            condition_column: 'invite_code',
            condition_value: lobby.invite_code,
          })
          .then(({ error }) => {
            if (!error) {
              setIsOpenSideModal(false)
            }
          })
      }
    },
    [auth.user, lobby],
  )

  return (
    isOpenSideModal && (
      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center gap-5 bg-black/80 backdrop-blur-sm max-md:flex-col">
        {sides.map((side) => (
          <button
            key={side.code}
            className="border border-white px-8 py-2 font-medium uppercase transition-colors duration-500 hover:bg-rose-700"
            onClick={() => handleSelectSide(side.code)}
          >
            {side.label}
          </button>
        ))}
      </div>
    )
  )
}
