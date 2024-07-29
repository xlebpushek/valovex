import clsx from 'clsx'
import { useState } from 'react'

export interface Option {
  value: string | number
  label: string
}

interface SelectProps {
  options: Option[]
  placeholder?: string
  value: string | number
  onChange: (value: any) => void
  disabled?: boolean
  classNames?: string
}

export function Select({ options, value, onChange, disabled, classNames }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOptionClick = async (option: Option) => {
    onChange(option.value)
    setIsOpen(false)
  }

  const label = options.find((option) => option.value === value)?.label

  return (
    <div className={clsx('relative', classNames)}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className="custom-scrollbar w-full border border-white/10 py-2 text-center font-bold backdrop-blur-sm transition-colors duration-500"
      >
        {label}
      </button>
      <div
        className={`absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="custom-scrollbar max-h-96 overflow-y-auto border border-white/10 py-2 backdrop-blur-sm transition-colors duration-500">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-1 font-medium transition-colors duration-500 hover:bg-white hover:text-black"
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
