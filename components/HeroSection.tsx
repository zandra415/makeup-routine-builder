'use client'

import Link from 'next/link'

// Hard-coded so positions are identical server + client (no hydration mismatch)
const PARTICLES = [
  { left:  5, color: '#E8714A', size: 3, dur: 14, delay:  0 },
  { left: 12, color: '#FFF8F5', size: 2, dur: 18, delay:  2 },
  { left: 19, color: '#FFCF40', size: 4, dur: 11, delay:  5 },
  { left: 27, color: '#F5A623', size: 3, dur: 16, delay:  1 },
  { left: 33, color: '#E8714A', size: 5, dur: 13, delay:  7 },
  { left: 40, color: '#FFF8F5', size: 2, dur: 20, delay:  3 },
  { left: 46, color: '#FFCF40', size: 4, dur: 15, delay:  9 },
  { left: 53, color: '#E8714A', size: 3, dur: 12, delay:  4 },
  { left: 59, color: '#F5A623', size: 5, dur: 17, delay:  6 },
  { left: 66, color: '#FFF8F5', size: 2, dur: 10, delay:  8 },
  { left: 72, color: '#FFCF40', size: 3, dur: 19, delay:  2 },
  { left: 78, color: '#E8714A', size: 4, dur: 14, delay: 11 },
  { left: 85, color: '#F5A623', size: 2, dur: 16, delay:  5 },
  { left: 91, color: '#FFF8F5', size: 5, dur: 13, delay: 14 },
  { left: 96, color: '#FFCF40', size: 3, dur: 11, delay:  3 },
  { left:  9, color: '#F5A623', size: 4, dur: 18, delay: 13 },
  { left: 24, color: '#E8714A', size: 2, dur: 15, delay:  7 },
  { left: 37, color: '#FFCF40', size: 3, dur: 12, delay: 10 },
  { left: 51, color: '#FFF8F5', size: 5, dur: 20, delay:  4 },
  { left: 64, color: '#F5A623', size: 3, dur: 14, delay: 12 },
  { left: 76, color: '#E8714A', size: 4, dur: 17, delay:  8 },
  { left: 88, color: '#FFCF40', size: 2, dur: 11, delay: 16 },
  { left: 16, color: '#E8714A', size: 3, dur: 13, delay:  6 },
  { left: 44, color: '#F5A623', size: 4, dur: 16, delay: 15 },
  { left: 82, color: '#FFF8F5', size: 5, dur: 19, delay:  9 },
]

