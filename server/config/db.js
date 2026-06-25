import mongoose from 'mongoose'

export async function connectDatabase(uri) {
  const mongoUrl = uri || 'mongodb://127.0.0.1:27017/viewfinder'
  await mongoose.connect(mongoUrl)
  return mongoose.connection
}