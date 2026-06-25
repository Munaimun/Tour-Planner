/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { apiRequest } from '../lib/api'
import { useAuth } from './AuthContext'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const { isAuthenticated, isHydrating } = useAuth()
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    if (!isAuthenticated) {
      setWishlist([])
      return
    }

    apiRequest('/api/users/me/wishlist', {
      headers: { Authorization: `Bearer ${window.localStorage.getItem('visitbd-token') || ''}` },
    })
      .then((data) => setWishlist(data.wishlist || []))
      .catch(() => setWishlist([]))
  }, [isAuthenticated])

  const value = useMemo(() => {
    const ids = new Set(wishlist)
    return {
      wishlist,
      isSaved: (slug) => ids.has(slug),
      toggleWish: async (slug) => {
        if (!isAuthenticated || isHydrating) return
        const data = await apiRequest('/api/users/me/wishlist/toggle', {
          method: 'POST',
          headers: { Authorization: `Bearer ${window.localStorage.getItem('visitbd-token') || ''}` },
          body: JSON.stringify({ slug }),
        })
        setWishlist(data.wishlist || [])
      },
      removeWish: async (slug) => {
        if (!isAuthenticated || isHydrating) return
        const data = await apiRequest(`/api/users/me/wishlist/${slug}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${window.localStorage.getItem('visitbd-token') || ''}` },
        })
        setWishlist(data.wishlist || [])
      },
      clearWish: async () => {
        if (!isAuthenticated || isHydrating) return
        const data = await apiRequest('/api/users/me/wishlist', {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${window.localStorage.getItem('visitbd-token') || ''}` },
        })
        setWishlist(data.wishlist || [])
      },
    }
  }, [isAuthenticated, isHydrating, wishlist])

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used inside WishlistProvider')
  }
  return context
}
