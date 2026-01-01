"use client"

import Navbar from "@/components/navbar"
import ProfileClient from "@/components/profile/profile-client"
import { useState, useEffect } from "react"

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null)
  const [userId, setUserId] = useState<string>("")

  useEffect(() => {
    setUserId("demo-user-123")
    setProfile({
      id: "demo-user-123",
      display_name: "John Doe",
      phone_number: "+1 234 567 8900",
      bio: "Parking owner in downtown",
      user_type: "owner",
    })
  }, [])

  if (!profile) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <>
      <Navbar />
      <div className="flex-1 space-y-6 p-6 md:p-10 max-w-2xl mx-auto w-full">
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account information</p>
        </div>

        <ProfileClient userId={userId} initialProfile={profile} />
      </div>
    </>
  )
}
