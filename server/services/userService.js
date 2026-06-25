import { User } from '../models/User.js'

export async function getWishlist(userId) {
  const user = await User.findById(userId).lean()
  return user?.wishlist || []
}

export async function toggleWishlistItem(userId, slug) {
  if (!slug) {
    const error = new Error('Slug is required.')
    error.statusCode = 400
    throw error
  }

  const user = await User.findById(userId)
  const wishlist = new Set(user.wishlist || [])

  if (wishlist.has(slug)) {
    wishlist.delete(slug)
  } else {
    wishlist.add(slug)
  }

  user.wishlist = Array.from(wishlist)
  await user.save()
  return user.wishlist
}

export async function removeWishlistItem(userId, slug) {
  const user = await User.findById(userId)
  user.wishlist = (user.wishlist || []).filter((item) => item !== slug)
  await user.save()
  return user.wishlist
}

export async function clearWishlist(userId) {
  const user = await User.findById(userId)
  user.wishlist = []
  await user.save()
  return []
}