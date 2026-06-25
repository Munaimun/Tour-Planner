const DEFAULT_API_BASE = ''

export function getApiBaseUrl() {
  return import.meta.env.VITE_API_URL?.replace(/\/$/, '') || DEFAULT_API_BASE
}

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`)
    error.status = response.status
    throw error
  }

  return response.json()
}