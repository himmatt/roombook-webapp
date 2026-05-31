const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    startTime: {
      type: Date,
      required: true,
    },

    endTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Booking', bookingSchema)
