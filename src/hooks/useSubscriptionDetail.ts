import { useQuery } from '@tanstack/react-query'
import { getSubscriptionDetail } from '@/services/authorizeService'
import type { SubscriptionDetail } from '@/types/subscription'

export const useSubscriptionDetail = (subscriptionId: string | null) => {
  return useQuery<SubscriptionDetail, Error>({
    queryKey: ['subscription', subscriptionId],
    queryFn: () => {
      if (!subscriptionId) throw new Error('Subscription ID is required')
      return getSubscriptionDetail(subscriptionId)
    },
    enabled: !!subscriptionId,
    staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
    retry: 0
  })
}
