import { Request, Response, NextFunction } from 'express'

import User from '../models/user'

export async function create(req: Request, res: Response, next: NextFunction) {
  const { name, email, password, age } = req.body
  const id: string = "123"
  const user = new User({
    id: id,
    name: name,
    email: email,
    password: password,
    age: age,
    friends: [],
    posts: [],
    answers: [],
  })
  res.send(user)
}

export async function login(req: Request, res: Response, next: NextFunction) {
  res.send('Login user!')
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