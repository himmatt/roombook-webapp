require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const app = express()
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')

app.use(cookieParser())
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
)
app.use(express.json())
app.use('/api', require('./endpoints'))

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Meeting Room Booking API Running',
  })
})

const PORT = process.env.PORT
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Backend Server is Running')
  })
})
