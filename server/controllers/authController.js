import { authenticateUser, getCurrentUser } from '../services/authService.js'

export async function login(req, res) {
  try {
    const result = await authenticateUser(req.body || {})
    return res.json(result)
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message })
  }
}

export async function me(req, res) {
  return res.json({ user: getCurrentUser(req.user) })
}