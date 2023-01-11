import { Request, Response, NextFunction } from 'express'

import { verify } from 'jsonwebtoken'

const middles = {
  verifyUser: (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies.token) return res.status(401).json({ error: 'Unauthorized' })
    verify(req.cookies.token, `${process.env.JWT_SECRET}`, (err: any, decoded: any) => {
      if (err) return res.status(401).json({ error: 'Unauthorized' })
      req.headers.id = decoded.id
      next()
    })
  }
}

export default middles