"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import CreateSlotModal from "@/components/modals/create-slot-modal"
import SlotsList from "@/components/slots/slots-list"
import BookingRequestsList from "@/components/bookings/booking-requests-list"

interface OwnerDashboardProps {
  userId: string
}

export default function OwnerDashboard({ userId }: OwnerDashboardProps) {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [slots, setSlots] = useState<any[]>([])
  const [bookingRequests] = useState<any[]>([])

  const handleSlotCreated = (newSlot: any) => {
    setSlots((prevSlots) => [...prevSlots, newSlot])
    setShowCreateModal(false)
  }

  return (
    <>
      <Navbar />
      <div className="flex-1 space-y-6 p-6 md:p-10 max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Owner Dashboard</h1>
            <p className="text-muted-foreground">Manage your parking spaces and bookings</p>
          </div>
          <Button onClick={() => setShowCreateModal(true)} size="lg">
            Add Parking Space
          </Button>
        </div>

        <Tabs defaultValue="slots" className="w-full">
          <TabsList>
            <TabsTrigger value="slots">My Spaces</TabsTrigger>
            <TabsTrigger value="requests">
              Booking Requests
              {bookingRequests.length > 0 && (
                <span className="ml-2 bg-destructive text-white rounded-full px-2 py-0.5 text-xs">
                  {bookingRequests.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="slots" className="space-y-4">
            {slots.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground mb-4">No parking spaces yet</p>
                  <Button onClick={() => setShowCreateModal(true)}>Create Your First Space</Button>
                </CardContent>
              </Card>
            ) : (
              <SlotsList slots={slots} onRefresh={() => {}} userId={userId} />
            )}
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            {bookingRequests.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center text-muted-foreground">
                  No pending booking requests
                </CardContent>
              </Card>
            ) : (
              <BookingRequestsList requests={bookingRequests} onRefresh={() => {}} />
            )}
          </TabsContent>
        </Tabs>
      </div>

      {showCreateModal && (
        <CreateSlotModal onClose={() => setShowCreateModal(false)} onSuccess={handleSlotCreated} userId={userId} />
      )}
    </>
  )
}
