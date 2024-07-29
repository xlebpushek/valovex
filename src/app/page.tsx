'use client'

import { createClient } from '@/shared/api/supabase/client'
import { useAuth } from '@/shared/lib/user/hook'
import { RGICode, RSVotingSide } from '@/shared/lib/utils'
import Button from '@/shared/ui/button'
import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { navigate } from './actions'
import { tungsten } from './fonts'

const supabase = createClient()

export default function RootPage() {
  const auth = useAuth()
  const [iCode, setICode] = useState('')
  const [isOpenICodeModal, setIsOpenICodeModal] = useState(false)

  const createLobby = async () => {
    const newICode = RGICode()
    const newVotingSide = RSVotingSide()

    if (auth.user) {
      await supabase
        .from('lobbies')
        .insert({ invite_code: newICode, creator: auth.user.id, voting_side: newVotingSide })
        .then(async ({ error }) => {
          if (error) {
            console.error(error.message)
            return
          }

          await navigate('/lobbies/' + newICode)
        })
    }
  }

  const handleICodeModal = () => {
    setIsOpenICodeModal((prev) => !prev)
  }

  const connectToLobby = async () => {
    if (iCode.length == 6) {
      await navigate('/lobbies/' + iCode)
    }
  }

  return (
    <>
      <section className="flex flex-col gap-y-10 p-12">
        <div className="flex flex-col items-center gap-y-3">
          <h1 className={clsx(tungsten.className, 'text-4xl font-bold tracking-widest')}>VALOVEX.</h1>
          <h2 className="text-justify text-lg">
            <span className="font-bold">Valovex</span> - this is a new way to organize teams in custom games
          </h2>
        </div>
        <div className="flex items-center justify-center gap-x-5">
          <Button onClick={createLobby}>Create</Button>
          <h3 className="font-medium">or</h3>
          <Button variant="hollow" onClick={handleICodeModal}>
            Connect
          </Button>
        </div>
      </section>
      {isOpenICodeModal && (
        <>
          <button
            className="absolute h-full w-full bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpenICodeModal(false)}
          />
          <div className="absolute z-10 flex items-center justify-center gap-x-3">
            <div className="group flex flex-col">
              <input
                className="bg-transparent px-2 py-1 text-lg"
                placeholder="Enter invite code"
                value={iCode}
                onChange={(event) => setICode(event.target.value)}
              />
              <span className="h-px w-0 bg-rose-700 transition-all duration-500 group-hover:w-full" />
            </div>
            <button onClick={connectToLobby}>
              <ChevronRight className="transition-colors duration-500 hover:text-rose-700" />
            </button>
          </div>
        </>
      )}
    </>
  )
}
