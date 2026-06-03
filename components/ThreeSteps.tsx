'use client'

import { useState } from 'react'

export default function ThreeSteps() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  return (
    <section id="how-it-works" className="bg-[#FFFAF5] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-medium text-[#F4845F] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: 'var(--font-josefin)' }}>✦ The Process</p>
          <h2 className="text-6xl font-bold text-[#1C0A00] mb-4" style={{ fontFamily: 'var(--font-syne)', fontWeight: '800' }}>Three Steps to Your Look</h2>
          <p className="text-[#8B5E52] text-sm max-w-lg mx-auto leading-relaxed">It is simple. Upload your face. Add your products. Get your personalized routine in seconds.</p>
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
  )
}
