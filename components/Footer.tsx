'use client'

import Image from 'next/image'

export default function Footer() {
  return (
    <footer style={{ background: '#FFF0E8', borderTop: '1px solid rgba(244,132,95,0.15)' }}>

      {/* EMAIL SIGNUP */}
      <div className="max-w-6xl mx-auto px-8 pt-16 pb-10 border-b border-[#FFD4BC]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-2xl mb-1" style={{ fontFamily: 'var(--font-syne)', fontWeight: '600', color: '#1C0A00' }}>
              Get The Weekly Look
            </p>
            <p className="text-sm" style={{ fontFamily: 'var(--font-josefin)', color: '#8B5E52' }}>
              Every Tuesday. This week's trending look, beauty tips and what is blowing up right now.
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="your email address"
              className="flex-1 md:w-72 px-5 py-3 text-sm text-[#1C0A00] placeholder-[#C4977E] outline-none border-none"
              style={{ fontFamily: 'var(--font-josefin)', background: 'white', borderRadius: '4px' }}
            />
            <button
              className="px-6 py-3 text-xs tracking-widest transition-all duration-200 hover:opacity-80"
              style={{ background: '#C7522A', color: 'white', fontFamily: 'var(--font-josefin)', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.15em' }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* MAIN COLUMNS */}
      <div className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-10">

        {/* BRAND COLUMN */}
        <div className="col-span-2 md:col-span-1">
          <Image src="/zanzan-logo.svg" alt="ZanZan" width={100} height={40} className="h-12 w-auto mb-5 opacity-90" />
          <p className="text-xs leading-relaxed mb-6" style={{ color: '#8B5E52', fontFamily: 'var(--font-josefin)', lineHeight: '1.8' }}>
            AI Beauty Routines Built For Real Faces. Personalized Looks For Every Occasion, Every Budget, Every You.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" target="_blank" rel="noopener noreferrer" className="group">
              <div className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 group-hover:-translate-y-1" style={{ background: 'rgba(244,132,95,0.08)', boxShadow: '0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#F5E6C8"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
              </div>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="group">
              <div className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 group-hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', boxShadow: '0 4px 12px rgba(220,39,67,0.4), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
            </a>
          </div>
        </div>

        {/* EXPLORE */}
        <div>
          <p className="text-xs tracking-[0.2em] uppercase mb-6" style={{ fontFamily: 'var(--font-josefin)', letterSpacing: '0.2em', color: '#F4845F' }}>Explore</p>
          <ul className="space-y-4">
            {[
              { label: 'Home', href: '/' },
              { label: 'Glam Lab', href: '/glam-lab' },
              { label: 'Trending', href: '/trending' },
              { label: 'Community', href: '/community' },
              { label: 'Brands', href: '/brands' },
            ].map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-xs transition-colors duration-200 hover:text-[#1C0A00]" style={{ fontFamily: 'var(--font-josefin)', color: '#8B5E52' }}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* ACCOUNT */}
        <div>
          <p className="text-xs tracking-[0.2em] uppercase mb-6" style={{ fontFamily: 'var(--font-josefin)', letterSpacing: '0.2em', color: '#F4845F' }}>Account</p>
          <ul className="space-y-4">
            {[
              { label: 'Sign In', href: '/auth' },
              { label: 'My Routines', href: '/account' },
              { label: 'Settings', href: '/account' },
            ].map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-xs transition-colors duration-200 hover:text-[#1C0A00]" style={{ fontFamily: 'var(--font-josefin)', color: '#8B5E52' }}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <p className="text-xs tracking-[0.2em] uppercase mb-6" style={{ fontFamily: 'var(--font-josefin)', letterSpacing: '0.2em', color: '#F4845F' }}>Company</p>
          <ul className="space-y-4">
            {[
              { label: 'Partner With Us', href: '/brands' },
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms Of Service', href: '/terms' },
              { label: 'Contact', href: '/contact' },
            ].map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-xs transition-colors duration-200 hover:text-[#1C0A00]" style={{ fontFamily: 'var(--font-josefin)', color: '#8B5E52' }}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-[#FFD4BC] py-6 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: '#C4977E', fontFamily: 'var(--font-josefin)' }}>© 2026 ZanZan Beauty Studio. All Rights Reserved.</p>
          <p className="text-xs" style={{ color: '#C4977E', fontFamily: 'var(--font-josefin)' }}>✦ Serve Your Look ✦</p>
          <p className="text-xs" style={{ color: '#C4977E', fontFamily: 'var(--font-josefin)' }}>Made With Love For Gen Z</p>
        </div>
      </div>

    </footer>
  )
}
