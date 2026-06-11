'use client'

// Reusable Lumi blush recommendation card — chat bubble style.
// Currently shows a hardcoded blush result for warm undertones.
// TODO: accept props (shades[], undertoneLabel, userName) to make it dynamic.
// NOTE: SVG filter IDs (lumiS1/2/3) must be unique per document instance.
//       If rendering multiple LumiBlushResult components on the same page,
//       pass an instanceId prop and suffix IDs to avoid collisions.

// ─── Powder swatch SVG ──────────────────────────────────────────────────────
// Renders an irregular blob with rough hand-swiped edges (feTurbulence +
// feDisplacementMap) and a powder-grain texture (high-freq feTurbulence
// composited as dark specks over the shape), plus scattered dust + clumps.

function BlushSwatch({ filterId, color, clump, seed1, seed2, blobPath }: {
  filterId: string
  color: string
  clump: string
  seed1: number
  seed2: number
  blobPath: string
}) {
  return (
    <svg
      width={72} height={42} viewBox="0 0 92 54"
      aria-hidden="true"
      style={{ flexShrink: 0, display: 'block' }}
    >
      <defs>
        <filter id={filterId} x="-25%" y="-25%" width="150%" height="150%">
          {/* Roughen blob edges via displacement */}
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.08" numOctaves={4} seed={seed1} result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale={13} xChannelSelector="R" yChannelSelector="G" result="displaced" />
          {/* Powder grain — high-freq noise thresholded into dark speckles */}
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={3} seed={seed2} result="grainTurb" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  4 0 0 0 -2.5"
            in="grainTurb" result="grainMask"
          />
          <feFlood floodColor="rgba(0,0,0,0.28)" result="darkFlood" />
          {/* Clip dark flood to grain mask → dark powder specks */}
          <feComposite in="darkFlood" in2="grainMask" operator="in" result="grainDark" />
          {/* Clip specks to blob shape */}
          <feComposite in="grainDark" in2="displaced" operator="in" result="grainInBlob" />
          {/* Merge: blob beneath, grain specks on top */}
          <feMerge>
            <feMergeNode in="displaced" />
            <feMergeNode in="grainInBlob" />
          </feMerge>
        </filter>
      </defs>

      {/* Main blob — rough edges + grain via filter */}
      <path d={blobPath} fill={color} filter={`url(#${filterId})`} />

      {/* Dust specks — unfiltered, naturally scattered outside/around the blob */}
      <circle cx={17} cy={47} r={1.2} fill={color} opacity={0.50} />
      <circle cx={67} cy={9}  r={1.3} fill={color} opacity={0.40} />
      <circle cx={79} cy={41} r={1.0} fill={color} opacity={0.45} />
      <circle cx={11} cy={21} r={1.2} fill={color} opacity={0.50} />
      <circle cx={83} cy={27} r={0.9} fill={color} opacity={0.35} />
      <circle cx={46} cy={51} r={1.1} fill={color} opacity={0.38} />

      {/* Clumps — slightly larger, darker tone */}
      <circle cx={22} cy={49} r={2.2} fill={clump} opacity={0.28} />
      <circle cx={71} cy={7}  r={1.9} fill={clump} opacity={0.24} />
    </svg>
  )
}

// ─── Shade data ─────────────────────────────────────────────────────────────
// TODO: Replace with dynamic data from Lumi API response / routine generation.

const SHADES = [
  {
    filterId: 'lumiS1',
    seed1: 2, seed2: 5,
    color: '#E8917F',
    clump: '#D9756A',
    name: 'Peach Crush',
    info: 'Soft warm coral, perfect for an everyday flush.',
    bestMatch: true,
    // Wide, gently rounded horizontal smear
    blobPath: 'M 12,32 C 9,22 19,13 33,14 C 46,15 58,10 69,15 C 80,20 83,30 77,38 C 71,46 53,48 38,45 C 23,42 15,42 12,32 Z',
  },
  {
    filterId: 'lumiS2',
    seed1: 7, seed2: 11,
    color: '#D96B6B',
    clump: '#B84F4F',
    name: 'Rosewood',
    info: 'A deeper rosy red for a bit more drama.',
    bestMatch: false,
    // Slightly elongated, higher center
    blobPath: 'M 14,27 C 10,18 22,10 37,11 C 53,12 65,7 73,14 C 81,21 79,34 68,40 C 57,46 40,47 25,44 C 10,41 18,36 14,27 Z',
  },
  {
    filterId: 'lumiS3',
    seed1: 13, seed2: 17,
    color: '#F0A88C',
    clump: '#E08A66',
    name: 'Sun Glow',
    info: 'Warm apricot that doubles as a soft bronzer.',
    bestMatch: false,
    // Wider, more irregular lower edge
    blobPath: 'M 10,30 C 6,20 15,12 29,13 C 44,14 57,9 69,14 C 81,19 85,31 76,39 C 67,47 47,50 31,47 C 15,44 14,40 10,30 Z',
  },
]

