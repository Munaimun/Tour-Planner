import { Destination } from '../models/Destination.js'

export async function listDestinations() {
  return Destination.find({}).lean()
}

export async function findDestinationBySlug(slug) {
  return Destination.findOne({ slug }).lean()
}