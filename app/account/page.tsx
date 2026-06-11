'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface Routine {
  id: string
  created_at: string
  desired_look: string
  routine_steps: {
    lookName: string
    estimatedTime: string
    steps: {
      stepNumber: number
      title: string
      product: string
      technique: string
      tip: string
    }[]
    finishingNotes: string
  }
}

export default function AccountPage() {
  const [user, setUser] = useState<any>(null)
  const [routines, setRoutines] = useState<Routine[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/auth'; return }
      setUser(user)
      const { data } = await supabase
        .from('routines')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      setRoutines(data || [])
      setLoading(false)
    }
    getUser()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) return (
    <div className="min-h-screen bg-[#FFFAF5] flex items-center justify-center">
      <p className="text-[#8B5E52] tracking-widest text-sm uppercase" style={{ fontFamily: 'var(--font-josefin)' }}>Loading your account...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#FFFAF5]">

      <Navbar />

      {/* HEADER */}
      <div className="pt-16 pb-10 text-center px-4">
        <p className="text-xs font-medium tracking-[0.3em] uppercase mb-3" style={{ fontFamily: 'var(--font-josefin)', color: '#C8960A' }}>✦ Your Space ✦</p>
        <h1 className="text-5xl text-[#1C0A00] mb-3" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', fontWeight: '400' }}>
          My Account
        </h1>
        <p className="text-[#8B5E52] text-sm">{user?.email}</p>
      </div>

      {/* STATS BAR */}
      <div className="max-w-4xl mx-auto px-4 mb-10">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Routines Saved', value: routines.length },
            { label: 'Looks Built', value: routines.length },
            { label: 'Glow Points', value: routines.length * 50 + ' ✦' }
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-3xl border border-[#FFD4BC] p-6 text-center" style={{ boxShadow: '0 2px 20px rgba(244,132,95,0.06)' }}>
              <p className="text-3xl font-bold text-[#F4845F] mb-1" style={{ fontFamily: 'var(--font-syne)' }}>{stat.value}</p>
              <p className="text-xs text-[#8B5E52] tracking-widest uppercase" style={{ fontFamily: 'var(--font-josefin)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ROUTINES */}
      <div className="max-w-4xl mx-auto px-4 pb-24">
        <h2 className="text-2xl text-[#1C0A00] mb-6" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>Your Saved Looks</h2>
        {routines.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-white border border-[#FFD4BC]">
            <p className="text-4xl mb-4">🪄</p>
            <p className="text-[#1C0A00] text-lg mb-2" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>No routines yet</p>
            <p className="text-[#8B5E52] text-sm mb-6">Head to the Lumi Studio and build your first look</p>
            <Link href="/lumi-studio" className="px-8 py-3 rounded-full bg-[#F4845F] text-white text-sm hover:bg-[#FFAA80] transition-all" style={{ fontFamily: 'var(--font-josefin)' }}>
              Go to Lumi Studio →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {routines.map((routine) => (
              <div key={routine.id} className="bg-white rounded-3xl border border-[#FFD4BC] overflow-hidden" style={{ boxShadow: '0 2px 20px rgba(244,132,95,0.06)' }}>
                <div
                  className="p-6 flex items-center justify-between cursor-pointer hover:bg-[#FFF5EE] transition-all"
                  onClick={() => setExpandedId(expandedId === routine.id ? null : routine.id)}
                >
                  <div>
                    <p className="text-xs text-[#F4845F] tracking-widest uppercase mb-1" style={{ fontFamily: 'var(--font-josefin)' }}>✦ {routine.desired_look}</p>
                    <h3 className="text-lg text-[#1C0A00]" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{routine.routine_steps?.lookName || 'My Routine'}</h3>
                    <p className="text-xs text-[#8B5E52] mt-1">{new Date(routine.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {routine.routine_steps?.estimatedTime}</p>
                  </div>
                  <span className="text-[#F4845F] text-xl">{expandedId === routine.id ? '↑' : '↓'}</span>
                </div>
                {expandedId === routine.id && (
                  <div className="px-6 pb-6 border-t border-[#FFD4BC]/50">
                    <div className="pt-4 space-y-4">
                      {routine.routine_steps?.steps?.map((step) => (
                        <div key={step.stepNumber} className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-[#FFF0E8] border border-[#FFD4BC] flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-[#F4845F] font-medium">{step.stepNumber}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#1C0A00] mb-0.5">{step.title}</p>
                            <p className="text-xs text-[#8B5E52]">{step.product} — {step.technique}</p>
                            {step.tip && <p className="text-xs text-[#F4845F] mt-1 italic">✦ {step.tip}</p>}
                          </div>
                        </div>
                      ))}
                      {routine.routine_steps?.finishingNotes && (
                        <div className="mt-4 p-4 rounded-2xl bg-[#FFF0E8] border border-[#FFD4BC]">
                          <p className="text-xs text-[#8B5E52] italic">{routine.routine_steps.finishingNotes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />

    </div>
  )
}
