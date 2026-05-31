const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ['admin', 'owner', 'user'],
      default: 'user',
    },
  },
  { timestamps: true }
)
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return
  }

  this.password = await bcrypt.hash(this.password, 10)
})
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}
userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      userId: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  )
}
module.exports = mongoose.model('User', userSchema)
