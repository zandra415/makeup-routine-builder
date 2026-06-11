'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { QRCodeSVG } from 'qrcode.react'
import { supabase } from '@/lib/supabase'

export default function AuthPage() {
  const [email, setEmail]           = useState('')
  const [sent, setSent]             = useState(false)
  const [loading, setLoading]       = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [googleError, setGoogleError] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [authUrl, setAuthUrl]       = useState('')
  const router = useRouter()

  useEffect(() => { setAuthUrl(window.location.origin + '/auth') }, [])

  useEffect(() => {
    if (!drawerOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setDrawerOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [drawerOpen])

  const handleMagicLink = async () => {
    if (!email || !email.includes('@')) return
    setLoading(true)
    try {
      await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin + '/lumi-studio' },
      })
      setSent(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleGuest = () => {
    sessionStorage.setItem('zanzan_guest', 'true')
    const intent = new URLSearchParams(window.location.search).get('intent')
    router.push(intent ? `/lumi-studio?intent=${intent}` : '/lumi-studio')
  }

  const handleGoogle = async () => {
    setGoogleError('')
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin + '/lumi-studio' },
      })
      if (error) setGoogleError(error.message)
    } catch {
      setGoogleError('Google sign-in unavailable.')
    }
  }

  return (
    <>
      <style>{`
        html, body { margin: 0; padding: 0; }
        .auth-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; }
        @media (max-width: 768px) {
          .auth-grid { grid-template-columns: 1fr !important; }
          .auth-left { min-height: 400px !important; }
          .auth-right { padding: 2rem 1.5rem !important; }
        }
        .auth-google-btn:hover { background: #EFEFEF !important; }
        .auth-submit-btn:hover { background: #E06848 !important; }
        .drawer-link { display: block; padding: 11px 16px; border-radius: 8px; font-size: 15px; font-weight: 500; color: rgba(255,248,238,0.8); text-decoration: none; border-left: 3px solid transparent; transition: background 0.15s, color 0.15s, border-color 0.15s; }
        .drawer-link:hover { background: rgba(242,115,75,0.18); color: #FFF8EE; border-left-color: #F2734B; }
        .auth-guest-btn:hover { background: #F2F2F2 !important; border-color: #BFBFBF !important; }
      `}</style>

      <div className="auth-grid" style={{ fontFamily: 'var(--font-space-grotesk)' }}>

        {/* ── LEFT PANEL ── */}
        <div className="auth-left" style={{ background: '#16241A', padding: '2rem', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

          {/* Wordmark */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: '22px', color: '#FFF8EE', marginBottom: '6px' }}>
              ZanZan<span style={{ color: '#F4A93F' }}>.</span>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(196,216,182,0.85)', lineHeight: 1.4, margin: 0 }}>
              Let&apos;s Build Your Best Look Today
            </p>
          </div>

          {/* Phones area */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: '280px' }}>
            {/* Orange circle backdrop */}
            <div aria-hidden style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: '#F2734B', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 0 }} />

            {/* Phones + chip */}
            <div style={{ position: 'relative', width: '270px', height: '270px', zIndex: 1 }}>

              {/* BACK PHONE — right, #F2EFE9, rotate 2deg, z=1 */}
              <div style={{ position: 'absolute', right: 0, top: 8, zIndex: 1, transform: 'rotate(2deg)', width: '138px', height: '258px', background: '#F2EFE9', borderRadius: '28px', padding: '6px', boxShadow: '0 10px 28px rgba(0,0,0,0.22)' }}>
                <div aria-hidden style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', width: '36px', height: '6px', background: '#DDD8D1', borderRadius: '100px', zIndex: 5 }} />
                <div style={{ width: '100%', height: '100%', borderRadius: '22px', background: '#FFFFFF', overflow: 'hidden', padding: '14px 10px 10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'linear-gradient(135deg, #F2734B, #F4A93F)', flexShrink: 0 }} />
                    <span style={{ fontSize: '9px', fontWeight: 700, color: '#2A1A12' }}>morning Lisa,</span>
                  </div>
                  <p style={{ fontSize: '8px', color: '#9C8B85', marginBottom: '8px', paddingLeft: '24px', margin: '0 0 8px 24px' }}>what&apos;s the look today?</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '7px', fontWeight: 700, color: '#2A1A12', letterSpacing: '0.04em' }}>By Vibe</span>
                    <span style={{ fontSize: '7px', color: '#F2734B' }}>See All</span>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '9px' }}>
                    <div style={{ flex: 1, background: '#FFF4D6', borderRadius: '8px', padding: '5px 6px' }}>
                      <div style={{ fontSize: '7px', fontWeight: 700, color: '#2A1A12', marginBottom: '2px' }}>Soft Glam</div>
                      <div style={{ fontSize: '6px', color: '#9C8B85' }}>6 looks</div>
                    </div>
                    <div style={{ flex: 1, background: '#FBE3EC', borderRadius: '8px', padding: '5px 6px' }}>
                      <div style={{ fontSize: '7px', fontWeight: 700, color: '#2A1A12', marginBottom: '2px' }}>Clean Girl</div>
                      <div style={{ fontSize: '6px', color: '#9C8B85' }}>4 looks</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '7px', fontWeight: 700, color: '#2A1A12', marginBottom: '5px' }}>Routines</div>
                  <div style={{ marginBottom: '5px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                      <span style={{ fontSize: '6px', color: '#2A1A12' }}>Golden Hour Glow</span>
                      <span style={{ fontSize: '6px', color: '#9C8B85' }}>7 of 10</span>
                    </div>
                    <div style={{ height: '3px', background: '#F0EBE6', borderRadius: '2px' }}>
                      <div style={{ width: '70%', height: '100%', background: '#7FB069', borderRadius: '2px' }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '6px', color: '#2A1A12', marginBottom: '3px' }}>Soft Matte for Beginners</div>
                    <div style={{ height: '3px', background: '#F0EBE6', borderRadius: '2px' }}>
                      <div style={{ width: '35%', height: '100%', background: '#F4A93F', borderRadius: '2px' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* FRONT PHONE — left, #1E1622, rotate -1deg, z=2 */}
              <div style={{ position: 'absolute', left: 0, top: 8, zIndex: 2, transform: 'rotate(-1deg)', width: '138px', height: '258px', background: '#1E1622', borderRadius: '28px', padding: '6px', boxShadow: '0 16px 40px rgba(0,0,0,0.45)' }}>
                <div aria-hidden style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', width: '36px', height: '6px', background: '#0F1A12', borderRadius: '100px', zIndex: 5 }} />
                <div style={{ width: '100%', height: '100%', borderRadius: '22px', background: '#16241A', overflow: 'hidden', padding: '18px 10px 10px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '88px', height: '78px', background: '#F4A93F', borderRadius: '42% 58% 55% 45% / 50% 44% 56% 50%', transform: 'rotate(-8deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#FFF8EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>💄</div>
                      <span aria-hidden style={{ position: 'absolute', top: '2px', right: '5px', fontSize: '8px', color: 'rgba(255,248,238,0.8)' }}>✦</span>
                      <span aria-hidden style={{ position: 'absolute', bottom: '4px', left: '3px', fontSize: '6px', color: 'rgba(255,248,238,0.6)' }}>✧</span>
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: '10px', fontWeight: 700, color: '#FFF8EE', lineHeight: 1.3, marginBottom: '4px' }}>Serve your look today</p>
                    <p style={{ fontSize: '7px', color: 'rgba(196,216,182,0.6)', lineHeight: 1.4, marginBottom: '7px' }}>AI beauty routines built for your face, in your hand</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '7px' }}>
                      <div style={{ width: '16px', height: '4px', background: '#F4A93F', borderRadius: '2px' }} />
                      <div style={{ width: '4px', height: '4px', background: 'rgba(255,255,255,0.3)', borderRadius: '50%' }} />
                      <div style={{ width: '4px', height: '4px', background: 'rgba(255,255,255,0.3)', borderRadius: '50%' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ background: '#F4845F', borderRadius: '100px', padding: '4px 12px' }}>
                        <span style={{ fontSize: '8px', fontWeight: 700, color: '#FFFFFF' }}>Next</span>
                      </div>
                      <span style={{ fontSize: '8px', color: 'rgba(196,216,182,0.45)' }}>Skip</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating chip */}
              <div aria-hidden style={{ position: 'absolute', right: '-18px', top: '52px', zIndex: 3, background: '#FBE3C9', borderRadius: '14px', padding: '7px 11px', boxShadow: '0 6px 18px rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: '13px' }}>👑</span>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#2A1A12' }}>250 Glow Pts</span>
              </div>

            </div>
          </div>

          {/* Store badges */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1C0A00', borderRadius: '10px', padding: '8px 14px', cursor: 'default', userSelect: 'none' as const }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="white" aria-hidden="true"><path d="M14.94 5.19A4.38 4.38 0 0016 2.15a4.32 4.32 0 00-2.89 1.5 4.08 4.08 0 00-1 2.94 3.61 3.61 0 002.83-1.4zm2.52 7.44a4.51 4.51 0 012.16-3.81 4.66 4.66 0 00-3.66-1.98c-1.56-.16-3 .91-3.83.91-.8 0-2.05-.89-3.38-.86A4.92 4.92 0 005.6 9.56C3.79 12.68 5.1 17.3 6.85 19.83c.89 1.25 1.96 2.65 3.36 2.6 1.35-.06 1.86-.87 3.5-.87 1.62 0 2.09.87 3.5.84 1.46-.03 2.39-1.27 3.27-2.53a11 11 0 001.46-2.91 4.36 4.36 0 01-2.48-4.33z"/></svg>
              <div>
                <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em', lineHeight: 1 }}>Download on the</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.3 }}>App Store</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1C0A00', borderRadius: '10px', padding: '8px 14px', cursor: 'default', userSelect: 'none' as const }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="white" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l1.984 1.148a1 1 0 010 1.687l-1.984 1.149-2.404-2.404 2.404-2.58zm-11.39-6.48l10.937 6.333-2.302 2.302-8.635-8.635z"/></svg>
              <div>
                <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em', lineHeight: 1 }}>GET IT ON</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.3 }}>Google Play</div>
              </div>
            </div>
          </div>

        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="auth-right" style={{ background: '#FFFFFF', padding: '3rem 3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ maxWidth: '380px', width: '100%', margin: '0 auto' }}>

            {!sent ? (
              <>
                {/* Z icon */}
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #F2734B, #F4A93F)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <span style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '18px', color: '#FFFFFF', lineHeight: 1 }}>Z</span>
                </div>

                {/* Heading */}
                <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 400, color: '#2A1A12', lineHeight: 1.1, marginBottom: '12px' }}>
                  Log in to ZanZan<span style={{ color: '#F2734B' }}>.</span>
                </h1>

                {/* Subtext */}
                <p style={{ fontSize: '14px', color: '#9C8B85', lineHeight: 1.65, marginBottom: '28px' }}>
                  Welcome back! Log in to pick up your routines, saved looks and Glow Points right where you left them.
                </p>

                {/* Google button */}
                <button
                  className="auth-google-btn"
                  onClick={handleGoogle}
                  style={{ width: '100%', background: '#F7F7F7', border: '1px solid #E8E2DE', borderRadius: '10px', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '14px', fontWeight: 500, color: '#2A1A12', cursor: 'pointer', fontFamily: 'var(--font-space-grotesk)', transition: 'background 0.15s', marginBottom: '6px' }}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Login with Google
                </button>
                {googleError && (
                  <p style={{ fontSize: '12px', color: '#C0392B', textAlign: 'center', marginBottom: '6px' }}>{googleError}</p>
                )}

                {/* Or divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0' }}>
                  <div style={{ flex: 1, height: '1px', background: '#EDE8E4' }} />
                  <span style={{ fontSize: '12px', color: '#B8A9A3', letterSpacing: '0.06em' }}>or</span>
                  <div style={{ flex: 1, height: '1px', background: '#EDE8E4' }} />
                </div>

                {/* Email field */}
                <div style={{ background: '#F7F7F7', borderRadius: '10px', padding: '10px 14px', marginBottom: '12px', border: '1px solid #EDE8E4', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#B8A9A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
                  </svg>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '10px', color: '#9C8B85', letterSpacing: '0.04em', marginBottom: '2px' }}>Email</div>
                    <input
                      type="email"
                      placeholder="yourname@mail.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleMagicLink()}
                      style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontSize: '14px', color: '#2A1A12', fontFamily: 'var(--font-space-grotesk)' }}
                    />
                  </div>
                </div>

                {/* Remember me + no password */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '7px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      style={{ width: '14px', height: '14px', accentColor: '#F4845F', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '13px', color: '#9C8B85' }}>Remember me</span>
                  </label>
                  <span style={{ fontSize: '12px', color: '#B8A9A3', textDecoration: 'underline', textUnderlineOffset: '3px', cursor: 'default' }}>No password needed ✦</span>
                </div>

                {/* Submit */}
                <button
                  className="auth-submit-btn"
                  onClick={handleMagicLink}
                  disabled={loading}
                  style={{ width: '100%', background: '#F4845F', border: 'none', borderRadius: '10px', padding: '15px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.12em', color: '#FFFFFF', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-space-grotesk)', boxShadow: '0 6px 20px rgba(244,132,95,0.4)', opacity: loading ? 0.7 : 1, transition: 'background 0.15s, opacity 0.15s', marginBottom: '20px' }}
                >
                  {loading ? 'SENDING…' : 'SEND MY LINK'}
                </button>

                {/* QR sign-in card */}
                {authUrl && (
                  <div style={{ background: '#FAF7F4', border: '1px solid #EFE8E2', borderRadius: '12px', padding: '14px', display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                    {/* QR tile */}
                    <div style={{ background: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '8px', padding: '8px', flexShrink: 0, position: 'relative', lineHeight: 0 }}>
                      <QRCodeSVG value={authUrl} size={76} fgColor="#2A1A12" bgColor="#FFFFFF" level="H" />
                      <div aria-hidden style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '20px', height: '20px', borderRadius: '50%', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#F4A93F', boxShadow: '0 0 0 2px #FFFFFF' }}>✦</div>
                    </div>
                    {/* Text */}
                    <div>
                      <p style={{ fontSize: '12.5px', fontWeight: 700, color: '#2A1A12', lineHeight: 1.35, marginBottom: '5px' }}>Scan to sign in on your phone</p>
                      <p style={{ fontSize: '12px', color: '#9C8B85', lineHeight: 1.45, margin: 0 }}>Point your camera — glow on the go.</p>
                    </div>
                  </div>
                )}

                {/* Guest divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0 14px' }}>
                  <div style={{ flex: 1, height: '1px', background: '#EAEAEA' }} />
                  <span style={{ fontSize: '11px', color: '#C4B8B2', letterSpacing: '0.05em' }}>or</span>
                  <div style={{ flex: 1, height: '1px', background: '#EAEAEA' }} />
                </div>

                {/* Continue as guest */}
                <button
                  className="auth-guest-btn"
                  onClick={handleGuest}
                  style={{ width: '100%', background: 'transparent', border: '1.5px dashed #D9D9D9', borderRadius: '10px', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px', fontWeight: 500, color: '#6B6B6B', cursor: 'pointer', fontFamily: 'var(--font-space-grotesk)', transition: 'background 0.15s, border-color 0.15s', marginBottom: '10px' }}
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#9B9B9B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                  Continue as guest
                </button>

                {/* Guest fine print */}
                <p style={{ fontSize: '9.5px', color: '#B5A79E', textAlign: 'center', lineHeight: 1.55, margin: 0 }}>
                  Guest mode doesn&apos;t save your results or routines — everything&apos;s gone when you leave. ✦
                </p>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #F2734B, #F4A93F)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '24px' }}>
                  ✉️
                </div>
                <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 400, color: '#2A1A12', marginBottom: '12px' }}>
                  Check your email ✦
                </h2>
                <p style={{ fontSize: '15px', color: '#9C8B85', lineHeight: 1.65, marginBottom: '28px' }}>
                  We sent a magic link to <strong style={{ color: '#F4845F' }}>{email}</strong>. Click it and you&apos;re in!
                </p>
                <button
                  onClick={() => setSent(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#B8A9A3', fontFamily: 'var(--font-space-grotesk)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  ← Use a different email
                </button>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* ── HAMBURGER BUTTON ── */}
      <button
        aria-label="Open navigation"
        onClick={() => setDrawerOpen(true)}
        style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 50, width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(255,255,255,0.95)', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', boxShadow: '0 8px 20px rgba(0,0,0,0.18)', padding: 0 }}
      >
        <span style={{ display: 'block', width: '16px', height: '2px', background: '#2A1A12', borderRadius: '2px' }} />
        <span style={{ display: 'block', width: '16px', height: '2px', background: '#2A1A12', borderRadius: '2px' }} />
        <span style={{ display: 'block', width: '10px', height: '2px', background: '#F2734B', borderRadius: '2px', alignSelf: 'flex-start', marginLeft: '13px' }} />
      </button>

      {/* ── BACKDROP ── */}
      {drawerOpen && (
        <div
          aria-hidden
          onClick={() => setDrawerOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 51, background: 'rgba(30,22,34,0.45)', backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }}
        />
      )}

      {/* ── DRAWER ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        style={{ position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 52, width: '280px', background: '#0F1A12', boxShadow: '-16px 0 40px rgba(0,0,0,0.35)', transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 300ms ease', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '20px', color: '#FFF8EE' }}>
            ZanZan<span style={{ color: '#F4A93F' }}>.</span>
          </span>
          <button
            aria-label="Close navigation"
            onClick={() => setDrawerOpen(false)}
            style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF8EE', fontSize: '14px', lineHeight: 1 }}
          >
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {([
            { label: 'Home',         href: '/' },
            { label: 'Lumi Studio',  href: '/lumi-studio' },
            { label: 'Trending',     href: '/trending' },
            { label: 'Community',    href: '/community' },
          ] as { label: string; href: string }[]).map(({ label, href }) => (
            <Link key={href} href={href} className="drawer-link" onClick={() => setDrawerOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Bottom tagline */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.12)', marginBottom: '16px' }} />
          <span style={{ fontSize: '12px', color: '#F4A93F', letterSpacing: '0.06em' }}>✦ Serve Your Look</span>
        </div>
      </div>

    </>
  )
}
