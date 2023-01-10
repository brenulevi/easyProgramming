import { Request, Response, NextFunction } from 'express'

const middles = {
  verifyUser: (req: Request, res: Response, next: NextFunction) => {
    if (req.params.id === '1') {
      next()
    } else {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  }
}

export default middles