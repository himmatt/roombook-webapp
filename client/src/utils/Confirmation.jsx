import { useSelector, useDispatch } from 'react-redux'

import { closeModal } from '../store/slices/modalSlice'

const Confirmation = ({ onConfirm, loading = false }) => {
  const dispatch = useDispatch()

  const { isOpen, title, description } = useSelector((state) => state.modal)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>

        <p className="text-slate-500 mb-6">{description}</p>

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
