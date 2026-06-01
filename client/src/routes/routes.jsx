import DashboardPage from '../pages/DashboardPage'
import UsersPage from '../pages/UsersPage'
import BookingsPage from '../pages/BookingsPage'
import ProfilePage from '../pages/ProfilePage'

export const ROUTES = [
  {
    url: '/',
    component: <DashboardPage />,
    roles: ['admin', 'owner', 'user'],
  },

  {
    url: '/bookings',
    component: <BookingsPage />,
    roles: ['admin', 'owner', 'user'],
  },

  {
    url: '/users',
    component: <UsersPage />,
    roles: ['admin'],
  },
  {
    url: '/profile',
    component: <ProfilePage />,
    roles: ['admin', 'owner', 'user'],
  },
]
