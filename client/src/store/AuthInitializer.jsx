import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import api from '../api/axios'
import { setUser } from './slices/authSlice'

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('/users/profile')
      .then((response) => {
        dispatch(setUser(response.data.user))
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return children
}

export default AuthInitializer
