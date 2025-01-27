import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown } from "lucide-react"

type Customer = {
  id: string
  name: string
  email: string
  status: string
  lastTransaction: string
}

const data: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
    lastTransaction: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Active",
    lastTransaction: "2024-01-14",
  },
  {
    id: "3",
    name: "Bob Wilson",
    email: "bob@example.com",
    status: "Inactive",
    lastTransaction: "2024-01-10",
  },
]

export function CustomersTable() {
  const [sortBy, setSortBy] = useState<keyof Customer>("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const sortedData = [...data].sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy] < b[sortBy] ? -1 : 1
    }
    return a[sortBy] > b[sortBy] ? -1 : 1
  })

  const toggleSort = (column: keyof Customer) => {
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
        <CardTitle>Customers</CardTitle>
        <CardDescription>View and manage your customer information</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" onClick={() => toggleSort("name")} className="flex items-center gap-1">
                  Name
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => toggleSort("email")} className="flex items-center gap-1">
                  Email
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
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("lastTransaction")}
                  className="flex items-center gap-1"
                >
                  Last Transaction
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  <Badge variant={customer.status === "Active" ? "success" : "inactive"}>
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell>{customer.lastTransaction}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
