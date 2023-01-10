import express from 'express'
import cors from 'cors'

import userRouter from './routers/user-router'

// PORT
const PORT = process.env.PORT || 4000

// HOSTNAME
const HOSTNAME = process.env.HOSTNAME || 'localhost'

// App
const app = express()

// JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS
app.use(cors({
  origin: ['http://localhost:3000'],
}))

app.use('/user', userRouter)

// DEFAULT ROUTE
app.use((req, res) => {
  res.status(404)
})

app.listen(PORT, () => console.log(`Server running at http://${HOSTNAME}:${PORT}`))