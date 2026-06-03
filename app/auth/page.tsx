'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { PaperPlaneTilt } from '@phosphor-icons/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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

      <Navbar />

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
              {' · '}
              <span className="relative group cursor-pointer">
                <span className="text-blue-500 underline decoration-dotted">privacy policy</span>
                <span className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 bg-[#1C0A00] text-white text-xs rounded-2xl px-4 py-3 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 leading-relaxed">
                  We protect your personal data and never share it with third parties without your consent.
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

      <Footer />

    </div>
  )
}
