import { useState } from 'react'
import { toast } from 'sonner'

import DeleteIcon from '../../assets/icons/DeleteIcon'
import api from '../../api/axios'

import Confirmation from '../../utils/Confirmation'

import { openModal, closeModal, selectModalMode } from '../../store/slices/modalSlice'

import { useAppDispatch, useAppSelector } from '../../store/hook'
import PiPenIcon from '../../assets/icons/PiPenIcon'
import Modal from '../../utils/Modal'
import UserUpdatePage from '../../pages/UserUpdatePage'

const ActionsCell = ({ id, deleteUrl, onRefresh, updateUrl, rowData }) => {
  const dispatch = useAppDispatch()

  const modalMode = useAppSelector(selectModalMode)

  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = () => {
    setIsLoading(true)

    api
      .delete(`${deleteUrl}/${id}`)
      .then((response) => {
        toast.success(response.data?.message || 'Deleted successfully')

        onRefresh?.()

        dispatch(closeModal())
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || 'Delete failed')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <button
        className="p-2 rounded-lg hover:bg-red-50 transition"
        onClick={() =>
          dispatch(
            openModal({
              mode: `delete-row-${id}`,
              data: {
                id,
                deleteUrl,
              },
            })
          )
        }
      >
        <DeleteIcon color="#DC143C" />
      </button>

      {updateUrl && (
        <button
          className="p-2 rounded-lg hover:bg-red-50 transition"
          onClick={() =>
            dispatch(
              openModal({
                mode: `update-row-${id}`,
                data: {
                  id,
                  updateUrl,
                },
              })
            )
          }
        >
          <PiPenIcon color="#" />
        </button>
      )}
      {modalMode === `delete-row-${id}` ? (
        <Confirmation isLoading={isLoading} onConfirm={handleDelete} />
      ) : modalMode === `update-row-${id}` ? (
        <Modal needCloseButton={true}>
          <UserUpdatePage updateUrl={updateUrl} id={id} onRefresh={onRefresh} rowData={rowData} />
        </Modal>
      ) : null}
    </>
  )
}

export default ActionsCell
