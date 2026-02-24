'use client'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box, Typography } from '@mui/material'

import { AuthProvider } from '@/context/AuthContext'
import { SnackbarProvider } from '@/context/SnackbarContext'
import { LoadingProvider } from '@/context/LoadingContext'

const theme = createTheme()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <AuthProvider>
            <SnackbarProvider>
              <LoadingProvider>

                {/* FLEX LAYOUT WRAPPER */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh'
                  }}
                >
                  {/* PAGE CONTENT */}
                  <Box sx={{ flex: 1 }}>
                    {children}
                  </Box>

                  {/* GLOBAL FOOTER */}
                  <Box
                    component="footer"
                    sx={{
                      textAlign: 'center',
                      py: 2,
                      borderTop: '1px solid #e0e0e0',
                      backgroundColor: '#fafafa'
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Made with ❤️ by <strong>Bharat</strong>
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      📧 bharatgautamofficial@gmail.com
                    </Typography>
                  </Box>
                </Box>

              </LoadingProvider>
            </SnackbarProvider>
          </AuthProvider>

        </ThemeProvider>
      </body>
    </html>
  )
}