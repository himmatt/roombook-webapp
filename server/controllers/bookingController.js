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
      status: 'booked',
      startTime: { $lt: new Date(endTime) },
      endTime: { $gt: new Date(startTime) },
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

// const getBookings = async (req, res) => {
//   try {
//     const page = Number(req.query.page) || 1
//     const limit = Number(req.query.limit) || 10

//     const skip = (page - 1) * limit

//     const bookings = await Booking.find()
//       .populate('userId', 'name userName role')
//       .sort({ startTime: -1, createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//     const total = await Booking.countDocuments()

//     const list = bookings.map((b) => {
//       const start = new Date(b.startTime)
//       const end = new Date(b.endTime)

//       const durationMs = end - start
//       const durationMinutes = Math.floor(durationMs / (1000 * 60))
//       const hours = Math.floor(durationMinutes / 60)
//       const mins = durationMinutes % 60

//       return {
//         ...b.toObject(),
//         duration: `${hours}h ${mins}m`,
//       }
//     })
//     return res.status(200).json({
//       success: true,
//       message: 'Bookings retrieved successfully',
//       data: {
//         count: list.length,
//         list,
//         columns: [
//           {
//             header: 'User',
//             accessorKey: 'userId.name',
//           },
//           {
//             header: 'Start Time',
//             accessorKey: 'startTime',
//           },
//           {
//             header: 'End Time',
//             accessorKey: 'endTime',
//           },
//           {
//             header: 'Status',
//             accessorKey: 'status',
//           },
//           {
//             header: 'Duration',
//             accessorKey: 'duration',
//           },
//         ],
//       },
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }
const getBookings = async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1)
    const limit = Math.max(Number(req.query.limit) || 10, 1)

    const skip = (page - 1) * limit

    const [bookings, total] = await Promise.all([
      Booking.find()
        .populate('userId', 'name userName role')
        .sort({ startTime: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Booking.countDocuments(),
    ])

    const list = bookings.map((b) => {
      const start = new Date(b.startTime)
      const end = new Date(b.endTime)

      const durationMinutes = Math.floor((end - start) / (1000 * 60))

      const hours = Math.floor(durationMinutes / 60)
      const mins = durationMinutes % 60

      return {
        ...b.toObject(),
        duration: `${hours}h ${mins}m`,
      }
    })

    return res.status(200).json({
      success: true,
      message: 'Bookings retrieved successfully',
      data: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
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
            header: 'Status',
            accessorKey: 'status',
          },
          {
            header: 'Duration',
            accessorKey: 'duration',
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

const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id
    const booking = await Booking.findById(bookingId)

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "The Requested Booking doesn't exist",
      })
    }

    const isAdmin = req.user.role === 'admin'

    const isOwner = req.user.role === 'owner'

    const isCreator = booking.userId.toString() === req.user._id.toString()

    if (!isAdmin && !isOwner && !isCreator) {
      return res.status(403).json({
        success: false,
        message: "You Don't have permission to delete this booking",
      })
    }

    await Booking.findByIdAndUpdate(bookingId, {
      status: 'cancelled',
    })

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

const getDashboardSummary = async (req, res) => {
  try {
    const { role, name } = req.user

    const now = new Date()

    // visible to ALL roles
    const currentBooking = await Booking.findOne({
      startTime: { $lte: now },
      endTime: { $gte: now },
      status: 'booked',
    })
      .populate('userId', 'name userName')
      .sort({ startTime: 1 })

    const data = {
      role,
      currentBooking,
      name,
    }

    // ADMIN + OWNER
    if (role === 'admin' || role === 'owner') {
      const [totalBookings, totalUsers] = await Promise.all([Booking.countDocuments(), User.countDocuments()])

      data.totalBookings = totalBookings
      data.totalUsers = totalUsers
    }

    // OWNER ONLY
    if (role === 'owner') {
      const bookingsByUser = await Booking.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: '$user',
        },
        {
          $group: {
            _id: '$userId',

            name: {
              $first: '$user.name',
            },

            userName: {
              $first: '$user.userName',
            },

            totalBookings: {
              $sum: 1,
            },

            bookings: {
              $push: {
                bookingId: '$_id',
                startTime: '$startTime',
                endTime: '$endTime',
                status: '$status',
                createdAt: '$createdAt',
              },
            },
          },
        },
        {
          $sort: {
            totalBookings: -1,
          },
        },
      ])

      data.bookingsByUser = bookingsByUser
      data.mostActiveUser = bookingsByUser.length > 0 ? bookingsByUser[0] : null
    }

    return res.status(200).json({
      success: true,
      message: 'Dashboard summary retrieved successfully',
      data,
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
  getDashboardSummary,
}
