"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface BookingRequestsListProps {
  requests: any[]
  onRefresh: () => void
}

export default function BookingRequestsList({ requests, onRefresh }: BookingRequestsListProps) {
  const [processingId, setProcessingId] = useState<string | null>(null)

  const handleAccept = async (bookingId: string, seekerId: string) => {
    setProcessingId(bookingId)

    // Mock API call
    setTimeout(() => {
      onRefresh()
      setProcessingId(null)
    }, 500)
  }

  const handleReject = async (bookingId: string, seekerId: string) => {
    setProcessingId(bookingId)

    // Mock API call
    setTimeout(() => {
      onRefresh()
      setProcessingId(null)
    }, 500)
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <Card key={request.id}>
          <CardHeader>
            <CardTitle className="text-lg">New Booking Request</CardTitle>
            <CardDescription>{request.slot_instance?.parking_slots?.title}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Location</p>
                <p className="font-semibold">{request.slot_instance?.parking_slots?.location_address}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Vehicle</p>
                <p className="font-semibold">{request.vehicle_info || "Not provided"}</p>
              </div>
            </div>

            {request.notes && (
              <div>
                <p className="text-muted-foreground text-sm">Notes</p>
                <p className="text-sm">{request.notes}</p>
              </div>
            )}

            <div className="flex gap-2 pt-2 border-t border-border">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => handleReject(request.id, request.seeker_id)}
                disabled={processingId === request.id}
              >
                Reject
              </Button>
              <Button
                className="flex-1"
                onClick={() => handleAccept(request.id, request.seeker_id)}
                disabled={processingId === request.id}
              >
                {processingId === request.id ? "Processing..." : "Accept"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
