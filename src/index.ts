// Importing modules
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const cookieParser = require('cookie-parser')

// Routers
import userRouter from './routers/user-router'
import postRouter from './routers/post-router'

// Dotenv
require('dotenv').config()

// Port
const PORT = process.env.PORT || 4000

// Hostname
const HOSTNAME = process.env.HOSTNAME || 'localhost'

// MongoDB
mongoose.set('strictQuery', true)
mongoose.connect(`${process.env.MONGO_URL}`)

// App
const app = express()

// Json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

// Cors
app.use(cors({
  origin: ['http://localhost:3000'],
}))

// Routes
app.use('/user', userRouter)
app.use('/post', postRouter)

// Default route
app.use((req, res) => {
  res.status(404)
})

// Start server
app.listen(PORT, () => console.log(`Server running at http://${HOSTNAME}:${PORT}`))