// components/install-button.tsx
"use client"

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { usePWAInstall } from '@/hooks/use-pwa-install'

interface InstallButtonProps {
  isMobile?: boolean
}

export function InstallButton({ isMobile = false }): JSX.Element | null {
  const { canInstall, install } = usePWAInstall()

  if (!canInstall) return null

  return (
    <Button 
      onClick={install} 
      variant="outline" 
      size={isMobile ? "icon" : "sm"}
      className="touch-manipulation"
    >
      <Download className="h-4 w-4" />
      {!isMobile && <span className="ml-2">Install</span>}
    </Button>
  )
}