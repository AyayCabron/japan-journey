export interface HttpClientOptions {
  baseUrl: string
  getAccessToken?: () => Promise<string | null>
}

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

export function createHttpClient(options: HttpClientOptions) {
  async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const token = options.getAccessToken ? await options.getAccessToken() : null

    const headers = new Headers(init.headers)

    headers.set('Accept', 'application/json')

    if (init.body) {
      headers.set('Content-Type', 'application/json')
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    const response = await fetch(`${options.baseUrl.replace(/\/$/, '')}${path}`, {
      ...init,
      headers,
    })

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as ApiErrorPayload | null

      throw new ApiError(
        payload?.error?.message ?? 'API request failed',
        response.status,
        payload?.error?.code,
      )
    }

    if (response.status === 204) {
      return undefined as T
    }

    return response.json() as Promise<T>
  }

  return {
    get<T>(path: string) {
      return request<T>(path)
    },

    post<T>(path: string, body: unknown) {
      return request<T>(path, {
        method: 'POST',
        body: JSON.stringify(body),
      })
    },

    patch<T>(path: string, body: unknown) {
      return request<T>(path, {
        method: 'PATCH',
        body: JSON.stringify(body),
      })
    },

    delete(path: string) {
      return request<void>(path, {
        method: 'DELETE',
      })
    },
  }
}
