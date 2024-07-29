import { agents } from '@/shared/config/agents'
import Image from 'next/image'

export function AgentsWidget() {
  return (
    <div className="grid grid-cols-4 gap-2 xs:grid-cols-5 sm:grid-cols-8 lg:grid-cols-12">
      {agents.map((agent, index) => (
        <button key={index}>
          <div className="relative h-16 w-16 p-1 backdrop-blur-sm">
            <div className="-z-10 h-full w-full bg-white/5" />
            <div className="absolute left-0 top-0 h-16 w-16 overflow-hidden border-2 border-white/20">
              <Image
                src={agent.image}
                alt={agent.name}
                width={100}
                height={100}
                priority
                className="h-full w-full scale-[120%] rounded-t-lg object-cover"
              />
            </div>
            <span className="absolute left-0 top-0 h-[2px] w-[2px] bg-white/50" />
            <span className="absolute right-0 top-0 h-[2px] w-[2px] bg-white/50" />
            <span className="absolute bottom-0 right-0 h-[2px] w-[2px] bg-white/50" />
            <span className="absolute bottom-0 left-0 h-[2px] w-[2px] bg-white/50" />
          </div>
        </button>
      ))}
    </div>
  )
}
