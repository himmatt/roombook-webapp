const express = require('express')

const router = express.Router()

const authMiddleware = require('../middlewares/authMiddleware')

const authorize = require('../middlewares/roleMiddleware')

const {
  createBooking,
  getBookings,
  deleteBooking,
  getBookingsGroupedByUser,
  getUsageSummary,
} = require('../controllers/bookingController')

router.use(authMiddleware)

router.post('/', createBooking)

router.get('/', getBookings)

router.delete('/:id', deleteBooking)

router.get('/grouped', authorize('owner'), getBookingsGroupedByUser)
router.get('/summary', authorize('owner'), getUsageSummary)

module.exports = router
