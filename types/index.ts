export type UserRole = 'user' | 'admin'
export type SubscriptionPlan = 'free' | 'premium'
export type SubscriptionStatus = 'active' | 'expired' | 'cancelled'

export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  role: UserRole
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  countText?: string
}

export interface Document {
  id: string
  title: string
  description: string | null
  file_url: string
  thumb_url: string | null
  user_id: string
  category_id: string | null
  is_premium: boolean
  views: number
  created_at: string
  profiles?: Profile
  categories?: Category
  is_published: boolean
  likes_count?: number
  comments_count?: number
  is_liked?: boolean
  is_bookmarked?: boolean
}

export interface Like {
  id: string
  user_id: string
  document_id: string
  created_at: string
}

export interface Comment {
  id: string
  user_id: string
  document_id: string
  content: string
  created_at: string
  profiles?: Profile
}

export interface Bookmark {
  id: string
  user_id: string
  document_id: string
  created_at: string
  documents?: Document
}

export interface Subscription {
  id: string
  user_id: string
  plan: SubscriptionPlan
  status: SubscriptionStatus
  razorpay_order_id: string | null
  razorpay_payment_id: string | null
  start_date: string
  end_date: string | null
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
}
