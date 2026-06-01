'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const TRENDING_LOOKS = [
  { name: 'Clean Girl', category: 'Everyday', heat: 98, tags: ['minimal', 'dewy', 'natural'] },
  { name: 'Soft Glam', category: 'Evening', heat: 95, tags: ['glowy', 'neutral', 'classic'] },
  { name: 'Brat Summer', category: 'Festival', heat: 93, tags: ['bold', 'green', 'editorial'] },
  { name: 'Latte Makeup', category: 'Everyday', heat: 91, tags: ['warm', 'brown', 'soft'] },
  { name: 'Coquette', category: 'Date Night', heat: 89, tags: ['pink', 'feminine', 'rosy'] },
  { name: 'Dark Feminine', category: 'Evening', heat: 87, tags: ['moody', 'dark', 'powerful'] },
  { name: 'Mob Wife Glam', category: 'Evening', heat: 85, tags: ['bold', 'dramatic', 'luxury'] },
  { name: 'Glazed Skin', category: 'Everyday', heat: 84, tags: ['dewy', 'glass', 'skincare'] },
  { name: 'Strawberry Makeup', category: 'Everyday', heat: 82, tags: ['pink', 'fresh', 'cute'] },
  { name: 'Siren Eye', category: 'Date Night', heat: 80, tags: ['sultry', 'liner', 'dramatic'] },
  { name: 'Old Money Glam', category: 'Evening', heat: 78, tags: ['classic', 'refined', 'neutral'] },
  { name: 'Balletcore', category: 'Everyday', heat: 76, tags: ['pink', 'soft', 'romantic'] },
  { name: 'E-Girl Edge', category: 'Festival', heat: 74, tags: ['graphic', 'bold', 'alt'] },
  { name: 'Vanilla Girl', category: 'Everyday', heat: 72, tags: ['nude', 'clean', 'soft'] },
  { name: 'Indie Sleaze', category: 'Festival', heat: 70, tags: ['grungy', 'smoky', 'retro'] },
  { name: 'Blush Everything', category: 'Everyday', heat: 68, tags: ['pink', 'flush', 'fresh'] },
]

const CATEGORIES = ['All', 'Everyday', 'Evening', 'Date Night', 'Festival']

export default function TrendingPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredLook, setHoveredLook] = useState<string | null>(null)

  const filtered = activeCategory === 'All'
    ? TRENDING_LOOKS
    : TRENDING_LOOKS.filter(l => l.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#FFFAF5]">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#FFFAF5]/90 backdrop-blur-md border-b border-[#FFD4BC]/40 flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-6">
          {['Home', 'Glam Lab', 'Trending', 'Community', 'Account'].map((item) => (
            <Link
              key={item}
              href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
              className={`text-xs tracking-widest uppercase transition-colors duration-200 ${
                item === 'Trending'
                  ? 'text-[#F4845F] border-b border-[#F4845F] pb-0.5'
                  : 'text-[#1C0A00] hover:text-[#F4845F]'
              }`}
              style={{ fontFamily: 'var(--font-josefin)' }}
            >
              {item}
            </Link>
          ))}
        </div>
        <Link href="/">
          <Image src="/zanzan-logo.svg" alt="ZanZan" width={80} height={32} className="h-16 w-auto" />
        </Link>
        <a href="/account" className="px-5 py-2 rounded-full bg-[#F4845F] text-white text-[10px] tracking-widest uppercase hover:bg-[#FFAA80] transition-colors duration-200" style={{ fontFamily: 'var(--font-josefin)' }}>
          Sign in to earn Glow Points →
        </a>
      </nav>

      {/* HERO */}
      <div className="pt-16 pb-10 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#FFAA80] opacity-10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#F4845F] opacity-10 blur-3xl pointer-events-none" />
        <p className="text-xs font-medium text-[#F4845F] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: 'var(--font-josefin)' }}>✦ What is Hot Right Now ✦</p>
        <h1 className="text-6xl text-[#1C0A00] mb-4" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', fontWeight: '400' }}>
          Trending Looks
        </h1>
        <p className="text-[#8B5E52] text-sm max-w-md mx-auto leading-relaxed mb-8">
          The looks taking over TikTok, Pinterest and Instagram right now. Pick one and build your routine instantly.
        </p>

        {/* CATEGORY FILTERS */}
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#F4845F] text-white'
                  : 'bg-white border border-[#FFD4BC] text-[#8B5E52] hover:border-[#F4845F] hover:text-[#F4845F]'
              }`}
              style={{ fontFamily: 'var(--font-josefin)' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* LOOKS GRID */}
      <div className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((look, i) => (
            <div
              key={look.name}
              onMouseEnter={() => setHoveredLook(look.name)}
              onMouseLeave={() => setHoveredLook(null)}
              className={`relative rounded-3xl p-6 cursor-pointer transition-all duration-300 ${
                i === 0
                  ? 'bg-[#F4845F] text-white'
                  : i % 5 === 1
                  ? 'bg-[#FFE8D6] text-[#1C0A00]'
                  : 'bg-white border border-[#FFD4BC] text-[#1C0A00]'
              } ${hoveredLook === look.name ? '-translate-y-2 shadow-lg' : ''}`}
              style={{ boxShadow: hoveredLook === look.name ? '0 8px 30px rgba(244,132,95,0.2)' : '0 2px 20px rgba(244,132,95,0.06)' }}
            >
              {/* HEAT RANK */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs tracking-widest uppercase ${i === 0 ? 'text-white/70' : 'text-[#8B5E52]'}`} style={{ fontFamily: 'var(--font-josefin)' }}>
                  {look.category}
                </span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${i === 0 ? 'bg-white/20 text-white' : 'bg-[#FFF0E8] text-[#F4845F]'}`}>
                  {look.heat}% hot
                </span>
              </div>

              {/* LOOK NAME */}
              <h3 className="text-xl mb-3" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}>
                {look.name}
              </h3>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2 mb-4">
                {look.tags.map(tag => (
                  <span
                    key={tag}
                    className={`text-xs px-3 py-1 rounded-full ${
                      i === 0
                        ? 'bg-white/20 text-white'
                        : 'bg-[#FFF5EE] text-[#8B5E52]'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Link
                href={`/glam-lab?look=${encodeURIComponent(look.name)}`}
                className={`inline-block w-full text-center py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-200 ${
                  i === 0
                    ? 'bg-white text-[#F4845F] hover:bg-[#FFF0E8]'
                    : 'bg-[#F4845F] text-white hover:bg-[#FFAA80]'
                }`}
                style={{ fontFamily: 'var(--font-josefin)' }}
              >
                Build This Look →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#FFF0E8] py-12 text-center border-t border-[#FFD4BC]">
        <Image src="/zanzan-logo.svg" alt="ZanZan" width={80} height={32} className="h-12 w-auto mx-auto mb-4" />
        <p className="text-[#8B5E52] text-xs tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-josefin)' }}>✦ serve your look ✦</p>
        <p className="text-[#C4977E] text-xs">© 2025 ZanZan Beauty Studio. All rights reserved.</p>
      </footer>

    </div>
  )
}
