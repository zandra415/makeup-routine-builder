'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const STATS = [
  { value: '10k+', label: 'Monthly Users' },
  { value: '18-24', label: 'Core Demographic' },
  { value: '73%', label: 'Purchase Beauty Monthly' },
  { value: '4.2min', label: 'Avg Session Time' },
]

const PACKAGES = [
  {
    name: 'Starter',
    price: '$200',
    period: 'per month',
    color: '#FFF0E8',
    textColor: '#1C0A00',
    features: [
      'Logo placement in brand strip',
      'Link to your product page',
      'Monthly performance report',
      'ZanZan Approved badge',
    ]
  },
  {
    name: 'Featured',
    price: '$500',
    period: 'per month',
    color: '#F4845F',
    textColor: 'white',
    tag: 'Most Popular',
    features: [
      'Everything in Starter',
      'Product of the Week placement',
      'Featured in one trending look',
      'Affiliate link integration',
      'Priority placement in routines',
    ]
  },
  {
    name: 'Premium',
    price: '$1,000',
    period: 'per month',
    color: '#1C0A00',
    textColor: 'white',
    features: [
      'Everything in Featured',
      'Sponsored Look of the Week',
      'Custom routine integration',
      'Dedicated brand landing page',
      'Weekly performance reports',
      'Direct founder access',
    ]
  }
]

