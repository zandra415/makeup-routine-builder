'use client'

import React, { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import LumiChat from '@/components/LumiChat'

// ─── Scroll animation utils ───────────────────────────────────────────────────

function hexToRgb(h: string): [number, number, number] {
  return [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)]
}
function lerpC(a: string, b: string, t: number): string {
  const [r1,g1,b1]=hexToRgb(a),[r2,g2,b2]=hexToRgb(b)
  return `rgb(${Math.round(r1+(r2-r1)*t)},${Math.round(g1+(g2-g1)*t)},${Math.round(b1+(b2-b1)*t)})`
}
function inv(v: number, a: number, b: number) { return Math.max(0, Math.min(1,(v-a)/(b-a))) }
function lerp(a: number, b: number, t: number) { return a+(b-a)*t }
function sceneOp(p: number, fi: number, fii: number, fo: number, foi: number) {
  if (p<=fi||p>=foi) return 0
  if (p<fii) return inv(p,fi,fii)
  if (p>fo)  return 1-inv(p,fo,foi)
  return 1
}
function sceneY(p: number, fi: number, fii: number, fo: number, foi: number): number {
  if (p <= fii) return lerp(80, 0, inv(p, fi, fii))
  if (p >= fo)  return lerp(0, -80, inv(p, fo, foi))
  return 0
}

// ─── Background color ─────────────────────────────────────────────────────────

function bgColor(p: number): string {
  if (p < 0.9) return '#D96A45'
  return lerpC('#D96A45', '#1C0A00', inv(p, 0.9, 1.0))
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { name: 'Home',        href: '/' },
  { name: 'Lumi Studio', href: '/lumi-studio' },
  { name: 'Trending',    href: '/trending' },
  { name: 'Community',   href: '/community' },
]

function GlamNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const logoGradient: React.CSSProperties = {
    fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '22px',
    background: 'linear-gradient(135deg, #E8714A 0%, #F5A623 100%)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    backgroundClip: 'text', textDecoration: 'none',
  }
  return (
    <nav style={{ position:'fixed',top:0,left:0,right:0,zIndex:100,background:'#FFFFFF',borderBottom:'1px solid rgba(232,113,74,0.12)' }}>
      <div className="glam-nav-desktop" style={{ display:'grid',gridTemplateColumns:'1fr auto 1fr',alignItems:'center',padding:'0 40px',height:'64px' }}>
        <div style={{ display:'flex',alignItems:'center',gap:'5px' }}>
          <Link href="/" style={logoGradient}>ZanZan</Link>
          <span aria-hidden="true" style={{ color:'#F5A623',fontSize:'13px',userSelect:'none' }}>✦</span>
        </div>
        <div style={{ display:'flex',gap:'28px',alignItems:'center' }}>
          {NAV_LINKS.map(link => {
            const active = pathname===link.href
            return (
              <Link key={link.name} href={link.href} style={{ fontFamily:'var(--font-space-grotesk)',fontSize:'13px',fontWeight:500,letterSpacing:'0.06em',textTransform:'uppercase',textDecoration:'none',color:active?'#2D1F1A':'rgba(45,31,26,0.7)',borderBottom:active?'1px solid #E8714A':'1px solid transparent',paddingBottom:'2px',transition:'color 0.2s' }}>{link.name}</Link>
            )
          })}
        </div>
        <div style={{ display:'flex',justifyContent:'flex-end' }}>
          <Link href="/account" style={{ fontFamily:'var(--font-space-grotesk)',fontSize:'13px',fontWeight:600,letterSpacing:'0.02em',textDecoration:'none',color:'white',background:'#E8714A',borderRadius:'999px',padding:'10px 22px',display:'inline-block',transition:'background 0.2s ease' }}>My Account</Link>
        </div>
      </div>
      <div className="glam-nav-mobile" style={{ display:'none',alignItems:'center',justifyContent:'space-between',padding:'0 20px',height:'56px' }}>
        <Link href="/" style={logoGradient}>ZanZan</Link>
        <button onClick={() => setOpen(o=>!o)} aria-label="Toggle menu" style={{ background:'none',border:'none',cursor:'pointer',color:'#2D1F1A',fontSize:'22px',lineHeight:1 }}>☰</button>
      </div>
      {open && (
        <div style={{ borderTop:'1px solid rgba(232,113,74,0.12)',padding:'16px 20px 24px',background:'#FFFFFF',display:'flex',flexDirection:'column',gap:'16px' }}>
          {[...NAV_LINKS,{name:'My Account',href:'/account'}].map(link => (
            <Link key={link.name} href={link.href} onClick={() => setOpen(false)} style={{ fontFamily:'var(--font-space-grotesk)',fontSize:'14px',fontWeight:500,letterSpacing:'0.04em',textTransform:'uppercase',textDecoration:'none',color:pathname===link.href?'#E8714A':'rgba(45,31,26,0.7)' }}>{link.name}</Link>
          ))}
        </div>
      )}
    </nav>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const GRAIN = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E"

const SCENE_DEFS = [
  { fi:-0.05, fii:0,    fo:0.12, foi:0.20 },
  { fi:0.15,  fii:0.22, fo:0.38, foi:0.46 },
  { fi:0.40,  fii:0.46, fo:0.58, foi:0.66 },
  { fi:0.61,  fii:0.67, fo:0.75, foi:0.83 },
  { fi:0.78,  fii:0.83, fo:0.89, foi:0.95 },
  { fi:0.90,  fii:0.94, fo:0.98, foi:1.01 },
]

interface BubbleData { left: string; size: number; opacity: number; duration: number; delay: number }

export default function GlamLabPage() {
  const [userId, setUserId]           = useState<string|undefined>(undefined)
  const [loading, setLoading]         = useState(true)
  const [finaleCount, setFinaleCount] = useState(0)
  const [bubbles, setBubbles]         = useState<BubbleData[]>([])

  const trackRef       = useRef<HTMLDivElement>(null)
  const bgRef          = useRef<HTMLDivElement>(null)
  const scrollHint     = useRef<HTMLDivElement>(null)
  const bubbleLayerRef = useRef<HTMLDivElement>(null)
  const finaleStarted  = useRef(false)

  // Scene refs
  const s1 = useRef<HTMLDivElement>(null)
  const s2 = useRef<HTMLDivElement>(null)
  const s3 = useRef<HTMLDivElement>(null)
  const s4 = useRef<HTMLDivElement>(null)
  const s5 = useRef<HTMLDivElement>(null)
  const s6 = useRef<HTMLDivElement>(null)
  const sceneRefs = [s1,s2,s3,s4,s5,s6]

  // Chat bubble refs
  const cb0 = useRef<HTMLDivElement>(null)
  const cb1 = useRef<HTMLDivElement>(null)
  const cb2 = useRef<HTMLDivElement>(null)
  const cb3 = useRef<HTMLDivElement>(null)
  const chatRefs = [cb0,cb1,cb2,cb3]

  // Dot refs
  const d0 = useRef<HTMLDivElement>(null)
  const d1 = useRef<HTMLDivElement>(null)
  const d2 = useRef<HTMLDivElement>(null)
  const d3 = useRef<HTMLDivElement>(null)
  const d4 = useRef<HTMLDivElement>(null)
  const d5 = useRef<HTMLDivElement>(null)
  const dotRefs = [d0,d1,d2,d3,d4,d5]

  // Sparkle refs
  const sp0 = useRef<HTMLSpanElement>(null)
  const sp1 = useRef<HTMLSpanElement>(null)
  const sp2 = useRef<HTMLSpanElement>(null)
  const sp3 = useRef<HTMLSpanElement>(null)
  const sparkRefs = [sp0,sp1,sp2,sp3]

  const scanLine = useRef<HTMLDivElement>(null)

  // Auth
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUserId(user?.id); setLoading(false)
    }
    getUser()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user) sessionStorage.removeItem('zanzan_guest')
      setUserId(session?.user?.id); setLoading(false)
    })
    return () => subscription.unsubscribe()
  }, [])

  // Generate bubbles client-side to avoid hydration mismatch
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setBubbles(Array.from({length: 120}, () => ({
      left:     `${Math.random() * 100}%`,
      size:     6 + Math.random() * 14,
      opacity:  0.35 + Math.random() * 0.35,
      duration: 6 + Math.random() * 9,
      delay:    Math.random() * 12,
    })))
  }, [])

  // Scroll-driven animation RAF loop
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    let rafId: number

    const tick = () => {
      const track = trackRef.current
      if (!track) { rafId = requestAnimationFrame(tick); return }

      const rect      = track.getBoundingClientRect()
      const scrollable = track.offsetHeight - window.innerHeight
      const p         = Math.max(0, Math.min(1, -rect.top / scrollable))

      // Background
      if (bgRef.current) bgRef.current.style.background = bgColor(p)

      // Bubble layer — fade out into finale
      if (bubbleLayerRef.current) {
        bubbleLayerRef.current.style.opacity = (1 - inv(p, 0.88, 0.95)).toString()
      }

      // Scroll hint
      if (scrollHint.current) scrollHint.current.style.opacity = (1-inv(p,0,0.05)).toString()

      // Scenes
      SCENE_DEFS.forEach(({fi,fii,fo,foi},i) => {
        const el = sceneRefs[i].current
        if (!el) return
        const op = sceneOp(p,fi,fii,fo,foi)
        el.style.opacity       = op.toString()
        el.style.transform     = `translateY(${sceneY(p,fi,fii,fo,foi)}px)`
        el.style.pointerEvents = op>0.05 ? 'auto' : 'none'
      })

      // Scan line (scene 3)
      if (scanLine.current) {
        scanLine.current.style.top = `${inv(p,0.42,0.63)*94}%`
      }

      // Chat bubbles (scene 4), staggered
      const bThresh = [0.645, 0.660, 0.675, 0.690]
      chatRefs.forEach((ref,i) => {
        if (!ref.current) return
        const bop = inv(p, bThresh[i], bThresh[i]+0.025)
        ref.current.style.opacity   = bop.toString()
        ref.current.style.transform = `translateY(${lerp(18,0,bop)}px)`
      })

      // Progress dots — white on coral, stay white on dark
      SCENE_DEFS.forEach(({fi,fii,fo,foi},i) => {
        const el = dotRefs[i].current
        if (!el) return
        const active = sceneOp(p,fi,fii,fo,foi) > 0.5
        el.style.background = active ? '#ffffff' : 'rgba(255,255,255,0.3)'
        el.style.transform  = active ? 'scale(1.45)' : 'scale(1)'
      })

      // Sparkles parallax
      const sparkData = [{sp:0.3,rs:45},{sp:-0.5,rs:-60},{sp:0.2,rs:30},{sp:-0.35,rs:-40}]
      sparkRefs.forEach((ref,i) => {
        if (!ref.current) return
        const d = sparkData[i]
        ref.current.style.transform = `translateY(${(p-0.5)*d.sp*140}px) rotate(${p*d.rs}deg)`
      })

      // Finale counter
      if (p >= 0.92 && !finaleStarted.current) {
        finaleStarted.current = true
        let count = 0
        const tid = window.setInterval(() => {
          count += 82
          if (count >= 2417) { count = 2417; window.clearInterval(tid) }
          setFinaleCount(count)
        }, 16)
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const router = useRouter()
  const handleUpload = () => router.push('/auth')

  if (loading) return (
    <div style={{ minHeight:'100vh',background:'#D96A45',display:'flex',alignItems:'center',justifyContent:'center' }}>
      <p style={{ fontFamily:'var(--font-space-grotesk)',color:'rgba(255,248,238,0.7)',fontSize:'13px',letterSpacing:'0.2em',textTransform:'uppercase' }}>Loading your studio...</p>
    </div>
  )

  return (
    <>
      <style>{`
        html, body { background: #D96A45 !important; }
        html { scroll-behavior: smooth; }
        @keyframes glamPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.35; transform:scale(0.75); }
        }
        @keyframes gl-rise {
          0%  { opacity:0; transform:translateY(0) scale(1); }
          15% { opacity:1; }
          100%{ opacity:0; transform:translateY(-100vh) scale(0.25); }
        }
        .glam-nav-desktop { display:grid !important; }
        .glam-nav-mobile  { display:none !important; }
        @media (max-width:768px) {
          .glam-nav-desktop { display:none !important; }
          .glam-nav-mobile  { display:flex !important; }
          .gl-two-col { grid-template-columns:1fr !important; gap:32px !important; }
          .gl-headline { font-size:clamp(40px,12vw,72px) !important; }
          .gl-stage { overflow-y:hidden; }
        }
        @media (prefers-reduced-motion:reduce) {
          .gl-track   { height:auto !important; }
          .gl-stage   { position:static !important; height:auto !important; overflow:visible !important; }
          .gl-scene   { position:static !important; opacity:1 !important; transform:none !important; pointer-events:auto !important; min-height:80vh; padding:80px 48px !important; }
          .gl-dots    { display:none !important; }
          .gl-bg      { position:fixed; }
          .gl-bubbles { display:none !important; }
        }
      `}</style>

      <div style={{ fontFamily:'var(--font-space-grotesk)', background:'#D96A45' }}>
        <GlamNav />

        {/* ── Scroll track ── */}
        <div ref={trackRef} className="gl-track" style={{ height:'650vh', position:'relative' }}>

          {/* ── Sticky stage ── */}
          <div className="gl-stage" style={{ position:'sticky', top:0, height:'100dvh', overflow:'hidden' }}>

            {/* Background layer */}
            <div ref={bgRef} className="gl-bg" style={{ position:'absolute', inset:0, background:'#D96A45', zIndex:0 }} />

            {/* Film grain */}
            <div aria-hidden className="gl-grain" style={{ position:'absolute', inset:0, backgroundImage:`url("${GRAIN}")`, opacity:0.3, mixBlendMode:'overlay', pointerEvents:'none', zIndex:1 }} />

            {/* Rising bubble particles */}
            <div ref={bubbleLayerRef} aria-hidden className="gl-bubbles" style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:3 }}>
              {bubbles.map((b, i) => (
                <div key={i} style={{
                  position:        'absolute',
                  bottom:          '-20px',
                  left:            b.left,
                  width:           `${b.size}px`,
                  height:          `${b.size}px`,
                  borderRadius:    '50%',
                  background:      `rgba(255,235,225,${b.opacity})`,
                  filter:          'blur(1.5px)',
                  animation:       `gl-rise ${b.duration}s ${b.delay}s infinite linear`,
                }} />
              ))}
            </div>

            {/* ── SCENE 1 — Hero ── */}
            <div ref={s1} className="gl-scene" style={{ position:'absolute', inset:0, zIndex:5, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'98px 24px 80px', willChange:'opacity,transform' }}>
              <div style={{ maxWidth:'800px', width:'100%', position:'relative', zIndex:1 }}>
                <h1 className="gl-headline" style={{ fontFamily:'var(--font-syne)', fontWeight:800, fontSize:'clamp(52px,9vw,110px)', lineHeight:0.95, letterSpacing:'-0.04em', marginBottom:'28px' }}>
                  <span style={{ display:'block', color:'#FFF8EE' }}>Let&apos;s build</span>
                  <span style={{ display:'block', background:'linear-gradient(135deg,#FFD23F 0%,#FFAA60 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>your look.</span>
                </h1>
                <p style={{ fontSize:'18px', color:'rgba(255,248,238,0.85)', maxWidth:'480px', lineHeight:1.6, margin:'0 auto 44px', fontWeight:400 }}>
                  Upload a selfie or tell us about you! Lumi takes it from there.
                </p>
              </div>
              {/* Scroll hint */}
              <div ref={scrollHint} style={{ position:'absolute', bottom:'32px', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'6px' }}>
                <span style={{ fontFamily:'var(--font-space-grotesk)', fontSize:'16px', fontWeight:600, letterSpacing:'0.2em', color:'rgba(255,248,238,0.85)', textTransform:'uppercase' }}>SCROLL ↓</span>
              </div>
            </div>

            {/* ── SCENE 2 — Step 01 ── */}
            <div ref={s2} className="gl-scene" style={{ position:'absolute', inset:0, zIndex:5, display:'flex', alignItems:'center', justifyContent:'center', padding:'80px 48px', paddingTop:'110px', opacity:0, willChange:'opacity,transform', pointerEvents:'none' }}>
              {/* Background depth blobs */}
              <div aria-hidden style={{ position:'absolute', top:'10%', right:'5%', width:'380px', height:'380px', background:'radial-gradient(circle, rgba(255,215,170,0.25), transparent 62%)', pointerEvents:'none', zIndex:0 }} />
              <div aria-hidden style={{ position:'absolute', bottom:'15%', left:'10%', width:'320px', height:'320px', background:'radial-gradient(circle, rgba(120,30,10,0.2), transparent 65%)', pointerEvents:'none', zIndex:0 }} />
              <span aria-hidden style={{ position:'absolute', top:'22%', left:'8%', fontSize:'18px', color:'rgba(255,248,238,0.3)', transform:'rotate(-15deg)', pointerEvents:'none', zIndex:0 }}>✦</span>
              <span aria-hidden style={{ position:'absolute', bottom:'20%', right:'9%', fontSize:'14px', color:'rgba(255,248,238,0.25)', transform:'rotate(20deg)', pointerEvents:'none', zIndex:0 }}>✦</span>

              <div className="gl-two-col" style={{ maxWidth:'1100px', width:'100%', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', alignItems:'center', position:'relative', zIndex:1 }}>
                {/* Left: text */}
                <div>
                  <div style={{ display:'inline-flex', background:'rgba(255,255,255,0.22)', borderRadius:'100px', padding:'5px 14px', marginBottom:'20px' }}>
                    <span style={{ fontFamily:'var(--font-space-grotesk)', fontSize:'11px', fontWeight:700, letterSpacing:'0.14em', color:'#FFFFFF', textTransform:'uppercase' }}>Step 01</span>
                  </div>
                  <h2 style={{ fontFamily:'var(--font-syne)', fontWeight:800, fontSize:'clamp(36px,5vw,68px)', letterSpacing:'-0.03em', lineHeight:0.95, marginBottom:'28px' }}>
                    <span style={{ display:'block', color:'#FFF3E4', textShadow:'0 3px 16px rgba(120,30,10,0.3)' }}>Snap Your</span>
                    <span style={{ display:'block', background:'linear-gradient(90deg, #FFD23F, #FFB347)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Selfie</span>
                  </h2>
                  <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.85)', letterSpacing:'2px', fontWeight:600, textTransform:'uppercase', marginBottom:'14px' }}>TWO WAYS IN —</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                    <Link href="/auth?intent=photo" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'#FFF8EE', color:'#B23C18', textDecoration:'none', borderRadius:'100px', padding:'14px 24px', fontSize:'14px', fontWeight:600, fontFamily:'var(--font-space-grotesk)', boxShadow:'0 10px 22px rgba(120,30,10,0.32), inset 0 1px 0 rgba(255,255,255,0.9)', transform:'rotate(-1.5deg)', width:'fit-content' }}>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#B23C18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
                      Take photo
                    </Link>
                    <Link href="/auth?intent=manual" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'rgba(255,255,255,0.16)', color:'#FFFFFF', textDecoration:'none', border:'1.5px solid rgba(255,255,255,0.55)', borderRadius:'100px', padding:'14px 24px', fontSize:'14px', fontWeight:500, fontFamily:'var(--font-space-grotesk)', backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)', transform:'rotate(1deg)', width:'fit-content' }}>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8h10M7 12h7M7 16h5"/></svg>
                      Describe your face
                    </Link>
                  </div>
                </div>

                {/* Right: video with depth */}
                <div style={{ position:'relative', display:'flex', justifyContent:'center' }}>
                  {/* Offset frosted frame */}
                  <div aria-hidden style={{ position:'absolute', inset:'-14px', borderRadius:'22px', background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.25)', transform:'rotate(2deg)', zIndex:0 }} />
                  {/* Video card */}
                  <div style={{ position:'relative', borderRadius:'16px', overflow:'hidden', boxShadow:'0 24px 50px rgba(120,30,10,0.4)', transform:'rotate(-1.5deg)', zIndex:1, width:'100%' }}>
                    <video src="/lumi-selfie-demo.mp4" autoPlay muted loop playsInline style={{ width:'100%', height:'300px', objectFit:'cover', display:'block' }} />
                    {/* ANALYZING badge */}
                    <div style={{ position:'absolute', bottom:'44px', left:'12px', background:'rgba(42,26,18,0.85)', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)', borderRadius:'20px', padding:'5px 12px', pointerEvents:'none' }}>
                      <span style={{ fontSize:'11px', fontWeight:700, color:'#fff', letterSpacing:'0.1em' }}>ANALYZING…</span>
                    </div>
                    {/* UNDERTONE badge */}
                    <div style={{ position:'absolute', bottom:'12px', left:'12px', background:'rgba(255,248,238,0.95)', borderRadius:'20px', padding:'5px 12px', pointerEvents:'none' }}>
                      <span style={{ fontSize:'11px', fontWeight:700, color:'#2D1F1A', letterSpacing:'0.06em' }}>UNDERTONE: WARM ✓</span>
                    </div>
                    {/* Camera corner — top-left */}
                    <div aria-hidden style={{ position:'absolute', top:'10px', left:'10px', width:'18px', height:'18px', borderTop:'2.5px solid rgba(255,255,255,0.9)', borderLeft:'2.5px solid rgba(255,255,255,0.9)', borderRadius:'3px 0 0 0', pointerEvents:'none' }} />
                    {/* Camera corner — bottom-right */}
                    <div aria-hidden style={{ position:'absolute', bottom:'10px', right:'10px', width:'18px', height:'18px', borderBottom:'2.5px solid rgba(255,255,255,0.9)', borderRight:'2.5px solid rgba(255,255,255,0.9)', borderRadius:'0 0 3px 0', pointerEvents:'none' }} />
                    {/* no filters sticker */}
                    <div aria-hidden style={{ position:'absolute', top:'-8px', right:'-8px', background:'#FFD23F', borderRadius:'20px', padding:'5px 11px', transform:'rotate(7deg)', boxShadow:'0 4px 14px rgba(120,30,10,0.3)', pointerEvents:'none', zIndex:2 }}>
                      <span style={{ fontSize:'11px', fontWeight:700, color:'#2A1A12', letterSpacing:'0.04em' }}>no filters ✦</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── SCENE 3 — Step 02 ── */}
            <div ref={s3} className="gl-scene" style={{ position:'absolute', inset:0, zIndex:5, display:'flex', alignItems:'center', justifyContent:'center', padding:'80px 48px', paddingTop:'110px', opacity:0, willChange:'opacity,transform', pointerEvents:'none' }}>
              <div className="gl-two-col" style={{ maxWidth:'1100px', width:'100%', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', alignItems:'center' }}>
                <div style={{ background:'rgba(255,255,255,0.12)', backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)', border:'1px solid rgba(255,255,255,0.3)', borderRadius:'20px', overflow:'hidden' }}>
                  <div style={{ height:'300px', position:'relative' }}>
                    <img src="/scanner-makeup.png" alt="Makeup products" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                    <div ref={scanLine} style={{ position:'absolute', left:0, right:0, top:'0%', height:'2px', background:'rgba(255,255,255,0.92)', boxShadow:'0 0 12px 4px rgba(255,255,255,0.55)', pointerEvents:'none', zIndex:2 }} />
                    <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', pointerEvents:'none' }}>
                      <div style={{ position:'relative', width:'120px', height:'120px' }}>
                        <div style={{ position:'absolute', top:0, left:0, width:'18px', height:'18px', borderTop:'2px solid rgba(255,255,255,0.85)', borderLeft:'2px solid rgba(255,255,255,0.85)', borderRadius:'3px 0 0 0' }} />
                        <div style={{ position:'absolute', top:0, right:0, width:'18px', height:'18px', borderTop:'2px solid rgba(255,255,255,0.85)', borderRight:'2px solid rgba(255,255,255,0.85)', borderRadius:'0 3px 0 0' }} />
                        <div style={{ position:'absolute', bottom:0, left:0, width:'18px', height:'18px', borderBottom:'2px solid rgba(255,255,255,0.85)', borderLeft:'2px solid rgba(255,255,255,0.85)', borderRadius:'0 0 0 3px' }} />
                        <div style={{ position:'absolute', bottom:0, right:0, width:'18px', height:'18px', borderBottom:'2px solid rgba(255,255,255,0.85)', borderRight:'2px solid rgba(255,255,255,0.85)', borderRadius:'0 0 3px 0' }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div style={{ display:'inline-flex', background:'rgba(255,255,255,0.22)', borderRadius:'100px', padding:'5px 14px', marginBottom:'20px' }}>
                    <span style={{ fontFamily:'var(--font-space-grotesk)', fontSize:'11px', fontWeight:700, letterSpacing:'0.14em', color:'#FFFFFF', textTransform:'uppercase' }}>Step 02</span>
                  </div>
                  <h2 style={{ fontFamily:'var(--font-syne)', fontWeight:800, fontSize:'clamp(36px,5vw,68px)', color:'#FFFFFF', letterSpacing:'-0.03em', lineHeight:0.95, marginBottom:'24px' }}>
                    Scan Your<br />Products
                  </h2>
                  <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.9)', letterSpacing:'0.07em', fontWeight:600, textTransform:'uppercase', marginBottom:'8px' }}>POINT YOUR CAMERA</p>
                  <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.6)', fontWeight:400 }}>our scanner reads the rest</p>
                </div>
              </div>
            </div>

            {/* ── SCENE 4 — Step 03 ── */}
            <div ref={s4} className="gl-scene" style={{ position:'absolute', inset:0, zIndex:5, display:'flex', alignItems:'center', justifyContent:'center', padding:'80px 48px', paddingTop:'110px', opacity:0, willChange:'opacity,transform', pointerEvents:'none' }}>
              <div className="gl-two-col" style={{ maxWidth:'1100px', width:'100%', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', alignItems:'center' }}>
                <div>
                  <div style={{ display:'inline-flex', background:'rgba(255,255,255,0.22)', borderRadius:'100px', padding:'5px 14px', marginBottom:'20px' }}>
                    <span style={{ fontFamily:'var(--font-space-grotesk)', fontSize:'11px', fontWeight:700, letterSpacing:'0.14em', color:'#FFFFFF', textTransform:'uppercase' }}>Step 03</span>
                  </div>
                  <h2 style={{ fontFamily:'var(--font-syne)', fontWeight:800, fontSize:'clamp(36px,5vw,68px)', color:'#FFFFFF', letterSpacing:'-0.03em', lineHeight:0.95, marginBottom:'24px' }}>
                    Get Your<br />Matches
                  </h2>
                  <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.75)', lineHeight:1.65 }}>
                    Ranked for your face — plus budget dupes for everything.
                  </p>
                </div>
                {/* Lumi chat card */}
                <div style={{ background:'rgba(255,255,255,0.95)', borderRadius:'20px', padding:'20px', boxShadow:'0 8px 40px rgba(0,0,0,0.15)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'14px', paddingBottom:'12px', borderBottom:'1px solid rgba(45,31,26,0.08)' }}>
                    <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:'linear-gradient(135deg,#E8714A,#F5A623)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-syne)', fontWeight:700, fontSize:'13px', color:'white', boxShadow:'0 0 16px rgba(232,113,74,0.4)', flexShrink:0 }}>L</div>
                    <span style={{ fontSize:'13px', fontWeight:600, color:'#2D1F1A' }}>Lumi</span>
                    <span aria-hidden style={{ marginLeft:'auto', width:'7px', height:'7px', borderRadius:'50%', background:'#22C55E', display:'block', boxShadow:'0 0 6px rgba(34,197,94,0.8)', animation:'glamPulse 2s ease-in-out infinite' }} />
                  </div>
                  {[
                    { type:'text',  content:"For your warm undertones, here are three blushes from your stash that'll look fire 🔥" },
                    { type:'item',  name:'Peach Crush', swatch:'#E8847A', badge:'BEST MATCH' },
                    { type:'item',  name:'Rosewood',    swatch:'#C4617A', badge:null },
                    { type:'item',  name:'Sun Glow',    swatch:'#E89E7A', badge:null },
                  ].map((item,i) => (
                    <div key={i} ref={chatRefs[i]} style={{ opacity:0, transform:'translateY(18px)', marginBottom:'8px', transition:'none' }}>
                      {item.type==='text'
                        ? <p style={{ fontSize:'13px', color:'#8C6B5E', lineHeight:1.5 }}>{item.content}</p>
                        : <div style={{ display:'flex', alignItems:'center', gap:'8px', background:'rgba(232,113,74,0.06)', borderRadius:'8px', padding:'8px 10px' }}>
                            <div style={{ width:'16px', height:'16px', borderRadius:'50%', background:item.swatch, flexShrink:0 }} />
                            <span style={{ fontSize:'13px', color:'#2D1F1A', flex:1 }}>{item.name}</span>
                            {item.badge && <span style={{ fontSize:'9px', fontWeight:700, color:'#E8714A', letterSpacing:'0.08em', textTransform:'uppercase' }}>{item.badge}</span>}
                          </div>
                      }
                    </div>
                  ))}
                  <button style={{ background:'none', border:'none', cursor:'pointer', padding:'4px 0 0', fontSize:'12px', color:'#E8714A', textDecoration:'underline', textUnderlineOffset:'3px', fontFamily:'var(--font-space-grotesk)' }}>find dupes for these</button>
                </div>
              </div>
            </div>

            {/* ── SCENE 5 — Capability pills ── */}
            <div ref={s5} className="gl-scene" style={{ position:'absolute', inset:0, zIndex:5, display:'flex', alignItems:'center', justifyContent:'center', padding:'80px 48px', paddingTop:'110px', opacity:0, willChange:'opacity,transform', pointerEvents:'none', textAlign:'center' }}>
              <div style={{ maxWidth:'820px', width:'100%' }}>
                <h2 style={{ fontFamily:'var(--font-syne)', fontWeight:800, fontSize:'clamp(36px,5vw,56px)', color:'#FFF8EE', letterSpacing:'-0.02em', lineHeight:1.1, marginBottom:'48px' }}>
                  Everything{' '}
                  <span style={{ background:'linear-gradient(135deg,#FFD23F,#FFAA60)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Lumi</span>
                  {' '}can do
                </h2>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'12px', justifyContent:'center' }}>
                  {([
                    ['Shade matching AI',      '-2deg'  ],
                    ['Budget-friendly dupes',  '1.5deg' ],
                    ['Skincare compatibility', '-1deg'  ],
                    ['Day & night looks',      '2deg'   ],
                    ['Instant analysis',       '-1.5deg'],
                    ['Trend-first picks',      '1deg'   ],
                  ] as [string,string][]).map(([label,rot]) => (
                    <span key={label} style={{ background:'#FFFFFF', border:'1.5px solid #F0C9B0', borderRadius:'100px', padding:'12px 22px', fontSize:'14px', color:'#2D1F1A', boxShadow:'0 3px 16px rgba(232,100,60,0.14)', transform:`rotate(${rot})`, display:'inline-block' }}>{label}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── SCENE 6 — Finale ── */}
            <div ref={s6} className="gl-scene" style={{ position:'absolute', inset:0, zIndex:5, display:'flex', alignItems:'center', justifyContent:'center', padding:'80px 48px', paddingTop:'110px', opacity:0, willChange:'opacity,transform', pointerEvents:'none', textAlign:'center' }}>
              <div aria-hidden style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 50% at 50% 50%,rgba(244,169,63,0.35),transparent 70%)', filter:'blur(30px)', pointerEvents:'none' }} />
              <div style={{ position:'relative', zIndex:1, maxWidth:'700px', width:'100%' }}>
                <h2 style={{ fontFamily:'var(--font-syne)', fontWeight:800, fontSize:'clamp(48px,8vw,92px)', letterSpacing:'-0.04em', lineHeight:0.92, marginBottom:'28px', background:'linear-gradient(135deg,#F4A93F 0%,#E8643C 35%,#D4537E 65%,#9B5CFF 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                  Your era starts now.
                </h2>
                <p style={{ fontSize:'17px', color:'rgba(255,255,255,0.7)', lineHeight:1.6, marginBottom:'44px' }}>
                  Join <strong style={{ color:'#F4A93F' }}>{finaleCount.toLocaleString()}</strong> building their signature look this week
                </p>
                <button onClick={handleUpload} style={{ background:'linear-gradient(135deg,#F4A93F,#E8643C)', color:'white', border:'none', borderRadius:'100px', padding:'18px 44px', fontSize:'16px', fontWeight:700, fontFamily:'var(--font-space-grotesk)', cursor:'pointer', boxShadow:'0 6px 32px rgba(232,100,60,0.55)', letterSpacing:'0.01em', transition:'all 0.2s ease' }}>
                  Start Building Your Look
                </button>
              </div>
            </div>

            {/* ── Progress dots ── */}
            <div className="gl-dots" style={{ position:'absolute', right:'20px', top:'50%', transform:'translateY(-50%)', display:'flex', flexDirection:'column', gap:'10px', zIndex:20 }}>
              {[d0,d1,d2,d3,d4,d5].map((ref,i) => (
                <div key={i} ref={ref} style={{ width:'8px', height:'8px', borderRadius:'50%', background:i===0?'#ffffff':'rgba(255,255,255,0.3)', transition:'background 0.3s, transform 0.3s', transformOrigin:'center', flexShrink:0 }} />
              ))}
            </div>

            {/* ── Sparkles ── */}
            {([
              { x:'10%', y:'32%', size:12 },
              { x:'87%', y:'54%', size:9  },
              { x:'16%', y:'70%', size:10 },
              { x:'80%', y:'20%', size:14 },
            ] as {x:string,y:string,size:number}[]).map((s,i) => (
              <span key={i} ref={sparkRefs[i]} aria-hidden style={{ position:'absolute', left:s.x, top:s.y, fontSize:`${s.size}px`, color:'rgba(255,210,63,0.7)', pointerEvents:'none', userSelect:'none', zIndex:8 }}>✦</span>
            ))}

          </div>{/* end sticky stage */}
        </div>{/* end scroll track */}

        {/* ── Footer (unchanged) ── */}
        <footer style={{ borderTop:'1px solid rgba(232, 113, 74, 0.12)', background:'#FFF8F5' }}>
          <div className="glam-section" style={{ maxWidth:'1200px', margin:'0 auto', padding:'80px 40px 0' }}>
            <div className="glam-footer-grid" style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'40px', paddingBottom:'64px' }}>
              <div>
                <span style={{ fontFamily:'var(--font-syne)', fontWeight:800, fontSize:'22px', background:'linear-gradient(135deg, #E8714A 0%, #F5A623 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', display:'inline-block', marginBottom:'16px' }}>ZanZan</span>
                <p style={{ fontSize:'14px', color:'#8C6B5E', lineHeight:1.65, maxWidth:'280px' }}>Beauty routines built for you. Personalized looks for every occasion, every budget, every time.</p>
              </div>
              {[
                { heading:'Explore',  links:['Lumi Studio','Trending','Community','Blog'] },
                { heading:'Account',  links:['Sign Up','Log In','My Routines','Saved Looks'] },
                { heading:'Company',  links:['About','Press','Careers','Contact'] },
              ].map(col => (
                <div key={col.heading}>
                  <p style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.12em', color:'#2D1F1A', textTransform:'uppercase', marginBottom:'20px' }}>{col.heading}</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                    {col.links.map(link => (
                      <a key={link} href="#" style={{ fontSize:'14px', color:'#8C6B5E', textDecoration:'none', transition:'color 0.15s' }}
                        onMouseEnter={e => (e.currentTarget.style.color='#E8714A')}
                        onMouseLeave={e => (e.currentTarget.style.color='#8C6B5E')}
                      >{link}</a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderTop:'1px solid rgba(232,113,74,0.12)', padding:'24px 0', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px' }}>
              <span style={{ fontSize:'13px', color:'#B89080' }}>© 2024 ZanZan. All rights reserved.</span>
              <div style={{ display:'flex', gap:'24px' }}>
                {['Privacy Policy','Terms of Service','Cookie Policy'].map(link => (
                  <a key={link} href="#" style={{ fontSize:'13px', color:'#B89080', textDecoration:'none', transition:'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color='#8C6B5E')}
                    onMouseLeave={e => (e.currentTarget.style.color='#B89080')}
                  >{link}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>

        <LumiChat />
      </div>
    </>
  )
}
