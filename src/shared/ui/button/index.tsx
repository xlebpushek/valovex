import { ReactNode } from 'react'

type variants = 'solid' | 'hollow'

interface ButtonProps {
  variant?: variants
  children: ReactNode
  onClick?: () => void
}

export default function Button({ variant = 'solid', children, onClick }: ButtonProps) {
  return (
    <div className="border border-white p-0.5">
      <button
        className={`${variant === 'solid' ? 'bg-rose-700 hover:bg-white hover:text-black' : ''} ${
          variant === 'hollow' ? 'hover:bg-rose-700' : ''
        } px-8 py-2 font-medium transition-colors duration-500`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  )
}
