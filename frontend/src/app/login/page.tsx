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

// export default function Login() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const router = useRouter()

//   const handleLogin = async () => {
//     try {
//       const res = await api.post('/auth/login', {
//         email,
//         password
//       })

//       localStorage.setItem('token', res.data.accessToken)

//       router.push('/dashboard')
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <Container maxWidth="sm">
//       <Box mt={8}>
//         <Typography variant="h4">Login</Typography>

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
//           onClick={handleLogin}
//         >
//           Login
//         </Button>
//         <Typography mt={2}>
//           Don't have an account?{' '}
//           <Link href="/register">Register here</Link>
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
import { useAuth } from '@/context/AuthContext'
import { useSnackbar } from '@/context/SnackbarContext'
import { useLoading } from '@/context/LoadingContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()
  const { login } = useAuth()
  const { showMessage } = useSnackbar()
  const { setLoading } = useLoading()

  const handleLogin = async () => {
    if (!email.trim() && !password.trim()) {
      showMessage('Email and Password are required', 'error')
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

    try {
      setLoading(true)

      const res = await api.post('/auth/login', {
        email,
        password
      })

      login(res.data.accessToken)

      showMessage('Login successful', 'success')
      router.push('/dashboard')
    } catch (error: any) {
      showMessage(
        error.response?.data?.message || 'Login failed',
        'error'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4">Login</Typography>

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
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography mt={2}>
          Don't have an account?{' '}
          <Link href="/register">Register here</Link>
        </Typography>
      </Box>
    </Container>
  )
}