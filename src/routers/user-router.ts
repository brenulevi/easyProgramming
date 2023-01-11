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

userRouter.get('/get/:id', UserController.get)

userRouter.put('/update/:id', userMiddle.verifyUser, UserController.update)

userRouter.delete('/delete/:id', userMiddle.verifyUser, UserController.remove)

// Exporting router
export default userRouter