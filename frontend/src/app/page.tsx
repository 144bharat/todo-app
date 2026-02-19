'use client'

import { Button, Container, Typography } from '@mui/material'

export default function Home() {
  return (
    <Container>
      <Typography variant="h4" mt={4}>
        MUI is Working 🚀
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }}>
        Test Button
      </Button>
    </Container>
  )
}
