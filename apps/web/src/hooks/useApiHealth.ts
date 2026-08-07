import { useEffect, useState } from 'react'
import { getApiHealth, type HealthResponse } from '../services/healthService'

interface ApiHealthState {
  health: HealthResponse['data'] | null
  isLoading: boolean
  isError: boolean
}

export function useApiHealth(): ApiHealthState {
  const [health, setHealth] = useState<HealthResponse['data'] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadHealth() {
      try {
        const response = await getApiHealth()

        if (isMounted) {
          setHealth(response.data)
          setIsError(false)
        }
      } catch {
        if (isMounted) {
          setIsError(true)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadHealth()

    return () => {
      isMounted = false
    }
  }, [])

  return {
    health,
    isLoading,
    isError,
  }
}
