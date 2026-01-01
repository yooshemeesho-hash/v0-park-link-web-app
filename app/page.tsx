"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-card p-6">
      <div className="max-w-2xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-primary">ParkLink</h1>
          <p className="text-xl text-muted-foreground">Find parking spaces instantly. Share yours easily.</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 space-y-6">
          <p className="text-foreground">
            ParkLink connects drivers looking for parking with owners who have available spaces. Find the perfect spot
            in seconds or earn extra income by sharing your parking space.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/login" className="flex-1">
              <Button className="w-full" variant="default" size="lg">
                Login
              </Button>
            </Link>
            <Link href="/auth/sign-up" className="flex-1">
              <Button className="w-full bg-transparent" variant="outline" size="lg">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <p className="font-semibold text-foreground mb-2">For Seekers</p>
            <p>Find & book parking spaces near you</p>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-2">For Owners</p>
            <p>List your space & earn income</p>
          </div>
        </div>
      </div>
    </div>
  )
}
