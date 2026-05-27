import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Profile, Subscription } from '@/types'

interface AuthState {
  profile: Profile | null
  subscription: Subscription | null
  isPremium: boolean
  setProfile: (profile: Profile | null) => void
  setSubscription: (sub: Subscription | null) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      profile: null,
      subscription: null,
      isPremium: false,
      setProfile: (profile) => set({ profile }),
      setSubscription: (subscription) =>
        set({
          subscription,
          isPremium:
            subscription?.plan === 'premium' &&
            subscription?.status === 'active',
        }),
      clearAuth: () =>
        set({ profile: null, subscription: null, isPremium: false }),
    }),
    {
      name: 'kshub-auth',
      partialize: (state) => ({
        profile: state.profile,
        subscription: state.subscription,
        isPremium: state.isPremium,
      }),
    }
  )
)
