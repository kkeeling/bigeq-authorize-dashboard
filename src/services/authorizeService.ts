import axios from 'axios'
import { z } from 'zod'
import { SubscriptionSchema } from '@/types/subscription'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getSubscriptions = async () => {
  try {
    const response = await api.post('/authorize/subscriptions/')

    const subscriptions = z.array(SubscriptionSchema).parse(
      response.data.subscriptionDetails
    )

    return subscriptions
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch subscriptions: ${error.message}`)
    }
    throw error
  }
} 
