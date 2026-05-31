const express = require('express')

const authRoutes = require('../routes/authRoutes')
const userRoutes = require('../routes/userRoutes')
const bookingRoutes = require('../routes/bookingRoutes')

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/bookings', bookingRoutes)

module.exports = router
