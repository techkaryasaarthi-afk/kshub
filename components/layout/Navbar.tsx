'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, Upload, ChevronDown, User, BookOpen, LogOut, Crown, LayoutDashboard, X, Menu } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

interface SubCategorySection {
  title: string
  slug: string
  icon: string
  items: string[]
}

interface ParentCategory {
  name: string
  icon: string
  sections: SubCategorySection[]
}

const PARENT_CATEGORIES: ParentCategory[] = [
  {
    name: 'Academic',
    icon: '📚',
    sections: [
      {
        title: 'Research Papers',
        slug: 'research-papers',
        icon: '📄',
        items: ['Engineering', 'Medical', 'Social Sciences', 'Business', 'Artificial Intelligence']
      },
      {
        title: 'Textbooks',
        slug: 'textbooks',
        icon: '📚',
        items: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science']
      },
      {
        title: 'Thesis & Dissertations',
        slug: 'thesis-dissertations',
        icon: '🎓',
        items: ['Doctoral Research', 'Master\'s Thesis', 'Preprints']
      },
      {
        title: 'Exam Prep',
        slug: 'exam-prep',
        icon: '🎯',
        items: ['Competitive Exams', 'Board Exams', 'Aptitude Tests']
      }
    ]
  },
  {
    name: 'Professional',
    icon: '💼',
    sections: [
      {
        title: 'SIP Reports',
        slug: 'sip-reports',
        icon: '📊',
        items: ['Finance Projects', 'Marketing Projects', 'HR Reports', 'Operations']
      },
      {
        title: 'Business Plans',
        slug: 'business-plans',
        icon: '📈',
        items: ['Startups', 'Expansion Plans', 'Feasibility Studies', 'Pitch Decks']
      },
      {
        title: 'Technical Docs',
        slug: 'technical-docs',
        icon: '🔬',
        items: ['APIs', 'System Architecture', 'Specs', 'Whitepapers']
      },
      {
        title: 'Professional Guides',
        slug: 'professional-guides',
        icon: '💼',
        items: ['Career Growth', 'Skill Building', 'Interview Prep']
      }
    ]
  },
  {
    name: 'Culture',
    icon: '🎭',
    sections: [
      {
        title: 'Stories & Fiction',
        slug: 'stories-fiction',
        icon: '✍️',
        items: ['Novels', 'Short Stories', 'Poetry', 'Drama']
      },
      {
        title: 'Creative Works',
        slug: 'creative-works',
        icon: '🎨',
        items: ['Design Portfolios', 'Art Projects', 'Creative Writing']
      },
      {
        title: 'International Resources',
        slug: 'international-resources',
        icon: '🌍',
        items: ['Global Journals', 'Translations', 'Foreign Policy']
      }
    ]
  },
  {
    name: 'Personal Growth',
    icon: '🌱',
    sections: [
      {
        title: 'Case Studies',
        slug: 'case-studies',
        icon: '📖',
        items: ['Business Strategy', 'Marketing Cases', 'Tech Cases', 'Finance Cases']
      }
    ]
  }
]

