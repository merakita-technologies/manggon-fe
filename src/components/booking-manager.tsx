"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, CheckCircle, XCircle, Plus, Calendar, User, Home, Download } from "lucide-react"
import { STATUS_COLORS, STATUS_ICONS } from "@/lib/constants"

const bookingsData = [
  {
    id: 'BK001',
    guest: 'John Smith',
    property: 'Beach Villa #1',
    checkIn: '2024-01-15',
    checkOut: '2024-01-20',
    status: 'confirmed',
    amount: '$1,200',
    nights: 5
  },
  {
    id: 'BK002',
    guest: 'Sarah Johnson',
    property: 'Mountain Cabin #2',
    checkIn: '2024-01-16',
    checkOut: '2024-01-18',
    status: 'pending',
    amount: '$450',
    nights: 2
  },
  {
    id: 'BK003',
    guest: 'Mike Wilson',
    property: 'City Apartment #3',
    checkIn: '2024-01-14',
    checkOut: '2024-01-17',
    status: 'checked-in',
    amount: '$900',
    nights: 3
  }
]

const statusColors = {
  confirmed: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  'checked-in': 'bg-blue-100 text-blue-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800'
}
export function BookingManager() {
  const [bookings, setBookings] = useState(bookingsData)

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-xl">Bookings</CardTitle>
          <div className="flex items-center gap-2">
            <Button size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4" />
              New Booking
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="all" className="text-sm py-2">All</TabsTrigger>
            <TabsTrigger value="upcoming" className="text-sm py-2">Upcoming</TabsTrigger>
            <TabsTrigger value="current" className="text-sm py-2">Current</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">Guest</TableHead>
                    <TableHead className="text-left">Property</TableHead>
                    <TableHead className="text-left">Check-in</TableHead>
                    <TableHead className="text-left">Check-out</TableHead>
                    <TableHead className="text-left">Amount</TableHead>
                    <TableHead className="text-left">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => {
                    const statusConfig = STATUS_COLORS[booking.status as keyof typeof STATUS_COLORS]
                    
                    return (
                      <TableRow key={booking.id} className="group hover:bg-muted/50">
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-semibold">{booking.guest}</div>
                            <div className="text-sm text-muted-foreground">{booking.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>{booking.property}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            {booking.checkIn}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            {booking.checkOut}
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">{booking.amount}</TableCell>
                        <TableCell>
                          <Badge className={`${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                            {STATUS_ICONS[booking.status as keyof typeof STATUS_ICONS]} {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4" />
                                  Confirm Booking
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <XCircle className="h-4 w-4" />
                                  Cancel Booking
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}