import Image from 'next/image'

interface AgentCardProps {
  name: string
  role: string
  description: string
  image: string
}

export function AgentCardEntity({ name, role, description, image }: AgentCardProps) {
  return (
    <div className="relative h-16 w-16 p-1 backdrop-blur-sm">
      <div className="-z-10 h-full w-full bg-white/5" />
      <div className="absolute left-0 top-0 h-16 w-16 overflow-hidden border-2 border-white/20">
        <Image
          src={image}
          alt={name}
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
  )
}