export default function BrandsPage() {
  const [formData, setFormData] = useState({ brand: '', email: '', website: '', package: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!formData.brand || !formData.email) return
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#FFFAF5]">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#FFFAF5]/90 backdrop-blur-md border-b border-[#FFD4BC]/40 flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-6">
          {['Home', 'Glam Lab', 'Trending', 'Community', 'Account'].map((item) => (
            <Link
              key={item}
              href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
              className="text-xs tracking-widest uppercase text-[#1C0A00] hover:text-[#F4845F] transition-colors duration-200"
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
      <div className="relative overflow-hidden bg-[#1C0A00] py-24 px-4 text-center">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#F4845F] opacity-10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#FFAA80] opacity-10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-xs font-medium text-[#F4845F] tracking-[0.3em] uppercase mb-4" style={{ fontFamily: 'var(--font-josefin)' }}>✦ Brand Partnerships</p>
          <h1 className="text-6xl text-white mb-6" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', fontWeight: '400', lineHeight: '1.2' }}>
            Reach Gen Z where they actually get ready.
          </h1>
          <p className="text-[#C4977E] text-sm leading-relaxed mb-8 max-w-xl mx-auto">
            ZanZan puts your products inside personalized AI beauty routines built for real faces. Not banner ads. Not sponsored posts. Native integration that converts.
          </p>
          <a href="#contact" className="inline-block px-10 py-4 rounded-full bg-[#F4845F] text-white text-xs tracking-widest uppercase hover:bg-[#FFAA80] transition-all duration-200" style={{ fontFamily: 'var(--font-josefin)' }}>
            Partner With Us →
          </a>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="bg-[#F4845F] py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-syne)' }}>{stat.value}</p>
              <p className="text-xs text-white/70 tracking-widest uppercase" style={{ fontFamily: 'var(--font-josefin)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WHY ZANZAN FOR BRANDS */}
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <p className="text-xs text-[#F4845F] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: 'var(--font-josefin)' }}>✦ Why Partner With Us</p>
          <h2 className="text-4xl text-[#1C0A00]" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}>Not an ad. A recommendation.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Native Integration', body: 'Your products appear inside AI generated routines as genuine recommendations. Users trust routines built for their face. That trust transfers to your brand.' },
            { title: 'Purchase Intent', body: 'ZanZan users are actively building looks and ready to buy. Your product appears at the exact moment they are deciding what to use next.' },
            { title: 'Gen Z Reach', body: 'Our core audience is 18 to 24 year old beauty enthusiasts who are shaping what is trending on TikTok and Instagram right now.' },
          ].map((item) => (
            <div key={item.title} className="p-8 rounded-3xl bg-white border border-[#FFD4BC]" style={{ boxShadow: '0 2px 20px rgba(244,132,95,0.06)' }}>
              <h3 className="text-lg text-[#1C0A00] mb-3" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{item.title}</h3>
              <p className="text-sm text-[#8B5E52] leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PACKAGES */}
      <div className="max-w-5xl mx-auto px-4 pb-20">
        <div className="text-center mb-14">
          <p className="text-xs text-[#F4845F] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: 'var(--font-josefin)' }}>✦ Partnership Packages</p>
          <h2 className="text-4xl text-[#1C0A00]" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}>Find your fit.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className="rounded-3xl p-8 relative overflow-hidden"
              style={{ background: pkg.color, boxShadow: '0 4px 30px rgba(244,132,95,0.1)' }}
            >
              {pkg.tag && (
                <span className="absolute top-4 right-4 text-[10px] px-3 py-1 rounded-full bg-white/20 text-white tracking-widest uppercase" style={{ fontFamily: 'var(--font-josefin)' }}>
                  {pkg.tag}
                </span>
              )}
              <p className="text-xs tracking-widest uppercase mb-2" style={{ fontFamily: 'var(--font-josefin)', color: pkg.textColor, opacity: 0.6 }}>{pkg.name}</p>
              <p className="text-4xl font-bold mb-1" style={{ fontFamily: 'var(--font-syne)', color: pkg.textColor }}>{pkg.price}</p>
              <p className="text-xs mb-6" style={{ color: pkg.textColor, opacity: 0.5, fontFamily: 'var(--font-josefin)' }}>{pkg.period}</p>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: pkg.textColor, opacity: 0.85 }}>
                    <span style={{ color: pkg.name === 'Starter' ? '#F4845F' : 'white' }}>✦</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="block w-full text-center py-3 rounded-full text-xs tracking-widest uppercase transition-all duration-200"
                style={{
                  fontFamily: 'var(--font-josefin)',
                  background: pkg.name === 'Starter' ? '#F4845F' : 'rgba(255,255,255,0.2)',
                  color: pkg.name === 'Starter' ? 'white' : pkg.textColor,
                  border: pkg.name !== 'Starter' ? '1px solid rgba(255,255,255,0.3)' : 'none'
                }}
              >
                Get Started →
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT FORM */}
      <div id="contact" className="bg-[#FFF0E8] py-20 px-4 border-t border-[#FFD4BC]">
        <div className="max-w-lg mx-auto">
          {!submitted ? (
            <>
              <div className="text-center mb-10">
                <p className="text-xs text-[#F4845F] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: 'var(--font-josefin)' }}>✦ Get In Touch</p>
                <h2 className="text-4xl text-[#1C0A00]" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}>Limited spots available.</h2>
                <p className="text-sm text-[#8B5E52] mt-3">We work with a select number of brand partners each month. Apply below and we will be in touch within 48 hours.</p>
              </div>
              <div className="space-y-4">
                {[
                  { key: 'brand', placeholder: 'Brand name' },
                  { key: 'email', placeholder: 'Contact email' },
                  { key: 'website', placeholder: 'Website URL' },
                ].map((field) => (
                  <input
                    key={field.key}
                    type="text"
                    placeholder={field.placeholder}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl border border-[#FFD4BC] bg-white text-sm text-[#1C0A00] placeholder-[#C4977E] outline-none focus:border-[#F4845F] transition-all"
                    style={{ fontFamily: 'var(--font-josefin)' }}
                  />
                ))}
                <select
                  value={formData.package}
                  onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl border border-[#FFD4BC] bg-white text-sm text-[#1C0A00] outline-none focus:border-[#F4845F] transition-all"
                  style={{ fontFamily: 'var(--font-josefin)' }}
                >
                  <option value="">Select a package</option>
                  <option value="starter">Starter — $200/month</option>
                  <option value="featured">Featured — $500/month</option>
                  <option value="premium">Premium — $1,000/month</option>
                </select>
                <textarea
                  placeholder="Tell us about your brand and what you are looking to achieve"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-5 py-4 rounded-2xl border border-[#FFD4BC] bg-white text-sm text-[#1C0A00] placeholder-[#C4977E] outline-none focus:border-[#F4845F] transition-all resize-none"
                  style={{ fontFamily: 'var(--font-josefin)' }}
                />
                <button
                  onClick={handleSubmit}
                  className="w-full py-4 rounded-full bg-[#F4845F] text-white text-xs tracking-widest uppercase hover:bg-[#FFAA80] transition-all duration-200"
                  style={{ fontFamily: 'var(--font-josefin)' }}
                >
                  Apply to Partner →
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-4xl mb-4">✦</p>
              <h2 className="text-3xl text-[#1C0A00] mb-3" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>Application received.</h2>
              <p className="text-sm text-[#8B5E52] leading-relaxed">We will be in touch within 48 hours. We are excited to work with you.</p>
            </div>
          )}
        </div>
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
        <p className="text-[#C4977E] text-xs">© 2026 ZanZan Beauty Studio. All rights reserved.</p>
      </footer>

    </div>
  )
}
