'use client'

// Responsive behaviour: the three panels shrink side-by-side on mobile (stay as a strip,
// height drops from 300 → 190px). They do NOT stack. Column labels also stay 3-up.
// --font-caveat is registered in app/layout.tsx via next/font/google.

import LumiBlushResult from '@/components/LumiBlushResult'

export default function HowItWorksStrip() {
  return (
    <section aria-label="How it works" style={{ width: '100%' }}>
      <style>{`
        /* Panel height — overridable by media queries (no inline height) */
        .hiw-panel { height: 460px; overflow: hidden; }

        /* Ghost numbers — overridable font-size */
        .hiw-ghost {
          position: absolute; top: 8px; left: 12px;
          font-family: Georgia, serif; font-style: italic; font-weight: 700;
          font-size: 110px; line-height: 1;
          color: rgba(255,255,255,0.34);
          pointer-events: none; user-select: none; z-index: 4;
        }

        /* Mobile: shrink strip height, reduce ghost font */
        @media (max-width: 640px) {
          .hiw-panel { height: 260px; }
          .hiw-ghost { font-size: 68px; }
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════
          FULL-BLEED THREE-IMAGE STRIP
          flush: display:flex with no gap, each panel flex:1 1 0
          Replace placeholder divs with real media when ready.
      ═══════════════════════════════════════════════════════════ */}
      <div style={{ display: 'flex', width: '100%' }}>

        {/* ── Panel 1 — AI selfie video ──────────────────────────── */}
        <div
          className="hiw-panel"
          style={{
            flex: '1 1 0', minWidth: 0, position: 'relative',
            background: 'linear-gradient(155deg, #F7DCCC 0%, #EBC5AF 100%)',
          }}
        >
          <span className="hiw-ghost" aria-hidden="true">01</span>

          {/* Video — covers box edge to edge, autoplays muted and loops.
              Panel background acts as fallback if file is missing. */}
          <video
            src="/lumi-selfie-demo.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Corner scrim — dark radial vignette keeps "01" ghost number
              readable over bright footage without touching the rest of the frame */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '200px', height: '200px',
              background: 'radial-gradient(ellipse at top left, rgba(0,0,0,0.52) 0%, transparent 65%)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* ── Panel 2 — product scanner overlay ─────────────────── */}
        <div
          className="hiw-panel"
          style={{
            flex: '1 1 0', minWidth: 0, position: 'relative',
            background: 'linear-gradient(155deg, #EDD3BB 0%, #DCBCA0 100%)',
          }}
        >
          {/* z-index stack: image(0) → dark overlay(1) → scanner UI(2) → corner scrim(3) → ghost number(4) */}

          {/* Ghost number — sits above everything with a drop shadow for readability */}
          <span
            className="hiw-ghost"
            aria-hidden="true"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.60)' }}
          >02</span>

          {/* 1. Makeup flatlay image — fallback gradient if file missing */}
          <img
            src="/scanner-makeup.png"
            alt="Makeup products laid out"
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
          />

          {/* 2. Subtle dark film so white framing stays readable */}
          <div
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.18)', zIndex: 1, pointerEvents: 'none' }}
          />

          {/* 3. Corner scrim — keeps ghost "02" legible in the top-left */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '200px', height: '200px',
              background: 'radial-gradient(ellipse at top left, rgba(0,0,0,0.38) 0%, transparent 65%)',
              zIndex: 3,
              pointerEvents: 'none',
            }}
          />

          {/* 4. Scanner viewfinder UI */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>

            {/* Corner brackets — L-shaped, inset 20px from each edge */}
            {/* Top-left */}
            <div style={{
              position: 'absolute', top: 20, left: 20, width: 34, height: 34,
              borderTop: '3px solid #FFFAF5', borderLeft: '3px solid #FFFAF5',
              borderRadius: '4px 0 0 0',
            }} />
            {/* Top-right */}
            <div style={{
              position: 'absolute', top: 20, right: 20, width: 34, height: 34,
              borderTop: '3px solid #FFFAF5', borderRight: '3px solid #FFFAF5',
              borderRadius: '0 4px 0 0',
            }} />
            {/* Bottom-left */}
            <div style={{
              position: 'absolute', bottom: 112, left: 20, width: 34, height: 34,
              borderBottom: '3px solid #FFFAF5', borderLeft: '3px solid #FFFAF5',
              borderRadius: '0 0 0 4px',
            }} />
            {/* Bottom-right */}
            <div style={{
              position: 'absolute', bottom: 112, right: 20, width: 34, height: 34,
              borderBottom: '3px solid #FFFAF5', borderRight: '3px solid #FFFAF5',
              borderRadius: '0 0 4px 0',
            }} />

            {/* Instruction text */}
            <div style={{ position: 'absolute', bottom: 76, left: 0, right: 0, textAlign: 'center' }}>
              <span style={{
                fontFamily: 'var(--font-josefin)', fontSize: '11px',
                color: '#FFFAF5', letterSpacing: '0.06em',
                textShadow: '0 1px 5px rgba(0,0,0,0.55)',
              }}>
                Position product within the frame
              </span>
            </div>

          </div>

          {/* Start Scan button — needs pointer events, sits above scanner UI layer */}
          <div style={{ position: 'absolute', bottom: 24, left: 20, right: 20, zIndex: 3 }}>
            <button
              onClick={() => { /* TODO: trigger product scanner flow */ }}
              style={{
                width: '100%',
                background: '#F4845F',
                color: 'white',
                border: 'none',
                borderRadius: '999px',
                padding: '13px 22px',
                fontFamily: 'var(--font-josefin)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                lineHeight: 1,
              }}
            >
              Start Scan
            </button>
          </div>

        </div>

        {/* ── Panel 3 — Lumi results ─────────────────────────────── */}
        {/* TODO: clicking the panel could open a full LumiBlushResult modal */}
        <div
          className="hiw-panel"
          style={{
            flex: '1 1 0', minWidth: 0, position: 'relative',
            background: '#FFF8F5',
            overflow: 'hidden',
          }}
        >
          <span className="hiw-ghost" aria-hidden="true">03</span>

          {/* Corner scrim — keeps "03" ghost number readable over the white card */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '200px', height: '200px',
              background: 'radial-gradient(ellipse at top left, rgba(140,70,30,0.38) 0%, transparent 65%)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />

          {/* Cropped LumiBlushResult preview — scaled down to fit the panel */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '167%', height: '167%',
              transform: 'scale(0.6)', transformOrigin: 'top left',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            <LumiBlushResult />
          </div>
        </div>

      </div>

    </section>
  )
}
