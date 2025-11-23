import { useState, useEffect } from 'react'
import type { BeforeInstallPromptEvent } from '@/types/pwa'

interface UsePWAInstallReturn {
  canInstall: boolean
  install: () => Promise<void>
}

export function usePWAInstall(): UsePWAInstallReturn {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent): void => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return (): void => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const install = async (): Promise<void> => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null)
    }
  }

  return {
    canInstall: !!deferredPrompt,
    install,
  }
}