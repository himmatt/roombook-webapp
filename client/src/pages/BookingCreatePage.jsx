import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Input from '../components/form/Input'
import { toast } from 'sonner'

const BookingCreatePage = () => {
  const navigate = useNavigate()

  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [bookings, setBookings] = useState([])

  const [duration, setDuration] = useState('')
  const [warning, setWarning] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.get('/bookings').then((res) => {
      setBookings(res.data?.data?.list || [])
    })
  }, [])

  const calculateDuration = (start, end) => {
    const diff = new Date(end) - new Date(start)
    if (diff <= 0) return 'Invalid time range'

    const mins = Math.floor(diff / (1000 * 60))
    const h = Math.floor(mins / 60)
    const m = mins % 60

    return `${h}h ${m}m`
  }

  const hasConflict = (start, end) => {
    return bookings.some((b) => {
      if (b.status === 'cancelled') return false

      return new Date(start) < new Date(b.endTime) && new Date(end) > new Date(b.startTime)
    })
  }

  useEffect(() => {
    if (startTime && endTime) {
      setDuration(calculateDuration(startTime, endTime))

      if (new Date(endTime) <= new Date(startTime)) {
        setWarning('⚠ End time must be after start time')
      } else if (hasConflict(startTime, endTime)) {
        setWarning('⚠ This time slot is already booked')
      } else {
        setWarning('')
      }
    }
  }, [startTime, endTime])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (warning) {
      toast.error('Please fix conflicts before submitting')
      return
    }

    setLoading(true)

    const loadingToast = toast.loading('Creating booking...')

    api
      .post('/bookings', {
        startTime,
        endTime,
      })
      .then(() => {
        toast.success('Booking created successfully')
        navigate('/bookings')
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Failed to create booking')
      })
      .finally(() => {
        setLoading(false)
        toast.dismiss(loadingToast)
      })
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Create Booking</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-sm text-slate-600 mb-1 block">Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* END TIME */}
        <div>
          <label className="text-sm text-slate-600 mb-1 block">End Time</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {startTime && endTime && (
          <div className="text-sm font-medium text-slate-700">
            Duration: <span className="text-blue-600">{duration}</span>
          </div>
        )}

        {warning && <div className="text-sm text-red-600 font-medium bg-red-50 p-2 rounded">{warning}</div>}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading || !!warning}
            className="px-4 py-2.5  bg-blue-800 text-white rounded-sm hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Booking'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default BookingCreatePage
