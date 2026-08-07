import { useApiHealth } from '../hooks/useApiHealth'

export function ApiStatus() {
  const { health, isLoading, isError } = useApiHealth()

  if (isLoading) {
    return (
      <div className="api-status">
        <i />
        <span>Connecting...</span>
      </div>
    )
  }

  if (isError || !health) {
    return (
      <div className="api-status api-status-error">
        <i />
        <span>API offline</span>
      </div>
    )
  }

  return (
    <div className="api-status api-status-online">
      <i />
      <span>API online</span>
    </div>
  )
}
