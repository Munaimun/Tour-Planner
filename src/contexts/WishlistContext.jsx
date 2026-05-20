/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'visitbd-wishlist'
const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist))
  }, [wishlist])

  const value = useMemo(() => {
    const ids = new Set(wishlist)
    return {
      wishlist,
      isSaved: (slug) => ids.has(slug),
      toggleWish: (slug) =>
        setWishlist((prev) =>
          prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug],
        ),
      removeWish: (slug) => setWishlist((prev) => prev.filter((item) => item !== slug)),
      clearWish: () => setWishlist([]),
    }
  }, [wishlist])

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used inside WishlistProvider')
  }
  return context
}
