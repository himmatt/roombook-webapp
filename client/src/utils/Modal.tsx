import { JSX } from 'react'

import PiXIcon from '../assets/icons/PiXIcon'
import { useAppDispatch, useAppSelector } from '../store/hook'
import { closeModal, selectModalState } from '../store/slices/modalSlice'

interface ModalParams {
  children: JSX.Element
  needCloseButton?: boolean
}

const Modal = ({ children, needCloseButton = false }: ModalParams) => {
  const dispatch = useAppDispatch()

  const showModal = useAppSelector(selectModalState)
  return (
    <>
      {showModal ? (
        <div className="fixed inset-0 z-3 flex items-center justify-center bg-black/50" style={{ marginTop: '0px' }}>
          <div className="relative bg-white rounded-lg custoimzed-box-shadow w-[80vw] max-w-135">
            {needCloseButton && (
              <button
                className="absolute -top-4 -right-4 bg-gray-200  hover:text-error hover:border:muted transition-all cursor-pointer p-1  rounded-[50%]"
                onClick={() => dispatch(closeModal())}
              >
                <span className="icon-subHeader">
                  <PiXIcon size={12} />
                </span>
              </button>
            )}
            <div className="max-h-[80vh] w-full overflow-y-auto overflow-hidden scrollbar-hide p-4">{children}</div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Modal
