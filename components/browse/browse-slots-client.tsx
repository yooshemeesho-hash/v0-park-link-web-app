"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SlotCard from "@/components/browse/slot-card"

interface BrowseSlotsClientProps {
  userId: string
  seekerId: string
}

export default function BrowseSlotsClient({ userId, seekerId }: BrowseSlotsClientProps) {
  const [slots] = useState<any[]>([])
  const [filteredSlots, setFilteredSlots] = useState<any[]>([])
  const [isLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [sizeFilter, setSizeFilter] = useState("all")
  const [priceSort, setPriceSort] = useState("asc")

  useEffect(() => {
    filterAndSortSlots()
  }, [slots, search, sizeFilter, priceSort])

  const filterAndSortSlots = () => {
    let results = slots

    if (search.trim()) {
      results = results.filter(
        (slot) =>
          slot.title.toLowerCase().includes(search.toLowerCase()) ||
          slot.location_address.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (sizeFilter !== "all") {
      results = results.filter((slot) => slot.size === sizeFilter)
    }

    results.sort((a, b) => {
      if (priceSort === "asc") {
        return a.price_per_hour - b.price_per_hour
      } else {
        return b.price_per_hour - a.price_per_hour
      }
    })

    setFilteredSlots(results)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search by title or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="size">Size</Label>
              <Select value={sizeFilter} onValueChange={setSizeFilter}>
                <SelectTrigger id="size">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="sort">Sort by Price</Label>
              <Select value={priceSort} onValueChange={setPriceSort}>
                <SelectTrigger id="sort">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Low to High</SelectItem>
                  <SelectItem value="desc">High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" className="w-full bg-transparent">
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <p className="text-sm text-muted-foreground mb-4">
          {isLoading
            ? "Loading..."
            : `${filteredSlots.length} parking space${filteredSlots.length !== 1 ? "s" : ""} available`}
        </p>

        {isLoading ? (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">Loading parking spaces...</CardContent>
          </Card>
        ) : filteredSlots.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              No parking spaces found matching your criteria
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSlots.map((slot) => (
              <SlotCard key={slot.id} slot={slot} seekerId={seekerId} onBookingSuccess={() => {}} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
