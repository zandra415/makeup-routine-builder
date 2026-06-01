'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { name: 'Home',      href: '/' },
  { name: 'Glam Lab', href: '/glam-lab' },
  { name: 'Trending',  href: '/trending' },
  { name: 'Community', href: '/community' },
  { name: 'Account',   href: '/account' },
]

const FEATURES = [
  {
    icon: '📸',
    title: 'Face Analysis',
    desc: 'Upload a selfie or choose your features manually for a personalized read.',
  },
  {
    icon: '💄',
    title: 'Your Products',
    desc: 'Enter the makeup you already own — no shopping list required.',
  },
  {
    icon: '✨',
    title: 'Choose Your Look',
    desc: 'Pick from trending Gen Z styles curated for every mood and vibe.',
  },
  {
    icon: '🎯',
    title: 'AI Routine',
    desc: 'Get step-by-step personalized instructions built just for your face.',
  },
]

const LOOKS = [
  'Clean Girl', 'Soft Glam', 'Brat Summer', 'Dark Feminine',
  'Latte Makeup', 'Blush Everything', 'Mob Wife Glam', 'Coquette',
  'Strawberry Makeup', 'Old Money Glam', 'E-Girl Edge', 'Siren Eye',
]

const DELAY_CLASSES = ['delay-1', 'delay-2', 'delay-3', 'delay-4']

