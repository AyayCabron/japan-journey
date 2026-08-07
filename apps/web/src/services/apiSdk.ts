import { createTripClient } from '@japan-journey/sdk'
import { supabase } from './supabaseClient'

const apiUrl = import.meta.env.VITE_API_URL

if (!apiUrl) {
  throw new Error('VITE_API_URL is not configured')
}

async function getAccessToken(): Promise<string | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session?.access_token ?? null
}

export const tripClient = createTripClient({
  baseUrl: apiUrl,
  getAccessToken,
})
