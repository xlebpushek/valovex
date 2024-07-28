'use client'

import { createClient } from '@/shared/api/supabase/client'
import { generateICode } from '@/shared/lib'

import { useAuth } from '@/shared/lib/user/hook'
import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { navigate } from './actions'
import { tungsten } from './fonts'

const supabase = createClient()

export default function RootPage() {
  const [isLoading, setIsLoading] = useState(false)
  const auth = useAuth()
  const [isOpenICodeModal, setIsOpenICode] = useState(false)
  const [iCode, setICode] = useState('')

  const createLobby = async () => {
    setIsLoading(true)

    const newICode = generateICode()

    if (!auth.user) return

    await supabase
      .from('Lobbies')
      .insert({ invite_code: newICode, creator: auth.user.id })
      .then(async ({ error }) => {
        setIsLoading(false)

        if (error) console.error(error)

        navigate('/lobbies/' + newICode)
      })
  }

  const connectToLobby = () => {
    if (iCode.length == 6) navigate('/lobbies/' + iCode)
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
          <div className="border border-white p-0.5">
            <button
              className="bg-rose-700 px-8 py-2 font-medium transition-colors duration-500 hover:bg-white hover:text-black"
              onClick={createLobby}
            >
              Create
            </button>
          </div>
          <h3 className="font-medium">or</h3>
          <div className="border border-white p-0.5">
            <button
              className="px-8 py-2 font-medium transition-colors duration-500 hover:bg-rose-700"
              onClick={() => setIsOpenICode(true)}
            >
              Connect
            </button>
          </div>
        </div>
      </section>
      {isOpenICodeModal && (
        <button className="absolute h-full w-full bg-black/80 backdrop-blur-sm" onClick={() => setIsOpenICode(false)} />
      )}
      {isOpenICodeModal && (
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
      )}
    </>
  )
}
