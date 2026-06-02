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

const LOOK_OF_THE_WEEK = {
  name: 'Glazed Skin',
  category: 'Everyday',
  description: 'This week everyone is obsessing over the glass skin effect. Dewy, luminous, and impossibly fresh — this is the look taking over every For You page right now.',
  creator: '@zanzan.beauty',
  tags: ['dewy', 'glass', 'skincare', 'minimal'],
  heat: 99
}

const FEATURED_PRODUCTS = [
  { name: 'Rare Beauty Soft Pinch Tinted Lip Oil', brand: 'Rare Beauty', price: '$20', category: 'Lips', tag: 'Viral Pick', color: '#FFE8D6' },
  { name: 'Charlotte Tilbury Flawless Filter', brand: 'Charlotte Tilbury', price: '$49', category: 'Base', tag: 'Editor Fave', color: '#FFF0E8' },
  { name: 'NARS Blush in Orgasm', brand: 'NARS', price: '$32', category: 'Blush', tag: 'Classic', color: '#FFD4BC' },
  { name: 'e.l.f. Halo Glow Liquid Filter', brand: 'e.l.f. Cosmetics', price: '$14', category: 'Base', tag: 'Dupe Alert', color: '#FFF5EE' },
  { name: 'Laneige Lip Sleeping Mask', brand: 'Laneige', price: '$24', category: 'Lips', tag: 'TikTok Fave', color: '#FFE8D6' },
  { name: 'Colourpop Super Shock Cheek', brand: 'Colourpop', price: '$9', category: 'Blush', tag: 'Budget Gem', color: '#FFF0E8' },
]

