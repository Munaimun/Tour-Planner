/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { apiRequest } from '../lib/api'

const TOKEN_KEY = 'visitbd-token'
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => window.localStorage.getItem(TOKEN_KEY) || '')
  const [isHydrating, setIsHydrating] = useState(true)

  useEffect(() => {
    if (!token) {
      setIsHydrating(false)
      return
    }

    apiRequest('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(({ user: nextUser }) => {
        setUser(nextUser)
      })
      .catch(() => {
        window.localStorage.removeItem(TOKEN_KEY)
        setToken('')
        setUser(null)
      })
      .finally(() => setIsHydrating(false))
  }, [token])

  const value = useMemo(
    () => ({
      user,
      login: async ({ name, email, password }) => {
        const data = await apiRequest('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
        })

        window.localStorage.setItem(TOKEN_KEY, data.token)
        setToken(data.token)
        setUser(data.user)
        return data.user
      },
      logout: () => {
        window.localStorage.removeItem(TOKEN_KEY)
        setToken('')
        setUser(null)
      },
      isAuthenticated: Boolean(user && token),
      isHydrating,
    }),
    [isHydrating, token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
