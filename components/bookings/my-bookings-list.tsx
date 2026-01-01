"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface MyBookingsListProps {
  seekerId: string
}

export default function MyBookingsList({ seekerId }: MyBookingsListProps) {
  const [bookings] = useState<any[]>([])
  const [isLoading] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "accepted":
        return "bg-blue-500"
      case "completed":
        return "bg-green-500"
      case "rejected":
      case "cancelled":
        return "bg-destructive"
      default:
        return "bg-gray-500"
    }
  }

  const pendingBookings = bookings.filter((b) => b.status === "pending")
  const activeBookings = bookings.filter((b) => b.status === "accepted")
  const completedBookings = bookings.filter((b) => ["completed", "rejected", "cancelled"].includes(b.status))

  return (
    <Tabs defaultValue="pending" className="w-full">
      <TabsList>
        <TabsTrigger value="pending">Pending ({pendingBookings.length})</TabsTrigger>
        <TabsTrigger value="active">Active ({activeBookings.length})</TabsTrigger>
        <TabsTrigger value="completed">History ({completedBookings.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="pending" className="space-y-4">
        {isLoading ? (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">Loading bookings...</CardContent>
          </Card>
        ) : pendingBookings.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">No pending bookings</CardContent>
          </Card>
        ) : (
          pendingBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} getStatusColor={getStatusColor} />
          ))
        )}
      </TabsContent>

      <TabsContent value="active" className="space-y-4">
        {activeBookings.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">No active bookings</CardContent>
          </Card>
        ) : (
          activeBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} getStatusColor={getStatusColor} />
          ))
        )}
      </TabsContent>

      <TabsContent value="completed" className="space-y-4">
        {completedBookings.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">No booking history</CardContent>
          </Card>
        ) : (
          completedBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} getStatusColor={getStatusColor} />
          ))
        )}
      </TabsContent>
    </Tabs>
  )
}

function BookingCard({ booking, getStatusColor }: { booking: any; getStatusColor: any }) {
  const startTime = new Date(booking.slot_instance.start_time)
  const endTime = new Date(booking.slot_instance.end_time)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{booking.slot_instance.parking_slots.title}</CardTitle>
            <CardDescription className="mt-2">{booking.slot_instance.parking_slots.location_address}</CardDescription>
          </div>
          <Badge className={getStatusColor(booking.status)}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Start</p>
            <p className="font-semibold">{startTime.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">End</p>
            <p className="font-semibold">{endTime.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Vehicle</p>
            <p className="font-semibold">{booking.vehicle_info || "Not provided"}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Total Price</p>
            <p className="font-semibold">${booking.total_price?.toFixed(2) || "0.00"}</p>
          </div>
        </div>

        {booking.notes && (
          <div>
            <p className="text-muted-foreground text-sm">Notes</p>
            <p className="text-sm">{booking.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
