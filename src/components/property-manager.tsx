// components/property-manager.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Home, Star, MapPin, Users, Wifi, Car, Snowflake, Utensils, AlertTriangle } from "lucide-react"
import { STATUS_COLORS, STATUS_ICONS } from "@/lib/constants"

const propertiesData = [
  {
    id: 'P001',
    name: 'Beach Villa #1',
    type: 'Villa',
    location: 'Bali, Indonesia',
    price: '$240/night',
    status: 'available',
    rating: 4.8,
    bookings: 45,
    capacity: '6 guests',
    bedrooms: 3,
    bathrooms: 2,
    facilities: ['wifi', 'ac', 'parking', 'kitchen'],
    maintenanceNote: ''
  },
  {
    id: 'P002',
    name: 'Mountain Cabin #2',
    type: 'Cabin',
    location: 'Colorado, USA',
    price: '$150/night',
    status: 'occupied',
    rating: 4.6,
    bookings: 32,
    capacity: '4 guests',
    bedrooms: 2,
    bathrooms: 1,
    facilities: ['wifi', 'heating', 'parking'],
    maintenanceNote: ''
  },
  {
    id: 'P003',
    name: 'City Apartment #3',
    type: 'Apartment',
    location: 'Tokyo, Japan',
    price: '$120/night',
    status: 'maintenance',
    rating: 4.9,
    bookings: 67,
    capacity: '2 guests',
    bedrooms: 1,
    bathrooms: 1,
    facilities: ['wifi', 'ac', 'kitchen'],
    maintenanceNote: 'AC repair until Jan 20'
  }
]

const facilityIcons = {
  wifi: Wifi,
  ac: Snowflake,
  heating: Snowflake,
  parking: Car,
  kitchen: Utensils
}

export function PropertyManager() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Properties Management</CardTitle>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Property
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {propertiesData.map((property) => {
            const statusConfig = STATUS_COLORS[property.status as keyof typeof STATUS_COLORS]
            
            return (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {/* Property Image & Status */}
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 relative">
                    {property.status === 'maintenance' && (
                      <div className="absolute inset-0 bg-red-50/80 flex items-center justify-center">
                        <div className="text-center">
                          <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                          <Badge variant="destructive" className="text-sm">
                            Under Maintenance
                          </Badge>
                          {property.maintenanceNote && (
                            <p className="text-xs text-red-600 mt-1 px-2">
                              {property.maintenanceNote}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute top-2 right-2">
                      <Badge className={`${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                        {STATUS_ICONS[property.status as keyof typeof STATUS_ICONS]} {property.status}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Property Details */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg truncate">{property.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Home className="h-3 w-3 mr-1" />
                          {property.type}
                        </div>
                      </div>
                      <div className="flex items-center text-sm ml-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        {property.rating}
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="truncate">{property.location}</span>
                    </div>
                    
                    {/* Capacity & Rooms */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {property.capacity}
                      </div>
                      <div>{property.bedrooms} bed • {property.bathrooms} bath</div>
                    </div>
                    
                    {/* Facilities */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {property.facilities.map((facility) => {
                        const Icon = facilityIcons[facility as keyof typeof facilityIcons]
                        return Icon ? <Icon key={facility} className="h-3 w-3 text-muted-foreground" /> : null
                      })}
                    </div>
                    
                    {/* Footer */}
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">{property.price}</span>
                      <div className="text-right">
                        <div className="text-sm font-semibold">{property.bookings}</div>
                        <div className="text-xs text-muted-foreground">bookings</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}