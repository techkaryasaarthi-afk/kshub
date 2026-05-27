'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/authStore'
import type { Profile, Subscription } from '@/types'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setProfile, setSubscription, clearAuth } = useAuthStore()

  useEffect(() => {
    const supabase = createClient()

    const initAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        // Fetch profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profile) setProfile(profile as Profile)

        // Fetch subscription
        const { data: subscription } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (subscription) setSubscription(subscription as Subscription)
      } else {
        clearAuth()
      }
    }

    initAuth()

    const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          clearAuth()
        } else if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (profile) setProfile(profile as Profile)
        }
      }
    )

    return () => authSub.unsubscribe()
  }, [setProfile, setSubscription, clearAuth])

  return <>{children}</>
}
