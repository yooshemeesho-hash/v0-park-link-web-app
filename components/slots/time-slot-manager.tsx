"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

interface TimeSlotManagerProps {
  slotId: string
  userId: string
  onRefresh: () => void
}

export default function TimeSlotManager({ slotId, userId, onRefresh }: TimeSlotManagerProps) {
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAddSlot = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!startTime || !endTime) {
        alert("Please fill in both start and end times")
        setIsLoading(false)
        return
      }

      // Mock success
      setTimeout(() => {
        setStartTime("")
        setEndTime("")
        onRefresh()
        setIsLoading(false)
      }, 500)
    } catch (error) {
      console.error("Error adding slot:", error)
      alert("Failed to add time slot")
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-muted">
      <CardContent className="p-4">
        <form onSubmit={handleAddSlot} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-1">
              <Label htmlFor="startTime" className="text-xs">
                Start Time
              </Label>
              <Input
                id="startTime"
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="endTime" className="text-xs">
                End Time
              </Label>
              <Input
                id="endTime"
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>
          <Button type="submit" size="sm" className="w-full" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Time Slot"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
