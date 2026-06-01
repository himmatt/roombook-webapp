import { useState } from 'react'
import DeleteIcon from '../../assets/icons/DeleteIcon'
import { useLocation, useNavigate, useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../store/hook'
import { openModal, closeModal } from '../../store/slices/modalSlice'

import { toast } from 'sonner'
import Confirmation from '../../utils/Confirmation'

const DeleteBlockRules = {
  deleteprotection: [true],
}
const ActionsCell = ({ id, prefix, deleteUrl, onRefresh, rowData }) => {
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()
  const routeLocation = useLocation()
  const pathname = routeLocation.pathname
  const dispatch = useAppDispatch()

  const modalMode = useAppSelector(selectModalMode)
  const navigate = useNavigate()

  const isDeleteBlocked = () => {
    return Object.entries(DeleteBlockRules).some(([field, blockedValues]) => {
      const fieldValue = rowData?.[field]

      return blockedValues.some(
        (blockedValue) => String(fieldValue).toLowerCase() === String(blockedValue).toLowerCase()
      )
    })
  }
  const formatFieldName = (field) => {
    return field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())
  }

  const getBlockedMessage = () => {
    const matchedRule = Object.entries(DeleteBlockRules).find(([field, blockedValues]) =>
      blockedValues.some(
        (blockedValue) => String(rowData?.[field]).toLowerCase() === String(blockedValue).toLowerCase()
      )
    )
    if (matchedRule) {
      const [field] = matchedRule
      return `This resource can’t be deleted while ${formatFieldName(field)} is ${rowData?.[field]}.`
    }
    return 'This resource cannot be deleted.'
  }

  const handleDelete = async (id, deleteUrl) => {
    setIsLoading(true)

    api
      .delete(`${deleteUrl}/${id}`)
      .then((response) => {
        toast.success(response.data?.message || 'Deleted successfully')

        onRefresh()

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
      <span className="flex items-center justify-center gap-2">
        {deleteUrl ? (
          <button
            className="action-btn-icon tooltip tooltip-up hover:before:content-[attr(data-tip)] before:pointer-events-none"
            data-tip="Delete"
            onClick={() => {
              if (!isDeleteBlocked()) {
                dispatch(openModal(`delete-row-${id}`))
              } else toast.warning(getBlockedMessage())
            }}
          >
            <DeleteIcon color="#DC143C" />
          </button>
        ) : null}
      </span>

      {modalMode === `delete-row-${id}` ? (
        <Confirmation
          onConfirm={() => {
            if (deleteUrl) {
              handleDelete(id, deleteUrl)
            }
          }}
          isLoading={isLoading}
        />
      ) : null}
    </>
  )
}

export default ActionsCell
