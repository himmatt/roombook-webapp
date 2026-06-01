import { useRef } from 'react'

const Input = ({ label, value, placeholder, type = 'text', onChange, errorMessage, disabled = false }) => {
  const inputRef = useRef(null)

  return (
    <div className="w-full">
      {label && <label className="block mb-2 text-sm font-medium text-slate-700">{label}</label>}

      <input
        ref={inputRef}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full
          px-4
          py-3
          rounded-xl
          border
          outline-none
          transition-all
          duration-200
          bg-white
          text-[14px]
          ${
            errorMessage
              ? 'border-red-500 focus:ring-2 focus:ring-red-200'
              : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
          }
          ${disabled ? 'bg-slate-100 cursor-not-allowed' : ''}
        `}
      />

      {errorMessage && <p className="mt-1 text-[12px] text-red-500">{errorMessage}</p>}
    </div>
  )
}

export default Input
