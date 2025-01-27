"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

type Subscription = {
  id: string
  plan: string
  price: number
  status: string
  nextBilling: string
}

const data: Subscription[] = [
  {
    id: "1",
    plan: "Premium Plan",
    price: 29.99,
    status: "Active",
    nextBilling: "2024-02-15",
  },
  {
    id: "2",
    plan: "Basic Plan",
    price: 9.99,
    status: "Active",
    nextBilling: "2024-02-14",
  },
  {
    id: "3",
    plan: "Pro Plan",
    price: 49.99,
    status: "Cancelled",
    nextBilling: "2024-02-01",
  },
]

export function SubscriptionsTable() {
  const [sortBy, setSortBy] = useState<keyof Subscription>("plan")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const sortedData = [...data].sort((a, b) => {
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
                <Button variant="ghost" onClick={() => toggleSort("plan")} className="flex items-center gap-1">
                  Plan
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => toggleSort("price")} className="flex items-center gap-1">
                  Price
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => toggleSort("status")} className="flex items-center gap-1">
                  Status
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => toggleSort("nextBilling")} className="flex items-center gap-1">
                  Next Billing
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell>{subscription.plan}</TableCell>
                <TableCell>${subscription.price.toFixed(2)}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      subscription.status === "Active"
                        ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
                        : "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20"
                    }`}
                  >
                    {subscription.status}
                  </span>
                </TableCell>
                <TableCell>{subscription.nextBilling}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

