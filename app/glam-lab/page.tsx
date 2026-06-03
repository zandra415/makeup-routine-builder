'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import MakeupWizard from '@/components/MakeupWizard'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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

      <Navbar />

      {/* HERO HEADER */}
      <div className="pt-16 pb-10 text-center px-4">
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

      <Footer />

    </div>
  )
}
