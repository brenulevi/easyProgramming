import { Request, Response, NextFunction } from 'express'

import crypto from 'crypto'

import User from '../models/user'
import Post from '../models/post'
import { createForOf } from 'typescript'

// Create a new post
export async function create(req: Request, res: Response, next: NextFunction) {
    const { content, language }: { content: string, language: string } = req.body
    User.findOne({ id: req.headers.id }).then(async (user) => {
        let id: string = crypto.randomBytes(4).toString('hex')
        const creator = user?._id
        const post = new Post({ id, creator, content, language, answers: [] })
        await user?.updateOne({ $push: { posts: post } })
        await post.save()
        res.json({ post })
    })
}

// Get a post by id
export async function get(req: Request, res: Response, next: NextFunction) {
    Post.findOne({ id: req.params.id }).then((post) => {
        if (!post) return res.status(404).json({ error: 'Post not found' })
        res.status(200).json({ post })
    })
}

// Get all posts by user id
export async function getPostsByUser(req: Request, res: Response, next: NextFunction) {
    Post.find({ 'creator.id': req.params.id }).populate('creator').then((posts) => {
        if (!posts) return res.status(404).json({ error: 'Posts not found' })
        res.status(200).json({ posts });
    })
}

// Update post
export async function update(req: Request, res: Response, next: NextFunction) {
    Post.findOne({ id: req.params.id }).populate('creator').then(async (post) => {
        if (!post) return res.status(404).json({ error: 'Post not found' })
        if (post?.creator.id !== req.headers.id) return res.status(400).json({ error: 'Unauthorized' })
        const { content, language }: { content: string, language: string } = req.body
        await post?.updateOne({ content, language }, { new: true })
        return res.status(204).json({ message: 'Post updated' })
    })
}

// Delete post
export async function remove(req: Request, res: Response, next: NextFunction) {
    Post.findOne({ id: req.params.id }).populate('creator').then(async (post) => {
        if (!post) return res.status(404).json({ error: 'Post not found' })
        if (post.creator.id !== req.headers.id) return res.status(401).json({ error: 'Unauthorized' })
        await post.deleteOne()
        return res.status(204).json({ message: 'Post deleted' })
    })
}

export default { create, get, getPostsByUser, update, remove }