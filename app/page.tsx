'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Barcode, Scan, ShoppingBag, Palette, ListChecks } from '@phosphor-icons/react'

const NAV_LINKS = [
  { name: 'Home',      href: '/' },
  { name: 'Glam Lab', href: '/glam-lab' },
  { name: 'Trending',  href: '/trending' },
  { name: 'Community', href: '/community' },
  { name: 'Account',   href: '/account' },
]

const STEPS = [
  { num: '01', icon: '🤳', title: 'Upload Your Face', desc: 'Snap a selfie or build your avatar. We read your face shape, skin tone, eye shape, and more.' },
  { num: '02', icon: '🛍️', title: 'Add Your Products', desc: 'Tell us what\'s in your makeup bag. Any brand, any shade — we work with what you already own.' },
  { num: '03', icon: '🪄', title: 'Get Your Routine', desc: 'Pick a look and receive a personalized step-by-step routine built just for your face.' },
]

const FEATURES = [
  { icon: '🤳', title: 'Face Analysis', desc: 'Upload a selfie or build your avatar for a full personalized facial read.' },
  { icon: '🛍️', title: 'Your Products Only', desc: 'No shopping list required. We work with exactly what\'s already in your collection.' },
  { icon: '🎨', title: 'Trending Looks', desc: 'Choose from Gen Z styles curated for every mood, vibe, and occasion.' },
  { icon: '🎯', title: 'Personalized Steps', desc: 'Step-by-step instructions tailored specifically to your face shape and features.' },
]

