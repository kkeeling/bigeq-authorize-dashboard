import { z } from 'zod'

export const PaymentScheduleSchema = z.object({
  interval: z.object({
    length: z.number(),
    unit: z.enum(['days', 'months', 'weeks'])
  }),
  startDate: z.string(),
  totalOccurrences: z.number(),
  trialOccurrences: z.number()
})

export const BillToSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string()
})

export const PaymentProfileSchema = z.object({
  customerPaymentProfileId: z.string(),
  payment: z.object({
    creditCard: z.object({
      cardNumber: z.string(),
      expirationDate: z.string()
    })
  }),
  customerType: z.string(),
  billTo: BillToSchema
})

export const ProfileSchema = z.object({
  paymentProfile: PaymentProfileSchema,
  customerProfileId: z.string(),
  description: z.string()
})

export const ArbTransactionSchema = z.object({
  transId: z.string(),
  response: z.string(),
  submitTimeUTC: z.string(),
  payNum: z.number(),
  attemptNum: z.number()
})

export const SubscriptionDetailSchema = z.object({
  name: z.string(),
  paymentSchedule: PaymentScheduleSchema,
  amount: z.number(),
  trialAmount: z.number(),
  status: z.enum(['active', 'expired', 'suspended', 'cancelled', 'terminated']),
  profile: ProfileSchema,
  arbTransactions: z.array(ArbTransactionSchema).optional()
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
