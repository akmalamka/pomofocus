import { useEffect, useState } from 'react'

function getGreeting(): string {
  const hour = new Date().getHours()

  if (hour < 12)
    return 'Good morning'
  if (hour < 18)
    return 'Good afternoon'
  if (hour < 21)
    return 'Good evening'
  return 'Good night'
}

export function useGreeting() {
  const [greeting, setGreeting] = useState(getGreeting())

  useEffect(() => {
    // Update every minute so it changes when hour shifts
    const interval = setInterval(() => {
      setGreeting(getGreeting())
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return greeting
}
