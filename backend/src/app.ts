import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './middleware/error.middleware'

const app = express()

app.use(express.json())

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
)

app.use(cookieParser())
app.use(errorMiddleware)


export default app
