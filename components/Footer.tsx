'use client'

const SOCIAL_ICONS = [
  {
    label: 'TikTok',
    svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>,
  },
  {
    label: 'Instagram',
    svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
  },
  {
    label: 'Pinterest',
    svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>,
  },
]

const COLUMNS = [
  {
    heading: 'Explore',
    links: [
      { label: 'Home',         href: '/' },
      { label: 'Lumi Studio',  href: '/lumi-studio' },
      { label: 'Trending',     href: '/trending' },
      { label: 'Community',    href: '/#community' },
    ],
  },
  {
    heading: 'Account',
    links: [
      { label: 'Sign In',      href: '/auth' },
      { label: 'My Routines',  href: '/account' },
      { label: 'Saved Looks',  href: '/account' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Partner With Us',  href: '/brands' },
      { label: 'Privacy Policy',   href: '/privacy' },
      { label: 'Terms Of Service', href: '/terms' },
      { label: 'Accessibility',    href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{ background: '#FFFAF5', fontFamily: 'var(--font-space-grotesk)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 48px 0' }}>

        {/* Main columns */}
        <div className="footer-grid" style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '40px', paddingBottom: '56px',
        }}>

          {/* Brand column */}
          <div>
            <span style={{
              fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '32px',
              color: '#F4845F', display: 'block', marginBottom: '14px',
            }}>ZanZan</span>
            <p style={{
              fontSize: '13px', color: '#8B5E52', lineHeight: 1.7,
              maxWidth: '280px', marginBottom: '24px',
            }}>
              Beauty Routines Built For You. Personalized Looks For Every Occasion, Every Budget, Every Time.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {SOCIAL_ICONS.map(s => (
                <a key={s.label} href="#" aria-label={s.label} target="_blank" rel="noopener noreferrer"
                  style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'transparent', border: '1px solid rgba(139,94,82,0.3)',
                    color: '#8B5E52', flexShrink: 0, transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#F4845F'; e.currentTarget.style.borderColor = '#F4845F'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#8B5E52'; e.currentTarget.style.borderColor = 'rgba(139,94,82,0.3)'; }}
                >{s.svg}</a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {COLUMNS.map(col => (
            <div key={col.heading}>
              <p style={{
                fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em',
                color: '#2D1F1A', textTransform: 'uppercase', marginBottom: '20px',
              }}>{col.heading}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {col.links.map(link => (
                  <a key={link.label} href={link.href} style={{
                    fontSize: '14px', color: '#8B5E52', textDecoration: 'none', transition: 'color 0.15s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#5A3828')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#8B5E52')}
                  >{link.label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(139,94,82,0.15)', padding: '20px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ fontSize: '12px', color: '#B89080' }}>© ZanZan Beauty Studio 2026</p>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {['Terms Of Service', 'Privacy Policy', 'Do Not Sell My Info'].map((link, i, arr) => (
              <span key={link} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <a href="#" style={{ fontSize: '12px', color: '#B89080', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#8B5E52')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#B89080')}
                >{link}</a>
                {i < arr.length - 1 && <span style={{ fontSize: '12px', color: '#B89080' }}>·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
