import { useEffect, useMemo, useState } from 'react'

interface ButtonProps {
  variant?: 'solid' | 'outline'
  backgroundColor?: string
  hoverBackgroundColor?: string
  color?: string
  hoverColor?: string
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export default function Button({
  variant = 'solid',
  backgroundColor,
  hoverBackgroundColor,
  color,
  hoverColor,
  children,
  onClick,
  disabled,
}: ButtonProps) {
  const getColors = (bg: string | undefined, text: string | undefined, isHover: boolean) => {
    if (isHover) {
      return {
        bgColor: hoverBackgroundColor || (variant === 'solid' ? 'white' : '#be123c'),
        textColor: hoverColor || (variant === 'solid' ? 'black' : 'white'),
      }
    }

    return {
      bgColor: bg || (variant === 'solid' ? '#be123c' : 'transparent'),
      textColor: text || 'white',
    }
  }

  const initialColors = useMemo(() => getColors(backgroundColor, color, false), [backgroundColor, color, variant])

  const [bgColor, setBgColor] = useState(initialColors.bgColor)
  const [textColor, setTextColor] = useState(initialColors.textColor)

  useEffect(() => {
    const colors = getColors(backgroundColor, color, false)
    setBgColor(colors.bgColor)
    setTextColor(colors.textColor)
  }, [backgroundColor, color, variant])

  const handleMouseEnter = () => {
    const colors = getColors(backgroundColor, color, true)
    setBgColor(colors.bgColor)
    setTextColor(colors.textColor)
  }

  const handleMouseLeave = () => {
    const colors = getColors(backgroundColor, color, false)
    setBgColor(colors.bgColor)
    setTextColor(colors.textColor)
  }

  return (
    <div className="w-min border border-white p-0.5">
      <button
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="px-8 py-2 font-medium transition-colors duration-500"
        style={{
          backgroundColor: bgColor,
          color: textColor,
        }}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  )
}
