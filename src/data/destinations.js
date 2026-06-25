import rawDestinations from './destinations.json'
import { normalizeDestinationImages } from './destinationImages'

const destinations = rawDestinations.map(normalizeDestination)

export default destinations

function normalizeDestination(destination) {
  const placePool = new Map()
  const normalizedDestination = normalizeDestinationImages(destination)

  const keyPlaces = normalizedDestination.keyPlaces?.map((place) => registerPlace(placePool, place)) ?? []

  return {
    ...normalizedDestination,
    keyPlaces,
    packages: normalizedDestination.packages?.map((pkg) => ({
      ...pkg,
      days: pkg.days?.map((day) => ({
        ...day,
        slots: day.slots?.map((slot) => normalizeSlot(slot, placePool)) ?? [],
      })) ?? [],
    })) ?? [],
  }
}

function normalizeSlot(slot, placePool) {
  if (slot?.placeKey) {
    const resolvedPlace = placePool.get(slot.placeKey)

    if (!resolvedPlace) {
      return slot
    }

    return {
      ...slot,
      place: resolvedPlace,
    }
  }

  if (!slot?.place) {
    return slot
  }

  const canonicalPlace = registerPlace(placePool, slot.place)
  const overrides = getOverrides(canonicalPlace, slot.place)

  return {
    ...slot,
    place: canonicalPlace,
    ...(overrides ? { placeOverrides: overrides } : {}),
  }
}

function registerPlace(placePool, place) {
  const key = place.key || getPlaceKey(place)
  const existing = placePool.get(key)

  if (existing) {
    return existing
  }

  if (!place.key) {
    place.key = key
  }

  placePool.set(key, place)
  return place
}

function getOverrides(canonicalPlace, place) {
  const overrides = Object.fromEntries(
    Object.entries(place).filter(([key, value]) => {
      if (key === 'coordinates') {
        return JSON.stringify(value) !== JSON.stringify(canonicalPlace.coordinates)
      }

      return value !== canonicalPlace[key]
    }),
  )

  return Object.keys(overrides).length ? overrides : null
}

function getPlaceKey(place) {
  const lat = place.coordinates?.lat ?? ''
  const lng = place.coordinates?.lng ?? ''
  return `${place.name}::${lat}::${lng}`
}