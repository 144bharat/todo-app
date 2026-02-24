// 'use client'

// import { useEffect, useState } from 'react'
// import {
//   Container,
//   Typography,
//   Button,
//   TextField,
//   Card,
//   CardContent,
//   Checkbox,
//   IconButton,
//   Box
// } from '@mui/material'
// import DeleteIcon from '@mui/icons-material/Delete'
// import api from '@/lib/axios'
// import { useSnackbar } from '@/context/SnackbarContext'
// import { useLoading } from '@/context/LoadingContext'
// import AppLayout from '@/components/layout/AppLayout'

// interface Todo {
//   id: string
//   title: string
//   completed: boolean
// }

// export default function Dashboard() {
//   const [todos, setTodos] = useState<Todo[]>([])
//   const [title, setTitle] = useState('')

//   const { showMessage } = useSnackbar()
//   const { setLoading } = useLoading()

//   // Fetch Todos
//   const fetchTodos = async () => {
//     try {
//       setLoading(true)
//       const res = await api.get('/todos')
//       setTodos(res.data)
//     } catch (error: any) {
//       showMessage(
//         error.response?.data?.message || 'Failed to fetch todos',
//         'error'
//       )
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Create Todo
//   const createTodo = async () => {
//     if (!title.trim()) {
//       showMessage('Title cannot be empty', 'error')
//       return
//     }

//     try {
//       setLoading(true)
//       await api.post('/todos', { title })
//       showMessage('Todo created successfully', 'success')
//       setTitle('')
//       fetchTodos()
//     } catch (error: any) {
//       showMessage(
//         error.response?.data?.message || 'Failed to create todo',
//         'error'
//       )
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Toggle Complete
//   const toggleComplete = async (id: string, completed: boolean) => {
//     try {
//       setLoading(true)
//       await api.put(`/todos/${id}`, { completed: !completed })
//       showMessage('Todo updated', 'success')
//       fetchTodos()
//     } catch (error: any) {
//       showMessage(
//         error.response?.data?.message || 'Failed to update todo',
//         'error'
//       )
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Delete Todo
//   const deleteTodo = async (id: string) => {
//     try {
//       setLoading(true)
//       await api.delete(`/todos/${id}`)
//       showMessage('Todo deleted', 'success')
//       fetchTodos()
//     } catch (error: any) {
//       showMessage(
//         error.response?.data?.message || 'Failed to delete todo',
//         'error'
//       )
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchTodos()
//   }, [])

//   return (
//     <AppLayout>
//       <Container maxWidth="md">
//         <Typography variant="h4" mt={4} gutterBottom>
//           My Todos
//         </Typography>

//         <Box display="flex" gap={2} mt={2}>
//           <TextField
//             label="New Todo"
//             fullWidth
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />

//           <Button variant="contained" onClick={createTodo}>
//             Add
//           </Button>
//         </Box>

//         <Box mt={4}>
//           {todos.map((todo) => (
//             <Card key={todo.id} sx={{ mb: 2 }}>
//               <CardContent
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'space-between'
//                 }}
//               >
//                 <Box display="flex" alignItems="center">
//                   <Checkbox
//                     checked={todo.completed}
//                     onChange={() =>
//                       toggleComplete(todo.id, todo.completed)
//                     }
//                   />
//                   <Typography
//                     sx={{
//                       textDecoration: todo.completed
//                         ? 'line-through'
//                         : 'none'
//                     }}
//                   >
//                     {todo.title}
//                   </Typography>
//                 </Box>

//                 <IconButton
//                   color="error"
//                   onClick={() => deleteTodo(todo.id)}
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               </CardContent>
//             </Card>
//           ))}
//         </Box>
//       </Container>
//     </AppLayout>
//   )
// }



'use client'

import { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Checkbox,
  IconButton,
  Box
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import api from '@/lib/axios'
import { useSnackbar } from '@/context/SnackbarContext'
import { useLoading } from '@/context/LoadingContext'
import AppLayout from '@/components/layout/AppLayout'

interface Todo {
  id: string
  title: string
  completed: boolean
}

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  const { showMessage } = useSnackbar()
  const { setLoading } = useLoading()

  // ================= FETCH TODOS =================
  const fetchTodos = async () => {
    try {
      setLoading(true)
      const res = await api.get('/todos')
      setTodos(res.data)
    } catch (error: any) {
      showMessage(
        error.response?.data?.message || 'Failed to fetch todos',
        'error'
      )
    } finally {
      setLoading(false)
    }
  }

  // ================= ADD TODO =================
  const createTodo = async () => {
    if (!title.trim()) {
      showMessage('Todo title cannot be empty', 'error')
      return
    }

    try {
      setLoading(true)
      await api.post('/todos', { title })
      showMessage('Todo created successfully', 'success')
      setTitle('')
      fetchTodos()
    } catch (error: any) {
      showMessage(
        error.response?.data?.message || 'Failed to create todo',
        'error'
      )
    } finally {
      setLoading(false)
    }
  }

  // ================= UPDATE TODO =================
  const updateTodo = async () => {
    if (!editingId) return

    if (!title.trim()) {
      showMessage('Todo title cannot be empty', 'error')
      return
    }

    try {
      setLoading(true)

      await api.put(`/todos/${editingId}`, {
        title
      })

      showMessage('Todo updated successfully', 'success')

      setEditingId(null)
      setTitle('')
      fetchTodos()
    } catch (error: any) {
      showMessage(
        error.response?.data?.message || 'Failed to update todo',
        'error'
      )
    } finally {
      setLoading(false)
    }
  }

  // ================= TOGGLE COMPLETE =================
  const toggleComplete = async (id: string, completed: boolean) => {
    try {
      setLoading(true)
      await api.put(`/todos/${id}`, { completed: !completed })
      fetchTodos()
    } catch (error: any) {
      showMessage(
        error.response?.data?.message || 'Failed to update todo',
        'error'
      )
    } finally {
      setLoading(false)
    }
  }

  // ================= DELETE TODO =================
  const deleteTodo = async (id: string) => {
    try {
      setLoading(true)
      await api.delete(`/todos/${id}`)
      showMessage('Todo deleted', 'success')
      fetchTodos()
    } catch (error: any) {
      showMessage(
        error.response?.data?.message || 'Failed to delete todo',
        'error'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <AppLayout>
      <Container maxWidth="md">
        <Typography variant="h4" mt={4} gutterBottom>
          My Todos
        </Typography>

        {/* ================= INPUT AREA ================= */}
        <Box display="flex" gap={2} mt={2}>
          <TextField
            label="Todo Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {editingId ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={updateTodo}
              >
                Update
              </Button>

              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  setEditingId(null)
                  setTitle('')
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={createTodo}
            >
              Add
            </Button>
          )}
        </Box>

        {/* ================= TODO LIST ================= */}
        <Box mt={4}>
          {todos.map((todo) => (
            <Card key={todo.id} sx={{ mb: 2 }}>
              <CardContent
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box display="flex" alignItems="center">
                  <Checkbox
                    checked={todo.completed}
                    onChange={() =>
                      toggleComplete(todo.id, todo.completed)
                    }
                  />

                  <Typography
                    sx={{
                      textDecoration: todo.completed
                        ? 'line-through'
                        : 'none'
                    }}
                  >
                    {todo.title}
                  </Typography>
                </Box>

                <Box>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setEditingId(todo.id)
                      setTitle(todo.title)
                    }}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </AppLayout>
  )
}