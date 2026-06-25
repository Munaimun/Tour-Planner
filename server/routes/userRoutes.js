import { Router } from 'express'

import { clearWishlist, getWishlist, removeWishlistItem, toggleWishlist } from '../controllers/userController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/me/wishlist', requireAuth, getWishlist)
router.post('/me/wishlist/toggle', requireAuth, toggleWishlist)
router.delete('/me/wishlist', requireAuth, clearWishlist)
router.delete('/me/wishlist/:slug', requireAuth, removeWishlistItem)

export default router