const LOOKS_ROW1 = ['Clean Girl', 'Soft Glam', 'Brat Summer', 'Dark Feminine', 'Latte Makeup', 'Blush Everything', 'Mob Wife Glam', 'Coquette']
const LOOKS_ROW2 = ['Strawberry Makeup', 'Old Money Glam', 'E-Girl Edge', 'Siren Eye', 'Glazed Skin', 'Vanilla Girl', 'Balletcore', 'Indie Sleaze']
const TICKER = ['✦ 100% Free During Beta', '✦ No Account Needed', '✦ Takes 2 Minutes', '✦ Built For Real People']

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [selectedLook, setSelectedLook] = useState<string | null>(null)

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

        @keyframes scroll-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .row-left  { animation: scroll-left  28s linear infinite; }
        .row-right { animation: scroll-right 28s linear infinite; }

        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ticker-track { animation: ticker 18s linear infinite; }

        section[id] { scroll-margin-top: 80px; }
      `}</style>

      {/* ===== NAVBAR ===== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-8 py-4 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-sm border-b border-[#FFD4BC]'
          : 'bg-transparent'
      }`}>
        <div className="relative flex items-center justify-between">

          {/* Left: desktop nav links */}
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

          {/* Center: logo */}
          <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none">
            <img src="/zanzan-logo.svg" alt="ZanZan" className="h-16 w-auto" />
          </div>

          {/* Right: CTA */}
          <a href="/account" className="px-5 py-2 rounded-full bg-[#F4845F] text-white text-[10px] tracking-widest uppercase hover:bg-[#FFAA80] transition-colors duration-200" style={{ fontFamily: 'var(--font-josefin)' }}>
            Sign in to earn Glow Points →
          </a>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className={`md:hidden mt-3 pb-4 border-t flex flex-col gap-4 pt-4 ${scrolled ? 'border-[#FFD4BC]' : 'border-white/20'}`}>
            {NAV_LINKS.map(link => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => { setActiveTab(link.name); setMenuOpen(false) }}
                className={`text-sm font-medium text-left tracking-widest uppercase transition-all ${
                  scrolled
                    ? activeTab === link.name ? 'text-[#F4845F]' : 'text-[#8B5E52]'
                    : 'text-white/90'
                }`}
                style={{ fontFamily: 'var(--font-josefin)' }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center text-center px-4">

        {/* Video */}
        <video src="/startup_vid.mp4" autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">

          <p className="hero-1 text-xs font-medium text-[#FFAA80] tracking-widest uppercase mb-4"
            style={{ fontFamily: 'var(--font-josefin)' }}>
            ✦ &nbsp; serve your look &nbsp; ✦
          </p>

          <h1 className="hero-2 font-serif italic font-bold text-white text-5xl md:text-7xl leading-tight mb-4">
            Stop guessing.<br />Start serving.
          </h1>

          {/* Animated underline */}
          <div className="hero-2 flex justify-center mb-8">
            <div className="headline-line h-0.5 bg-[#FFAA80] rounded-full" />
          </div>

          <p className="hero-3 text-base md:text-lg text-white/80 max-w-lg leading-relaxed mb-10">
            ZanZan builds your personalized makeup routine for any occasion — skip the tutorials, ditch the guesswork.
          </p>

          <div className="hero-4 flex flex-row gap-6">
            <Link href="/app"
              className="bg-gradient-to-r from-[#F4845F] to-[#FFAA80] text-white text-sm font-medium px-7 py-3 rounded-full hover:scale-105 transition-all shadow-md">
              Build My Routine
            </Link>
            <a href="#how-it-works"
              className="border border-white text-white text-sm font-medium px-7 py-3 rounded-full hover:bg-white hover:text-[#F4845F] transition-all">
              See How It Works
            </a>
          </div>
        </div>

        {/* Fade to cream */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#FFFAF5] z-10 pointer-events-none" />

        {/* Scroll arrow */}
        <div className="absolute bottom-8 z-20 flex flex-col items-center gap-1">
          <a href="#how-it-works" className="flex flex-col items-center gap-1 group">
            <span className="text-xs text-white/60 group-hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-josefin)' }}>scroll to explore</span>
            <span className="text-white text-xl animate-bounce">↓</span>
          </a>
        </div>
      </section>

      {/* ===== TRENDING LOOKS ===== */}
      <section id="looks" className="bg-[#FFFAF5] py-12 overflow-hidden">
        <div className="fade-up text-center mb-12 px-4">
          <h2 className="text-4xl text-[#1C0A00]"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', fontWeight: '400' }}>
            What's Trending Right Now ✦
          </h2>
        </div>

        {/* Row 1 — scrolls left */}
        <div className="flex overflow-hidden mb-4">
          <div className="flex gap-3 row-left whitespace-nowrap">
            {[...LOOKS_ROW1, ...LOOKS_ROW1].map((look, i) => (
              <span key={i}
                className="px-6 py-3 bg-[#FFE8D6] text-[#C7522A] rounded-full text-sm font-medium whitespace-nowrap cursor-default hover:bg-[#FFAA80] hover:text-white transition-all">
                {look}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="flex overflow-hidden">
          <div className="flex gap-3 row-right whitespace-nowrap">
            {[...LOOKS_ROW2, ...LOOKS_ROW2].map((look, i) => (
              <span key={i}
                className="px-6 py-3 bg-[#FFE8D6] text-[#C7522A] rounded-full text-sm font-medium whitespace-nowrap cursor-default hover:bg-[#FFAA80] hover:text-white transition-all">
                {look}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="bg-[#FFFAF5] py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="fade-up text-center mb-16">
            <p className="text-xs text-[#8B5E52] uppercase mb-3" style={{ letterSpacing: '0.3em' }}>The Process</p>
            <h2 className="text-6xl text-[#F4845F]"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', fontWeight: '400', letterSpacing: '-0.01em' }}>
              Three Steps to Your Look
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-6 items-stretch">

            {/* Card 1 — Upload Your Face */}
            <div className="fade-up delay-1 self-stretch relative bg-[#FFF0E8] rounded-3xl p-8 pb-8 overflow-hidden hover:-translate-y-2 transition-all duration-300">
              <span className="absolute top-4 right-6 text-[8rem] font-bold leading-none select-none pointer-events-none text-[#C7522A] opacity-10" style={{ fontFamily: 'var(--font-syne)' }}>01</span>
              <div className="relative z-10">
                <div className="mb-5">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" stroke="#F4845F" strokeWidth="1.5"/>
                    <line x1="20" y1="11" x2="20" y2="29" stroke="#F4845F" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="11" y1="20" x2="29" y2="20" stroke="#F4845F" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="text-xl text-[#1C0A00] mb-3" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', fontWeight: '400' }}>
                  Upload Your Face
                </h3>
                <p className="text-[#8B5E52] text-sm leading-relaxed">Snap a selfie or build your avatar. We read your face shape, skin tone, eye shape, and more.</p>
                <div className="mt-4 rounded-2xl border-2 border-dashed border-[#FFAA80] bg-[#FFF5EE] p-5 text-center cursor-pointer hover:bg-[#FFE8D6] transition-all">
                  <p className="text-xs text-[#8B5E52]">drop your selfie or tap to upload</p>
                </div>
              </div>
            </div>

            {/* Card 2 — Add Your Products */}
            <div className="fade-up delay-2 self-stretch relative bg-[#FFE8D6] rounded-3xl p-8 pb-8 overflow-hidden hover:-translate-y-2 transition-all duration-300">
              <span className="absolute top-4 right-6 text-[8rem] font-bold leading-none select-none pointer-events-none text-[#C7522A] opacity-10" style={{ fontFamily: 'var(--font-syne)' }}>02</span>
              <div className="relative z-10">
                <div className="mb-5">
                  <Barcode size={40} color="#C7522A" weight="light" />
                </div>
                <h3 className="text-xl text-[#1C0A00] mb-3" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', fontWeight: '400' }}>
                  Add Your Products
                </h3>
                <p className="text-[#8B5E52] text-sm leading-relaxed">Tell us what&apos;s in your makeup bag. Any brand, any shade — we work with what you already own.</p>
                <input
                  type="text"
                  placeholder="e.g. Rare Beauty, NARS, e.l.f."
                  className="w-full mt-4 px-4 py-2 text-sm rounded-full border border-[#FFAA80] bg-[#FFF5EE] text-[#1C0A00] outline-none focus:border-[#F4845F] focus:ring-2 focus:ring-[#FFAA80] placeholder-[#C4977E]"
                />
              </div>
            </div>

            {/* Card 3 — Get Your Routine */}
            <div className="fade-up delay-3 self-stretch relative bg-[#F4845F] rounded-3xl p-8 pb-8 overflow-hidden hover:-translate-y-2 transition-all duration-300">
              <span className="absolute top-4 right-6 text-[8rem] font-bold leading-none select-none pointer-events-none text-white opacity-10" style={{ fontFamily: 'var(--font-syne)' }}>03</span>
              <div className="relative z-10">
                <h3 className="text-xl text-white mb-3" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', fontWeight: '400' }}>
                  Get Your Routine
                </h3>
                <p className="text-white opacity-90 text-sm leading-relaxed">Pick a look and receive a personalized step-by-step routine built just for your face.</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['everyday slay', 'date night', 'no-makeup makeup', 'festival ready'].map(look => (
                    <button
                      key={look}
                      onClick={() => setSelectedLook(look === selectedLook ? null : look)}
                      className={`px-4 py-2 text-xs rounded-full border transition-all duration-200 ${
                        selectedLook === look
                          ? 'bg-white text-[#F4845F] border-white'
                          : 'bg-transparent text-white border-white hover:bg-white hover:text-[#F4845F]'
                      }`}
                    >
                      {look}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="relative overflow-hidden py-24 px-4" style={{ background: '#0A1A0F' }}>
        <div className="max-w-5xl mx-auto relative z-10">

          <div className="text-center mb-16">
            <p className="text-xs font-medium tracking-[0.3em] uppercase mb-4" style={{ fontFamily: 'var(--font-josefin)', color: '#F5E6C8' }}>✦ Why ZanZan</p>
            <h2 className="text-5xl md:text-6xl text-white" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', fontWeight: '400', lineHeight: '1.2' }}>
              Every look you have ever wanted
              <br />starts right here.
            </h2>
            <div className="w-12 h-px mx-auto mt-8" style={{ background: '#F5E6C8' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="p-8 rounded-3xl" style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(245,230,200,0.15)' }}>
              <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: 'var(--font-josefin)', color: '#6A9070' }}>Face Analysis</p>
              <p className="text-2xl text-white mb-4" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}>Your face. Read instantly.</p>
              <p className="text-sm leading-relaxed" style={{ color: '#6A9070' }}>Upload a selfie and our AI reads your face shape, skin tone, eye shape and undertone in seconds. No questionnaire. No guessing.</p>
            </div>

            <div className="p-8 rounded-3xl" style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(245,230,200,0.15)' }}>
              <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: 'var(--font-josefin)', color: '#6A9070' }}>Your Products</p>
              <p className="text-2xl text-white mb-4" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}>What you own. Not what to buy.</p>
              <p className="text-sm leading-relaxed" style={{ color: '#6A9070' }}>Tell us your products — any brand, any shade. We build your routine around your makeup bag, not ours.</p>
            </div>

            <div className="p-8 rounded-3xl" style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(245,230,200,0.15)' }}>
              <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: 'var(--font-josefin)', color: '#6A9070' }}>Trending Looks</p>
              <p className="text-2xl text-white mb-4" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}>What is hot. Right now.</p>
              <p className="text-sm leading-relaxed" style={{ color: '#6A9070' }}>Clean Girl. Mob Wife. Latte Makeup. We pull the looks blowing up on TikTok and build your routine around them.</p>
            </div>

            <div className="p-8 rounded-3xl" style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(245,230,200,0.15)' }}>
              <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: 'var(--font-josefin)', color: '#6A9070' }}>Personalized Steps</p>
              <p className="text-2xl text-white mb-4" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}>Steps made for your face only.</p>
              <p className="text-sm leading-relaxed" style={{ color: '#6A9070' }}>Not a generic tutorial. Every step is written for your exact face shape, features and products. Advice that actually fits.</p>
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

      {/* ===== FREE BETA CTA ===== */}
      <section className="bg-[#FFFAF5] py-24 px-4">
        <div className="fade-up max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1C0A00] mb-4"
            style={{ fontFamily: 'var(--font-syne, Georgia, serif)' }}>
            Free during beta — always. ✦
          </h2>
          <p className="text-[#8B5E52] text-lg leading-relaxed mb-10">
            ZanZan is completely free right now. No credit card. No catch. Just your best look.
          </p>
          <Link href="/app"
            className="px-10 py-4 rounded-full bg-[#F4845F] text-white text-sm font-medium tracking-widest uppercase hover:bg-[#FFAA80] transition-all duration-300 hover:-translate-y-1">
            Build My Routine →
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#FFF0E8] py-12 text-center border-t border-[#FFD4BC]">
        <img src="/zanzan-logo.svg" alt="ZanZan" className="h-12 w-auto mx-auto mb-4" />
        <p className="text-[#8B5E52] text-xs tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-josefin)' }}>✦ serve your look ✦</p>
        <div className="flex justify-center gap-8 mb-6">
          <a href="#" className="text-xs text-[#8B5E52] hover:text-[#F4845F] tracking-widest uppercase transition-colors" style={{ fontFamily: 'var(--font-josefin)' }}>TikTok</a>
          <a href="#" className="text-xs text-[#8B5E52] hover:text-[#F4845F] tracking-widest uppercase transition-colors" style={{ fontFamily: 'var(--font-josefin)' }}>Instagram</a>
          <a href="#" className="text-xs text-[#8B5E52] hover:text-[#F4845F] tracking-widest uppercase transition-colors" style={{ fontFamily: 'var(--font-josefin)' }}>Pinterest</a>
        </div>
        <p className="text-[#C4977E] text-xs">© 2025 ZanZan Beauty Studio. All rights reserved.</p>
      </footer>
    </>
  )
}
