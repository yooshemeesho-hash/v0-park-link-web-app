"use client"

import Navbar from "@/components/navbar"
import BrowseSlotsClient from "@/components/browse/browse-slots-client"
import { useState } from "react"

export default function BrowsePage() {
  const [userId] = useState("mock-user-id")

  return (
    <>
      <Navbar />
      <div className="flex-1 space-y-6 p-6 md:p-10 max-w-6xl mx-auto w-full">
        <div>
          <h1 className="text-3xl font-bold">Browse Parking Spaces</h1>
          <p className="text-muted-foreground">Find available parking near you</p>
        </div>

        <BrowseSlotsClient userId={userId} seekerId={userId} />
      </div>
    </>
  )
}
