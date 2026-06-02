import { useEffect, useState } from 'react'
import api from '../api/axios'
import Loading from '../utils/Loading'

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const getProfile = async () => {
    try {
      setLoading(true)

      const response = await api.get('/users/profile')

      setUser(response.data.user)
    } catch (error) {
      console.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-2xl font-bold">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">{user?.name}</h1>

            <p className="text-slate-500">@{user?.userName}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-500">Name</p>
            <p className="font-medium">{user?.name}</p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-500">Username</p>
            <p className="font-medium">{user?.userName}</p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-500">Role</p>
            <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
              {user?.role}
            </span>
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-500">Member Since</p>
            <p className="font-medium">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
