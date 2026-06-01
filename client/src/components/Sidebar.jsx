import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/slices/authSlice'
import api from '../api/axios'
const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user)

  const handleLogout = () => {
    api
      .post('/auth/logout')
      .then(() => {
        dispatch(logout())
        navigate('/login')
      })
      .catch(console.error)
  }

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/',
    },
    {
      label: 'Bookings',
      path: '/bookings',
    },
    {
      label: 'Profile',
      path: '/profile',
    },
  ]

  if (user?.role === 'admin') {
    menuItems.push({
      label: 'Users',
      path: '/users',
    })
  }

  return (
    <aside className="w-60 h-screen bg-white border-r border-slate-200 flex flex-col">
      <div className="h-16 px-6 flex items-center border-b border-slate-200">
        <h1 className="text-lg font-semibold text-slate-800">Meeting Room</h1>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition
                ${
                  location.pathname === item.path ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
                }
              `}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 p-4">
        <div className="mb-4">
          <p className="font-medium text-slate-800">{user?.name}</p>

          <p className="text-sm text-slate-500 capitalize">{user?.role}</p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full h-10 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
