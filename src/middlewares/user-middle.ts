import { Request, Response, NextFunction } from 'express'

const middles = {
  verifyUser: (req: Request, res: Response, next: NextFunction) => {
    next()
  }
}

export default middles