"use client"

import OwnerDashboard from "@/components/dashboards/owner-dashboard"
import SeekerDashboard from "@/components/dashboards/seeker-dashboard"
import { useState, useEffect } from "react"

export default function DashboardPage() {
  const [userType, setUserType] = useState<"owner" | "seeker" | null>(null)
  const [userId, setUserId] = useState<string>("")

  useEffect(() => {
    setUserType("owner")
    setUserId("demo-user-123")
  }, [])

  if (!userType) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (userType === "owner") {
    return <OwnerDashboard userId={userId} />
  }

  return <SeekerDashboard userId={userId} />
}
