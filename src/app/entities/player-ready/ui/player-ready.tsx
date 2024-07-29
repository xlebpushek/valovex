interface PlayerReadyEntityProps {
  isReady: boolean
  borderColor: string
  shadowColor: string
}

export function PlayerReadyEntity({ isReady, borderColor, shadowColor }: PlayerReadyEntityProps) {
  return (
    <div
      className="relative h-4 w-4 rotate-45 transform border-2 bg-transparent"
      style={{ borderColor, boxShadow: `0 0px 8px 0 ${shadowColor}, inset 0 0 8px 2px ${shadowColor}` }}
    >
      {isReady && (
        <div className="absolute inset-0 bottom-[6px] left-[2px] flex items-center justify-center">
          <div className="-rotate-45 transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}