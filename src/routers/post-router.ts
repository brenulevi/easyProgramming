// Importing modules
import express from 'express'

// Importing middlewares
import userMiddle from '../middlewares/user-middle'

const postRouter = express.Router()

// Routes
postRouter.post('/create', (req, res) => {
  res.send('Create new post')
})

postRouter.get('/get/', (req, res) => {
  res.send('Read all friends posts')
})

postRouter.get('/get/:id', (req, res) => {
  const id: number = +req.params.id
  res.send(`Read post with id ${id}`)
})

postRouter.put('/update/:id', userMiddle.verifyUser, (req, res) => {
  const id: number = +req.params.id
  res.send(`Update post with id ${id}`)
})

postRouter.delete('/delete/:id', userMiddle.verifyUser, (req, res) => {
  const id: number = +req.params.id
  res.send(`Delete post with id ${id}`)
})

// Exporting router
export default postRouter