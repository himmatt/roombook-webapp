import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import Input from '../components/form/Input'
import Radio from '../components/form/Radio'
import api from '../api/axios'
import { useNavigate } from 'react-router'

const formSchema = z.object({
  userName: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required').max(20, 'Password must be less than 20 characters'),
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
})
const roleOption = [
  { label: 'ADMIN', value: 'admin' },
  { label: 'USER', value: 'user' },
  { label: 'OWNER', value: 'owner' },
]
const UserCreatePage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: '',
      password: '',
      name: '',
      role: '',
    },
  })
  const handleSubmit = async (values) => {
    setIsLoading(true)
    console.log('SUBMIT')

    const loadingToast = toast.loading('Creating user...')

    api
      .post('/users', values)
      .then(() => {
        toast.success('User created successfully')

        navigate('/users')
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || 'Failed to create user')
      })
      .finally(() => {
        setIsLoading(false)

        toast.dismiss(loadingToast)
      })
  }
  return (
    <>
      <div className="max-w-2xl">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-slate-800">Create User</h3>

          <p className="mt-1 text-sm text-slate-500">Create a new system user and assign a role.</p>
        </div>

        <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
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
            name="userName"
            control={form.control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                isRequired
                label="Username"
                value={field.value}
                onChange={field.onChange}
                errorMessage={form.formState.errors.userName?.message}
                placeholder="john_doe"
              />
            )}
          />
          <Controller
            name="password"
            control={form.control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                isRequired
                label="Password"
                value={field.value}
                onChange={field.onChange}
                errorMessage={form.formState.errors.password?.message}
                placeholder="••••••••"
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
              Create User
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default UserCreatePage
