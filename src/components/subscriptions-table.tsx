"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { useSubscriptions } from "@/hooks/useSubscriptions"
import type { Subscription } from "@/types/subscription"

export function SubscriptionsTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const initialPageLimit = parseInt(searchParams.get('page_limit') || '10', 10);

  const [page, setPage] = useState<number>(initialPage);
  const [pageLimit, setPageLimit] = useState<number>(initialPageLimit);
  const [sortBy, setSortBy] = useState<keyof Subscription>("id")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const { data: subscriptionsData, isLoading, isFetching, error } = useSubscriptions(page, pageLimit)
  const subscriptions = subscriptionsData?.data || []
  const totalItems = subscriptionsData?.total || 0
  const totalPages = Math.ceil(totalItems / pageLimit)

  useEffect(() => {
    setSearchParams({ page: page.toString(), page_limit: pageLimit.toString() });
  }, [page, pageLimit, setSearchParams]);

  useEffect(() => {
    const newPage = parseInt(searchParams.get('page') || '1', 10);
    const newPageLimit = parseInt(searchParams.get('page_limit') || '10', 10);

    if (page !== newPage) setPage(newPage);
    if (pageLimit !== newPageLimit) setPageLimit(newPageLimit);
  }, [searchParams]);

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(totalPages);
    }
  }, [totalPages, page]);

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
                <Button variant="ghost" onClick={() => toggleSort("firstName")} className="flex items-center gap-1">
                  Customer Name
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => toggleSort("amount")} className="flex items-center gap-1">
                  Amount
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => toggleSort("createTimeStampUTC")} className="flex items-center gap-1">
                  Created
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => toggleSort("pastOccurrences")} className="flex items-center gap-1">
                  Payments Made
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
                <TableCell>{`${subscription.firstName} ${subscription.lastName}`}</TableCell>
                <TableCell>${subscription.amount.toFixed(2)}</TableCell>
                <TableCell>{subscription.createTimeStampUTC}</TableCell>
                <TableCell>{subscription.pastOccurrences} / {subscription.totalOccurrences}</TableCell>
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
      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <Button
            variant="outline"
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            aria-label="Go to previous page"
          >
            Previous
          </Button>
          <span>
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            aria-label="Go to next page"
          >
            Next
          </Button>
          <div>
            <label htmlFor="pageLimit" className="mr-2">Items per page:</label>
            <select
              id="pageLimit"
              value={pageLimit}
              onChange={(e) => setPageLimit(Number(e.target.value))}
              className="border rounded p-1"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

