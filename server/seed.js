import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { Destination } from './models/Destination.js'

export async function seedDatabase() {
  const filePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/data/destinations.json')
  const rawDestinations = JSON.parse(await readFile(filePath, 'utf8'))
  const count = await Destination.countDocuments()

  if (count > 0) {
    return
  }

  await Destination.insertMany(rawDestinations)
}