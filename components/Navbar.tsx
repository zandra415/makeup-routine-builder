'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { name: 'Home',      href: '/' },
  { name: 'Glam Lab', href: '/glam-lab' },
  { name: 'Trending',  href: '/trending' },
  { name: 'Community', href: '/community' },
  { name: 'Account',   href: '/account' },
]

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const solid = !isHome || scrolled
  const activeTab = NAV_LINKS.find(l => l.href === pathname)?.name

  return (
    <nav className={`${isHome ? 'fixed' : 'sticky'} top-0 left-0 right-0 z-50 px-8 py-4 transition-all duration-300 ${
      solid
        ? 'bg-[#FFFAF5]/90 backdrop-blur-sm border-b border-[#FFD4BC]/40'
        : 'bg-transparent'
    }`}>
      <div className="relative flex items-center justify-between">
        <div className="flex items-center">
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(link => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs font-medium whitespace-nowrap pb-0.5 tracking-widest uppercase transition-all ${
                  activeTab === link.name
                    ? solid ? 'text-[#F4845F] border-b border-[#F4845F]' : 'text-white border-b border-white'
                    : solid ? 'text-[#8B5E52] hover:text-[#F4845F]' : 'text-white/80 hover:text-white'
                }`}
                style={{ fontFamily: 'var(--font-josefin)' }}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <button
            className={`md:hidden text-2xl leading-none ${solid ? 'text-[#F4845F]' : 'text-white'}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none">
          <img src="/zanzan-logo.svg" alt="ZanZan" className="h-16 w-auto" />
        </div>
      </div>
      {menuOpen && (
        <div className={`md:hidden mt-3 pb-4 border-t flex flex-col gap-4 pt-4 ${solid ? 'border-[#FFD4BC]' : 'border-white/20'}`}>
          {NAV_LINKS.map(link => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium text-left tracking-widest uppercase transition-all ${
                solid ? activeTab === link.name ? 'text-[#F4845F]' : 'text-[#8B5E52]' : 'text-white/90'
              }`}
              style={{ fontFamily: 'var(--font-josefin)' }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