export function Navbar() {
  const router = useRouter()
  const { profile, isPremium, clearAuth } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState<any[]>([])
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  const menuRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((res) => setCategories(res.data || []))
      .catch((err) => console.error('Failed to load categories:', err))
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseEnter = (catName: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveMenu(catName)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
    }
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    clearAuth()
    toast.success('Signed out successfully')
    router.push('/')
    router.refresh()
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100 py-1' 
            : 'bg-[#FAF9F7]/90 backdrop-blur-sm border-b border-[rgba(190,200,202,0.2)] py-2.5'
        }`}
      >
        {/* Top bar */}
        <div className="max-w-[1280px] mx-auto px-6 h-14 flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 mr-2">
            <img src="/karyasaarthi.png" alt="Karya Saarthi Logo" className="h-8 w-auto object-contain" />
            <span className="font-display font-800 text-xl text-[#0F2C59] tracking-tight" style={{ fontFamily: 'var(--font-epilogue)', fontWeight: 800, letterSpacing: '-0.04em' }}>
              KSHub
            </span>
          </Link>

          {/* Mega-menu nav — desktop */}
          <div className="hidden lg:flex items-center gap-0.5" onMouseLeave={handleMouseLeave}>
            {PARENT_CATEGORIES.map((parent) => (
              <button
                key={parent.name}
                onMouseEnter={() => handleMouseEnter(parent.name)}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-all whitespace-nowrap ${
                  activeMenu === parent.name
                    ? 'bg-[#1D4ED8]/10 text-[#0F2C59]'
                    : 'text-[#3F484A] hover:text-[#1A1C1B] hover:bg-[#EFEEEC]'
                }`}
                style={{ fontFamily: 'var(--font-manrope)' }}
              >
                {parent.name}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === parent.name ? 'rotate-180' : ''}`} />
              </button>
            ))}
            <Link
              href="/search"
              className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-[13px] font-semibold text-[#3F484A] hover:text-[#1A1C1B] hover:bg-[#EFEEEC] transition-all whitespace-nowrap"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              All Documents
            </Link>

            {/* Mega-menu dropdown */}
            {activeMenu && (
              <div
                className="absolute top-full left-0 right-0 bg-[#FAF9F7] border-b border-[rgba(190,200,202,0.2)] shadow-[0_16px_48px_rgba(26,28,27,0.08)] mega-menu-dropdown"
                onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }}
                onMouseLeave={handleMouseLeave}
              >
                <div className="max-w-[1280px] mx-auto px-6 py-8">
                  <div className="flex gap-16">
                    {/* Left sidebar: Parent Category Icon & Name */}
                    {(() => {
                      const activeParent = PARENT_CATEGORIES.find((p) => p.name === activeMenu)
                      if (!activeParent) return null
                      return (
                        <>
                          <div className="shrink-0 w-48 border-r border-[#EFEEEC] pr-6">
                            <p className="text-3xl mb-1">{activeParent.icon}</p>
                            <h3 className="font-display font-bold text-[#0F2C59] text-xl" style={{ fontFamily: 'var(--font-epilogue)', fontWeight: 700 }}>
                              {activeParent.name}
                            </h3>
                            <Link
                              href="/search"
                              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#1D4ED8] hover:gap-2 transition-all"
                              style={{ fontFamily: 'var(--font-manrope)' }}
                              onClick={() => setActiveMenu(null)}
                            >
                              Explore All Documents →
                            </Link>
                          </div>

                          {/* Right columns: Sections (which are the 12 categories) */}
                          <div className="flex gap-12 flex-wrap flex-1">
                            {activeParent.sections.map((section) => {
                              // Find the DB category to make sure it exists
                              const dbCat = categories.find((c) => c.slug === section.slug)
                              if (!dbCat) return null
                              return (
                                <div key={section.slug} className="min-w-[180px] flex-1 max-w-[240px]">
                                  <Link
                                    href={`/search?category=${section.slug}`}
                                    className="flex items-center gap-2 font-bold text-[#1A1C1B] text-sm mb-3 hover:text-[#1D4ED8] transition-colors group"
                                    style={{ fontFamily: 'var(--font-manrope)' }}
                                    onClick={() => setActiveMenu(null)}
                                  >
                                    <span className="text-base">{dbCat.icon || section.icon}</span>
                                    <span>{dbCat.name}</span>
                                    <span className="text-[#1D4ED8]/60 group-hover:translate-x-0.5 transition-transform text-xs">›</span>
                                  </Link>
                                  <ul className="space-y-2">
                                    {section.items.map((item) => (
                                      <li key={item}>
                                        <Link
                                          href={`/search?q=${encodeURIComponent(item)}`}
                                          className="text-xs text-[#5F686A] hover:text-[#1D4ED8] transition-colors flex items-center gap-1 font-medium"
                                          style={{ fontFamily: 'var(--font-manrope)' }}
                                          onClick={() => setActiveMenu(null)}
                                        >
                                          {item}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )
                            })}
                          </div>
                        </>
                      )
                    })()}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search icon — desktop */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex p-2.5 rounded-xl hover:bg-[#EFEEEC] transition-colors text-[#3F484A]"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Upload — desktop */}
          <Link
            href="/upload"
            className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#1D4ED8]/30 text-[#1D4ED8] text-sm font-semibold hover:bg-[#1D4ED8]/5 transition-all"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            <Upload className="w-3.5 h-3.5" />
            Upload
          </Link>

          {/* Auth buttons */}
          {!profile ? (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login" className="px-4 py-2 text-sm font-semibold text-[#1A1C1B] hover:text-[#1D4ED8] transition-colors" style={{ fontFamily: 'var(--font-manrope)' }}>
                Log in
              </Link>
              <Link href="/signup" className="btn-primary !py-2 !px-5 !text-sm">
                Start Free Trial
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2 relative" ref={menuRef}>
              {isPremium && (
                <span className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 rounded-full text-xs font-semibold text-amber-700">
                  <Crown className="w-3 h-3" /> Premium
                </span>
              )}
              {profile.role === 'admin' && (
                <span className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 rounded-full text-xs font-semibold text-[#1D4ED8]">
                  Admin
                </span>
              )}
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-[#EFEEEC] transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-[#1D4ED8] flex items-center justify-center text-white text-xs font-bold">
                  {profile.full_name?.[0]?.toUpperCase() || 'U'}
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-[#3F484A] transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {userMenuOpen && (
                <div className="absolute top-14 right-0 bg-white rounded-2xl shadow-[0_8px_32px_rgba(26,28,27,0.12)] border border-[rgba(190,200,202,0.15)] py-2 w-52 z-50">
                  <div className="px-4 py-2 border-b border-[#EFEEEC]">
                    <p className="text-sm font-semibold text-[#1A1C1B]" style={{ fontFamily: 'var(--font-manrope)' }}>{profile.full_name}</p>
                    <p className="text-xs text-[#6F797A]">{profile.role === 'admin' ? 'Administrator' : isPremium ? 'Premium Member' : 'Free Account'}</p>
                  </div>
                  
                  {profile.role === 'admin' && (
                    <Link
                      href="/admin"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#1D4ED8] hover:bg-[#EFEEEC] font-semibold transition-colors"
                      style={{ fontFamily: 'var(--font-manrope)' }}
                    >
                      <LayoutDashboard className="w-4 h-4" /> Admin Panel
                    </Link>
                  )}

                  {[
                    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
                    { icon: Upload, label: 'Upload Document', href: '/upload' },
                    { icon: Crown, label: 'Subscription', href: '/subscription' },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#3F484A] hover:bg-[#F4F3F1] hover:text-[#1A1C1B] transition-colors"
                      style={{ fontFamily: 'var(--font-manrope)' }}
                    >
                      <item.icon className="w-4 h-4" /> {item.label}
                    </Link>
                  ))}
                  <div className="border-t border-[#EFEEEC] mt-1">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      style={{ fontFamily: 'var(--font-manrope)' }}
                    >
                      <LogOut className="w-4 h-4" /> Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-xl hover:bg-[#EFEEEC] transition-colors"
          >
            <Menu className="w-5 h-5 text-[#1A1C1B]" />
          </button>
        </div>
      </nav>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-[#1A1C1B]/40 backdrop-blur-sm flex items-start justify-center pt-24 px-6">
          <div className="w-full max-w-[672px] bg-white rounded-2xl shadow-[0_24px_64px_rgba(26,28,27,0.2)] overflow-hidden">
            <form onSubmit={handleSearch} className="flex items-center gap-4 px-5 py-4">
              <Search className="w-5 h-5 text-[#6F797A] shrink-0" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents, books, research papers..."
                className="flex-1 text-base outline-none bg-transparent text-[#1A1C1B] placeholder:text-[#6F797A]"
                style={{ fontFamily: 'var(--font-manrope)' }}
              />
              <button type="button" onClick={() => setSearchOpen(false)} className="p-1.5 rounded-lg hover:bg-[#F4F3F1]">
                <X className="w-4 h-4 text-[#6F797A]" />
              </button>
            </form>
            <div className="border-t border-[#EFEEEC] px-5 py-3">
              <p className="text-xs text-[#6F797A] mb-2" style={{ fontFamily: 'var(--font-manrope)' }}>Quick searches</p>
              <div className="flex gap-2 flex-wrap">
                {['Machine Learning', 'Business Law', 'Python Tutorial', 'History of Rome', 'Financial Accounting'].map((q) => (
                  <button
                    key={q}
                    onClick={() => { setSearchQuery(q); router.push(`/search?q=${encodeURIComponent(q)}`); setSearchOpen(false) }}
                    className="px-3 py-1.5 bg-[#F4F3F1] rounded-full text-xs font-medium text-[#3F484A] hover:bg-[#E9E8E6] transition-colors"
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white overflow-y-auto">
          <div className="flex items-center justify-between px-6 h-16 border-b border-[#EFEEEC]">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
              <img src="/karyasaarthi.png" alt="Karya Saarthi Logo" className="h-7 w-auto object-contain" />
              <span className="font-display font-bold text-xl text-[#0F2C59]" style={{ fontFamily: 'var(--font-epilogue)', fontWeight: 800, letterSpacing: '-0.04em' }}>
                KSHub
              </span>
            </Link>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-[#F4F3F1]">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="px-6 py-6 space-y-6">
            <form onSubmit={handleSearch} className="flex items-center gap-3 px-4 py-3 bg-[#F4F3F1] rounded-xl">
              <Search className="w-4 h-4 text-[#6F797A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 text-sm bg-transparent outline-none"
                style={{ fontFamily: 'var(--font-manrope)' }}
              />
            </form>
            <div className="space-y-1">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/search?category=${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#F4F3F1] text-sm font-semibold text-[#1A1C1B]"
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  <span>{cat.icon || '📄'}</span> {cat.name}
                </Link>
              ))}
            </div>
            <div className="pt-4 border-t border-[#EFEEEC] space-y-2">
              {profile ? (
                <>
                  {profile.role === 'admin' && (
                    <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="btn-primary w-full justify-center mb-2">Admin Panel</Link>
                  )}
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="btn-primary w-full justify-center">Dashboard</Link>
                  <button onClick={() => { handleSignOut(); setMobileMenuOpen(false) }} className="btn-secondary w-full justify-center">Sign out</button>
                </>
              ) : (
                <>
                  <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="btn-primary w-full justify-center">Start Free Trial</Link>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="btn-secondary w-full justify-center">Log in</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
