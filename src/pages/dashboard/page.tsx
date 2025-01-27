import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, CreditCard, Receipt } from "lucide-react"
import { CustomersTable } from "@/components/customers-table"
import { SubscriptionsTable } from "@/components/subscriptions-table"
import { TransactionsTable } from "@/components/transactions-table"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Manage your payments, customers, and subscriptions</p>
      </div>

      <Tabs defaultValue="customers" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:max-w-[400px]">
          <TabsTrigger value="customers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Customers</span>
          </TabsTrigger>
          <TabsTrigger value="subscriptions" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Subscriptions</span>
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            <span className="hidden sm:inline">Transactions</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="customers">
          <CustomersTable />
        </TabsContent>

        <TabsContent value="subscriptions">
          <SubscriptionsTable />
        </TabsContent>

        <TabsContent value="transactions">
          <TransactionsTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