export default function HeroSection() {
  return (
    <>
      <style>{`
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-1 { animation: heroIn 0.9s ease 0.2s  both; }
        .hero-2 { animation: heroIn 0.9s ease 0.45s both; }
        .hero-3 { animation: heroIn 0.9s ease 0.65s both; }
        .hero-4 { animation: heroIn 0.9s ease 0.85s both; }

        @keyframes glamOrb {
          0%, 100% { transform: scale(1);    opacity: 0.8; }
          50%       { transform: scale(1.18); opacity: 1; }
        }
        @keyframes floatUp {
          0%   { transform: translateY(100vh); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 0.9; }
          100% { transform: translateY(-120px); opacity: 0; }
        }
        @keyframes heroPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.35; transform: scale(0.75); }
        }
        @keyframes heroDrip {
          0%   { transform: scaleY(0); opacity: 0; }
          40%  { opacity: 1; }
          100% { transform: scaleY(1); opacity: 0; }
        }

@media (prefers-reduced-motion: reduce) {
          .hero-1, .hero-2, .hero-3, .hero-4 { animation: none; opacity: 1; transform: none; }
        }
      `}</style>

      <section style={{
        position: 'relative', minHeight: '100vh', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Video */}
        <video
          src="/startup_vid.mp4" autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        />

        {/* Warm gradient overlay */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(135deg, rgba(232,113,74,0.3) 0%, rgba(245,166,35,0.2) 100%)' }} />

        {/* Dark vignette — keeps text readable over video */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.6) 100%)' }} />

        {/* Glow orbs */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-100px', top: '20%', width: '400px', height: '400px', zIndex: 2, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,166,35,0.25), transparent 70%)', filter: 'blur(60px)', animation: 'glamOrb 4s ease-in-out infinite' }} />
        <div aria-hidden="true" style={{ position: 'absolute', right: '-100px', bottom: '20%', width: '400px', height: '400px', zIndex: 2, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,113,74,0.2), transparent 70%)', filter: 'blur(60px)', animation: 'glamOrb 4s ease-in-out 2s infinite' }} />

        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <div key={i} aria-hidden="true" style={{
            position: 'absolute', left: `${p.left}%`, bottom: '-10px',
            width: `${p.size}px`, height: `${p.size}px`, borderRadius: '50%',
            background: p.color, zIndex: 4,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animation: `floatUp ${p.dur}s linear ${p.delay}s infinite`,
          }} />
        ))}

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center', maxWidth: '860px', width: '100%',
          padding: '120px 24px 160px',
        }}>
          {/* Eyebrow label */}
          <p className="hero-1" style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: '15px', fontWeight: 700, letterSpacing: '0.16em',
            textTransform: 'uppercase', marginBottom: '24px',
            display: 'inline-flex', alignItems: 'center', gap: '12px',
            textShadow: '0 1px 8px rgba(0,0,0,0.35)',
          }}>
            <span aria-hidden="true" style={{ color: '#FFD45E', WebkitTextFillColor: '#FFD45E' }}>&#10022;</span>
            <span style={{
              background: 'linear-gradient(135deg, #FFE08A, #FFB347)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
              WebkitTextFillColor: 'transparent', color: 'transparent',
            }}>Built by Gen Z</span>
            <span aria-hidden="true" style={{ color: '#FFD45E', WebkitTextFillColor: '#FFD45E' }}>&#10022;</span>
          </p>

          {/* Headline */}
          <h1 className="hero-2" style={{
            fontFamily: 'var(--font-syne)', fontWeight: 800,
            fontSize: 'clamp(52px, 7vw, 96px)', lineHeight: 0.95,
            letterSpacing: '-0.04em', marginBottom: '28px',
          }}>
            <span style={{ display: 'block', color: '#ffffff' }}>Stop guessing.</span>
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, #FFCF40 0%, #F5A623 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Start serving.</span>
          </h1>

          {/* Subtext */}
          <p className="hero-3" style={{
            fontSize: '18px', color: 'rgba(255,255,255,0.75)',
            maxWidth: '480px', lineHeight: 1.65, marginBottom: '44px',
            fontFamily: 'var(--font-space-grotesk)', fontWeight: 400,
          }}>
            Every other beauty AI was built to sell you more products. We built one to help you use what you already have.
          </p>

          {/* CTAs */}
          <div className="hero-4" style={{ display: 'flex', justifyContent: 'center' }}>
            <Link href="/lumi-studio" style={{
              background: '#E8714A',
              color: 'white', borderRadius: '100px', padding: '16px 32px',
              fontSize: '15px', fontWeight: 600,
              fontFamily: 'var(--font-space-grotesk)', letterSpacing: '0.01em',
              textDecoration: 'none', display: 'inline-block',
              boxShadow: '0 4px 20px rgba(232, 113, 74, 0.4)',
              transition: 'all 0.2s ease',
            }}>Find My Look</Link>
          </div>
        </div>

        {/* Scroll hint — See How It Works */}
        <a href="#how-it-works" style={{
          position: 'absolute', bottom: '48px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10,
          textDecoration: 'none',
        }}>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, fontFamily: 'var(--font-josefin)' }}>See How It Works</span>
          <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '100%',
              background: 'rgba(255,255,255,0.6)', transformOrigin: 'top',
              animation: 'heroDrip 2s ease-in-out infinite',
            }} />
          </div>
        </a>

        {/* Bottom fade to peach — blends into Lumi section */}
        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-60 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, transparent, #FFE1C8)',
          zIndex: 2,
        }} />
      </section>
    </>
  )
}
