const User = require('../models/user-model')

const login = async (req, res) => {
  try {
    const { userName, password } = req.body

    const user = await User.findOne({
      userName,
    }).select('+password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User Does not exist',
      })
    }

    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    const token = user.generateToken()

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      maxAge: 24 * 60 * 60 * 1000,
    })

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        userName: user.userName,
        role: user.role,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
const logout = async (req, res) => {
  res.clearCookie('token')

  return res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  })
}

module.exports = {
  login,
  logout,
}
