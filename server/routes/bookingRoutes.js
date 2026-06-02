const express = require('express')

const router = express.Router()

const authMiddleware = require('../middlewares/authMiddleware')

const authorize = require('../middlewares/roleMiddleware')

const {
  createBooking,
  getBookings,
  deleteBooking,
  getBookingsGroupedByUser,
  getDashboardSummary,
} = require('../controllers/bookingController')

router.use(authMiddleware)

router.post('/', createBooking)

router.get('/', getBookings)

router.delete('/:id', deleteBooking)
router.get('/overview', getDashboardSummary)

router.get('/grouped', authorize('owner'), getBookingsGroupedByUser)

module.exports = router
