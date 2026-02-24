// 'use client'

// import { useState } from 'react'
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Box
// } from '@mui/material'
// import api from '@/lib/axios'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'

// export default function Register() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const router = useRouter()

//   const handleRegister = async () => {
//     try {
//       await api.post('/auth/register', {
//         email,
//         password
//       })

//       router.push('/login')
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <Container maxWidth="sm">
//       <Box mt={8}>
//         <Typography variant="h4">Register</Typography>

//         <TextField
//           fullWidth
//           label="Email"
//           margin="normal"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <TextField
//           fullWidth
//           label="Password"
//           type="password"
//           margin="normal"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <Button
//           fullWidth
//           variant="contained"
//           sx={{ mt: 2 }}
//           onClick={handleRegister}
//         >
//           Register
//         </Button>
//         <Typography mt={2}>
//           Already have an account?{' '}
//           <Link href="/login">Login here</Link>
//         </Typography>
//       </Box>
//     </Container>
//   )
// }

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
import Link from 'next/link'
import { useSnackbar } from '@/context/SnackbarContext'
import { useLoading } from '@/context/LoadingContext'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()
  const { showMessage } = useSnackbar()
  const { setLoading } = useLoading()

  const handleRegister = async () => {
    if (!email.trim() && !password.trim()) {
      showMessage('All fields are required', 'error')
      return
    }

    if (!email.trim()) {
      showMessage('Email is required', 'error')
      return
    }

    if (!password.trim()) {
      showMessage('Password is required', 'error')
      return
    }

    if (password.length < 6) {
      showMessage('Password must be at least 6 characters', 'error')
      return
    }

    try {
      setLoading(true)

      await api.post('/auth/register', {
        email,
        password
      })

      showMessage('Registration successful. Please login.', 'success')
      router.push('/login')
    } catch (error: any) {
      showMessage(
        error.response?.data?.message || 'Registration failed',
        'error'
      )
    } finally {
      setLoading(false)
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
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

        <Typography mt={2}>
          Already have an account?{' '}
          <Link href="/login">Login here</Link>
        </Typography>
      </Box>
    </Container>
  )
}