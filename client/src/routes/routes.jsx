import UsersPage from '../pages/UsersPage'
import BookingsPage from '../pages/BookingsPage'
import ProfilePage from '../pages/ProfilePage'
import UserCreatePage from '../pages/UserCreatePage'
import BookingCreatePage from '../pages/BookingCreatePage'
import DashboardPage from '../pages/Dashboard'
import OwnerBookingDetail from '../pages/Dashboard/OwnerBookingDeatil'
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
  {
    url: '/users/add',
    component: <UserCreatePage />,
    roles: ['admin'],
  },
  {
    url: '/bookings/add',
    component: <BookingCreatePage />,
    roles: ['admin', 'owner', 'user'],
  },
  {
    url: '/dashboard/booking-details',
    component: <OwnerBookingDetail />,
    roles: ['owner'],
  },
]
