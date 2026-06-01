import { useEffect, useState } from 'react'

const Radio = ({
  isRequired = false,
  label,
  options,
  value,
  onChange,
  errorMessage,
  onClickButtonRefresh,
  onClickButtonCreate,
  info,
  progressStepStatus,
  loading = false,
  dotDashed = false,
  disabled = false,
}) => {
  const [selectedValue, setSelectedValue] = useState(value)

  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2.5 justify-between items-center h-[31px]">
          <div
            className={`relative w-5 h-5  rounded-full transition-all duration-300 ${
              progressStepStatus ? 'bg-[#0043D8E5] ' : 'bg-[#1E1E1E1A]'
            }`}
          >
            <span className="absolute top-1.5 left-1.5 rounded-full  w-2 h-2 bg-[#FFFFFFCC]"></span>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <p className={` text-content-title items-center`}>
              <span className="mb-1">{label}</span>
            </p>
            {isRequired ? (
              <span className="text-[8px] italic text-error">Required</span>
            ) : (
              <span className="ml-0.5 text-smallContent italic text-info">Optional</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-stretch relative gap-5 ">
        <div
          className={`  py-4 2xl:py-5 rounded-md flex flex-wrap items-center gap-4 2xl:gap-x-6 2xl:gap-y-4 ${
            errorMessage ? 'border-error' : 'border-muted'
          }`}
        >
          {options?.length > 0 ? (
            options?.map((option, index) => (
              <div className="flex flex-col gap-2 " key={index}>
                <div
                  className={`flex gap-1.5 justify-start items-center cursor-default`}
                  onClick={() => {
                    if (disabled) return
                    {
                      const newValue = selectedValue === option?.value ? '' : option?.value
                      setSelectedValue(newValue)
                      onChange(newValue)
                    }
                  }}
                >
                  <button
                    type="button"
                    key={index}
                    className={`btn-radio ${
                      selectedValue === option?.value ? 'border-primary text-primary' : 'border-muted'
                    } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={(e) => e.preventDefault()}
                    disabled={disabled}
                  >
                    {selectedValue === option?.value ? (
                      <span className="btn-radio-indicator border-primary flex items-center justify-center">
                        <span className="btn-radio-indicator-active" />
                      </span>
                    ) : (
                      <span className="btn-radio-indicator border-muted" />
                    )}
                  </button>
                  <span className="radio-label-text ">{option?.label}</span>
                </div>
              </div>
            ))
          ) : (
            <span className="text-subContent">No option to choose.</span>
          )}
        </div>
        {errorMessage && <p className="bottom-0 absolute left-8 input-error-message">{errorMessage}</p>}
      </div>
    </div>
  )
}

export default Radio
