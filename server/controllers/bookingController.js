const Booking = require('../models/booking-model')

const createBooking = async (req, res) => {
  try {
    const { startTime, endTime } = req.body

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
      userId: req.user.userId,
      startTime,
      endTime,
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

    res.status(200).json({
      success: true,
      bookings,
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
        message: 'Booking not found',
      })
    }

    const isAdmin = req.user.role === 'admin'

    const isOwner = req.user.role === 'owner'

    const isCreator = booking.userId.toString() === req.user.userId

    if (!isAdmin && !isOwner && !isCreator) {
      return res.status(403).json({
        success: false,
        message: 'You cannot delete this booking',
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

module.exports = {
  createBooking,
  getBookings,
  deleteBooking,
}
