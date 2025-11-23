// components/sidebar.tsx
"use client"

import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { 
  Home, 
  Calendar,
  Users,
  Key,
  BarChart3,
  Settings,
  DollarSign,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: 'Dashboard', icon: BarChart3, current: true },
  { name: 'Bookings', icon: Calendar, current: false },
  { name: 'Properties', icon: Home, current: false },
  { name: 'Guests', icon: Users, current: false },
  { name: 'Check-ins', icon: Key, current: false },
  { name: 'Payments', icon: DollarSign, current: false },
  { name: 'Settings', icon: Settings, current: false },
]

interface SidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  isMobile: boolean
  collapsed: boolean
  onToggleCollapse: () => void
}

export function Sidebar({ open, onOpenChange, isMobile, collapsed, onToggleCollapse }: SidebarProps): JSX.Element {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:flex lg:flex-col bg-card border-r border-border transition-all duration-300 overflow-hidden",
        collapsed ? "w-16" : "w-64"
      )}>
        <div className="flex items-center h-16 px-4 border-b border-border">
          <div className={cn(
            "flex items-center transition-all duration-300",
            collapsed ? "justify-center w-full" : "w-full"
          )}>
            <Home className={cn(
              "text-primary transition-all duration-300",
              collapsed ? "h-6 w-6" : "h-6 w-6 mr-2"
            )} />
            {!collapsed && (
              <h1 className="text-xl font-semibold whitespace-nowrap">StayAdmin</h1>
            )}
          </div>
        </div>
        
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1">
            <nav className="p-4 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  className={cn(
                    "w-full flex items-center rounded-lg transition-colors group relative",
                    "hover:bg-accent hover:text-accent-foreground",
                    item.current 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground',
                    collapsed ? "px-3 py-3 justify-center" : "px-3 py-2"
                  )}
                >
                  <item.icon className={cn(
                    "transition-all duration-300",
                    collapsed ? "h-5 w-5" : "h-4 w-4 mr-3"
                  )} />
                  
                  {!collapsed && (
                    <span className="text-sm font-medium whitespace-nowrap">
                      {item.name}
                    </span>
                  )}

                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                      {item.name}
                    </div>
                  )}
                </button>
              ))}
            </nav>

            {!collapsed && (
              <div className="p-4 border-t border-border">
                <h3 className="text-sm font-semibold mb-3">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Today's Check-ins</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Occupancy</span>
                    <span className="font-semibold text-green-600">78%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Revenue</span>
                    <span className="font-semibold">$12,450</span>
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>

          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className={cn(
                "w-full justify-start transition-all duration-300",
                collapsed ? "px-3 justify-center" : "px-3"
              )}
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <>
                  <ChevronLeft className="h-4 w-4 mr-3" />
                  <span className="text-sm">Collapse</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="w-80 p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between h-16 px-4 border-b border-border">
              <div className="flex items-center">
                <Home className="h-6 w-6 mr-2 text-primary" />
                <h1 className="text-xl font-semibold">StayAdmin</h1>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <ScrollArea className="flex-1">
              <nav className="p-4 space-y-2">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    className={cn(
                      "w-full flex items-center px-3 py-4 text-base font-medium rounded-lg transition-colors",
                      item.current 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                    onClick={() => onOpenChange(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </button>
                ))}
              </nav>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}