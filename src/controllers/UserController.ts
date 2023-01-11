import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

import User from '../models/user'

export async function create(req: Request, res: Response, next: NextFunction) {
  const { name, email, password, age }: { name: string, email: string, password: string, age: number } = req.body
  let id: string = crypto.randomBytes(4).toString('hex')
  await User.findOne({ $or: [{ email }, { id }] }).then((user) => {
    if (user) {
      if (user.email === email) {
        return res.status(400).json({ error: 'Email already exists' })
      }
      while (user.id === id) {
        id = crypto.randomBytes(4).toString('hex')
      }
    }
    bcrypt.hash(password, 10).then(async (hashed) => {
      const user = new User({
        id,
        name,
        email,
        password: hashed,
        age,
      })
      await user.save()
      res.status(201).json(user)
    })
  })
}

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password }: { email: string, password: string } = req.body
  await User.findOne({ email }).then(async (user) => {
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    const result = await bcrypt.compare(password, user.password)
    if (result) {
      jwt.sign({ id: user.id }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' }, (err, token) => {
        if (err) {
          return res.status(500).json({ error: 'Internal server error' })
        }
        res.cookie('token', token, { httpOnly: true })
        return res.status(200).json({ user: user.id })
      })
    } else 
      res.status(400).json({ error: 'Incorrect password' })
  })
}

export async function get(req: Request, res: Response, next: NextFunction) {
  res.send('Get user!')
}

export async function update(req: Request, res: Response, next: NextFunction) {
  const id: string = req.params.id
  res.send(`Update user with id: ${id}`)
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  const id: string = req.params.id
  res.send(`Delete user with id: ${id}`)
}

export default { create, login, get, update, remove }