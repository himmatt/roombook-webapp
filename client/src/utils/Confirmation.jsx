import { useSelector, useDispatch } from 'react-redux'

import { closeModal } from '../store/slices/modalSlice'

const Confirmation = ({
  onConfirm,
  loading = false,
  title = 'Confirm Delete',
  description = 'This action cannot be undone.',
}) => {
  const dispatch = useDispatch()

  const { isOpen } = useSelector((state) => state.modal)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md bg-white/30">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl p-6">
        <h3 className="mb-2 text-lg font-semibold text-slate-800">{title}</h3>

        <p className="mb-6 text-slate-500">{description}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => dispatch(closeModal())}
            className="
              px-4
              py-2
              rounded-lg
              border
              border-slate-300
              hover:bg-slate-50
            "
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={onConfirm}
            className="
              px-4
              py-2
              rounded-lg
              bg-red-600
              text-white
              hover:bg-red-700
              disabled:opacity-50
            "
          >
            {loading ? 'Please wait...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
