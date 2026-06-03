'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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

      <Navbar />

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
              <p className="text-center text-sm text-[#8B5E52] mb-8" style={{ fontFamily: 'var(--font-josefin)' }}>
                Prefer to reach out directly? Email us at{' '}
                <a href="mailto:partners@zanzanbeauty.com" className="text-[#F4845F] hover:text-[#C7522A] transition-colors underline">
                  partners@zanzanbeauty.com
                </a>
              </p>
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

      <Footer />

    </div>
  )
}
