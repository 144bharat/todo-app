'use client'

import { createContext, useContext, useState } from 'react'
import { Snackbar, Alert } from '@mui/material'

interface SnackbarContextType {
  showMessage: (
    message: string,
    severity?: 'success' | 'error' | 'info'
  ) => void
}

const SnackbarContext = createContext<SnackbarContextType | null>(null)

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<
    'success' | 'error' | 'info'
  >('info')

  const showMessage = (
    msg: string,
    sev: 'success' | 'error' | 'info' = 'info'
  ) => {
    setMessage(msg)
    setSeverity(sev)
    setOpen(true)
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    //Prevent closing on clickaway
    if (reason === 'clickaway') return
    setOpen(false)
  }

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = () => {
  const ctx = useContext(SnackbarContext)
  if (!ctx)
    throw new Error('useSnackbar must be inside SnackbarProvider')
  return ctx
}