export default function TrendingPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredRank, setHoveredRank] = useState<number | null>(null)
  const [updatedAt, setUpdatedAt] = useState('')
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [activeProduct, setActiveProduct] = useState(0)

  useEffect(() => {
    setUpdatedAt(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }))
  }, [])

  useEffect(() => {
    const getNextMonday = () => {
      const now = new Date()
      const day = now.getDay()
      const daysUntilMonday = day === 0 ? 1 : 8 - day
      const nextMonday = new Date(now)
      nextMonday.setDate(now.getDate() + daysUntilMonday)
      nextMonday.setHours(0, 0, 0, 0)
      return nextMonday
    }

    const timer = setInterval(() => {
      const now = new Date()
      const target = getNextMonday()
      const diff = target.getTime() - now.getTime()
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProduct(prev => (prev + 1) % FEATURED_PRODUCTS.length)
    }, 3000)
    return () => clearInterval(interval)
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
      <div className="pt-16 text-center px-4 relative overflow-hidden">
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

      {/* LOOK OF THE WEEK */}
      <div className="relative rounded-none overflow-hidden bg-[#0A1A0F] p-8 md:p-12">

          {/* Background watermark */}
          <span className="absolute -right-8 -bottom-8 text-[12rem] font-bold text-white/5 leading-none select-none pointer-events-none" style={{ fontFamily: 'var(--font-syne)' }}>01</span>

          {/* Top label */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#F4845F] animate-pulse" />
              <p className="text-xs tracking-[0.3em] uppercase text-[#F4845F]" style={{ fontFamily: 'var(--font-josefin)' }}>✦ Look of the Week</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-[#F4845F]/20 text-[#FFAA80]" style={{ fontFamily: 'var(--font-josefin)' }}>
              {LOOK_OF_THE_WEEK.heat}% heat
            </span>
          </div>

          {/* Look name */}
          <h2 className="text-5xl text-white mb-3" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}>
            {LOOK_OF_THE_WEEK.name}
          </h2>
          <p className="text-xs text-[#FFAA80] mb-4 tracking-widest uppercase" style={{ fontFamily: 'var(--font-josefin)' }}>
            {LOOK_OF_THE_WEEK.category} · Curated by {LOOK_OF_THE_WEEK.creator}
          </p>
          <p className="text-[#C4977E] text-sm leading-relaxed mb-8 max-w-xl">
            {LOOK_OF_THE_WEEK.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {LOOK_OF_THE_WEEK.tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/70">
                {tag}
              </span>
            ))}
          </div>

          {/* Countdown + CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              href={`/glam-lab?look=${encodeURIComponent(LOOK_OF_THE_WEEK.name)}`}
              className="px-8 py-3 rounded-full bg-[#F4845F] text-white text-xs tracking-widest uppercase hover:bg-[#FFAA80] transition-all duration-200"
              style={{ fontFamily: 'var(--font-josefin)' }}
            >
              Build This Look →
            </Link>
            <div>
              <p className="text-[10px] text-[#8B5E52] tracking-widest uppercase mb-2" style={{ fontFamily: 'var(--font-josefin)' }}>Next drop in</p>
              <div className="flex items-center gap-3">
                {[
                  { value: timeLeft.days, label: 'days' },
                  { value: timeLeft.hours, label: 'hrs' },
                  { value: timeLeft.minutes, label: 'min' },
                  { value: timeLeft.seconds, label: 'sec' }
                ].map((unit, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-syne)' }}>
                      {String(unit.value).padStart(2, '0')}
                    </div>
                    <div className="text-[9px] text-[#8B5E52] uppercase tracking-widest" style={{ fontFamily: 'var(--font-josefin)' }}>
                      {unit.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      {/* SHOP THE MOMENT */}
      <div className="max-w-4xl mx-auto px-4 mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-[#F4845F] tracking-[0.3em] uppercase mb-1" style={{ fontFamily: 'var(--font-josefin)' }}>✦ Products We Love</p>
            <h2 className="text-2xl text-[#1C0A00]" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}>Shop the Moment</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveProduct(prev => (prev - 1 + FEATURED_PRODUCTS.length) % FEATURED_PRODUCTS.length)}
              className="w-8 h-8 rounded-full border border-[#FFD4BC] bg-white flex items-center justify-center text-[#8B5E52] hover:border-[#F4845F] hover:text-[#F4845F] transition-all"
            >←</button>
            <button
              onClick={() => setActiveProduct(prev => (prev + 1) % FEATURED_PRODUCTS.length)}
              className="w-8 h-8 rounded-full border border-[#FFD4BC] bg-white flex items-center justify-center text-[#8B5E52] hover:border-[#F4845F] hover:text-[#F4845F] transition-all"
            >→</button>
          </div>
        </div>

        <div className="flex gap-4 overflow-hidden">
          {FEATURED_PRODUCTS.map((product, i) => {
            const position = (i - activeProduct + FEATURED_PRODUCTS.length) % FEATURED_PRODUCTS.length
            const isActive = position === 0
            const isVisible = isActive || position === 1 || position === 2

            if (!isVisible) return null

            return (
              <div
                key={product.name}
                className={`flex-shrink-0 rounded-3xl p-6 transition-all duration-500 ${
                  isActive ? 'w-64 opacity-100' : 'w-52 opacity-50'
                }`}
                style={{ background: product.color }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] px-3 py-1 rounded-full bg-white/60 text-[#8B5E52] tracking-widest uppercase" style={{ fontFamily: 'var(--font-josefin)' }}>
                    {product.tag}
                  </span>
                  <span className="text-[10px] text-[#C4977E]" style={{ fontFamily: 'var(--font-josefin)' }}>{product.category}</span>
                </div>

                <div className="w-full h-28 rounded-2xl bg-white/40 flex items-center justify-center mb-4">
                  <span className="text-4xl">
                    {product.category === 'Lips' ? '💋' : product.category === 'Blush' ? '🌸' : '✨'}
                  </span>
                </div>

                <p className="text-xs text-[#8B5E52] mb-1" style={{ fontFamily: 'var(--font-josefin)' }}>{product.brand}</p>
                <p className="text-sm font-medium text-[#1C0A00] mb-1 leading-snug" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{product.name}</p>
                <p className="text-sm font-bold text-[#F4845F] mb-4">{product.price}</p>

                <a
                  href={`https://www.sephora.com/search?keyword=${encodeURIComponent(product.name)}&utm_source=zanzan&utm_medium=affiliate`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-2 rounded-full bg-[#F4845F] text-white text-[10px] tracking-widest uppercase hover:bg-[#FFAA80] transition-all"
                  style={{ fontFamily: 'var(--font-josefin)' }}
                >
                  Shop Now →
                </a>
              </div>
            )
          })}
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {FEATURED_PRODUCTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveProduct(i)}
              className={`transition-all duration-300 rounded-full ${
                i === activeProduct ? 'w-6 h-2 bg-[#F4845F]' : 'w-2 h-2 bg-[#FFD4BC]'
              }`}
            />
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
        <p className="text-xs text-[#8B5E52] mb-4">
          Are you a brand?{' '}
          <a href="/brands" className="text-[#F4845F] underline hover:text-[#C7522A] transition-colors" style={{ fontFamily: 'var(--font-josefin)' }}>
            Partner with ZanZan →
          </a>
        </p>
        <p className="text-[#C4977E] text-xs">© 2026 ZanZan Beauty Studio. All rights reserved.</p>
      </footer>

    </div>
  )
}
