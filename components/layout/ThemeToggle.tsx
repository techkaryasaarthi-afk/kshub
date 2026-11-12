'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

/**
 * ==============================================================================
 * KSHub - Dual-Segment Theme Switcher Component
 * ==============================================================================
 * Features:
 * - Dual-Segment Pill Switcher (☀️ Light | 🌙 Dark)
 * - Crystal-clear visual indication of which theme is active
 * - Direct click action: Clicking 'Light' activates Light Theme; 'Dark' activates Dark Theme
 * - Direct DOM manipulation of document.documentElement.classList ('dark')
 * - localStorage persistence ('kshub_theme')
 * - Multi-device responsive (icons always visible, labels visible on xs/sm+)
 * ==============================================================================
 */

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  const applyTheme = (targetTheme: 'light' | 'dark') => {
    setTheme(targetTheme)
    try {
      localStorage.setItem('kshub_theme', targetTheme)
      if (targetTheme === 'dark') {
        document.documentElement.classList.add('dark')
        document.body.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
        document.body.classList.remove('dark')
      }
      window.dispatchEvent(new Event('theme-change'))
    } catch (e) {
      console.error('Failed to apply theme:', e)
    }
  }

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem('kshub_theme') as 'light' | 'dark' | null
      if (saved === 'dark') {
        applyTheme('dark')
      } else {
        applyTheme('light')
      }
    } catch {
      applyTheme('light')
    }
  }, [])

  if (!mounted) {
    return (
      <div className={`inline-flex items-center p-1 rounded-full border border-[#102f53]/15 bg-white/90 text-xs shadow-xs ${className}`}>
        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#102f53] text-[#f5d778] font-bold text-[11px]">
          <Sun className="w-3.5 h-3.5 text-[#f5d778]" />
          <span>Light</span>
        </span>
        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[#87939c] font-bold text-[11px]">
          <Moon className="w-3.5 h-3.5" />
          <span>Dark</span>
        </span>
      </div>
    )
  }

  return (
    <div
      className={`inline-flex items-center p-0.5 sm:p-1 rounded-full border-2 transition-all duration-300 shadow-sm ${
        theme === 'dark'
          ? 'border-[#f5d778]/50 bg-[#071b31]/95 shadow-[0_0_15px_rgba(245,215,120,0.2)]'
          : 'border-[#102f53]/25 bg-white/95 shadow-md shadow-[#102f53]/10'
      } ${className}`}
      role="group"
      aria-label="Theme Switcher"
    >
      {/* Light Option Button */}
      <button
        type="button"
        onClick={() => applyTheme('light')}
        className={`flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10.5px] sm:text-xs font-bold transition-all duration-200 cursor-pointer select-none ${
          theme === 'light'
            ? 'bg-[#102f53] text-[#f5d778] shadow-md scale-100 ring-1 ring-[#d29a27]/30'
            : 'text-[#87939c] hover:text-[#102f53] dark:text-[#9cb1c5] dark:hover:text-white'
        }`}
        title="Switch to Light Theme"
        aria-pressed={theme === 'light'}
      >
        <Sun className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${theme === 'light' ? 'text-[#f5d778]' : 'text-current'}`} />
        <span>Light</span>
      </button>

      {/* Dark Option Button */}
      <button
        type="button"
        onClick={() => applyTheme('dark')}
        className={`flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10.5px] sm:text-xs font-bold transition-all duration-200 cursor-pointer select-none ${
          theme === 'dark'
            ? 'bg-[#d29a27] text-[#071b31] shadow-md shadow-[#d29a27]/30 scale-100 font-extrabold ring-1 ring-[#f5d778]/50'
            : 'text-[#87939c] hover:text-[#102f53] dark:text-[#9cb1c5] dark:hover:text-[#f5d778]'
        }`}
        title="Switch to Dark Theme"
        aria-pressed={theme === 'dark'}
      >
        <Moon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${theme === 'dark' ? 'text-[#071b31] fill-[#071b31]' : 'text-current'}`} />
        <span>Dark</span>
      </button>
    </div>
  )
}
