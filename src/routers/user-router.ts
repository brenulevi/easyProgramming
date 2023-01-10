import express from 'express'

const userRouter = express.Router()

userRouter.post('/create', (req, res) => {
  res.send('Create new user')
})

userRouter.get('/get', (req, res) => {
  res.send('Read all users')
})

userRouter.get('/get/:id', (req, res) => {
  const id: number = +req.params.id
  res.send(`Read user with id ${id}`)
})

userRouter.put('/update/:id', (req, res) => {
  const id: number = +req.params.id
  res.send(`Update user with id ${id}`)
})

userRouter.delete('/delete/:id', (req, res) => {
  const id: number = +req.params.id
  res.send(`Delete user with id ${id}`)
})

export default userRouter