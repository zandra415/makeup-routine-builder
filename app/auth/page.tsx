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

  const handleMagicLink = async () => {
    if (!email || !email.includes('@')) return
    setLoading(true)
    try {
      await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin + '/glam-lab'
        }
      })
      setSent(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFAF5] relative overflow-hidden">
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-[#FFAA80] opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-[#F4845F] opacity-10 blur-3xl pointer-events-none" />

      {/* NAVBAR */}
      <nav className="sticky top-0 left-0 right-0 z-50 bg-[#FFFAF5]/90 backdrop-blur-md border-b border-[#FFD4BC]/40 flex items-center justify-between px-8 py-4 relative">
        <div className="flex items-center gap-6">
          {['Home', 'Glam Lab', 'Trending', 'Community', 'Account'].map((item) => (
            <Link
              key={item}
              href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
              className="text-xs tracking-widest uppercase text-[#1C0A00] hover:text-[#F4845F] transition-colors duration-200"
              style={{ fontFamily: 'var(--font-josefin)' }}
            >
              {item}
            </Link>
          ))}
        </div>
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Image src="/zanzan-logo.svg" alt="ZanZan" width={80} height={32} className="h-16 w-auto" />
        </Link>
        <a href="/auth" className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF0E8] border border-[#FFD4BC]">
          <span className="text-xs text-[#1C0A00] font-medium" style={{ fontFamily: 'var(--font-josefin)' }}>
            Sign in to earn Glow Points
          </span>
        </a>
      </nav>

      {/* AUTH CARD */}
      <div className="flex items-center justify-center px-4 pt-16 pb-8">
        <div className="w-full max-w-md">
          {!sent ? (
            <>
              <p className="text-center text-xs tracking-[0.3em] uppercase text-[#8B5E52] mb-6" style={{ fontFamily: 'var(--font-josefin)' }}>your beauty journey starts here</p>
              <div className="bg-white rounded-3xl border border-[#FFD4BC] pt-8 pb-10 px-10 text-center" style={{ boxShadow: '0 2px 40px rgba(244,132,95,0.08)' }}>
              <p className="text-xs font-medium text-[#F4845F] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: 'var(--font-josefin)' }}>✦ Welcome Back ✦</p>
              <h1 className="text-4xl text-[#1C0A00] mb-2" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', fontWeight: '400' }}>
                Sign In
              </h1>
              <p className="text-sm text-[#8B5E52] mb-4 leading-relaxed">
                Enter your email and we'll send you a sign-in link.
              </p>
              <div className="w-16 h-px bg-[#FFD4BC] mx-auto mb-6" />
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleMagicLink()}
                  className="w-full px-5 py-4 rounded-2xl border border-[#FFD4BC] bg-[#FFFAF5] text-sm text-[#1C0A00] font-medium placeholder-[#B8896E] outline-none focus:border-[#F4845F] focus:ring-2 focus:ring-[#FFAA80]/30 transition-all"
                  style={{ fontFamily: 'var(--font-josefin)' }}
                />
                <button
                  onClick={handleMagicLink}
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-[#F4845F] text-white text-sm font-medium tracking-widest uppercase hover:bg-[#FFAA80] transition-all duration-200 disabled:opacity-50"
                  style={{ fontFamily: 'var(--font-josefin)' }}
                >
                  {loading ? 'Sending...' : 'Send My Link →'}
                </button>
              </div>
              <p className="text-xs text-[#C4977E] mt-3 mb-0">
                By signing in you agree to our{' '}
                <span className="relative group cursor-pointer underline decoration-dotted text-blue-500 decoration-blue-300">
                  terms
                  <span className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 bg-[#1C0A00] text-white text-xs rounded-2xl px-4 py-3 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 leading-relaxed">
                    ZanZan is free during beta. We never sell your data. We only store your email and makeup routines. You can delete your account anytime. ✦
                  </span>
                </span>
              </p>
            </div>
            </>
          ) : (
            <div className="bg-white rounded-3xl border border-[#FFD4BC] p-10 text-center" style={{ boxShadow: '0 2px 40px rgba(244,132,95,0.08)' }}>
              <div className="flex justify-center mb-4"><PaperPlaneTilt size={48} color="#F4845F" weight="light" /></div>
              <p className="text-xs font-medium text-[#F4845F] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: 'var(--font-josefin)' }}>✦ Check Your Email ✦</p>
              <h2 className="text-3xl text-[#1C0A00] mb-3" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}>
                Link Sent!
              </h2>
              <p className="text-sm text-[#8B5E52] leading-relaxed mb-6">
                We sent a link to <span className="text-[#F4845F] font-medium">{email}</span>. Click it and you're in!
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-xs text-[#C4977E] hover:text-[#F4845F] tracking-widest uppercase transition-colors"
                style={{ fontFamily: 'var(--font-josefin)' }}
              >
                ← Use a different email
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
