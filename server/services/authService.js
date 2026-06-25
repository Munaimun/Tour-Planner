import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { User } from '../models/User.js'

function createToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

function sanitizeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    joinedAt: user.joinedAt,
    wishlist: user.wishlist || [],
  }
}

export async function authenticateUser({ name, email, password }) {
  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    const error = new Error('Name, email, and password are required.')
    error.statusCode = 400
    throw error
  }

  const normalizedEmail = email.trim().toLowerCase()
  const passwordHash = await bcrypt.hash(password, 10)
  let user = await User.findOne({ email: normalizedEmail })

  if (user) {
    const passwordMatches = await bcrypt.compare(password, user.passwordHash)

    if (!passwordMatches) {
      const error = new Error('Invalid email or password.')
      error.statusCode = 401
      throw error
    }

    user.name = name.trim()
    user.passwordHash = passwordHash
    await user.save()
  } else {
    user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
    })
  }

  const token = createToken(user._id)
  return { token, user: sanitizeUser(user) }
}

export function getCurrentUser(user) {
  return sanitizeUser(user)
}