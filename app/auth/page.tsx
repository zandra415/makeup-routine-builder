'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/`
      }
    })
    if (!error) setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-[#FDF8F5] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-sm border border-rose-50">
          <div className="text-4xl mb-4">📬</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Check your email</h2>
          <p className="text-gray-500 text-sm">We sent a magic link to <strong>{email}</strong>. Click it to sign in.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDF8F5] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-sm border border-rose-50">
        <h1 className="text-2xl font-bold text-rose-900 mb-1">✦ Makeup Routine Builder</h1>
        <p className="text-gray-500 text-sm mb-6">Sign in to save your personalized routines.</p>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-rose-300"
        />
        <button
          onClick={handleSignIn}
          disabled={loading || !email.includes('@')}
          className="w-full bg-rose-600 text-white py-3 rounded-xl font-semibold hover:bg-rose-700 disabled:opacity-50 transition-all">
          {loading ? 'Sending…' : 'Send Magic Link'}
        </button>
      </div>
    </div>
  )
}
