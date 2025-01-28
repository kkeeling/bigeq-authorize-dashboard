import axios from 'axios'
import { z } from 'zod'
import { PaginatedSubscriptionsSchema } from '@/types/subscription'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
api.defaults.withCredentials = true;

export const getSubscriptions = async (page = 1, page_limit = 10, status?: 'active' | 'inactive') => {
  try {
    const response = await api.get('/authorize/subscriptions/', {
      params: { page, page_limit, status },
    })
    const paginatedSubscriptions = PaginatedSubscriptionsSchema.parse(response.data)
    return paginatedSubscriptions
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch subscriptions: ${error.message}`)
    }
    throw error
  }
}
