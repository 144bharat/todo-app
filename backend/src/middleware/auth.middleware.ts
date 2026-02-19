import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Unauthorized } from '../errors/httpError'

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw Unauthorized('No token provided')
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as any

    ;(req as any).userId = decoded.userId

    next()
  } catch (error) {
    next(error)
  }
}
