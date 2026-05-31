const express = require('express')

const router = express.Router()

const authMiddleware = require('../middlewares/authMiddleware')

const { createBooking, getBookings, deleteBooking } = require('../controllers/bookingController')

router.use(authMiddleware)

router.post('/', createBooking)

router.get('/', getBookings)

router.delete('/:id', deleteBooking)

module.exports = router
