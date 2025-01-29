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
            <p className="text-sm text-gray-500">ID: {subscriptionId}</p>
          </div>
          <Badge
            className={subscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
          >
            {subscription.status}
          </Badge>
        </div>

        {/* Customer and Payment Profile Information */}
        <Card>
          <CardContent className="pt-6">
            <h4 className="text-sm font-semibold mb-4">Customer Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p>{`${subscription.profile.paymentProfile.billTo.firstName} ${subscription.profile.paymentProfile.billTo.lastName}`}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Customer Type</p>
                <p>{subscription.profile.paymentProfile.customerType}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Address</p>
                <p>
                  {subscription.profile.paymentProfile.billTo.address}<br />
                  {subscription.profile.paymentProfile.billTo.city}, {subscription.profile.paymentProfile.billTo.state} {subscription.profile.paymentProfile.billTo.zip}<br />
                  {subscription.profile.paymentProfile.billTo.country}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Customer Profile ID</p>
                <p>{subscription.profile.customerProfileId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Profile ID</p>
                <p>{subscription.profile.paymentProfile.customerPaymentProfileId}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card>
          <CardContent className="pt-6">
            <h4 className="text-sm font-semibold mb-4">Payment Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Card Number</p>
                <p>{subscription.profile.paymentProfile.payment.creditCard.cardNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Expiration Date</p>
                <p>{subscription.profile.paymentProfile.payment.creditCard.expirationDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p>${subscription.amount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Trial Amount</p>
                <p>${subscription.trialAmount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Billing Frequency</p>
                <p>Every {subscription.paymentSchedule.interval.length} {subscription.paymentSchedule.interval.unit}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p>{formatDate(subscription.paymentSchedule.startDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Occurrences</p>
                <p>{subscription.paymentSchedule.totalOccurrences}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Trial Occurrences</p>
                <p>{subscription.paymentSchedule.trialOccurrences}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardContent className="pt-6">
            <h4 className="text-sm font-semibold mb-4">ARB Transactions</h4>
            <div className="space-y-4">
              {subscription.arbTransactions?.length ? (
                subscription.arbTransactions.map((transaction, index) => (
                <div key={index} className="grid grid-cols-2 gap-4 border-b pb-4 last:border-b-0">
                  {transaction.transId && (
                    <div>
                      <p className="text-sm text-gray-500">Transaction ID</p>
                      <p>{transaction.transId}</p>
                    </div>
                  )}
                  {transaction.response && (
                    <div>
                      <p className="text-sm text-gray-500">Response</p>
                      <p>{transaction.response}</p>
                    </div>
                  )}
                  {transaction.submitTimeUTC && (
                    <div>
                      <p className="text-sm text-gray-500">Submit Time</p>
                      <p>{formatDate(transaction.submitTimeUTC)}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Payment Number</p>
                    <p>{transaction.payNum}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Attempt Number</p>
                    <p>{transaction.attemptNum}</p>
                  </div>
                </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No transactions found</p>
              )}
            </div>
            </CardContent>
          </Card>
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
