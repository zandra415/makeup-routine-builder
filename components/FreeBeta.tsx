'use client'

import { useEffect } from 'react'

export default function FreeBeta() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-[#FFFAF5] py-12 px-4">
      <div className="fade-up max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-3xl" style={{ background: 'rgba(245,230,200,0.05)', border: '0.5px solid rgba(245,230,200,0.15)' }}>
          <div className="flex gap-8 justify-center">
            <div className="text-center">
              <p className="text-4xl font-bold text-[#1C0A00] mb-1" style={{ fontFamily: 'var(--font-syne)' }}>2min</p>
              <p className="text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-josefin)', color: '#8B5E52' }}>to build your routine</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#1C0A00] mb-1" style={{ fontFamily: 'var(--font-syne)' }}>100%</p>
              <p className="text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-josefin)', color: '#8B5E52' }}>personalized</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#1C0A00] mb-1" style={{ fontFamily: 'var(--font-syne)' }}>Free</p>
              <p className="text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-josefin)', color: '#8B5E52' }}>during beta</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
