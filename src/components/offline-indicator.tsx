"use client"

import { useOffline } from '@/hooks/use-offline'
import { Badge } from '@/components/ui/badge'
import { WifiOff } from 'lucide-react'

export function OfflineIndicator(): JSX.Element | null {
  const isOnline = useOffline()

  if (isOnline) return null

  return (
    <Badge variant="destructive" className="fixed top-4 right-4 z-50">
      <WifiOff className="h-3 w-3 mr-1" />
      Offline Mode
    </Badge>
  )
}