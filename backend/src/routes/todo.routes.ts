import { Router } from 'express'
import {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo
} from '../controllers/todo.controller'
import { protect } from '../middleware/auth.middleware'

const router = Router()

// All routes protected
router.post('/', protect, createTodo)
router.get('/', protect, getTodos)
router.get('/:id', protect, getTodo)
router.put('/:id', protect, updateTodo)
router.delete('/:id', protect, deleteTodo)

export default router