const HEADLINE = 'Stop guessing. Start serving.'
const WORDS = [
  'Mascara','Foundation','Contour','Blush','Highlight','Concealer',
  'Bronzer','Eyeliner','Lipstick','Primer','Setting Spray','Eyeshadow','Brow Gel','Gloss',
]

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  const [ctaBounce, setCtaBounce] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)

  // Typewriter effect
  useEffect(() => {
    const start = setTimeout(() => {
      let i = 0
      const tick = setInterval(() => {
        i++
        setDisplayText(HEADLINE.slice(0, i))
        if (i >= HEADLINE.length) {
          clearInterval(tick)
          setTimeout(() => {
            setTypingDone(true)
            setTimeout(() => { setCtaBounce(true) }, 400)
            setTimeout(() => { setCtaBounce(false) }, 3400)
          }, 400)
        }
      }, 60)
      return () => clearInterval(tick)
    }, 800)
    return () => clearTimeout(start)
  }, [])

  // Rotating background words
  useEffect(() => {
    const interval = setInterval(() => setWordIndex(i => (i + 1) % WORDS.length), 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }

        .fade-up {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .fade-up.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .delay-1 { transition-delay: 0.10s; }
        .delay-2 { transition-delay: 0.20s; }
        .delay-3 { transition-delay: 0.30s; }
        .delay-4 { transition-delay: 0.40s; }

        @keyframes heroIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-1 { animation: heroIn 0.8s ease 0.0s both; }
        .hero-2 { animation: heroIn 0.8s ease 0.2s both; }
        .hero-3 { animation: heroIn 0.8s ease 0.4s both; }
        .hero-4 { animation: heroIn 0.8s ease 0.6s both; }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(244, 132, 95, 0.45); }
          50%       { box-shadow: 0 0 0 8px rgba(244, 132, 95, 0); }
        }
        .btn-pulse { animation: pulse-glow 2.5s ease-in-out infinite; }

        @keyframes fadeWord {
          0%   { opacity: 0; transform: scale(0.92); }
          15%  { opacity: 1; transform: scale(1); }
          80%  { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.06); }
        }
        .word-cycle { animation: fadeWord 2s ease-in-out forwards; }
      `}</style>

      {/* ===== NAVBAR ===== */}
      <nav className="sticky top-0 z-50 bg-white border-b border-[#FFD4BC] px-6 py-3">
        <div className="relative flex items-center justify-between">

          {/* Left: desktop nav links / mobile hamburger */}
          <div className="flex items-center">
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveTab(link.name)}
                  className={`text-sm font-medium whitespace-nowrap pb-0.5 transition-all ${
                    activeTab === link.name
                      ? 'text-[#F4845F] border-b-2 border-[#F4845F]'
                      : 'text-[#8B5E52] hover:text-[#F4845F]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <button
              className="md:hidden text-2xl text-[#F4845F] leading-none"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Menu"
            >
              ☰
            </button>
          </div>

          {/* Center: logo — absolutely centered */}
          <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none">
            <span
              className="text-2xl text-[#F4845F] italic font-bold"
              style={{ fontFamily: 'var(--font-syne, Georgia, serif)' }}
            >
              ZanZan
            </span>
          </div>

          {/* Right: CTA button */}
          <Link
            href="/app"
            className="btn-pulse bg-gradient-to-r from-[#F4845F] to-[#FFAA80] text-white rounded-full px-5 py-2 text-sm font-medium hover:scale-105 transition-all"
          >
            Build My Look →
          </Link>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-[#FFD4BC] flex flex-col gap-4 pt-4">
            {NAV_LINKS.map(link => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => { setActiveTab(link.name); setMenuOpen(false) }}
                className={`text-sm font-medium text-left transition-all ${
                  activeTab === link.name ? 'text-[#F4845F]' : 'text-[#8B5E52]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section className="min-h-screen bg-[#FFFAF5] relative flex flex-col items-center justify-center text-center px-4 py-24 overflow-hidden">

        {/* Warm radial spotlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(255,232,214,0.85) 0%, transparent 70%)' }}
        />

        {/* Rotating background word */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none">
          <span
            key={wordIndex}
            className="word-cycle text-8xl md:text-9xl font-bold text-[#FFD4BC] opacity-20"
          >
            {WORDS[wordIndex]}
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">

          {/* Label */}
          <p
            className="text-xs font-semibold text-[#F4845F] tracking-widest uppercase mb-6"
            style={{ animation: 'heroIn 0.8s ease 0.5s both' }}
          >
            ✦ serve your look ✦
          </p>

          {/* Typewriter headline */}
          <h1
            className="text-5xl md:text-7xl font-bold text-[#1C0A00] leading-tight max-w-3xl mb-8 min-h-[1.2em]"
            style={{ fontFamily: 'var(--font-syne, Georgia, serif)' }}
          >
            {displayText}
            {!typingDone && (
              <span className="inline-block border-r-2 border-[#F4845F] animate-pulse ml-0.5">&nbsp;</span>
            )}
          </h1>

          {/* Subheadline — fades in after typing */}
          <p
            className="text-lg md:text-xl text-[#8B5E52] max-w-xl leading-relaxed mb-10"
            style={{
              opacity: typingDone ? 1 : 0,
              transform: typingDone ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
            }}
          >
            ZanZan builds your personalized makeup routine for any occasion — skip the tutorials, ditch the guesswork.
          </p>

          {/* CTA buttons — fade in after subheadline */}
          <div
            className="flex flex-col sm:flex-row gap-4"
            style={{
              opacity: typingDone ? 1 : 0,
              transform: typingDone ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.6s ease 0.45s, transform 0.6s ease 0.45s',
            }}
          >
            <Link
              href="/app"
              className={`px-8 py-4 rounded-2xl bg-[#F4845F] text-white font-semibold text-base hover:opacity-90 transition-all shadow-md ${ctaBounce ? 'animate-bounce' : ''}`}
            >
              Build My Routine
            </Link>
            <a
              href="#features"
              className="px-8 py-4 rounded-2xl border-2 border-[#FFD4BC] text-[#8B5E52] font-semibold text-base hover:bg-[#FFF0E8] transition-all"
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 flex flex-col items-center gap-1">
          <a href="#features" className="flex flex-col items-center gap-1 group">
            <span className="text-xs text-[#8B5E52] group-hover:text-[#F4845F] transition-colors">scroll to explore</span>
            <span className="text-[#F4845F] text-lg animate-bounce">↓</span>
          </a>
        </div>

      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="bg-white py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="fade-up text-center mb-14">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1C0A00] mb-3"
              style={{ fontFamily: 'var(--font-syne, Georgia, serif)' }}
            >
              How ZanZan works
            </h2>
            <p className="text-[#8B5E52]">Four steps. Zero guesswork. One perfect routine.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`fade-up ${DELAY_CLASSES[i]} bg-[#FFF5F0] rounded-2xl border border-[#FFE8D6] p-7 hover:shadow-sm transition-all`}
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3
                  className="text-lg font-semibold text-[#1C0A00] mb-2"
                  style={{ fontFamily: 'var(--font-syne, Georgia, serif)' }}
                >
                  {f.title}
                </h3>
                <p className="text-[#8B5E52] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOOKS PREVIEW ===== */}
      <section id="looks" className="bg-[#FFFAF5] py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="fade-up mb-10">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1C0A00] mb-3"
              style={{ fontFamily: 'var(--font-syne, Georgia, serif)' }}
            >
              Trending Looks Right Now 🔥
            </h2>
            <p className="text-[#8B5E52]">Pick your vibe. ZanZan builds the routine around it.</p>
          </div>
          <div className="fade-up delay-1 flex flex-wrap justify-center gap-3">
            {LOOKS.map(look => (
              <span
                key={look}
                className="px-5 py-2.5 bg-[#FFE8D6] text-[#C7522A] rounded-full text-sm font-medium hover:bg-[#FFAA80] hover:text-white transition-all cursor-default"
              >
                {look}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#FFFAF5] border-t border-[#FFE8D6] px-6 py-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span
              className="text-xl text-[#F4845F] italic font-bold"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              ZanZan
            </span>
            <p className="text-xs text-[#8B5E52] mt-0.5">✦ serve your look ✦</p>
          </div>
          <div className="flex gap-6 text-sm text-[#8B5E52]">
            <a href="#" className="hover:text-[#F4845F] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#F4845F] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#F4845F] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </>
  )
}
