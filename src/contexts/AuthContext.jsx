import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'visitbd-user'
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  const value = useMemo(
    () => ({
      user,
      login: ({ name, email }) => {
        const nextUser = {
          id: crypto.randomUUID(),
          name: name.trim(),
          email: email.trim().toLowerCase(),
          joinedAt: new Date().toISOString(),
        }
        setUser(nextUser)
      },
      logout: () => setUser(null),
      isAuthenticated: Boolean(user),
    }),
    [user],
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
