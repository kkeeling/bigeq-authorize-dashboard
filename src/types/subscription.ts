import { z } from 'zod'

export const SubscriptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(['active', 'suspended', 'cancelled']),
  customerProfileId: z.string(),
  createTimeStampUTC: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  totalOccurrences: z.number().int(),
  pastOccurrences: z.number().int(),
  amount: z.number()
})

export type Subscription = z.infer<typeof SubscriptionSchema>

export const PaginatedSubscriptionsSchema = z.object({
  data: z.array(SubscriptionSchema),
  total: z.number(),
  page: z.number(),
  page_limit: z.number(),
});

export type PaginatedSubscriptions = z.infer<typeof PaginatedSubscriptionsSchema>;
