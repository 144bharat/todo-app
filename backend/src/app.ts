import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './middleware/error.middleware'
import authRoutes from './routes/auth.routes'
import todoRoutes from './routes/todo.routes'

const app = express()

app.use(express.json())

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
)

app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/todos', todoRoutes)

app.use(errorMiddleware)


export default app
