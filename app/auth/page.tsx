'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'
import { PaperPlaneTilt } from '@phosphor-icons/react'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [authMode, setAuthMode] = useState<'link' | 'password'>('link')

  const handleMagicLink = async () => {
    if (!email || !email.includes('@')) return
    setLoading(true)
    try {
      await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin + '/account'
        }
      })
      setSent(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSignIn = async () => {
    if (!email || !password) return
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error && error.message.includes('Invalid')) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin + '/account'
          }
        })
        if (!signUpError) setSent(true)
      } else if (!error) {
        window.location.href = '/account'
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#FFFAF5' }}>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-[#FFD4BC]/40 bg-[#FFFAF5]/90 backdrop-blur-md">

        {/* Top bar — logo and icons */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-[#FFD4BC]/30">
          <div className="w-32">
            <a href="/account" className="text-[10px] tracking-[0.2em] uppercase text-[#8B5E52] hover:text-[#F4845F] transition-colors" style={{ fontFamily: 'var(--font-josefin)' }}>
              Sign in to earn Glow Points →
            </a>
          </div>
          <Link href="/" className="text-center">
            <Image src="/zanzan-logo.svg" alt="ZanZan" width={120} height={40} className="h-14 w-auto mx-auto" />
          </Link>
          <div className="w-32 flex justify-end gap-4">
            <Link href="/account" className="text-[#1C0A00] hover:text-[#F4845F] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </Link>
            <Link href="/trending" className="text-[#1C0A00] hover:text-[#F4845F] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </Link>
          </div>
        </div>

        {/* Bottom nav — links */}
        <div className="flex items-center justify-center gap-10 py-3">
          {[
            { label: 'home', href: '/' },
            { label: 'glam lab', href: '/glam-lab' },
            { label: 'trending', href: '/trending' },
            { label: 'community', href: '/community' },
            { label: 'account', href: '/account' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs tracking-widest uppercase text-[#1C0A00] hover:text-[#F4845F] transition-colors duration-200"
              style={{ fontFamily: 'var(--font-josefin)' }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* AUTH CONTENT */}
      <div className="flex flex-col items-center justify-center px-4 pt-20 pb-32">
        {!sent ? (
          <div className="w-full max-w-sm">

            <h1 className="text-center text-4xl font-bold text-[#F4845F] tracking-widest uppercase mb-10" style={{ fontFamily: 'var(--font-syne)' }}>
              Sign In
            </h1>

            <div className="space-y-3 mb-4">
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (authMode === 'password' ? handlePasswordSignIn() : handleMagicLink())}
                className="w-full px-4 py-4 border border-[#FFD4BC] bg-white text-sm text-[#1C0A00] placeholder-[#B8896E] outline-none focus:border-[#F4845F] transition-all"
                style={{ fontFamily: 'var(--font-josefin)' }}
              />
              {authMode === 'password' && (
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePasswordSignIn()}
                    className="w-full px-4 py-4 border border-[#FFD4BC] bg-white text-sm text-[#1C0A00] placeholder-[#B8896E] outline-none focus:border-[#F4845F] transition-all"
                    style={{ fontFamily: 'var(--font-josefin)' }}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#8B5E52] hover:text-[#F4845F] transition-colors"
                    style={{ fontFamily: 'var(--font-josefin)' }}
                  >
                    {showPassword ? 'hide' : 'show'}
                  </button>
                </div>
              )}
            </div>

            <p className="text-xs text-[#8B5E52] text-center mb-6 leading-relaxed">
              by logging in, you agree to our{' '}
              <span className="relative group cursor-pointer">
                <span className="text-blue-500 underline decoration-dotted">terms</span>
                <span className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 bg-[#1C0A00] text-white text-xs rounded-2xl px-4 py-3 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 leading-relaxed">
                  ZanZan is free during beta. We never sell your data. We only store your email and makeup routines. You can delete your account anytime.
                </span>
              </span>
              {', '}
              <span className="relative group cursor-pointer">
                <span className="text-blue-500 underline decoration-dotted">privacy policy</span>
                <span className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 bg-[#1C0A00] text-white text-xs rounded-2xl px-4 py-3 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 leading-relaxed">
                  We protect your personal data and never share it with third parties without your consent.
                </span>
              </span>
              {' and '}
              <span className="relative group cursor-pointer">
                <span className="text-blue-500 underline decoration-dotted">rewards program terms</span>
                <span className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 bg-[#1C0A00] text-white text-xs rounded-2xl px-4 py-3 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 leading-relaxed">
                  Glow Points are earned by building routines and logging in. Points have no cash value and are subject to change during beta.
                </span>
              </span>
            </p>

            <button
              onClick={authMode === 'password' ? handlePasswordSignIn : handleMagicLink}
              disabled={loading}
              className="w-full py-4 border border-[#1C0A00] bg-transparent text-[#1C0A00] text-xs tracking-widest uppercase hover:bg-[#1C0A00] hover:text-white transition-all duration-200 disabled:opacity-50 mb-3"
              style={{ fontFamily: 'var(--font-josefin)' }}
            >
              {loading ? 'loading...' : authMode === 'password' ? 'log in' : 'send my link'}
            </button>

            <button
              onClick={() => setAuthMode(authMode === 'password' ? 'link' : 'password')}
              className="w-full text-center text-xs text-[#8B5E52] hover:text-[#F4845F] tracking-widest uppercase transition-colors mb-6"
              style={{ fontFamily: 'var(--font-josefin)' }}
            >
              {authMode === 'password' ? 'use a sign in link instead' : 'use a password instead'}
            </button>

            <p className="text-center text-xs text-[#8B5E52]">
              new here?{' '}
              <a href="/glam-lab" className="underline text-[#F4845F] hover:text-[#C7522A] transition-colors">
                build your first look
              </a>
            </p>

          </div>
        ) : (
          <div className="w-full max-w-sm text-center">
            <div className="flex justify-center mb-6">
              <PaperPlaneTilt size={48} color="#F4845F" weight="light" />
            </div>
            <h2 className="text-4xl font-bold text-[#F4845F] tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              check your email
            </h2>
            <p className="text-sm text-[#8B5E52] leading-relaxed mb-6">
              we sent a link to <span className="text-[#F4845F]">{email}</span>. click it and you are in!
            </p>
            <button
              onClick={() => setSent(false)}
              className="text-xs text-[#C4977E] hover:text-[#F4845F] tracking-widest uppercase transition-colors"
              style={{ fontFamily: 'var(--font-josefin)' }}
            >
              ← use a different email
            </button>
          </div>
        )}
      </div>

      <footer className="bg-[#FFF0E8] py-12 text-center border-t border-[#FFD4BC]">
        <div className="flex items-center justify-center gap-6 mb-6">
          <span className="text-xs tracking-widest uppercase text-[#8B5E52] mr-2" style={{ fontFamily: 'var(--font-josefin)' }}>Follow us</span>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#1C0A00"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 24 24"><defs><radialGradient id="ig" cx="30%" cy="107%" r="150%"><stop offset="0%" stopColor="#fdf497"/><stop offset="5%" stopColor="#fdf497"/><stop offset="45%" stopColor="#fd5949"/><stop offset="60%" stopColor="#d6249f"/><stop offset="90%" stopColor="#285AEB"/></radialGradient></defs><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#ig)"/><path d="M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 7.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.5-8.25a1.05 1.05 0 1 0 0 2.1 1.05 1.05 0 0 0 0-2.1z" fill="white"/></svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#E60023"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
          </a>
        </div>
        <p className="text-[#C4977E] text-xs">© 2026 ZanZan Beauty Studio. All rights reserved.</p>
      </footer>

    </div>
  )
}
