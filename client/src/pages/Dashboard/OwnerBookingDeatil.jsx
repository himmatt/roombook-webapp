import { useEffect, useState } from 'react'
import api from '../../api/axios'
import Loading from '../../utils/Loading'
import NotFoundPage from '../NotFoundPage'
import { useSelector } from 'react-redux'

const OwnerBookingDetail = () => {
  const [summary, setSummary] = useState(null)
  const user = useSelector((state) => state.auth.user)
  useEffect(() => {
    api.get('bookings/overview').then((res) => {
      setSummary(res.data.data)
    })
  }, [])
  if (user.role !== 'owner') {
    return <NotFoundPage />
  }
  if (!summary) return <Loading />
  return (
    <>
      {summary.bookingsByUser.map((user) => (
        <div key={user.userName} className="bg-white w-2/3 rounded-xl border border-slate-200 shadow-sm p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-slate-800">{user.name}</h3>
              <p className="text-xs text-slate-500">@{user.userName}</p>
            </div>

            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
              {user.totalBookings} Bookings
            </span>
          </div>

          <div className="space-y-2">
            {user.bookings.map((booking) => (
              <div key={booking.bookingId} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                <div className="flex gap-4 items-center">
                  <div className="flex gap-4 items-center">
                    <span className="text-xs text-slate-500">Start</span>

                    <span className="text-sm font-medium">{new Date(booking.startTime).toLocaleString()}</span>
                  </div>

                  <div className="flex gap-4 items-center mt-1">
                    <span className="text-xs text-slate-500">End</span>

                    <span className="text-sm font-medium">{new Date(booking.endTime).toLocaleString()}</span>
                  </div>

                  <div className="flex gap-4 items-center mt-2">
                    <span className="text-xs text-slate-500">Status</span>

                    <span
                      className={`px-2 py-1 rounded-sm text-xs font-medium ${
                        booking.status === 'booked' ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

export default OwnerBookingDetail
