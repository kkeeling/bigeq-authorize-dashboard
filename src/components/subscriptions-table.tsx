"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { useSubscriptions } from "@/hooks/useSubscriptions"
import type { Subscription } from "@/types/subscription"

export function SubscriptionsTable() {
  const { data: subscriptions, isLoading, error } = useSubscriptions()
  const [sortBy, setSortBy] = useState<keyof Subscription>("id")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Subscriptions</CardTitle>
          <CardDescription>Loading subscription data...</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription className="text-destructive">
            Failed to load subscriptions: {error.message}
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const sortedData = [...(subscriptions || [])].sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy] < b[sortBy] ? -1 : 1
    }
    return a[sortBy] > b[sortBy] ? -1 : 1
  })

  const toggleSort = (column: keyof Subscription) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscriptions</CardTitle>
        <CardDescription>Monitor active subscriptions and recurring payments</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" onClick={() => toggleSort("id")} className="flex items-center gap-1">
                  ID
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => toggleSort("name")} className="flex items-center gap-1">
                  Name
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => toggleSort("customerProfileId")} className="flex items-center gap-1">
                  Customer Profile ID
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => toggleSort("status")} className="flex items-center gap-1">
                  Status
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell>{subscription.id}</TableCell>
                <TableCell>{subscription.name}</TableCell>
                <TableCell>{subscription.customerProfileId}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      subscription.status === "active"
                        ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
                        : "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20"
                    }`}
                  >
                    {subscription.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

