'use client'

import { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import api from '@/lib/axios'

export default function Dashboard() {
  const [todos, setTodos] = useState<any[]>([])
  const [title, setTitle] = useState('')

  const token = localStorage.getItem('token')

  const fetchTodos = async () => {
    const res = await api.get('/todos', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setTodos(res.data)
  }

  const createTodo = async () => {
    await api.post(
      '/todos',
      { title },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    fetchTodos()
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <Container>
      <Typography variant="h4" mt={4}>
        My Todos
      </Typography>

      <TextField
        label="New Todo"
        fullWidth
        sx={{ mt: 2 }}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={createTodo}
      >
        Add
      </Button>

      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText primary={todo.title} />
          </ListItem>
        ))}
      </List>
    </Container>
  )
}
