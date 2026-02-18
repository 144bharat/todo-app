import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import { prisma } from '../config/prisma'
import { Conflict } from '../errors/httpError'
import { generateAccessToken, generateRefreshToken } from '../utils/token.utils'
import { Unauthorized } from '../errors/httpError'

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
