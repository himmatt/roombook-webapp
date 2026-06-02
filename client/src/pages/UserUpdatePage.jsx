import { useState } from 'react'
import z from 'zod'
import { useNavigate } from 'react-router'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '../components/form/Input'
import Radio from '../components/form/Radio'
import api from '../api/axios'
import { toast } from 'sonner'
import { closeModal } from '../store/slices/modalSlice'
import { useAppDispatch } from '../store/hook'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
})
const roleOption = [
  { label: 'ADMIN', value: 'admin' },
  { label: 'USER', value: 'user' },
  { label: 'OWNER', value: 'owner' },
]
const UserUpdatePage = ({ updateUrl, id, onRefresh, rowData }) => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: rowData?.name || '',
      role: rowData?.role || '',
    },
  })
  const handleSubmit = async (values) => {
    setIsLoading(true)
    console.log('SUBMIT')

    const loadingToast = toast.loading('Updating user...')

    api
      .patch(`/users/${id}`, values)
      .then(() => {
        toast.success('User updated successfully')
        dispatch(closeModal())
        onRefresh?.()
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || 'Failed to update user')
      })
      .finally(() => {
        setIsLoading(false)

        toast.dismiss(loadingToast)
      })
  }
  return (
    <div>
      <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
        <h3 className="text-center text-[13px] leading-[18px]">Update Member Role</h3>
        <Controller
          name="name"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              isRequired
              label="Fullname"
              value={field.value}
              onChange={field.onChange}
              errorMessage={form.formState.errors.name?.message}
              placeholder="John Doe"
            />
          )}
        />
        <Controller
          name="role"
          control={form.control}
          render={({ field }) => (
            <Radio
              label="Role"
              value={field.value}
              onChange={field.onChange}
              errorMessage={form.formState.errors.role?.message}
              options={roleOption}
            />
          )}
        />
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-4 py-2.5 rounded-sm bg-blue-800  text-white font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            disabled={isLoading}
          >
            Update User
          </button>
        </div>
      </form>
    </div>
  )
}
export default UserUpdatePage
