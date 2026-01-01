"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import BookingModal from "@/components/modals/booking-modal"

interface SlotCardProps {
  slot: any
  seekerId: string
  onBookingSuccess: () => void
}

export default function SlotCard({ slot, seekerId, onBookingSuccess }: SlotCardProps) {
  const [showBookingModal, setShowBookingModal] = useState(false)

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>{slot.title}</CardTitle>
          <CardDescription className="text-base">${slot.price_per_hour.toFixed(2)}/hr</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">📍 {slot.location_address}</p>
            <p className="text-muted-foreground">
              Size: <span className="font-semibold text-foreground capitalize">{slot.size}</span>
            </p>
          </div>

          {slot.description && <p className="text-sm text-muted-foreground">{slot.description}</p>}

          <div className="flex gap-2 pt-2">
            <Button className="flex-1" onClick={() => setShowBookingModal(true)}>
              Book Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {showBookingModal && (
        <BookingModal
          slot={slot}
          seekerId={seekerId}
          onClose={() => setShowBookingModal(false)}
          onSuccess={() => {
            setShowBookingModal(false)
            onBookingSuccess()
          }}
        />
      )}
    </>
  )
}
