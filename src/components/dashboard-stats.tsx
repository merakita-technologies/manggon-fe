"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, DollarSign, Home, TrendingUp, TrendingDown, Settings, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

interface StatItem {
  label: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: any
  color: string
  visible: boolean
}

export function DashboardStats() {
  const [stats, setStats] = useState<StatItem[]>([
    { 
      label: 'Total Bookings', 
      value: '156', 
      change: '+12%',
      trend: 'up',
      icon: Calendar, 
      color: 'text-blue-500',
      visible: true
    },
    { 
      label: 'Active Guests', 
      value: '42', 
      change: '+5%',
      trend: 'up',
      icon: Users, 
      color: 'text-green-500',
      visible: true
    },
    { 
      label: 'Revenue', 
      value: '$45,230', 
      change: '+18%',
      trend: 'up',
      icon: DollarSign, 
      color: 'text-purple-500',
      visible: true
    },
    { 
      label: 'Occupancy Rate', 
      value: '78%', 
      change: '-2%',
      trend: 'down',
      icon: Home, 
      color: 'text-orange-500',
      visible: true
    },
  ])
  const [customizing, setCustomizing] = useState(false)
  
  const toggleStatVisibility = (index: number) => {
    const newStats = [...stats]
    newStats[index].visible = !newStats[index].visible
    setStats(newStats)
  }

  const visibleStats = stats.filter(stat => stat.visible)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Key Metrics</h2>
          <p className="text-sm text-gray-500 mt-1">Track your property performance</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCustomizing(!customizing)}
          className="flex items-center gap-2 border-gray-300"
        >
          <Settings className="h-4 w-4" />
          Customize
        </Button>
      </div>

      {customizing && (
        <Card className="bg-gray-50/50 border-dashed border-2 border-gray-300">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium mb-4 text-gray-700">Choose metrics to display:</h3>
            <div className="space-y-3">
              {stats.map((stat, index) => (
                <div key={stat.label} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleStatVisibility(index)}
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                  >
                    {stat.visible ? <Eye className="h-4 w-4 text-green-600" /> : <EyeOff className="h-4 w-4 text-gray-400" />}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className={`grid gap-6 ${visibleStats.length <= 2 ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'}`}>
        {visibleStats.map((stat) => (
          <Card key={stat.label} className="card-hover soft-border bg-white/50 shadow-sm hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <div className={`text-xs px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}