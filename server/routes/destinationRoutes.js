import { Router } from 'express'

import { getDestinationBySlug, getDestinations } from '../controllers/destinationController.js'

const router = Router()

router.get('/', getDestinations)
router.get('/:slug', getDestinationBySlug)

export default router