const AdminDashboard = ({ summary }) => {
  return (
    <div className="flex gap-6">
      <div className="w-50 bg-white rounded-lg shadow p-6">
        <h2 className="font-bold">Total Bookings</h2>

        <div className="text-4xl font-bold mt-4">{summary.totalBookings}</div>
      </div>
      <div className="w-50 bg-white rounded-lg shadow p-6">
        <h2 className="font-bold">Total Users</h2>

        <div className="text-4xl font-bold mt-4">{summary.totalUsers}</div>
      </div>
    </div>
  )
}
export default AdminDashboard
