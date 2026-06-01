const Booking = require('../models/booking-model')
const User = require('../models/user-model')
const createBooking = async (req, res) => {
  try {
    const { startTime, endTime } = req.body
    if (!startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: 'Start time and end time are required',
      })
    }

    if (new Date(startTime) >= new Date(endTime)) {
      return res.status(400).json({
        success: false,
        message: 'Start time must be before end time',
      })
    }

    const overlap = await Booking.findOne({
      startTime: {
        $lt: new Date(endTime),
      },
      endTime: {
        $gt: new Date(startTime),
      },
    })

    if (overlap) {
      return res.status(400).json({
        success: false,
        message: 'Meeting room already booked for this time slot',
      })
    }

    const booking = await Booking.create({
      userId: req.user._id,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    })

    return res.status(201).json({
      success: true,
      booking,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId', 'name userName role').sort({ startTime: 1 })

    const list = bookings

    return res.status(200).json({
      success: true,
      message: 'Bookings retrieved successfully',
      data: {
        count: list.length,
        list,
        columns: [
          {
            header: 'User',
            accessorKey: 'userId.name',
          },
          {
            header: 'Start Time',
            accessorKey: 'startTime',
          },
          {
            header: 'End Time',
            accessorKey: 'endTime',
          },
          {
            header: 'Created At',
            accessorKey: 'createdAt',
          },
        ],
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "The Requested Booking doesn't exist",
      })
    }

    const isAdmin = req.user.role === 'admin'

    const isOwner = req.user.role === 'owner'

    const isCreator = booking.userId.toString() === req.user._id

    if (!isAdmin && !isOwner && !isCreator) {
      return res.status(403).json({
        success: false,
        message: "You Don't have permission to delete this booking",
      })
    }

    await booking.deleteOne()

    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const getBookingsGroupedByUser = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId', 'name userName role').sort({ startTime: 1 })

    const grouped = {}

    bookings.forEach((booking) => {
      const userName = booking.userId?.userName || 'Unknown User'

      if (!grouped[userName]) {
        grouped[userName] = []
      }

      grouped[userName].push(booking)
    })

    return res.status(200).json({
      success: true,
      grouped,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const getUsageSummary = async (req, res) => {
  try {
    const summary = await Booking.aggregate([
      {
        $group: {
          _id: '$userId',
          totalBookings: {
            $sum: 1,
          },
        },
      },
    ])

    const populated = await User.populate(summary, {
      path: '_id',
      select: 'name userName role',
    })

    return res.status(200).json({
      success: true,
      message: 'Usage summary retrieved',
      data: {
        count: populated.length,
        list: populated,
        columns: [
          {
            header: 'User',
            accessorKey: '_id.userName',
          },
          {
            header: 'Total Bookings',
            accessorKey: 'totalBookings',
          },
        ],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = {
  createBooking,
  getBookings,
  deleteBooking,
  getBookingsGroupedByUser,
  getUsageSummary,
}
