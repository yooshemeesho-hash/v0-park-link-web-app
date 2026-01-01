"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import EditSlotModal from "@/components/modals/edit-slot-modal"
import TimeSlotManager from "@/components/slots/time-slot-manager"

interface SlotsListProps {
  slots: any[]
  onRefresh: () => void
  userId: string
}

export default function SlotsList({ slots, onRefresh, userId }: SlotsListProps) {
  const [editingSlot, setEditingSlot] = useState<any | null>(null)
  const [expandedSlotId, setExpandedSlotId] = useState<string | null>(null)

  const handleDelete = (slotId: string) => {
    if (confirm("Are you sure you want to delete this parking space?")) {
      onRefresh()
    }
  }

  const handleToggleAvailable = (slot: any) => {
    onRefresh()
  }

  return (
    <div className="space-y-4">
      {slots.map((slot) => (
        <Card key={slot.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle>{slot.title}</CardTitle>
                <CardDescription className="mt-2">
                  {slot.location_address} • ${slot.price_per_hour}/hr • {slot.size}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={slot.available ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleToggleAvailable(slot)}
                >
                  {slot.available ? "Available" : "Unavailable"}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {slot.description && <p className="text-sm text-muted-foreground mb-4">{slot.description}</p>}

            <div className="space-y-3">
              <button
                onClick={() => setExpandedSlotId(expandedSlotId === slot.id ? null : slot.id)}
                className="text-sm text-primary hover:underline font-semibold"
              >
                {expandedSlotId === slot.id ? "Hide" : "Manage"} Time Slots
              </button>

              {expandedSlotId === slot.id && <TimeSlotManager slotId={slot.id} userId={userId} onRefresh={onRefresh} />}

              <div className="flex gap-2 pt-2 border-t border-border">
                <Button variant="outline" size="sm" onClick={() => setEditingSlot(slot)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(slot.id)}>
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {editingSlot && (
        <EditSlotModal
          slot={editingSlot}
          onClose={() => setEditingSlot(null)}
          onSuccess={() => {
            setEditingSlot(null)
            onRefresh()
          }}
        />
      )}
    </div>
  )
}
