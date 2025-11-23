import { useState, useEffect } from 'react'

export function useOffline(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(true)
  const [isClient, setIsClient] = useState<boolean>(false)

  useEffect(() => {
    setIsClient(true)
    
    const handleOnline = (): void => setIsOnline(true)
    const handleOffline = (): void => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return (): void => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Return true during SSR to avoid layout shifts
  return isClient ? isOnline : true
}