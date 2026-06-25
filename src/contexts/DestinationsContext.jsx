/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import fallbackDestinations from '../data/destinations'
import { normalizeDestinationImages } from '../data/destinationImages'
import { apiRequest } from '../lib/api'

const DestinationsContext = createContext(null)

export function DestinationsProvider({ children }) {
  const [destinations, setDestinations] = useState(fallbackDestinations)

  useEffect(() => {
    let isMounted = true

    apiRequest('/api/destinations')
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length) {
          setDestinations(data.map((destination) => normalizeDestinationImages(destination)))
        }
      })
      .catch(() => {
        if (isMounted) {
          setDestinations(fallbackDestinations)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const value = useMemo(
    () => ({
      destinations,
      getDestination: (slug) => destinations.find((destination) => destination.slug === slug),
    }),
    [destinations],
  )

  return <DestinationsContext.Provider value={value}>{children}</DestinationsContext.Provider>
}

export function useDestinations() {
  const context = useContext(DestinationsContext)
  if (!context) {
    throw new Error('useDestinations must be used inside DestinationsProvider')
  }
  return context
}