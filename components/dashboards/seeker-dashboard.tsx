"use client"

import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SeekerDashboardProps {
  userId: string
}

export default function SeekerDashboard({ userId }: SeekerDashboardProps) {
  const router = useRouter()

  return (
    <>
      <Navbar />
      <div className="flex-1 space-y-6 p-6 md:p-10 max-w-6xl mx-auto w-full">
        <div>
          <h1 className="text-3xl font-bold">Seeker Dashboard</h1>
          <p className="text-muted-foreground">Find and book parking spaces near you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Browse Spaces</CardTitle>
              <CardDescription>Search and discover available parking spaces</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push("/browse")} className="w-full">
                Start Browsing
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Bookings</CardTitle>
              <CardDescription>View your current and past bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push("/my-bookings")} variant="outline" className="w-full">
                View Bookings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
