'use client'

import { useEffect } from 'react'
import Link from 'next/link'

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
  )
}
