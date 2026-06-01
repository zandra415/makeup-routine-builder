'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'

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

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFFAF5]/90 backdrop-blur-md border-b border-[#FFD4BC]/40 flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-6">
          {['Home', 'Glam Lab', 'Trending', 'Community', 'Account'].map((item) => (
            <Link
              key={item}
              href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
              className={`text-xs tracking-widest uppercase transition-colors duration-200 ${
                item === 'Account'
                  ? 'text-[#F4845F] border-b border-[#F4845F] pb-0.5'
                  : 'text-[#1C0A00] hover:text-[#F4845F]'
              }`}
              style={{ fontFamily: 'var(--font-josefin)' }}
            >
              {item}
            </Link>
          ))}
        </div>
        <Link href="/">
          <Image src="/zanzan-logo.svg" alt="ZanZan" width={80} height={32} className="h-16 w-auto" />
        </Link>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF0E8] border border-[#FFD4BC]">
          <span className="text-sm">👑</span>
          <span className="text-xs text-[#1C0A00] font-medium" style={{ fontFamily: 'var(--font-josefin)' }}>
            {routines.length * 50} Glow Points
          </span>
        </div>
      </nav>

      {/* HEADER */}
      <div className="pt-32 pb-10 text-center px-4">
        <p className="text-xs font-medium text-[#F4845F] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: 'var(--font-josefin)' }}>✦ Your Space ✦</p>
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
            <p className="text-[#8B5E52] text-sm mb-6">Head to the Glam Lab and build your first look</p>
            <Link href="/glam-lab" className="px-8 py-3 rounded-full bg-[#F4845F] text-white text-sm hover:bg-[#FFAA80] transition-all" style={{ fontFamily: 'var(--font-josefin)' }}>
              Go to Glam Lab →
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

      {/* FOOTER */}
      <footer className="bg-[#FFF0E8] py-12 text-center border-t border-[#FFD4BC]">
        <Image src="/zanzan-logo.svg" alt="ZanZan" width={80} height={32} className="h-12 w-auto mx-auto mb-4" />
        <p className="text-[#8B5E52] text-xs tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-josefin)' }}>✦ serve your look ✦</p>
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
