import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AppError } from '../errors/AppError'

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err)

  // Prisma duplicate
  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'Resource already exists'
      })
    }
  }

  // JWT expired
  if (err instanceof jwt.TokenExpiredError) {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    })
  }

  // JWT invalid
  if (err instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    })
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    })
  }

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  })
}
