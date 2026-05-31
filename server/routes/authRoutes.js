const express = require('express')

const router = express.Router()

const { login, logout, currentUser } = require('../controllers/authController')

const authMiddleware = require('../middlewares/authMiddleware')

router.post('/login', login)

router.post('/logout', logout)

// router.get('/me', authMiddleware, currentUser)

module.exports = router
