const express = require('express')

const router = express.Router()

const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserDetail,
  getProfile,
} = require('../controllers/userController')

const authMiddleware = require('../middlewares/authMiddleware')

const authorize = require('../middlewares/roleMiddleware')

router.use(authMiddleware)
router.get('/profile', getProfile)
router.patch('/:id', updateUser)

router.use(authorize('admin'))
router.post('/', createUser)
router.get('/', getUsers)
router.get('/:id', getUserDetail)

router.delete('/:id', deleteUser)

module.exports = router
