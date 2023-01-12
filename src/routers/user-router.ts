// Importing modules
import express from 'express'

// Importing middlewares
import userMiddle from '../middlewares/user-middle'

// Importing controllers
import UserController from '../controllers/UserController'

const userRouter = express.Router()

// Routes
userRouter.post('/create', UserController.create)

userRouter.post('/login', UserController.login)

userRouter.post('/logout', userMiddle.verifyUser, UserController.logout)

userRouter.get('/get/:id', UserController.get)

userRouter.put('/update', userMiddle.verifyUser, UserController.update)

userRouter.delete('/delete', userMiddle.verifyUser, UserController.remove)

// Exporting router
export default userRouter