// ─── Main component ──────────────────────────────────────────────────────────

export default function LumiBlushResult() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '14px 12px' }}>

      {/* Orange Lumi avatar */}
      <div style={{
        width: '32px', height: '32px', borderRadius: '50%',
        background: '#F4845F', flexShrink: 0, marginTop: '2px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '15px', color: 'white', lineHeight: 1 }}>
          L
        </span>
      </div>

      {/* Chat bubble */}
      <div style={{
        background: 'white',
        borderRadius: '6px 18px 18px 18px',
        padding: '12px 14px',
        boxShadow: '0 8px 22px rgba(120,60,40,0.14)',
        flex: 1,
        minWidth: 0,
      }}>

        {/* Sender label */}
        <p style={{
          fontFamily: 'var(--font-josefin)', fontSize: '10px',
          letterSpacing: '1px', color: '#C56A2E',
          textTransform: 'uppercase', marginBottom: '5px',
        }}>
          LUMI
        </p>

        {/* Intro line */}
        <p style={{
          fontFamily: 'var(--font-josefin)', fontSize: '13px',
          color: '#5A3A30', lineHeight: '1.5', marginBottom: '14px',
        }}>
          For your warm undertones, here are three blushes that you own that will melt right in!
        </p>

        {/* Swatch rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
          {SHADES.map(shade => (
            <div key={shade.filterId} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

              <BlushSwatch
                filterId={shade.filterId}
                color={shade.color}
                clump={shade.clump}
                seed1={shade.seed1}
                seed2={shade.seed2}
                blobPath={shade.blobPath}
              />

              <div style={{ minWidth: 0, flex: 1 }}>
                {/* Name + BEST MATCH tag */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '3px' }}>
                  <span style={{
                    fontFamily: 'Georgia, serif', fontStyle: 'italic',
                    fontWeight: 700, fontSize: '14px', color: '#3A1A2E',
                  }}>
                    {shade.name}
                  </span>
                  {shade.bestMatch && (
                    <span style={{
                      fontFamily: 'var(--font-josefin)', fontSize: '9px',
                      letterSpacing: '0.5px', textTransform: 'uppercase',
                      color: '#C56A2E', background: '#FBE0D2',
                      padding: '2px 7px', borderRadius: '4px', fontWeight: 600,
                    }}>
                      BEST MATCH
                    </span>
                  )}
                </div>
                {/* Info line */}
                <p style={{
                  fontFamily: 'var(--font-josefin)', fontSize: '11px',
                  color: '#8A6655', lineHeight: '1.4', margin: 0,
                }}>
                  {shade.info}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Dupes link */}
        {/* TODO: onClick should fire a Lumi chat query for product dupes,
            e.g. open LumiChat with the prompt "find me dupes for these blushes" */}
        <div style={{ marginTop: '14px', paddingTop: '11px', borderTop: '1px solid #F2E2D8', textAlign: 'center' }}>
          <button
            onClick={() => { /* TODO: open Lumi dupe request */ }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0',
            }}
          >
            <span style={{
              width: '16px', height: '16px', borderRadius: '50%',
              background: '#F0DCEC', color: '#C04FA0',
              fontSize: '13px', fontWeight: 700, lineHeight: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>+</span>
            <span style={{
              fontFamily: 'var(--font-josefin)', fontSize: '12px',
              color: '#C04FA0', textDecoration: 'underline',
            }}>
              click here for dupes
            </span>
          </button>
        </div>

      </div>
    </div>
  )
}
