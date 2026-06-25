import mongoose from 'mongoose'

const destinationSchema = new mongoose.Schema({}, { strict: false, timestamps: true })

export const Destination = mongoose.model('Destination', destinationSchema)