import { useEffect, useState } from 'react'

interface Countdown {
  days: number
  hours: string
  minutes: string
  seconds: string
}

function calculateCountdown(targetDate: Date): Countdown {
  const difference = targetDate.getTime() - Date.now()

  if (difference <= 0) {
    return {
      days: 0,
      hours: '00',
      minutes: '00',
      seconds: '00',
    }
  }

  const days = Math.floor(difference / 86_400_000)
  const hours = Math.floor((difference % 86_400_000) / 3_600_000)
  const minutes = Math.floor((difference % 3_600_000) / 60_000)
  const seconds = Math.floor((difference % 60_000) / 1_000)

  return {
    days,
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  }
}

export function useCountdown(target: string): Countdown {
  const targetDate = new Date(target)
  const [countdown, setCountdown] = useState(() => calculateCountdown(targetDate))

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCountdown(calculateCountdown(targetDate))
    }, 1_000)

    return () => window.clearInterval(intervalId)
  }, [target])

  return countdown
}
