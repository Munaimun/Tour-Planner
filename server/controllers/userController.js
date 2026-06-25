import {
  clearWishlist as clearWishlistService,
  getWishlist as getWishlistService,
  removeWishlistItem as removeWishlistItemService,
  toggleWishlistItem as toggleWishlistItemService,
} from '../services/userService.js'

export async function getWishlist(req, res) {
  return res.json({ wishlist: await getWishlistService(req.user.id) })
}

export async function toggleWishlist(req, res) {
  return res.json({ wishlist: await toggleWishlistItemService(req.user.id, req.body?.slug) })
}

export async function removeWishlistItem(req, res) {
  return res.json({ wishlist: await removeWishlistItemService(req.user.id, req.params.slug) })
}

export async function clearWishlist(req, res) {
  return res.json({ wishlist: await clearWishlistService(req.user.id) })
}