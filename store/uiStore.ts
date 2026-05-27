import { create } from 'zustand'

interface UIState {
  sidebarOpen: boolean
  searchQuery: string
  viewMode: 'grid' | 'list'
  setSidebarOpen: (open: boolean) => void
  setSearchQuery: (q: string) => void
  setViewMode: (mode: 'grid' | 'list') => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  searchQuery: '',
  viewMode: 'grid',
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setViewMode: (viewMode) => set({ viewMode }),
}))
