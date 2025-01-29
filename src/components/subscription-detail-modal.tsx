import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useSubscriptionDetail } from "@/hooks/useSubscriptionDetail"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SubscriptionDetailModalProps {
  subscriptionId: string | null
  isOpen: boolean
  onClose: () => void
}

export function SubscriptionDetailModal({
  subscriptionId,
  isOpen,
  onClose,
}: SubscriptionDetailModalProps) {
  const { data: subscription, isLoading, error } = useSubscriptionDetail(subscriptionId)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const renderLoadingState = () => (
    <div className="space-y-4 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
  )

  const renderErrorState = () => (
    <div className="text-center text-red-600">
      <p>Error loading subscription details: {error?.message}</p>
    </div>
  )

  const renderContent = () => {
    if (isLoading) return renderLoadingState()
    if (error) return renderErrorState()
    if (!subscription) return null

    return (
      <div className="space-y-6">
        {/* Header Information */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{subscription.name}</h3>
            <p className="text-sm text-gray-500">ID: {subscription.id}</p>
          </div>
          <Badge
            className={subscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
          >
            {subscription.status}
          </Badge>
        </div>

        {/* Customer Information */}
        <Card>
          <CardContent className="pt-6">
            <h4 className="text-sm font-semibold mb-4">Customer Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p>{`${subscription.firstName} ${subscription.lastName}`}</p>
              </div>
              {subscription.email && (
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{subscription.email}</p>
                </div>
              )}
              {subscription.phone && (
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p>{subscription.phone}</p>
                </div>
              )}
              {subscription.address && (
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Address</p>
                  <p>
                    {subscription.address.line1}
                    {subscription.address.line2 && <>, {subscription.address.line2}</>}
                    <br />
                    {subscription.address.city}, {subscription.address.state} {subscription.address.zip}
                    {subscription.address.country && <>, {subscription.address.country}</>}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card>
          <CardContent className="pt-6">
            <h4 className="text-sm font-semibold mb-4">Payment Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p>${subscription.amount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Billing Frequency</p>
                <p>Every {subscription.paymentSchedule.intervalLength} {subscription.paymentSchedule.interval}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p>{formatDate(subscription.paymentSchedule.startDate)}</p>
              </div>
              {subscription.paymentSchedule.nextBillingDate && (
                <div>
                  <p className="text-sm text-gray-500">Next Billing Date</p>
                  <p>{formatDate(subscription.paymentSchedule.nextBillingDate)}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Payments Made</p>
                <p>{subscription.pastOccurrences} of {subscription.totalOccurrences}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        {subscription.lastTransactionDate && (
          <Card>
            <CardContent className="pt-6">
              <h4 className="text-sm font-semibold mb-4">Last Transaction</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p>{formatDate(subscription.lastTransactionDate)}</p>
                </div>
                {subscription.lastTransactionId && (
                  <div>
                    <p className="text-sm text-gray-500">Transaction ID</p>
                    <p>{subscription.lastTransactionId}</p>
                  </div>
                )}
                {subscription.lastTransactionStatus && (
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p>{subscription.lastTransactionStatus}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Subscription Details</DialogTitle>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  )
}
