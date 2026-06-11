export default function ThreeSteps() {
  return (
    <section id="how-it-works" className="py-20 px-4" style={{ background: '#0A1A0F' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.3em] uppercase mb-3" style={{ fontFamily: 'var(--font-josefin)', color: '#C8960A' }}>✦ The Process</p>
          <h2 className="text-6xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-syne)', fontWeight: '800' }}>Your most effortless look is three steps away.</h2>
          <p className="text-white/70 text-sm max-w-xl mx-auto leading-relaxed text-left">No more scrolling through hours of YouTube tutorials or TikTok videos trying to find the right shade or technique for your face. ZanZan builds your personalized makeup routine in minutes — all in one place.</p>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="relative flex items-start justify-between">

            <div className="absolute top-6 left-[10%] right-[10%] h-px z-0" style={{ background: 'rgba(244,132,95,0.4)' }} />

            <div className="flex-1 text-center relative z-10">
              <div className="mx-auto mb-2 w-8 h-8 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F4845F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#F4845F', boxShadow: '0 0 20px rgba(244,132,95,0.6)', border: '2px solid #FFAA80' }}>
                <span className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-syne)' }}>01</span>
              </div>
              <h3 className="text-lg text-white mb-2" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}>Take a Selfie</h3>
              <p className="text-xs leading-relaxed mx-auto max-w-[140px]" style={{ color: 'rgba(255,255,255,0.75)' }}>Snap a selfie and Lumi reads your face instantly. No camera? No problem — fill in your features manually.</p>
            </div>

            <div className="flex-1 text-center relative z-10">
              <div className="mx-auto mb-2 w-8 h-8 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F4845F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9V5a2 2 0 0 1 2-2h4"/><path d="M21 9V5a2 2 0 0 0-2-2h-4"/><path d="M3 15v4a2 2 0 0 0 2 2h4"/><path d="M21 15v4a2 2 0 0 1-2 2h-4"/><line x1="7" y1="12" x2="7.01" y2="12"/><line x1="12" y1="12" x2="12.01" y2="12"/><line x1="17" y1="12" x2="17.01" y2="12"/></svg>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#0F2818', border: '2px solid #F4845F' }}>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '15px', fontFamily: 'var(--font-syne)' }}>02</span>
              </div>
              <h3 className="text-lg text-white mb-2" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}>Scan Your Products</h3>
              <p className="text-xs leading-relaxed mx-auto max-w-[140px]" style={{ color: 'rgba(255,255,255,0.75)' }}>Scan your makeup products and the brand, shade and formula are instantly identified. No typing needed. Your full inventory uploaded in seconds.</p>
            </div>

            <div className="flex-1 text-center relative z-10">
              <div className="mx-auto mb-2 w-8 h-8 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F4845F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#0F2818', border: '2px solid rgba(244,132,95,0.6)' }}>
                <span style={{ color: '#FFAA80', fontWeight: 'bold', fontSize: '15px', fontFamily: 'var(--font-syne)' }}>03</span>
              </div>
              <h3 className="text-lg text-white mb-2" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}>Get Your Routine</h3>
              <p className="text-xs leading-relaxed mx-auto max-w-[140px]" style={{ color: 'rgba(255,255,255,0.75)' }}>Receive a full step by step routine built for YOU! The right products, the right technique, the right shades. Every time.</p>
            </div>

          </div>

        </div>

        <div className="text-center mt-4 pb-4">
          <a href="/lumi-studio" className="inline-block px-10 py-4 rounded-full text-xs tracking-widest uppercase transition-all duration-300 hover:opacity-80 hover:-translate-y-1" style={{ background: '#F4845F', color: 'white', fontFamily: 'var(--font-josefin)' }}>
            Build My Routine →
          </a>
        </div>

      </div>
    </section>
  )
}
