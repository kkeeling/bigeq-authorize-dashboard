import { z } from 'zod'

export const SubscriptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(['active', 'suspended', 'cancelled']),
  customerProfileId: z.string()
})

export type Subscription = z.infer<typeof SubscriptionSchema> 
