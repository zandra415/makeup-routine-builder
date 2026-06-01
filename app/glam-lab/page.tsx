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
        <Link
          href="/auth"
          className="px-5 py-2 text-sm rounded-full bg-[#F4845F] text-white hover:bg-[#FFAA80] transition-colors duration-200"
          style={{ fontFamily: 'var(--font-josefin)' }}
        >
          {userId ? 'My Account' : 'Sign In'}
        </Link>
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
        <p className="text-[#C4977E] text-xs">© 2025 ZanZan Beauty Studio. All rights reserved.</p>
      </footer>

    </div>
  )
}
