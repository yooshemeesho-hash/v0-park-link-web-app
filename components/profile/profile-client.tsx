"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface ProfileClientProps {
  userId: string
  initialProfile: any
}

export default function ProfileClient({ userId, initialProfile }: ProfileClientProps) {
  const [profile, setProfile] = useState(initialProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    display_name: profile.display_name || "",
    phone_number: profile.phone_number || "",
    bio: profile.bio || "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)
    setSuccess(false)

    try {
      setProfile({
        ...profile,
        ...formData,
      })
      setIsEditing(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      display_name: profile.display_name || "",
      phone_number: profile.phone_number || "",
      bio: profile.bio || "",
    })
    setIsEditing(false)
    setError(null)
  }

  return (
    <Tabs defaultValue="general" className="w-full space-y-6">
      <TabsList>
        <TabsTrigger value="general">General Info</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </div>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                Edit
              </Button>
            )}
          </CardHeader>

          <CardContent className="space-y-4">
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-800 p-3 rounded-md text-sm">
                Profile updated successfully!
              </div>
            )}

            {error && (
              <div className="bg-destructive/10 border border-destructive text-destructive p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {isEditing ? (
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    name="display_name"
                    value={formData.display_name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone_number"
                    type="tel"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button onClick={handleCancel} variant="outline" className="flex-1 bg-transparent">
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={isSaving} className="flex-1">
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">Display Name</Label>
                  <p className="font-semibold">{profile.display_name || "Not set"}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-semibold">{profile.email}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Phone Number</Label>
                  <p className="font-semibold">{profile.phone_number || "Not set"}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Bio</Label>
                  <p className="font-semibold text-sm">{profile.bio || "No bio added"}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Account Type</Label>
                  <div className="mt-1">
                    <Badge>{profile.user_type === "owner" ? "🏢 Parking Owner" : "🚗 Space Seeker"}</Badge>
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground">Member Since</Label>
                  <p className="font-semibold text-sm">{new Date(profile.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {profile.user_type === "owner" && (
          <Card>
            <CardHeader>
              <CardTitle>Rating</CardTitle>
              <CardDescription>Your rating based on customer reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Average Rating</Label>
                  <p className="text-2xl font-bold">{profile.rating?.toFixed(1) || "N/A"} ⭐</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Total Reviews</Label>
                  <p className="text-2xl font-bold">{profile.total_reviews || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="account" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>View your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-muted-foreground">Email</Label>
              <p className="font-semibold">{profile.email}</p>
            </div>

            <div>
              <Label className="text-muted-foreground">Account Type</Label>
              <Badge>{profile.user_type === "owner" ? "🏢 Parking Owner" : "🚗 Space Seeker"}</Badge>
            </div>

            <div>
              <Label className="text-muted-foreground">User ID</Label>
              <p className="text-xs font-mono text-muted-foreground break-all">{userId}</p>
            </div>

            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-3">
                To change your email address, please contact support.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Manage your password and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              To change your password, use the "Forgot password?" link on the login page or contact support.
            </p>
            <Button variant="outline" onClick={() => router.push("/auth/reset-password")}>
              Request Password Reset
            </Button>
          </CardContent>
        </Card>

        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>Irreversible actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Deleting your account will permanently remove all your data. This action cannot be undone.
            </p>
            <Button variant="destructive" onClick={() => alert("Contact support to delete account")}>
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
