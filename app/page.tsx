'use client'

import { useEffect } from 'react'
import Link from 'next/link'

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

export default function LandingPage() {
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
      `}</style>

      {/* ===== NAVBAR ===== */}
      <nav className="sticky top-0 z-50 bg-white border-b border-[#FFE8D6] px-6 py-3 flex items-center justify-between">
        <div>
          <span
            className="text-2xl text-[#F4845F] italic font-bold"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            ZanZan
          </span>
          <p className="text-[10px] text-[#8B5E52] leading-none mt-0.5">✦ serve your look ✦</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/auth"
            className="px-4 py-2 rounded-xl border border-[#F4845F] text-[#F4845F] text-sm font-medium hover:bg-[#FFF0E8] transition-all"
          >
            Sign In
          </Link>
          <Link
            href="/app"
            className="px-4 py-2 rounded-xl bg-[#F4845F] text-white text-sm font-medium hover:opacity-90 transition-all"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="min-h-screen bg-[#FFFAF5] flex flex-col items-center justify-center text-center px-4 py-24">
        <p className="hero-1 text-xs font-semibold text-[#F4845F] tracking-widest uppercase mb-5">
          ✦ AI-Powered Makeup Routines
        </p>
        <h1
          className="hero-2 text-5xl md:text-7xl font-bold text-[#1C0A00] leading-tight max-w-3xl mb-6"
          style={{ fontFamily: 'var(--font-syne, Georgia, serif)' }}
        >
          Your face.<br />Your products.<br />Your look.
        </h1>
        <p className="hero-3 text-lg md:text-xl text-[#8B5E52] max-w-xl leading-relaxed mb-10">
          ZanZan builds your personalized makeup routine in seconds — powered by AI, made for real people.
        </p>
        <div className="hero-4 flex flex-col sm:flex-row gap-4">
          <Link
            href="/app"
            className="px-8 py-4 rounded-2xl bg-[#F4845F] text-white font-semibold text-base hover:opacity-90 transition-all shadow-md"
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

      {/* ===== PRICING ===== */}
      <section id="pricing" className="bg-white py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="fade-up text-center mb-14">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1C0A00] mb-3"
              style={{ fontFamily: 'var(--font-syne, Georgia, serif)' }}
            >
              Simple Pricing
            </h2>
            <p className="text-[#8B5E52]">Start free. Glow up when you&apos;re ready.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">

            {/* Free Plan */}
            <div className="fade-up delay-1 bg-[#FFFAF5] rounded-2xl border border-[#FFE8D6] p-8">
              <h3
                className="text-xl font-bold text-[#1C0A00] mb-1"
                style={{ fontFamily: 'var(--font-syne, Georgia, serif)' }}
              >
                Free
              </h3>
              <p className="text-[#8B5E52] text-sm mb-6">No account needed to start</p>
              <div className="text-4xl font-bold text-[#1C0A00] mb-6">$0</div>
              <ul className="space-y-3 text-sm text-[#8B5E52] mb-8">
                <li className="flex items-center gap-2"><span className="text-[#F4845F] font-bold">✓</span> 3 routines per month</li>
                <li className="flex items-center gap-2"><span className="text-[#F4845F] font-bold">✓</span> Basic looks</li>
                <li className="flex items-center gap-2"><span className="text-[#F4845F] font-bold">✓</span> No account needed</li>
              </ul>
              <Link
                href="/app"
                className="block text-center w-full py-3 rounded-xl border border-[#FFD4BC] text-[#F4845F] font-semibold hover:bg-[#FFF0E8] transition-all"
              >
                Get Started Free
              </Link>
            </div>

            {/* Glow Plan */}
            <div className="fade-up delay-2 bg-white rounded-2xl border-2 border-[#F4845F] p-8 relative shadow-md">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F4845F] text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                Most Popular
              </span>
              <h3
                className="text-xl font-bold text-[#1C0A00] mb-1"
                style={{ fontFamily: 'var(--font-syne, Georgia, serif)' }}
              >
                Glow Plan
              </h3>
              <p className="text-[#8B5E52] text-sm mb-6">Everything you need to serve your look</p>
              <div className="text-4xl font-bold text-[#1C0A00] mb-1">
                $9.99<span className="text-base font-normal text-[#8B5E52]">/mo</span>
              </div>
              <p className="text-xs text-[#8B5E52] mb-6">Billed monthly</p>
              <ul className="space-y-3 text-sm text-[#8B5E52] mb-8">
                <li className="flex items-center gap-2"><span className="text-[#F4845F] font-bold">✓</span> Unlimited routines</li>
                <li className="flex items-center gap-2"><span className="text-[#F4845F] font-bold">✓</span> All trending looks</li>
                <li className="flex items-center gap-2"><span className="text-[#F4845F] font-bold">✓</span> Save your history</li>
                <li className="flex items-center gap-2"><span className="text-[#F4845F] font-bold">✓</span> Avatar face builder</li>
                <li className="flex items-center gap-2"><span className="text-[#F4845F] font-bold">✓</span> Before &amp; after comparison</li>
              </ul>
              <Link
                href="/auth"
                className="block text-center w-full py-3 rounded-xl bg-[#F4845F] text-white font-semibold hover:opacity-90 transition-all"
              >
                Start Glowing
              </Link>
            </div>

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
