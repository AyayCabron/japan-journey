import { apiConfig } from './apiConfig'

interface ApiErrorPayload {
  error?: {
    code?: string
    message?: string
  }
}

export class ApiError extends Error {
  status: number
  code?: string

  constructor(message: string, status: number, code?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${apiConfig.baseUrl}${path}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as ApiErrorPayload | null

    throw new ApiError(
      payload?.error?.message ?? 'API request failed',
      response.status,
      payload?.error?.code,
    )
  }

  return response.json() as Promise<T>
}
