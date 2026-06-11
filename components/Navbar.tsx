'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_LINKS = [
  { name: 'Home',        href: '/' },
  { name: 'Lumi Studio', href: '/lumi-studio' },
  { name: 'Trending',    href: '/trending' },
  { name: 'Community',   href: '/#community' },
];

const LOGO_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '22px',
  background: 'linear-gradient(135deg, #E8714A 0%, #F5A623 100%)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  backgroundClip: 'text', textDecoration: 'none',
};

export default function Navbar() {
  const pathname  = usePathname();
  const isHome    = pathname === '/';
  const [open, setOpen] = useState(false);

  return (
    <nav style={{
      position: isHome ? 'fixed' : 'sticky',
      top: 0, left: 0, right: 0, zIndex: 100,
      background: '#FFFFFF',
      borderBottom: '1px solid rgba(232, 113, 74, 0.12)',
    }}>

      {/* ── Desktop ── */}
      <div className="hidden md:grid" style={{
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center', padding: '0 40px', height: '64px',
      }}>
        {/* Left: logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Link href="/" style={LOGO_STYLE}>ZanZan</Link>
          <span aria-hidden="true" style={{ color: '#F5A623', fontSize: '13px', userSelect: 'none' }}>✦</span>
        </div>

        {/* Center: links */}
        <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          {NAV_LINKS.map(link => {
            const active = pathname === link.href;
            return (
              <Link key={link.name} href={link.href} style={{
                fontFamily: 'var(--font-space-grotesk)', fontSize: '13px', fontWeight: 500,
                letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
                color: active ? '#2D1F1A' : 'rgba(45,31,26,0.7)',
                borderBottom: active ? '1px solid #E8714A' : '1px solid transparent',
                paddingBottom: '2px', transition: 'color 0.2s',
              }}>{link.name}</Link>
            );
          })}
        </div>

        {/* Right: CTA pill */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link href="/account" style={{
            fontFamily: 'var(--font-space-grotesk)', fontSize: '13px', fontWeight: 600,
            textDecoration: 'none', color: 'white',
            background: '#E8714A',
            borderRadius: '999px', padding: '10px 22px',
            display: 'inline-block', transition: 'background 0.2s ease',
          }}>My Account</Link>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="flex md:hidden" style={{
        alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', height: '56px',
      }}>
        <Link href="/" style={LOGO_STYLE}>ZanZan</Link>
        <button onClick={() => setOpen(o => !o)} aria-label="Toggle menu" style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#2D1F1A', fontSize: '22px', lineHeight: 1,
        }}>☰</button>
      </div>

      {open && (
        <div style={{
          borderTop: '1px solid rgba(232, 113, 74, 0.12)',
          padding: '16px 20px 24px', background: '#FFFFFF',
          display: 'flex', flexDirection: 'column', gap: '16px',
        }}>
          {[...NAV_LINKS, { name: 'My Account', href: '/account' }].map(link => (
            <Link key={link.name} href={link.href} onClick={() => setOpen(false)} style={{
              fontFamily: 'var(--font-space-grotesk)', fontSize: '14px', fontWeight: 500,
              letterSpacing: '0.04em', textTransform: 'uppercase', textDecoration: 'none',
              color: pathname === link.href ? '#E8714A' : 'rgba(45,31,26,0.7)',
            }}>{link.name}</Link>
          ))}
        </div>
      )}
    </nav>
  );
}
