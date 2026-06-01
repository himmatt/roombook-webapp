const mongoose = require('mongoose')
const User = require('../models/user-model')
const Booking = require('../models/booking-model')

const createUser = async (req, res) => {
  try {
    const { name, userName, password, role } = req.body

    const existingUser = await User.findOne({
      userName,
    })

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      })
    }

    const user = await User.create({
      name,
      userName,
      password,
      role,
    })

    res.status(201).json({
      success: true,
      user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')

    const list = users

    return res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: {
        count: list.length,
        list,
        columns: [
          {
            header: 'Name',
            accessorKey: 'name',
          },
          {
            header: 'Username',
            accessorKey: 'userName',
          },
          {
            header: 'Role',
            accessorKey: 'role',
          },
          {
            header: 'Created At',
            accessorKey: 'createdAt',
          },
        ],
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const getUserDetail = async (req, res) => {
  try {
    const userId = req.params.id

    const user = await User.findById(userId).select('-password')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    return res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
const getProfile = async (req, res) => {
  try {
    const userId = req.user._id

    const user = await User.findById(userId).select('-password')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    return res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// const updateUser = async (req, res) => {
//   try {
//     const {name, role } = req.body

//     const allowedRoles = ['admin', 'owner', 'user']

//     if (!allowedRoles.includes(role)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid role',
//       })
//     }

//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid user id',
//       })
//     }

//     if (req.user._id.toString() === req.params.id) {
//       return res.status(400).json({
//         success: false,
//         message: 'You cannot change your own role',
//       })
//     }

//     const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true })

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found',
//       })
//     }

//     return res.status(200).json({
//       success: true,
//       user: {
//         id: user._id,
//         name: user.name,
//         userName: user.userName,
//         role: user.role,
//       },
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }
const updateUser = async (req, res) => {
  try {
    const { name, role } = req.body
    const requesterId = req.user._id.toString()
    const requesterRole = req.user.role
    const targetId = req.params.id

    // Validate user id
    if (!mongoose.Types.ObjectId.isValid(targetId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user id',
      })
    }

    // Build update object
    const updateData = {}

    // Anyone can update their own name
    if (name) {
      updateData.name = name
    }

    // Only admin can change role
    if (role) {
      if (requesterRole !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Only admin can change roles',
        })
      }

      // Admin cannot change their own role
      if (requesterId === targetId) {
        return res.status(400).json({
          success: false,
          message: 'You cannot change your own role',
        })
      }

      const allowedRoles = ['admin', 'owner', 'user']
      if (!allowedRoles.includes(role)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid role',
        })
      }

      updateData.role = role
    }

    // User and owner can only update themselves
    if (requesterRole !== 'admin' && requesterId !== targetId) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own profile',
      })
    }

    // Nothing to update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields to update',
      })
    }

    const user = await User.findByIdAndUpdate(targetId, updateData, { new: true })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

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

// const deleteUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id)

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found',
//       })
//     }

//     await Booking.deleteMany({
//       userId: user._id,
//     })

//     await user.deleteOne()

//     res.status(200).json({
//       success: true,
//       message: 'User and related bookings deleted',
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }
const deleteUser = async (req, res) => {
  try {
    const requesterId = req.user._id.toString()
    const requesterRole = req.user.role

    const targetId = req.params.id

    if (!mongoose.Types.ObjectId.isValid(targetId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user id',
      })
    }

    // Only admin can delete users
    if (requesterRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admin can delete users',
      })
    }

    // Admin cannot delete themselves
    if (requesterId === targetId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account',
      })
    }

    const user = await User.findById(targetId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    await Booking.deleteMany({
      userId: user._id,
    })
    if (user.role === 'admin') {
      const adminCount = await User.countDocuments({
        role: 'admin',
      })

      if (adminCount === 1) {
        return res.status(400).json({
          success: false,
          message: 'Cannot delete the last admin user',
        })
      }
    }

    await user.deleteOne()

    return res.status(200).json({
      success: true,
      message: 'User and related bookings deleted',
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserDetail,
  getProfile,
}
