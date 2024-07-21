'use client'

import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { tungsten } from './fonts'

export default function RootPage() {
  const [isEnterICode, setEnterICode] = useState(false)

  const createLobby = () => {}

  return (
    <>
      <section className="flex flex-col gap-y-10">
        <div className="flex flex-col items-center gap-y-3">
          <h1 className={clsx(tungsten.className, 'text-4xl font-bold tracking-widest')}>VALOVEX.</h1>
          <h2 className="text-lg">
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
              onClick={() => setEnterICode(true)}
            >
              Connect
            </button>
          </div>
        </div>
      </section>
      {isEnterICode && (
        <button className="absolute h-full w-full bg-black/80 backdrop-blur-sm" onClick={() => setEnterICode(false)} />
      )}
      {isEnterICode && (
        <div className="absolute z-10 flex items-center justify-center gap-x-3">
          <div className="group flex flex-col">
            <input className="bg-transparent px-2 py-1 text-lg" placeholder="Enter invite code" />
            <span className="h-px w-0 bg-rose-700 transition-all duration-500 group-hover:w-full" />
          </div>
          <ChevronRight className="transition-colors duration-500 hover:text-rose-700" />
        </div>
      )}
    </>
  )
}
