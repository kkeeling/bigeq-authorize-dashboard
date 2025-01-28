import { useQuery } from '@tanstack/react-query'
import { getSubscriptions } from '@/services/authorizeService'
import type { Subscription } from '@/types/subscription'

export const useSubscriptions = () => {
  return useQuery<Subscription[], Error>({
    queryKey: ['subscriptions'],
    queryFn: getSubscriptions,
    staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
    retry: 2
  })
} 