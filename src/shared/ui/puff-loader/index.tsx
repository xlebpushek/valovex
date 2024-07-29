import './index.css'

interface LoaderProps {
  size?: number
  borderWidth?: number
  borderColor?: string
  speed?: number
}

export function PuffLoader({ size = 70, borderWidth = 4, borderColor = '#be123c', speed = 1 }: LoaderProps) {
  return (
    <div className="relative flex items-center justify-center" style={{ height: size, width: size }}>
      <span
        className="puff-loader-animation-first-circle absolute left-0 top-0 h-full w-full rounded-full border-solid"
        style={{ borderWidth: borderWidth, borderColor: borderColor, animationDuration: `${2 / speed}s` }}
      />
      <span
        className="puff-loader-animation-second-circle absolute left-0 top-0 h-full w-full rounded-full border-solid"
        style={{ borderWidth: borderWidth, borderColor: borderColor, animationDuration: `${2 / speed}s` }}
      />
    </div>
  )
}
