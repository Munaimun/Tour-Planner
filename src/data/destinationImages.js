import bandarbanImg from '../img/Bandarban.jpg'
import coxImg from '../img/cox.jpg'
import dhakaImg from '../img/lalbag.jpg'
import sajekImg from '../img/sajek.jpeg'
import shundorbanImg from '../img/shundorban.jpg'
import sylhetImg from '../img/sylhet.jpg'
import tangurImg from '../img/tangur.jpg'
import kanchonImg from '../img/kanchon.jpg'

const destinationPools = {
  sylhet: [sylhetImg, tangurImg, dhakaImg, shundorbanImg],
  'coxs-bazar': [coxImg, shundorbanImg, tangurImg, dhakaImg],
  sundarbans: [shundorbanImg, tangurImg, coxImg, dhakaImg],
  dhaka: [dhakaImg, kanchonImg, coxImg, tangurImg],
  chittagong: [coxImg, dhakaImg, bandarbanImg, tangurImg],
  bandarban: [bandarbanImg, sajekImg, kanchonImg, dhakaImg],
  rajshahi: [kanchonImg, dhakaImg, tangurImg, sylhetImg],
  sreemangal: [sylhetImg, tangurImg, dhakaImg, coxImg],
}

const defaultPool = [sylhetImg, coxImg, dhakaImg, tangurImg, bandarbanImg, shundorbanImg, kanchonImg, sajekImg]

export function normalizeDestinationImages(destination) {
  const pool = destinationPools[destination.slug] || defaultPool

  return {
    ...destination,
    heroImage: pickImage(pool, destination.slug, destination.name, 0),
    bannerImage: pickImage(pool, destination.slug, destination.name, 1),
    keyPlaces: destination.keyPlaces?.map((place, index) => normalizePlaceImages(place, pool, index)) ?? [],
    packages:
      destination.packages?.map((pkg) => ({
        ...pkg,
        days:
          pkg.days?.map((day) => ({
            ...day,
            slots: day.slots?.map((slot, index) => ({
              ...slot,
              place: slot.place ? normalizePlaceImages(slot.place, pool, index) : slot.place,
            })) ?? [],
          })) ?? [],
      })) ?? [],
  }
}

function normalizePlaceImages(place, pool, index) {
  return {
    ...place,
    image: pickImage(pool, place.key || place.name, place.description || place.name, index),
  }
}

function pickImage(pool, primaryKey, secondaryKey, index) {
  const seed = hashString(`${primaryKey}::${secondaryKey}`)
  return pool[(seed + index) % pool.length]
}

function hashString(value) {
  let hash = 0
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index)
    hash |= 0
  }
  return Math.abs(hash)
}