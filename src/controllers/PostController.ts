import { Request, Response, NextFunction } from 'express'

import User from '../models/user'
import Post from '../models/post'

// Create a new post
export async function create(req: Request, res: Response, next: NextFunction) {
    const { content, language }: { content: string, language: string } = req.body
    User.findOne({ id: req.headers.id }).then((user) => {
        const creator = { id: user?.id, name: user?.name }
        const post = new Post({ creator, content, language, isSolved: false, answers: [] })
        res.json({ post })
    })
}

export default { create }