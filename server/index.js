import dotenv from 'dotenv'
import mongoose from 'mongoose'

import app from './app.js'
import { connectDatabase } from './config/db.js'
import { seedDatabase } from './seed.js'

dotenv.config()

const port = process.env.PORT || 5000

async function start() {
  await connectDatabase(process.env.MONGODB_URI)
  await seedDatabase()

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })
}

start().catch((error) => {
  console.error(error)
  mongoose.connection.close().finally(() => process.exit(1))
})