import { z } from 'zod'

export const PaymentScheduleSchema = z.object({
  interval: z.enum(['days', 'months', 'weeks']),
  intervalLength: z.number(),
  startDate: z.string(),
  nextBillingDate: z.string().optional(),
})

export const SubscriptionDetailSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(['active', 'expired', 'suspended', 'cancelled', 'terminated']),
  customerProfileId: z.string(),
  createTimeStampUTC: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  totalOccurrences: z.number().int(),
  pastOccurrences: z.number().int(),
  amount: z.number(),
  paymentSchedule: PaymentScheduleSchema,
  lastTransactionDate: z.string().optional(),
  lastTransactionStatus: z.string().optional(),
  lastTransactionId: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.object({
    line1: z.string().optional(),
    line2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
})

export type SubscriptionDetail = z.infer<typeof SubscriptionDetailSchema>

export const SubscriptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(['active', 'expired', 'suspended', 'cancelled', 'terminated']),
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
