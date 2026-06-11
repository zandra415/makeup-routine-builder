'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const STATS = [
  { value: '18-24', label: 'Core Demographic' },
  { value: 'Early Access', label: 'Founding Brand Program' },
  { value: 'Growing Beta Community', label: 'Join Us Early' },
  { value: '$0 Setup', label: 'No Hidden Fees' },
]


export default function BrandsPage() {
  const [formData, setFormData] = useState({ brand: '', email: '', website: '', package: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!formData.brand || !formData.email) return
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#0A1A0F]">

      <Navbar />

      {/* HERO */}
      <div className="relative overflow-hidden bg-[#1C0A00] py-24 px-4 text-center">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#F4845F] opacity-10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#FFAA80] opacity-10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-xs font-medium text-[#F4845F] tracking-[0.3em] uppercase mb-4" style={{ fontFamily: 'var(--font-josefin)' }}>✦ Brand Partnerships</p>
          <h1 className="text-6xl text-white mb-6" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', fontWeight: '400', lineHeight: '1.2' }}>
            Where Gen Z Gets Ready, Your Brand Gets Seen.
          </h1>
          <p className="text-[#C4977E] text-sm leading-relaxed mb-8 max-w-xl mx-auto text-left">
            The brands blowing up on TikTok are not paying for ads. They are being recommended. ZanZan puts your products inside personalized routines reaching thousands of real users and influencers daily.
          </p>
          <a href="#contact" className="inline-block px-10 py-4 rounded-full bg-[#F4845F] text-white text-xs tracking-widest uppercase hover:bg-[#FFAA80] transition-all duration-200" style={{ fontFamily: 'var(--font-josefin)' }}>
            Partner With Us →
          </a>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="py-8 px-4" style={{ background: '#0F2818' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-bold mb-1" style={{ fontFamily: 'var(--font-syne)', fontSize: stat.value.length > 6 ? '1.1rem' : '1.875rem', color: '#F4845F' }}>{stat.value}</p>
              <p className="text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-josefin)', color: 'rgba(244,132,95,0.6)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WHY ZANZAN FOR BRANDS */}
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <p className="text-xs text-[#F4845F] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: 'var(--font-josefin)' }}>✦ Why Partner With Us</p>
          <h2 className="text-4xl text-white" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}>Not an ad. A recommendation.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Native Integration',
              body: 'Your products appear inside AI generated routines as genuine recommendations. Users trust routines built for them. That trust transfers to your brand.',
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F4845F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
            },
            {
              title: 'Purchase Intent',
              body: 'ZanZan users are actively building looks and ready to buy. Your product appears at the exact moment they are deciding what to use next.',
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F4845F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
            },
            {
              title: 'Gen Z Reach',
              body: 'Our core audience is 18 to 24 year old beauty enthusiasts who are shaping what is trending on TikTok and Instagram right now.',
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F4845F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
            },
          ].map((item) => (
            <div key={item.title} className="p-8 rounded-3xl" style={{ background: '#0F2818', border: '1px solid rgba(244,132,95,0.15)', borderLeft: '3px solid #F4845F', boxShadow: '0 2px 20px rgba(0,0,0,0.2)' }}>
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg text-white mb-3" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PACKAGES */}
      <div className="px-4 py-20" style={{ background: '#0A1A0F' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs text-[#F4845F] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: 'var(--font-josefin)' }}>✦ Founding Partner Spots ✦</p>
          <h2 className="text-4xl text-white mb-4" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}>Limited availability. Apply early.</h2>
          <p className="text-sm text-white/70 max-w-xl leading-relaxed">We are onboarding a small group of founding brand partners for our beta launch. Early partners get priority placement, founding rates and direct access to our team.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          {/* Starter */}
          <div className="rounded-3xl p-8 text-center" style={{ background: '#1A0A05', border: '1px solid rgba(244,132,95,0.2)' }}>
            <p className="text-sm font-semibold text-[#F4845F] mb-3" style={{ fontFamily: 'var(--font-syne)' }}>Starter</p>
            <p className="text-xs text-white/70 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-josefin)' }}>Brand placement and affiliate link integration across ZanZan routines.</p>
            <p className="text-sm text-[#F4845F]/60 font-medium italic mb-6" style={{ fontFamily: 'Georgia, serif' }}>Pricing on request</p>
            <a href="#contact" className="inline-block px-6 py-2 rounded-full text-xs tracking-widest uppercase transition-all hover:opacity-80" style={{ background: '#F4845F', color: 'white', fontFamily: 'var(--font-josefin)' }}>Apply →</a>
          </div>

          {/* Featured */}
          <div className="rounded-3xl p-8 text-center relative" style={{ background: '#F4845F' }}>
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] px-4 py-1 rounded-full bg-[#1C0A00] text-white tracking-widest uppercase" style={{ fontFamily: 'var(--font-josefin)' }}>Most Popular</span>
            <p className="text-sm font-semibold text-white mb-3" style={{ fontFamily: 'var(--font-syne)' }}>Featured ✦</p>
            <p className="text-xs text-white/80 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-josefin)' }}>Routine integration, product of the week placement and affiliate link priority.</p>
            <p className="text-sm text-white/60 font-medium italic mb-6" style={{ fontFamily: 'Georgia, serif' }}>Pricing on request</p>
            <a href="#contact" className="inline-block px-6 py-2 rounded-full text-xs tracking-widest uppercase transition-all hover:opacity-80" style={{ background: 'white', color: '#F4845F', fontFamily: 'var(--font-josefin)' }}>Apply →</a>
          </div>

          {/* Premium */}
          <div className="rounded-3xl p-8 text-center" style={{ background: '#1C0A00' }}>
            <p className="text-sm font-semibold text-[#F5E6C8] mb-3" style={{ fontFamily: 'var(--font-syne)' }}>Premium</p>
            <p className="text-xs text-[#8B5E52] leading-relaxed mb-4" style={{ fontFamily: 'var(--font-josefin)' }}>Full campaign integration, Look of the Week sponsorship and weekly performance reports.</p>
            <p className="text-sm text-[#6A5030] font-medium italic mb-6" style={{ fontFamily: 'Georgia, serif' }}>Pricing on request</p>
            <a href="#contact" className="inline-block px-6 py-2 rounded-full text-xs tracking-widest uppercase transition-all hover:opacity-80" style={{ background: '#F4845F', color: 'white', fontFamily: 'var(--font-josefin)' }}>Apply →</a>
          </div>

        </div>

        <p className="text-center text-xs text-white/40" style={{ fontFamily: 'var(--font-josefin)' }}>All partnerships are custom tailored. We will reach out within 48 hours of your application.</p>
      </div>
      </div>

      {/* CONTACT FORM */}
      <div id="contact" className="bg-[#FFF0E8] py-20 px-4 border-t border-[#FFD4BC]">
        <div className="max-w-lg mx-auto">
          {!submitted ? (
            <>
              <div className="text-center mb-10">
                <p className="text-xs text-[#F4845F] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: 'var(--font-josefin)' }}>✦ Get In Touch</p>
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
                    className="w-full px-5 py-4 rounded-2xl border border-[#FFD4BC] bg-white text-sm text-[#1C0A00] placeholder-[#C4977E] outline-none focus:border-[#F4845F] transition-all leading-relaxed"
                    style={{ fontFamily: 'Georgia, serif', lineHeight: '1.8' }}
                  />
                ))}
                <select
                  value={formData.package}
                  onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl border border-[#FFD4BC] bg-white text-sm text-[#1C0A00] outline-none focus:border-[#F4845F] transition-all"
                  style={{ fontFamily: 'Georgia, serif', lineHeight: '1.8' }}
                >
                  <option value="">Select a package</option>
                  <option value="starter">Starter</option>
                  <option value="featured">Featured</option>
                  <option value="premium">Premium</option>
                </select>
                <textarea
                  placeholder="Tell us about your brand, the product you want featured and what you are looking to achieve. The more specific you are the better we can tailor your partnership."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-5 py-4 rounded-2xl border border-[#FFD4BC] bg-white text-sm text-[#1C0A00] placeholder-[#C4977E] outline-none focus:border-[#F4845F] transition-all resize-none leading-relaxed"
                  style={{ fontFamily: 'Georgia, serif', fontStyle: 'normal', lineHeight: '1.8' }}
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

      <Footer hideNewsletter />

    </div>
  )
}
