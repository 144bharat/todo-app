import { AppError } from './AppError'

export const BadRequest = (msg = 'Bad Request') =>
  new AppError(msg, 400)

export const Unauthorized = (msg = 'Unauthorized') =>
  new AppError(msg, 401)

export const Forbidden = (msg = 'Forbidden') =>
  new AppError(msg, 403)

export const NotFound = (msg = 'Not Found') =>
  new AppError(msg, 404)

export const Conflict = (msg = 'Conflict') =>
  new AppError(msg, 409)

export const Unprocessable = (msg = 'Validation Error') =>
  new AppError(msg, 422)
