'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Barcode } from '@phosphor-icons/react'

const NAV_LINKS = [
  { name: 'Home',      href: '/' },
  { name: 'Glam Lab', href: '/glam-lab' },
  { name: 'Trending',  href: '/trending' },
  { name: 'Community', href: '/community' },
  { name: 'Account',   href: '/account' },
]


export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [selectedLook, setSelectedLook] = useState<string | null>(null)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }

        .fade-up {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.is-visible { opacity: 1; transform: translateY(0); }
        .delay-1 { transition-delay: 0.15s; }
        .delay-2 { transition-delay: 0.30s; }
        .delay-3 { transition-delay: 0.45s; }

        @keyframes heroIn {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-1 { animation: heroIn 0.9s ease 0.2s both; }
        .hero-2 { animation: heroIn 0.9s ease 0.45s both; }
        .hero-3 { animation: heroIn 0.9s ease 0.65s both; }
        .hero-4 { animation: heroIn 0.9s ease 0.85s both; }

        @keyframes drawLine {
          from { width: 0; opacity: 0; }
          to   { width: 80px; opacity: 1; }
        }
        .headline-line { animation: drawLine 1.5s ease 1s both; }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(244,132,95,0.45); }
          50%       { box-shadow: 0 0 0 8px rgba(244,132,95,0); }
        }
        .btn-pulse { animation: pulse-glow 2.5s ease-in-out infinite; }

        section[id] { scroll-margin-top: 80px; }
      `}</style>

      <nav className={`fixed top-0 left-0 right-0 z-50 px-8 py-4 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-sm border-b border-[#FFD4BC]' : 'bg-transparent'
      }`}>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveTab(link.name)}
                  className={`text-xs font-medium whitespace-nowrap pb-0.5 tracking-widest uppercase transition-all ${
                    activeTab === link.name
                      ? scrolled ? 'text-[#F4845F] border-b border-[#F4845F]' : 'text-white border-b border-white'
                      : scrolled ? 'text-[#8B5E52] hover:text-[#F4845F]' : 'text-white/80 hover:text-white'
                  }`}
                  style={{ fontFamily: 'var(--font-josefin)' }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <button
              className={`md:hidden text-2xl leading-none ${scrolled ? 'text-[#F4845F]' : 'text-white'}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Menu"
            >
              ☰
            </button>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none">
            <img src="/zanzan-logo.svg" alt="ZanZan" className="h-16 w-auto" />
          </div>
          <a href="/account" className="px-5 py-2 rounded-full bg-[#F4845F] text-white text-[10px] tracking-widest uppercase hover:bg-[#FFAA80] transition-colors duration-200" style={{ fontFamily: 'var(--font-josefin)' }}>
            Sign in to earn Glow Points →
          </a>
        </div>
        {menuOpen && (
          <div className={`md:hidden mt-3 pb-4 border-t flex flex-col gap-4 pt-4 ${scrolled ? 'border-[#FFD4BC]' : 'border-white/20'}`}>
            {NAV_LINKS.map(link => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => { setActiveTab(link.name); setMenuOpen(false) }}
                className={`text-sm font-medium text-left tracking-widest uppercase transition-all ${
                  scrolled ? activeTab === link.name ? 'text-[#F4845F]' : 'text-[#8B5E52]' : 'text-white/90'
                }`}
                style={{ fontFamily: 'var(--font-josefin)' }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <section className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center text-center px-4">
        <video src="/startup_vid.mp4" autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
          <p className="hero-1 text-xs font-medium text-[#FFAA80] tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-josefin)' }}>
            ✦ &nbsp; serve your look &nbsp; ✦
          </p>
          <h1 className="hero-2 font-serif italic font-bold text-white text-5xl md:text-7xl leading-tight mb-4">
            Stop guessing.<br />Start serving.
          </h1>
          <div className="hero-2 flex justify-center mb-8">
            <div className="headline-line h-0.5 bg-[#FFAA80] rounded-full" />
          </div>
          <p className="hero-3 text-base md:text-lg text-white/80 max-w-lg leading-relaxed mb-10">
            ZanZan builds your personalized makeup routine for any occasion. Skip the tutorials, ditch the guesswork.
          </p>
          <div className="hero-4 flex flex-row gap-6">
            <Link href="/app" className="bg-gradient-to-r from-[#F4845F] to-[#FFAA80] text-white text-sm font-medium px-7 py-3 rounded-full hover:scale-105 transition-all shadow-md">
              Build My Routine
            </Link>
            <a href="#how-it-works" className="border border-white text-white text-sm font-medium px-7 py-3 rounded-full hover:bg-white hover:text-[#F4845F] transition-all">
              See How It Works
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#FFFAF5] z-10 pointer-events-none" />
        <div className="absolute bottom-8 z-20 flex flex-col items-center gap-1">
          <a href="#how-it-works" className="flex flex-col items-center gap-1 group">
            <span className="text-xs text-white/60 group-hover:text-white transition-colors" style={{ fontFamily: 'var(--font-josefin)' }}>scroll to explore</span>
            <span className="text-white text-xl animate-bounce">↓</span>
          </a>
        </div>
      </section>

      <section id="how-it-works" className="bg-[#FFFAF5] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-medium text-[#F4845F] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: 'var(--font-josefin)' }}>✦ The Process</p>
            <h2 className="text-6xl font-bold text-[#1C0A00] mb-4" style={{ fontFamily: 'var(--font-syne)', fontWeight: '800' }}>Three Steps to Your Look</h2>
            <p className="text-[#8B5E52] text-sm max-w-lg mx-auto leading-relaxed">It is simple. Upload your face. Add your products. Get your personalized routine in minutes.</p>
          </div>
          <div className="grid grid-cols-3 gap-4 items-start">

            <div
              className="rounded-2xl shadow-sm relative overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-2"
              style={{ minHeight: '420px', background: hoveredStep === 0 ? '#C7522A' : '#FFB899', boxShadow: hoveredStep === 0 ? '0 12px 40px rgba(244,132,95,0.2)' : undefined }}
              onMouseEnter={() => setHoveredStep(0)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <div className="h-3 rounded-t-2xl bg-[#FFB899]" />
              <div className="p-8 relative overflow-hidden">
                <span className="absolute top-4 right-6 text-[8rem] font-bold leading-none select-none pointer-events-none transition-colors duration-500" style={{ fontFamily: 'var(--font-syne)', color: 'rgba(255,255,255,0.1)' }}>01</span>
                <div className="relative z-10 h-full flex flex-col">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mb-6"><circle cx="20" cy="20" r="18" stroke="white" strokeWidth="1.5"/><line x1="20" y1="12" x2="20" y2="28" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><line x1="12" y1="20" x2="28" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  <h3 className="text-2xl mb-4 text-white" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '300' }}>Upload Your Face</h3>
                  {hoveredStep === 0 ? (
                    <div className="space-y-3 flex-1">
                      <p className="text-sm text-white/90 leading-relaxed">Here is how to get the best results:</p>
                      <ul className="space-y-2">
                        {['Face the camera straight on in good lighting', 'Remove glasses and pull hair back', 'Use a recent clear photo, no filters', 'Natural daylight works best'].map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-white/80"><span className="text-white mt-0.5">✦</span>{tip}</li>
                        ))}
                      </ul>
                      <a href="/glam-lab" className="inline-block mt-4 px-6 py-2 rounded-full bg-white text-[#F4845F] text-xs tracking-widest uppercase hover:bg-[#FFF0E8] transition-all" style={{ fontFamily: 'var(--font-josefin)' }}>Start Here →</a>
                    </div>
                  ) : (
                    <div className="flex-1">
                      <p className="text-sm text-white/80 leading-relaxed mb-6">Snap a selfie or build your avatar. We read your face shape, skin tone, eye shape, and more.</p>
                      <div className="rounded-2xl border-2 border-dashed border-white/40 bg-white/10 p-5 text-center"><p className="text-xs text-white/80">drop your selfie or tap to upload ✨</p></div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl shadow-sm relative overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-2"
              style={{ minHeight: '420px', background: hoveredStep === 1 ? '#C7522A' : '#F4845F', boxShadow: hoveredStep === 1 ? '0 12px 40px rgba(244,132,95,0.2)' : undefined }}
              onMouseEnter={() => setHoveredStep(1)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <div className="h-3 rounded-t-2xl bg-[#F4845F]" />
              <div className="p-8 relative overflow-hidden">
                <span className="absolute top-4 right-6 text-[8rem] font-bold leading-none select-none pointer-events-none transition-colors duration-500" style={{ fontFamily: 'var(--font-syne)', color: 'rgba(255,255,255,0.1)' }}>02</span>
                <div className="relative z-10 h-full flex flex-col">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mb-6"><rect x="8" y="8" width="24" height="28" rx="3" stroke="white" strokeWidth="1.5"/><line x1="14" y1="16" x2="26" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><line x1="14" y1="22" x2="22" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  <h3 className="text-2xl mb-4 text-white" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '300' }}>Add Your Products</h3>
                  {hoveredStep === 1 ? (
                    <div className="space-y-3 flex-1">
                      <p className="text-sm text-white/90 leading-relaxed">Tips for adding your products:</p>
                      <ul className="space-y-2">
                        {['Include brand and product name for best results', 'Add as many or as few as you have', 'Any brand works, drugstore to luxury', 'Include skincare products too'].map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-white/80"><span className="text-white mt-0.5">✦</span>{tip}</li>
                        ))}
                      </ul>
                      <a href="/glam-lab" className="inline-block mt-4 px-6 py-2 rounded-full bg-white text-[#F4845F] text-xs tracking-widest uppercase hover:bg-[#FFF0E8] transition-all" style={{ fontFamily: 'var(--font-josefin)' }}>Add Products →</a>
                    </div>
                  ) : (
                    <div className="flex-1">
                      <p className="text-sm text-white/80 leading-relaxed mb-6">Tell us what is in your makeup bag. Any brand, any shade. We work with what you already own.</p>
                      <input type="text" placeholder="e.g. Rare Beauty, NARS, e.l.f." className="w-full px-4 py-3 text-sm rounded-full border border-white/40 bg-white/20 text-white outline-none focus:border-white placeholder-white/60" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl shadow-sm relative overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-2"
              style={{ minHeight: '420px', background: hoveredStep === 2 ? '#A03D1A' : '#C7522A', boxShadow: hoveredStep === 2 ? '0 12px 40px rgba(244,132,95,0.2)' : undefined }}
              onMouseEnter={() => setHoveredStep(2)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <div className="h-3 rounded-t-2xl bg-[#C7522A]" />
              <div className="p-8 relative overflow-hidden">
                <span className="absolute top-4 right-6 text-[8rem] font-bold leading-none select-none pointer-events-none text-white/10" style={{ fontFamily: 'var(--font-syne)' }}>03</span>
                <div className="relative z-10 h-full flex flex-col">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mb-6"><path d="M20 8 L24 16 L34 16 L26 22 L30 32 L20 26 L10 32 L14 22 L6 16 L16 16 Z" stroke="white" strokeWidth="1.5" fill="none" strokeLinejoin="round"/></svg>
                  <h3 className="text-2xl text-white mb-4" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '300' }}>Get Your Routine</h3>
                  {hoveredStep === 2 ? (
                    <div className="space-y-3 flex-1">
                      <p className="text-sm text-white/90 leading-relaxed">What your routine includes:</p>
                      <ul className="space-y-2">
                        {['Step by step application instructions', 'Techniques tailored to your face shape', 'Product placement specific to your features', 'Pro tips from AI trained on expert techniques'].map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-white/80"><span className="text-white mt-0.5">✦</span>{tip}</li>
                        ))}
                      </ul>
                      <a href="/glam-lab" className="inline-block mt-4 px-6 py-2 rounded-full bg-white text-[#F4845F] text-xs tracking-widest uppercase hover:bg-[#FFF0E8] transition-all" style={{ fontFamily: 'var(--font-josefin)' }}>Get My Routine →</a>
                    </div>
                  ) : (
                    <div className="flex-1">
                      <p className="text-sm text-white/80 leading-relaxed mb-6">Pick a look and receive a personalized step by step routine built just for your face.</p>
                      <div className="flex flex-wrap gap-2">
                        {['everyday slay', 'date night', 'no-makeup makeup', 'festival ready'].map((look) => (
                          <span key={look} className="px-4 py-2 text-xs rounded-full border border-white bg-transparent text-white hover:bg-white hover:text-[#F4845F] cursor-pointer transition-all duration-200">{look}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="features" className="py-24 px-4" style={{ background: '#0A1A0F' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-medium tracking-[0.3em] uppercase mb-4" style={{ fontFamily: 'var(--font-josefin)', color: '#F5E6C8' }}>✦ Why ZanZan</p>
            <h2 className="text-5xl md:text-6xl text-white" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', fontWeight: '400', lineHeight: '1.2' }}>
              Every look you have ever wanted<br />starts right here.
            </h2>
            <div className="w-12 h-px mx-auto mt-8" style={{ background: '#F5E6C8' }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="p-8 rounded-3xl" style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(245,230,200,0.15)' }}>
              <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: 'var(--font-josefin)', color: '#6A9070' }}>Face Analysis</p>
              <p className="text-2xl text-white mb-4" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}>Drop a selfie and let AI do the work.</p>
              <p className="text-sm leading-relaxed" style={{ color: '#6A9070' }}>Showing results from face reads in seconds. Undertones, face shape, complexions, skin tone. Then builds a full personalized look for whatever the day calls for.</p>
            </div>
            <div className="p-8 rounded-3xl" style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(245,230,200,0.15)' }}>
              <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: 'var(--font-josefin)', color: '#6A9070' }}>Your Products</p>
              <p className="text-2xl text-white mb-4" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}>Your products. Perfected.</p>
              <p className="text-sm leading-relaxed" style={{ color: '#6A9070' }}>Show us what you own, we'll show you what look to make. Any brand, any shade. We build around your collection.</p>
            </div>
            <div className="p-8 rounded-3xl" style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(245,230,200,0.15)' }}>
              <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: 'var(--font-josefin)', color: '#6A9070' }}>Trending Looks</p>
              <p className="text-2xl text-white mb-4" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}>What is hot. Right now.</p>
              <p className="text-sm leading-relaxed" style={{ color: '#6A9070' }}>Clean Girl. Mob Wife. Going Out Looks. We pull what is trending and make it work for your face specifically.</p>
            </div>
            <div className="p-8 rounded-3xl" style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(245,230,200,0.15)' }}>
              <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: 'var(--font-josefin)', color: '#6A9070' }}>Personalized Steps</p>
              <p className="text-2xl text-white mb-4" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}>Steps made for your face only.</p>
              <p className="text-sm leading-relaxed" style={{ color: '#6A9070' }}>Not a tutorial. Not generic advice. Every single step written for your exact features.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-3xl" style={{ background: 'rgba(245,230,200,0.05)', border: '0.5px solid rgba(245,230,200,0.15)' }}>
            <div className="flex gap-12 flex-wrap justify-center">
              <div className="text-center">
                <p className="text-4xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-syne)' }}>2min</p>
                <p className="text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-josefin)', color: '#4A7055' }}>to build your routine</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-syne)' }}>100%</p>
                <p className="text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-josefin)', color: '#4A7055' }}>personalized</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-syne)' }}>Free</p>
                <p className="text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-josefin)', color: '#4A7055' }}>during beta</p>
              </div>
            </div>
            <a href="/glam-lab" className="flex-shrink-0 px-8 py-4 rounded-full text-xs tracking-widest uppercase transition-all duration-200 hover:opacity-80" style={{ background: '#F5E6C8', color: '#0A1A0F', fontFamily: 'var(--font-josefin)' }}>
              Start Building Your Look →
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#FFFAF5] py-24 px-4">
        <div className="fade-up max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1C0A00] mb-4" style={{ fontFamily: 'var(--font-syne, Georgia, serif)' }}>
            Free during beta — always. ✦
          </h2>
          <p className="text-[#8B5E52] text-lg leading-relaxed mb-10">
            ZanZan is completely free right now. No credit card. No catch. Just your best look.
          </p>
          <Link href="/app" className="px-10 py-4 rounded-full bg-[#F4845F] text-white text-sm font-medium tracking-widest uppercase hover:bg-[#FFAA80] transition-all duration-300 hover:-translate-y-1">
            Build My Routine →
          </Link>
        </div>
      </section>

      <footer className="bg-[#FFF0E8] py-12 text-center border-t border-[#FFD4BC]">
        <img src="/zanzan-logo.svg" alt="ZanZan" className="h-12 w-auto mx-auto mb-4" />
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
    </>
  )
}
