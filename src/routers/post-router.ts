// Importing modules
import express from 'express'

// Importing middlewares
import userMiddle from '../middlewares/user-middle'

// Importing controllers
import PostController from '../controllers/PostController'

const postRouter = express.Router()

// Routes
postRouter.post('/create', userMiddle.verifyUser, PostController.create)

postRouter.get('/:id', userMiddle.verifyUser, PostController.get)

postRouter.get('/:uid/posts', userMiddle.verifyUser, PostController.getPostsByUser)

postRouter.put('/:id', userMiddle.verifyUser, PostController.update)

postRouter.delete('/:id', userMiddle.verifyUser, PostController.remove)

// Exporting router
export default postRouter