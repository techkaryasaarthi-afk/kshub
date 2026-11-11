'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('kshub_theme') as 'light' | 'dark' | null
    if (saved === 'dark') {
      setTheme('dark')
      document.documentElement.classList.add('dark')
    } else {
      setTheme('light')
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    localStorage.setItem('kshub_theme', nextTheme)
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  if (!mounted) {
    return (
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#102f53]/15 bg-white/80 text-xs text-[#102f53] ${className}`}>
        <Moon className="w-3.5 h-3.5 text-[#102f53]" />
        <span className="font-semibold text-[11px] hidden sm:inline">Theme</span>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#102f53]/15 dark:border-white/20 bg-white/90 dark:bg-white/10 hover:border-[#d29a27] dark:hover:border-[#f5d778] text-[#102f53] dark:text-[#f5d778] shadow-xs transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-md ${className}`}
      aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    >
      {theme === 'light' ? (
        <>
          <Moon className="w-3.5 h-3.5 text-[#102f53] transition-transform duration-300 group-hover:rotate-12" />
          <span className="text-[11px] font-bold text-[#102f53] tracking-wide hidden sm:inline">Dark</span>
        </>
      ) : (
        <>
          <Sun className="w-3.5 h-3.5 text-[#f5d778] transition-transform duration-300 group-hover:rotate-45" />
          <span className="text-[11px] font-bold text-[#f5d778] tracking-wide hidden sm:inline">Light</span>
        </>
      )}
    </button>
  )
}
