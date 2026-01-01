"use client"

import Navbar from "@/components/navbar"
import NotificationsClient from "@/components/notifications/notifications-client"

export default function NotificationsPage() {
  const userId = "mock-user-id"

  return (
    <>
      <Navbar />
      <div className="flex-1 space-y-6 p-6 md:p-10 max-w-4xl mx-auto w-full">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Stay updated on your bookings and requests</p>
        </div>

        <NotificationsClient userId={userId} />
      </div>
    </>
  )
}
