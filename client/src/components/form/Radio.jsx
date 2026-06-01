import { useEffect, useState } from 'react'

const Radio = ({ label, options = [], value, onChange, errorMessage, disabled = false, required = false }) => {
  const [selectedValue, setSelectedValue] = useState(value)

  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  const handleSelect = (optionValue) => {
    if (disabled) return

    setSelectedValue(optionValue)
    onChange?.(optionValue)
  }

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="flex flex-wrap gap-6">
        {options.length > 0 ? (
          options.map((option) => (
            <label
              key={option.value}
              className={`
                flex items-center gap-2
                ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
              `}
            >
              <input
                type="radio"
                value={option.value}
                checked={selectedValue === option.value}
                onChange={() => handleSelect(option.value)}
                disabled={disabled}
                className="h-4 w-4"
              />

              <span className="text-sm text-slate-700">{option.label}</span>
            </label>
          ))
        ) : (
          <span className="text-sm text-slate-400">No options available</span>
        )}
      </div>

      {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
    </div>
  )
}

export default Radio
