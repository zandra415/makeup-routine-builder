'use client'

import Link from 'next/link'

export default function HeroSection() {
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
            Lumi builds your personalized makeup routine for any occasion. Skip the tutorials, ditch the guesswork.
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
    </>
  )
}
