"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface NotificationBellProps {
  userId: string
}

export default function NotificationBell({ userId }: NotificationBellProps) {
  const [unreadCount] = useState(0)

  return (
    <Link href="/notifications">
      <Button variant="ghost" size="icon" className="relative">
        <span className="text-xl">🔔</span>
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-destructive rounded-full w-5 h-5 flex items-center justify-center p-0 text-xs">
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>
    </Link>
  )
}
