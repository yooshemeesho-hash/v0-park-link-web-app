"use client"

import Navbar from "@/components/navbar"
import MyBookingsList from "@/components/bookings/my-bookings-list"

export default function MyBookingsPage() {
  const userId = "mock-user-id"

  return (
    <>
      <Navbar />
      <div className="flex-1 space-y-6 p-6 md:p-10 max-w-6xl mx-auto w-full">
        <div>
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground">View and manage your parking bookings</p>
        </div>

        <MyBookingsList seekerId={userId} />
      </div>
    </>
  )
}
