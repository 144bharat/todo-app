import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import prisma from '../config/prisma'
import { generateAccessToken, generateRefreshToken } from '../utils/token.utils'
import {Conflict, Unauthorized } from '../errors/httpError'
import jwt from 'jsonwebtoken'

//REGISTER API METHOD
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      throw Conflict('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    })

    res.status(201).json({
      success: true,
      message: 'User registered successfully'
    })
  } catch (error) {
    next(error)
  }
}



//LOGIN API METHOD:

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) throw Unauthorized('Invalid credentials')

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) throw Unauthorized('Invalid credentials')

    const accessToken = generateAccessToken(user.id)
    const refreshToken = generateRefreshToken(user.id)

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: hashedRefreshToken }
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false
    })

    res.json({
      success: true,
      accessToken
    })
  } catch (error) {
    next(error)
  }
}

//Refreshing access token
export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.refreshToken
    if (!token) throw Unauthorized()

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string
    )

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!user || !user.refreshToken) throw Unauthorized()

    const isMatch = await bcrypt.compare(token, user.refreshToken)

    if (!isMatch) throw Unauthorized()

    const newAccessToken = generateAccessToken(user.id)

    res.json({
      success: true,
      accessToken: newAccessToken
    })
  } catch (error) {
    next(error)
  }
}
