'use client'

import { useState } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material'
import api from '@/lib/axios'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleRegister = async () => {
    try {
      await api.post('/auth/register', {
        email,
        password
      })

      router.push('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4">Register</Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleRegister}
        >
          Register
        </Button>
      </Box>
    </Container>
  )
}
