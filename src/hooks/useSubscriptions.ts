import { useQuery } from '@tanstack/react-query'
import { getSubscriptions } from '@/services/authorizeService'
import type { PaginatedSubscriptions } from '@/types/subscription'

export const useSubscriptions = (page: number, page_limit: number) => {
  return useQuery<PaginatedSubscriptions, Error>({
    queryKey: ['subscriptions', page, page_limit],
    queryFn: () => getSubscriptions(page, page_limit),
    staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
    retry: 0
  })
} 
