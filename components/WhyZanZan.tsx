export default function WhyZanZan() {
  return (
    <section id="features" className="py-24 px-4" style={{ background: '#0A1A0F' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-medium tracking-[0.3em] uppercase mb-4" style={{ fontFamily: 'var(--font-josefin)', color: '#F5E6C8' }}>✦ Why ZanZan</p>
          <h2 className="text-5xl md:text-6xl text-white" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', fontWeight: '400', lineHeight: '1.2' }}>
            Every look you have ever wanted<br />starts right here.
          </h2>
          <div className="w-12 h-px mx-auto mt-8" style={{ background: '#F5E6C8' }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="p-8 rounded-3xl" style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(245,230,200,0.15)' }}>
            <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: 'var(--font-josefin)', color: '#6A9070' }}>Face Analysis</p>
            <p className="text-2xl text-white mb-4" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}>Drop a selfie and let AI do the work.</p>
            <p className="text-sm leading-relaxed" style={{ color: '#6A9070' }}>Showing results from face reads in seconds. Undertones, face shape, complexions, skin tone. Then builds a full personalized look for whatever the day calls for.</p>
          </div>
          <div className="p-8 rounded-3xl" style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(245,230,200,0.15)' }}>
            <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: 'var(--font-josefin)', color: '#6A9070' }}>Your Products</p>
            <p className="text-2xl text-white mb-4" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}>Your products. Perfected.</p>
            <p className="text-sm leading-relaxed" style={{ color: '#6A9070' }}>Show us what you own, we'll show you what look to make. Any brand, any shade. We build around your collection.</p>
          </div>
          <div className="p-8 rounded-3xl" style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(245,230,200,0.15)' }}>
            <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: 'var(--font-josefin)', color: '#6A9070' }}>Trending Looks</p>
            <p className="text-2xl text-white mb-4" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}>What is hot. Right now.</p>
            <p className="text-sm leading-relaxed" style={{ color: '#6A9070' }}>Clean Girl. Mob Wife. Going Out Looks. We pull what is trending and make it work for your face specifically.</p>
          </div>
          <div className="p-8 rounded-3xl" style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(245,230,200,0.15)' }}>
            <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: 'var(--font-josefin)', color: '#6A9070' }}>Personalized Steps</p>
            <p className="text-2xl text-white mb-4" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}>Steps made for your face only.</p>
            <p className="text-sm leading-relaxed" style={{ color: '#6A9070' }}>Not a tutorial. Not generic advice. Every single step written for your exact features.</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-3xl" style={{ background: 'rgba(245,230,200,0.05)', border: '0.5px solid rgba(245,230,200,0.15)' }}>
          <div className="flex gap-12 flex-wrap justify-center">
            <div className="text-center">
              <p className="text-4xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-syne)' }}>2min</p>
              <p className="text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-josefin)', color: '#4A7055' }}>to build your routine</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-syne)' }}>100%</p>
              <p className="text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-josefin)', color: '#4A7055' }}>personalized</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-syne)' }}>Free</p>
              <p className="text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-josefin)', color: '#4A7055' }}>during beta</p>
            </div>
          </div>
          <a href="/glam-lab" className="flex-shrink-0 px-8 py-4 rounded-full text-xs tracking-widest uppercase transition-all duration-200 hover:opacity-80" style={{ background: '#F5E6C8', color: '#0A1A0F', fontFamily: 'var(--font-josefin)' }}>
            Start Building Your Look →
          </a>
        </div>
      </div>
    </section>
  )
}
