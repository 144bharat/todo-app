'use client'

import { createContext, useContext, useState } from 'react'
import { Backdrop, CircularProgress } from '@mui/material'

const LoadingContext = createContext<any>(null)

export const LoadingProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{ setLoading }}>
      {children}
      <Backdrop open={loading} sx={{ zIndex: 9999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </LoadingContext.Provider>
  )
}

export const useLoading = () => {
  const ctx = useContext(LoadingContext)
  if (!ctx) throw new Error('useLoading must be inside LoadingProvider')
  return ctx
}