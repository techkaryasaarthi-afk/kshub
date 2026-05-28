import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// In-memory rate limiting cache (OWASP Top 10 - Rate Limiting & Denial of Service prevention)
const ipCache = new Map<string, { count: number; resetTime: number }>()

function isRateLimited(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const record = ipCache.get(ip)

  // Periodic cleanup to avoid memory leaks
  if (ipCache.size > 1000) {
    for (const [key, val] of ipCache.entries()) {
      if (now > val.resetTime) ipCache.delete(key)
    }
  }

  if (!record || now > record.resetTime) {
    ipCache.set(ip, { count: 1, resetTime: now + windowMs })
    return false
  }

  record.count++
  if (record.count > limit) {
    return true
  }
  return false
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 1. Enforce Rate Limiting (Brute-Force & Denial of Service protection)
  const isApi = pathname.startsWith('/api')
  const isAuthPage = ['/login', '/signup'].includes(pathname)

  if (isApi || isAuthPage) {
    const ip = (request as any).ip || request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown-ip'
    
    // Strict rate limits for authentication, comments, likes, and file uploads
    const isStrictEndpoint = 
      pathname.includes('/login') || 
      pathname.includes('/signup') || 
      pathname.includes('/upload') || 
      pathname.includes('/likes') || 
      pathname.includes('/comments')

    const limit = isStrictEndpoint ? 10 : 60 // 10 requests/min for sensitive actions, 60 requests/min for general APIs
    
    if (isRateLimited(ip, limit, 60000)) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Please wait a moment and try again.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      )
    }
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const protectedRoutes = ['/dashboard', '/upload', '/admin']
  const authRoutes = ['/login', '/signup']

  // Redirect unauthenticated users away from protected routes
  if (!user && protectedRoutes.some((r) => pathname.startsWith(r))) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from auth routes
  if (user && authRoutes.includes(pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
