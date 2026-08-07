import { apiGet } from './apiClient'

export interface HealthResponse {
  data: {
    service: string
    status: string
    environment: string
    timestamp: string
  }
}

export function getApiHealth(): Promise<HealthResponse> {
  return apiGet<HealthResponse>('/api/v1/health')
}
