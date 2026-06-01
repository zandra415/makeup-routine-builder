'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const TRENDING_LOOKS = [
  { rank: 1, name: 'Clean Girl', category: 'Everyday', heat: 98, change: 'up', tags: ['minimal', 'dewy', 'natural'], description: 'Your skin but better. Effortless, glowy, untouched.' },
  { rank: 2, name: 'Soft Glam', category: 'Evening', heat: 95, change: 'up', tags: ['glowy', 'neutral', 'classic'], description: 'Timeless glamour for any occasion.' },
  { rank: 3, name: 'Brat Summer', category: 'Festival', heat: 93, change: 'up', tags: ['bold', 'green', 'editorial'], description: 'Messy, unapologetic, and completely iconic.' },
  { rank: 4, name: 'Latte Makeup', category: 'Everyday', heat: 91, change: 'same', tags: ['warm', 'brown', 'soft'], description: 'Warm brown tones inspired by your morning coffee.' },
  { rank: 5, name: 'Coquette', category: 'Date Night', heat: 89, change: 'up', tags: ['pink', 'feminine', 'rosy'], description: 'Soft, feminine, and impossibly pretty.' },
  { rank: 6, name: 'Dark Feminine', category: 'Evening', heat: 87, change: 'down', tags: ['moody', 'dark', 'powerful'], description: 'Bold, mysterious, and commanding attention.' },
  { rank: 7, name: 'Mob Wife Glam', category: 'Evening', heat: 85, change: 'up', tags: ['bold', 'dramatic', 'luxury'], description: 'Dripping in drama. Maximum impact.' },
  { rank: 8, name: 'Glazed Skin', category: 'Everyday', heat: 84, change: 'same', tags: ['dewy', 'glass', 'skincare'], description: 'Glass skin that stops traffic.' },
  { rank: 9, name: 'Strawberry Makeup', category: 'Everyday', heat: 82, change: 'up', tags: ['pink', 'fresh', 'cute'], description: 'Sweet, flushed, and summer-ready.' },
  { rank: 10, name: 'Siren Eye', category: 'Date Night', heat: 80, change: 'down', tags: ['sultry', 'liner', 'dramatic'], description: 'Eyes that do all the talking.' },
  { rank: 11, name: 'Old Money Glam', category: 'Evening', heat: 78, change: 'up', tags: ['classic', 'refined', 'neutral'], description: 'Understated luxury. Quietly expensive.' },
  { rank: 12, name: 'Balletcore', category: 'Everyday', heat: 76, change: 'same', tags: ['pink', 'soft', 'romantic'], description: 'Delicate, graceful, and ethereally pretty.' },
  { rank: 13, name: 'E-Girl Edge', category: 'Festival', heat: 74, change: 'down', tags: ['graphic', 'bold', 'alt'], description: 'Internet-born and IRL iconic.' },
  { rank: 14, name: 'Vanilla Girl', category: 'Everyday', heat: 72, change: 'same', tags: ['nude', 'clean', 'soft'], description: 'Soft neutrals, quiet confidence.' },
  { rank: 15, name: 'Indie Sleaze', category: 'Festival', heat: 70, change: 'down', tags: ['grungy', 'smoky', 'retro'], description: 'Early 2000s chaos, but make it fashion.' },
  { rank: 16, name: 'Blush Everything', category: 'Everyday', heat: 68, change: 'up', tags: ['pink', 'flush', 'fresh'], description: 'When in doubt, add more blush.' },
]

const CATEGORIES = ['All', 'Everyday', 'Evening', 'Date Night', 'Festival']

