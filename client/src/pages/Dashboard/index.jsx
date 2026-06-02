import { useEffect, useState } from 'react'
import Loading from '../../utils/Loading'
import api from '../../api/axios'
import UserDashboard from './UserDashboard'
import AdminDashboard from './AdminDashboard'
import OwnerDashboard from './OwnerDashboard'

const DashboardPage = () => {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    api.get('bookings/overview').then((res) => {
      setSummary(res.data.data)
    })
  }, [])

  if (!summary) return <Loading />

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back, {summary.name}</p>
      </div>
      <div className="flex gap-6">
        <div className="bg-white w-1/2 rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Current Booking</h2>

          {summary.currentBooking ? (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">User</span>
                <span className="font-medium">{summary.currentBooking.userId?.name}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Start</span>
                <span>{new Date(summary.currentBooking.startTime).toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">End</span>
                <span>{new Date(summary.currentBooking.endTime).toLocaleString()}</span>
              </div>
            </div>
          ) : (
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
              <p className="text-slate-500">No active booking right now.</p>
            </div>
          )}
        </div>

        {summary.role === 'admin' && <AdminDashboard summary={summary} />}
      </div>
      {summary.role === 'owner' && <OwnerDashboard summary={summary} />}
    </div>
  )
}

export default DashboardPage
