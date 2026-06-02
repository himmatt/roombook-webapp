const UserDashboard = ({ summary }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="font-bold mb-3">Current Booking</h2>

      {summary.currentBooking ? (
        <>
          <p>
            User:
            {summary.currentBooking.userId.name}
          </p>

          <p>
            Start:
            {new Date(summary.currentBooking.startTime).toLocaleString()}
          </p>

          <p>
            End:
            {new Date(summary.currentBooking.endTime).toLocaleString()}
          </p>
        </>
      ) : (
        <p>No active booking</p>
      )}
    </div>
  )
}
export default UserDashboard
