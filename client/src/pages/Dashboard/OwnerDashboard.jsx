import { useNavigate } from 'react-router-dom'
const OwnerDashboard = ({ summary }) => {
  const navigate = useNavigate()

  return (
    <>
      <div className="flex gap-6">
        <div className="bg-white w-1/2 rounded-lg shadow p-6">
          <h2 className="font-bold mb-4">Bookings Per User</h2>

          <table className="w-full">
            <thead>
              <tr className="text-left text-slate-500">
                <th>User</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {summary.bookingsByUser.map((item) => (
                <tr key={item.userName}>
                  <td>{item.name}</td>
                  <td>{item.totalBookings}</td>
                </tr>
              ))}
            </tbody>

            <button
              className="mt-4 px-3 py-1 text-sm font-medium rounded bg-slate-100 text-blue-800 hover:bg-slate-200 cursor-pointer"
              onClick={() => navigate('/dashboard/booking-details')}
            >
              View Details
            </button>
          </table>
        </div>
        <div className="w-50 bg-white rounded-lg shadow p-6">
          <p className="font-bold">Most Active User</p>

          <div className="text-sm font-bold mt-4">{summary?.mostActiveUser?.name}</div>
          <div className="text-sm text-slate-500">{summary?.mostActiveUser?.totalBookings} bookings</div>
        </div>
      </div>
    </>
  )
}
export default OwnerDashboard
