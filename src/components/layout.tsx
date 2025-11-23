// components/layout.tsx
"use client"

import { useState, useEffect } from 'react'
import { Sidebar } from './sidebar'
import { Topbar } from './topbar'
import { OfflineIndicator } from './offline-indicator'
import { PWAInstallPrompt } from './pwa-install-prompt'
import { cn } from '@/lib/utils'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isClient, setIsClient] = useState<boolean>(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false)

  useEffect(() => {
    setIsClient(true)
    
    const checkMobile = (): void => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) {
        setSidebarCollapsed(true)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return (): void => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const toggleSidebar = (): void => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  if (!isClient) {
    return (
      <div className="flex h-screen bg-background">
        <div className="flex-1 flex flex-col min-w-0 w-full">
          <div className="h-16 border-b border-border bg-card" />
          <main className="flex-1 overflow-auto p-6 w-full">
            {children}
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background w-full">
      <Sidebar 
        open={sidebarOpen} 
        onOpenChange={setSidebarOpen} 
        isMobile={isMobile}
        collapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
      />
      
      <div className={cn(
        "flex-1 flex flex-col min-w-0 transition-all duration-300"
      )}>
        {/* !sidebarCollapsed && !isMobile ? 'lg:ml-64' : 'lg:ml-16' */}
        <Topbar 
          onMenuClick={() => setSidebarOpen(true)} 
          isMobile={isMobile}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={toggleSidebar}
        />
        <main className="flex-1 overflow-auto p-4 md:p-6 w-full">
          <div className="w-full max-w-full">
            {children}
          </div>
        </main>
      </div>

      <OfflineIndicator />
      <PWAInstallPrompt />
    </div>
  )
}