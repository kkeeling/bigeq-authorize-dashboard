import { z } from 'zod'

export const SubscriptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  amount: z.number(),
  status: z.enum(['active', 'suspended', 'cancelled']),
  paymentSchedule: z.object({
    interval: z.object({
      length: z.number(),
      unit: z.enum(['days', 'months', 'years'])
    }),
    startDate: z.string(),
    totalOccurrences: z.number(),
    trialOccurrences: z.number().optional()
  }),
  profile: z.object({
    customerProfileId: z.string(),
    customerPaymentProfileId: z.string()
  })
})

export type Subscription = z.infer<typeof SubscriptionSchema> 