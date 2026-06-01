import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import api from '../../api/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { setUser } from '../../store/slices/authSlice'
import { toast } from 'sonner'

import Input from '../../components/form/Input'
const formSchema = z.object({
  userName: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required').max(20, 'Password must be less than 20 characters'),
})

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: '',
      password: '',
    },
  })

  const handleSubmit = async (values) => {
    setIsLoading(true)

    api
      .post('/auth/login', values)
      .then(async () => {
        const profileResponse = await api.get('/users/profile')

        dispatch(setUser(profileResponse.data.user))
        toast.success('Login successful')
        navigate('/')
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || 'Login Failed')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-sm shadow-lg border border-slate-200 p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Room Booking</h1>

          <p className="text-slate-500 mt-2">Login to continue</p>
        </div>

        <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
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
                placeholder="Enter Username"
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
                type="password"
                value={field.value}
                onChange={field.onChange}
                errorMessage={form.formState.errors.password?.message}
                placeholder="Enter Password"
              />
            )}
          />
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="w-full h-11 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Logging In' : 'Log In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
