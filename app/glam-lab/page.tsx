'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import MakeupWizard from '@/components/MakeupWizard'
import Link from 'next/link'
import Image from 'next/image'

export default function GlamLabPage() {
  const [userId, setUserId] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUserId(user?.id)
      setLoading(false)
    }
    getUser()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id)
      setLoading(false)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-[#FFFAF5] flex items-center justify-center">
      <p className="text-[#8B5E52] tracking-widest text-sm uppercase" style={{ fontFamily: 'var(--font-josefin)' }}>Loading your studio...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#FFFAF5]">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFFAF5]/90 backdrop-blur-md border-b border-[#FFD4BC]/40 flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-6">
          {['Home', 'Glam Lab', 'Trending', 'Community', 'Account'].map((item) => (
            <Link
              key={item}
              href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
              className={`text-xs tracking-widest uppercase transition-colors duration-200 ${
                item === 'Glam Lab'
                  ? 'text-[#F4845F] border-b border-[#F4845F] pb-0.5'
                  : 'text-[#1C0A00] hover:text-[#F4845F]'
              }`}
              style={{ fontFamily: 'var(--font-josefin)' }}
            >
              {item}
            </Link>
          ))}
        </div>
        <Link href="/glam-lab">
          <Image src="/zanzan-logo.svg" alt="ZanZan" width={80} height={32} className="h-16 w-auto" />
        </Link>
        {userId && (
          <Link
            href="/account"
            className="text-xs tracking-widest uppercase text-[#8B5E52] hover:text-[#F4845F] transition-colors"
            style={{ fontFamily: 'var(--font-josefin)' }}
          >
            My Account
          </Link>
        )}
      </nav>

      {/* HERO HEADER */}
      <div className="pt-32 pb-10 text-center px-4">
        <p className="text-xs font-medium text-[#F4845F] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: 'var(--font-josefin)' }}>✦ Your Studio ✦</p>
        <h1 className="text-5xl font-bold text-[#1C0A00] mb-3" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', fontWeight: '400' }}>
          The Glam Lab
        </h1>
        <p className="text-[#8B5E52] text-sm max-w-md mx-auto leading-relaxed">
          Build your personalized makeup routine in minutes. Upload your face, add your products, get your look.
        </p>
      </div>

      {/* WIZARD */}
      <div className="max-w-4xl mx-auto px-4 pb-24">
        <MakeupWizard userId={userId} />
      </div>

      {/* FOOTER */}
      <footer className="bg-[#FFF0E8] py-12 text-center border-t border-[#FFD4BC]">
        <Image src="/zanzan-logo.svg" alt="ZanZan" width={80} height={32} className="h-12 w-auto mx-auto mb-4" />
        <p className="text-[#8B5E52] text-xs tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-josefin)' }}>✦ serve your look ✦</p>
        <div className="flex justify-center gap-8 mb-6">
          <a href="#" className="text-xs text-[#8B5E52] hover:text-[#F4845F] tracking-widest uppercase transition-colors" style={{ fontFamily: 'var(--font-josefin)' }}>TikTok</a>
          <a href="#" className="text-xs text-[#8B5E52] hover:text-[#F4845F] tracking-widest uppercase transition-colors" style={{ fontFamily: 'var(--font-josefin)' }}>Instagram</a>
          <a href="#" className="text-xs text-[#8B5E52] hover:text-[#F4845F] tracking-widest uppercase transition-colors" style={{ fontFamily: 'var(--font-josefin)' }}>Pinterest</a>
        </div>
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
