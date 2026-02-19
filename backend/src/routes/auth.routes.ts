import { Router } from 'express'
import { register, login, refresh } from '../controllers/auth.controller'

const router = Router()


// 🔹 Dummy GET test route
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Auth route is working 🚀'
  })
})
router.post('/login', login)
router.post('/refresh', refresh)
router.post('/register', register)

export default router