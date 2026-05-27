import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function formatViews(views: number): string {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`
  return views.toString()
}

export function generateFileKey(userId: string, fileName: string): string {
  const ext = fileName.split('.').pop()
  const timestamp = Date.now()
  return `documents/${userId}/${timestamp}.${ext}`
}

export function generateThumbKey(userId: string, docId: string): string {
  return `thumbnails/${userId}/${docId}.jpg`
}

export function validatePdfFile(file: File): string | null {
  if (file.type !== 'application/pdf') {
    return 'Only PDF files are allowed'
  }
  if (file.size > 50 * 1024 * 1024) {
    return 'File size must be less than 50MB'
  }
  return null
}

export const CATEGORIES = [
  { id: '1', name: 'Business', slug: 'business', icon: '💼' },
  { id: '2', name: 'Technology', slug: 'technology', icon: '💻' },
  { id: '3', name: 'Education', slug: 'education', icon: '📚' },
  { id: '4', name: 'Science', slug: 'science', icon: '🔬' },
  { id: '5', name: 'Arts & Design', slug: 'arts-design', icon: '🎨' },
  { id: '6', name: 'Health', slug: 'health', icon: '❤️' },
  { id: '7', name: 'Finance', slug: 'finance', icon: '💰' },
  { id: '8', name: 'Law', slug: 'law', icon: '⚖️' },
  { id: '9', name: 'History', slug: 'history', icon: '🏛️' },
  { id: '10', name: 'Self Help', slug: 'self-help', icon: '✨' },
]

export const FREE_PAGE_LIMIT = 5
