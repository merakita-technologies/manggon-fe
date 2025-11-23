// hooks/use-mobile.ts
import { useState, useEffect } from 'react'

export function useMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isClient, setIsClient] = useState<boolean>(false)

  useEffect(() => {
    setIsClient(true)
    
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return (): void => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return isMobile && isClient
}

export function useClient(): boolean {
  const [isClient, setIsClient] = useState<boolean>(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}