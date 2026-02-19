import { Request, Response, NextFunction } from 'express'
import prisma from '../config/prisma'

// CREATE TODO
export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await prisma.todo.create({
      data: {
        title: req.body.title,
        userId: (req as any).userId
      }
    })

    res.status(201).json(todo)
  } catch (error) {
    next(error)
  }
}

// GET ALL TODOS (only user's)
export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: (req as any).userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    res.json(todos)
  } catch (error) {
    next(error)
  }
}

// GET SINGLE TODO (secure)
export const getTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await prisma.todo.findFirst({
      where: {
        id: req.params.id as string,
        userId: (req as any).userId
      }
    })

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    res.json(todo)
  } catch (error) {
    next(error)
  }
}

// UPDATE TODO
export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await prisma.todo.findFirst({
      where: {
        id: req.params.id as string,
        userId: (req as any).userId
      }
    })

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    const updated = await prisma.todo.update({
      where: { id: todo.id },
      data: {
        title: req.body.title,
        completed: req.body.completed
      }
    })

    res.json(updated)
  } catch (error) {
    next(error)
  }
}

// DELETE TODO
export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await prisma.todo.findFirst({
      where: {
        id: req.params.id as string,
        userId: (req as any).userId
      }
    })

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    await prisma.todo.delete({
      where: { id: todo.id }
    })

    res.json({ message: 'Todo deleted' })
  } catch (error) {
    next(error)
  }
}