export default function TrendingPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredRank, setHoveredRank] = useState<number | null>(null)
  const [updatedAt, setUpdatedAt] = useState('')

  useEffect(() => {
    setUpdatedAt(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }))
  }, [])

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
      <div className="pt-16 pb-12 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#FFAA80] opacity-10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#F4845F] opacity-10 blur-3xl pointer-events-none" />
        <p className="text-xs font-medium text-[#F4845F] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: 'var(--font-josefin)' }}>✦ Live Rankings ✦</p>
        <h1 className="text-6xl text-[#1C0A00] mb-4" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', fontWeight: '400' }}>
          The Hot List
        </h1>
        <p className="text-[#8B5E52] text-sm max-w-md mx-auto leading-relaxed mb-2">
          The looks taking over TikTok, Pinterest and Instagram right now — ranked by heat.
        </p>
        <p className="text-xs text-[#C4977E] mb-8" style={{ fontFamily: 'var(--font-josefin)' }}>
          Updated {updatedAt} ✦
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

      {/* LEADERBOARD */}
      <div className="max-w-4xl mx-auto px-4 pb-24 space-y-3">
        {filtered.map((look) => (
          <div
            key={look.rank}
            onMouseEnter={() => setHoveredRank(look.rank)}
            onMouseLeave={() => setHoveredRank(null)}
            className={`relative flex items-center gap-6 rounded-3xl px-6 py-5 transition-all duration-300 cursor-pointer ${
              look.rank === 1
                ? 'bg-[#F4845F] text-white'
                : look.rank === 2
                ? 'bg-[#FFAA80] text-white'
                : look.rank === 3
                ? 'bg-[#FFE8D6] text-[#1C0A00]'
                : 'bg-white border border-[#FFD4BC] text-[#1C0A00]'
            } ${hoveredRank === look.rank ? '-translate-y-1 shadow-lg' : ''}`}
            style={{
              boxShadow: hoveredRank === look.rank
                ? '0 8px 30px rgba(244,132,95,0.2)'
                : look.rank <= 3
                ? '0 4px 20px rgba(244,132,95,0.15)'
                : '0 2px 10px rgba(244,132,95,0.06)'
            }}
          >
            {/* RANK NUMBER */}
            <div className="flex-shrink-0 w-16 text-center">
              <span
                className={`font-bold leading-none ${
                  look.rank === 1 ? 'text-5xl text-white/30' :
                  look.rank === 2 ? 'text-5xl text-white/30' :
                  look.rank === 3 ? 'text-5xl text-[#F4845F]/30' :
                  'text-4xl text-[#FFD4BC]'
                }`}
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                {String(look.rank).padStart(2, '0')}
              </span>
            </div>

            {/* CHANGE INDICATOR */}
            <div className="flex-shrink-0 w-4 text-center">
              {look.change === 'up' && <span className="text-xs text-green-400">↑</span>}
              {look.change === 'down' && <span className="text-xs text-red-300">↓</span>}
              {look.change === 'same' && <span className={`text-xs ${look.rank <= 2 ? 'text-white/40' : 'text-[#C4977E]'}`}>—</span>}
            </div>

            {/* LOOK INFO */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3
                  className="text-xl truncate"
                  style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}
                >
                  {look.name}
                </h3>
                <span
                  className={`flex-shrink-0 text-[10px] px-3 py-1 rounded-full tracking-widest uppercase ${
                    look.rank <= 2
                      ? 'bg-white/20 text-white'
                      : look.rank === 3
                      ? 'bg-[#F4845F]/10 text-[#F4845F]'
                      : 'bg-[#FFF0E8] text-[#F4845F]'
                  }`}
                  style={{ fontFamily: 'var(--font-josefin)' }}
                >
                  {look.category}
                </span>
              </div>
              <p className={`text-xs mb-2 ${look.rank <= 2 ? 'text-white/70' : 'text-[#8B5E52]'}`}>
                {look.description}
              </p>
              {/* HEAT BAR */}
              <div className={`h-1 rounded-full w-full ${look.rank <= 2 ? 'bg-white/20' : 'bg-[#FFE8D6]'}`}>
                <div
                  className={`h-1 rounded-full transition-all duration-700 ${look.rank <= 2 ? 'bg-white' : 'bg-[#F4845F]'}`}
                  style={{ width: `${look.heat}%` }}
                />
              </div>
              <p className={`text-[10px] mt-1 ${look.rank <= 2 ? 'text-white/50' : 'text-[#C4977E]'}`} style={{ fontFamily: 'var(--font-josefin)' }}>
                {look.heat}% heat score
              </p>
            </div>

            {/* TAGS — hidden on small */}
            <div className="hidden md:flex flex-wrap gap-2 flex-shrink-0 max-w-[140px]">
              {look.tags.map(tag => (
                <span
                  key={tag}
                  className={`text-[10px] px-2 py-1 rounded-full ${
                    look.rank <= 2
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
              className={`flex-shrink-0 px-5 py-2 rounded-full text-[10px] tracking-widest uppercase transition-all duration-200 ${
                look.rank <= 2
                  ? 'bg-white text-[#F4845F] hover:bg-[#FFF0E8]'
                  : 'bg-[#F4845F] text-white hover:bg-[#FFAA80]'
              }`}
              style={{ fontFamily: 'var(--font-josefin)' }}
            >
              Build →
            </Link>
          </div>
        ))}
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
