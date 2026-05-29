'use client'

import { createBrowserClient } from '@supabase/ssr'

let clientInstance: ReturnType<typeof createBrowserClient> | null = null

// Simple in-memory lock registry to serialize auth transactions in-tab without using buggy Web Locks API
const activeLocks: { [name: string]: Promise<any> } = {}

async function inMemoryLock<R>(
  name: string,
  acquireTimeout: number,
  fn: () => Promise<R>
): Promise<R> {
  const previous = activeLocks[name] || Promise.resolve()
  const current = (async () => {
    try {
      await previous
    } catch {
      // Ignore errors from the previous lock holder
    }
    return await fn()
  })()

  activeLocks[name] = current.then(
    () => {},
    () => {}
  )

  return current
}

export function createClient() {
  if (typeof window === 'undefined') {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }

  if (!clientInstance) {
    clientInstance = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          flowType: 'pkce',
          lock: inMemoryLock,
        }
      }
    )
  }

  return clientInstance
}
