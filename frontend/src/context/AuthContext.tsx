'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import api from '@/lib/axios'

interface AuthType {
  token: string | null
  login: (token: string) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthType | null>(null)

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('accessToken')
    if (stored) setToken(stored)
  }, [])

  const login = (token: string) => {
    localStorage.setItem('accessToken', token)
    setToken(token)
  }

const logout = async () => {
  localStorage.removeItem('accessToken')
  setToken(null)

  // Force hard redirect so interceptor can't refresh
  window.location.href = '/login'
}

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}