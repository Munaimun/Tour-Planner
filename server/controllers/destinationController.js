import { findDestinationBySlug, listDestinations } from '../services/destinationService.js'

export async function getDestinations(_req, res) {
  return res.json(await listDestinations())
}

export async function getDestinationBySlug(req, res) {
  const destination = await findDestinationBySlug(req.params.slug)

  if (!destination) {
    return res.status(404).json({ message: 'Destination not found' })
  }

  return res.json(destination)
}