"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface NotificationsClientProps {
  userId: string
}

export default function NotificationsClient({ userId }: NotificationsClientProps) {
  const [notifications] = useState<any[]>([])
  const [isLoading] = useState(false)
  const [unreadCount] = useState(0)

  const handleMarkAsRead = (notificationId: string) => {
    // Mock implementation
  }

  const handleMarkAllAsRead = () => {
    // Mock implementation
  }

  const handleDelete = (notificationId: string) => {
    // Mock implementation
  }

  const handleDeleteAll = () => {
    // Mock implementation
  }

  const unreadNotifications = notifications.filter((n) => !n.is_read)
  const readNotifications = notifications.filter((n) => n.is_read)

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "booking_request":
        return "📋"
      case "booking_accepted":
        return "✅"
      case "booking_rejected":
        return "❌"
      case "booking_completed":
        return "🎉"
      default:
        return "🔔"
    }
  }

  const getNotificationDescription = (type: string) => {
    switch (type) {
      case "booking_request":
        return "New booking request"
      case "booking_accepted":
        return "Booking accepted"
      case "booking_rejected":
        return "Booking rejected"
      case "booking_completed":
        return "Booking completed"
      default:
        return "Notification"
    }
  }

  return (
    <Tabs defaultValue="unread" className="w-full">
      <TabsList>
        <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
        <TabsTrigger value="read">Read</TabsTrigger>
      </TabsList>

      <TabsContent value="unread" className="space-y-4">
        {isLoading ? (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">Loading notifications...</CardContent>
          </Card>
        ) : unreadNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">No unread notifications</CardContent>
          </Card>
        ) : (
          <>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
                Mark all as read
              </Button>
            </div>
            {unreadNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
                getNotificationIcon={getNotificationIcon}
                getNotificationDescription={getNotificationDescription}
              />
            ))}
          </>
        )}
      </TabsContent>

      <TabsContent value="read" className="space-y-4">
        {readNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">No read notifications</CardContent>
          </Card>
        ) : (
          <>
            <div className="flex gap-2 justify-end">
              <Button variant="destructive" size="sm" onClick={handleDeleteAll}>
                Delete all
              </Button>
            </div>
            {readNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
                getNotificationIcon={getNotificationIcon}
                getNotificationDescription={getNotificationDescription}
              />
            ))}
          </>
        )}
      </TabsContent>
    </Tabs>
  )
}

function NotificationCard({
  notification,
  onMarkAsRead,
  onDelete,
  getNotificationIcon,
  getNotificationDescription,
}: any) {
  const createdAt = new Date(notification.created_at)
  const timeAgo = getTimeAgo(createdAt)

  return (
    <Card className={notification.is_read ? "" : "border-primary"}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{notification.title}</h3>
                  {!notification.is_read && <Badge className="bg-primary">New</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">
                  {getNotificationDescription(notification.type)} • {timeAgo}
                </p>
              </div>
            </div>
            {notification.message && <p className="text-sm mt-2 ml-11">{notification.message}</p>}
          </div>

          <div className="flex gap-2">
            {!notification.is_read && (
              <Button variant="outline" size="sm" onClick={() => onMarkAsRead(notification.id)}>
                Mark as read
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => onDelete(notification.id)}>
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) return "just now"
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`

  return date.toLocaleDateString()
}
