import { z } from 'zod'

export const SubscriptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(['active', 'suspended', 'cancelled']),
  customerProfileId: z.string(),
  createTimeStampUTC: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  totalOccurrences: z.string().transform(val => parseInt(val, 10)),
  pastOccurrences: z.string().transform(val => parseInt(val, 10)),
  amount: z.string().transform(val => parseFloat(val))
})

export type Subscription = z.infer<typeof SubscriptionSchema>

export const PaginatedSubscriptionsSchema = z.object({
  data: z.array(SubscriptionSchema),
  total: z.number(),
  page: z.number(),
  page_limit: z.number(),
});

export type PaginatedSubscriptions = z.infer<typeof PaginatedSubscriptionsSchema>;
