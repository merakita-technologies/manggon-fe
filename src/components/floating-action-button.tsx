"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function FloatingActionButton() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!isMobile) return null

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            size="lg" 
            className="rounded-full w-14 h-14 shadow-lg bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 mb-2">
          <DropdownMenuItem className="flex items-center gap-2 text-base py-3">
            📅 New Booking
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 text-base py-3">
            🏠 Add Property
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 text-base py-3">
            👥 Add Guest
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}