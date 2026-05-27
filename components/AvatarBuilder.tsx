'use client'

import { useState } from 'react'

type FaceAnalysis = {
  faceShape: string
  skinTone: string
  eyeShape: string
  eyeColor: string
  lipShape: string
  undertone: string
  skinConcerns: string
}

type Props = {
  onChange: (a: Partial<FaceAnalysis>) => void
  onContinue: () => void
}

const SKIN_TONES = [
  { label: 'Fair',   value: 'fair',   fill: '#FDDCB5', stroke: '#E8C4A0' },
  { label: 'Light',  value: 'light',  fill: '#F5C090', stroke: '#D8A870' },
  { label: 'Medium', value: 'medium', fill: '#E8A87C', stroke: '#C88860' },
  { label: 'Tan',    value: 'tan',    fill: '#C68642', stroke: '#A06030' },
  { label: 'Deep',   value: 'deep',   fill: '#8D5524', stroke: '#6A3810' },
]

const EYE_COLORS = [
  { label: 'Brown', value: 'brown', color: '#6B3A2A' },
  { label: 'Hazel', value: 'hazel', color: '#8B7350' },
  { label: 'Green', value: 'green', color: '#4A7C59' },
  { label: 'Blue',  value: 'blue',  color: '#4A90D9' },
  { label: 'Gray',  value: 'gray',  color: '#8090A8' },
]

const UNDERTONES = [
  { label: 'Warm',    value: 'warm',    color: '#FFD4A0' },
  { label: 'Cool',    value: 'cool',    color: '#C8D8FF' },
  { label: 'Neutral', value: 'neutral', color: '#FFE8D6' },
]

const FACE_PATHS: Record<string, string> = {
  Oval:    'M100 22C148 22 178 64 178 120C178 178 148 218 100 218C52 218 22 178 22 120C22 64 52 22 100 22Z',
  Round:   'M100 32C150 32 170 70 170 120C170 170 150 210 100 210C50 210 30 170 30 120C30 70 50 32 100 32Z',
  Square:  'M70 28L130 28C158 28 174 46 174 74L174 168C174 196 158 212 130 212L70 212C42 212 26 196 26 168L26 74C26 46 42 28 70 28Z',
  Heart:   'M100 216C58 196 22 166 22 122C22 88 46 64 72 60C84 58 96 66 100 78C104 66 116 58 128 60C154 64 178 88 178 122C178 166 142 196 100 216Z',
  Diamond: 'M100 22C122 22 162 66 172 112C178 142 164 180 130 204C118 214 100 220 100 220C100 220 82 214 70 204C36 180 22 142 28 112C38 66 78 22 100 22Z',
}

const EYE_WHITES: Record<string, string> = {
  Almond:   'M-20 0Q-10-8 0-8Q10-8 20 0Q10 8 0 8Q-10 8-20 0Z',
  Round:    'M-15 0A15 13 0 1 1 15 0A15 13 0 1 1-15 0Z',
  Hooded:   'M-19 2Q-9-5 0-6Q9-5 19 2Q9 9 0 9Q-9 9-19 2Z',
  Monolid:  'M-19 0Q-5-3 0-4Q5-3 19 0Q10 8 0 8Q-10 8-19 0Z',
  Upturned: 'M-19 4Q-8-6 0-7Q10-8 19-1Q10 6 0 7Q-10 6-19 4Z',
}

const EYE_LIDS: Record<string, string> = {
  Almond:   'M-21 0Q-5-11 0-11Q15-11 21 0',
  Round:    'M-15-1Q0-14 15-1',
  Hooded:   'M-20 1Q-5-11 0-12Q15-11 20 1',
  Monolid:  'M-19 0Q-5-3 0-4Q5-3 19 0',
  Upturned: 'M-20 3Q-8-9 0-10Q12-11 20-2',
}

const LIP_PATHS: Record<string, { full: string; upper: string }> = {
  Full:         { full: 'M-18 0Q-9-10 0-8Q9-10 18 0Q9 12 0 13Q-9 12-18 0Z',          upper: 'M-18 0Q-9-10 0-8Q9-10 18 0Z' },
  Thin:         { full: 'M-15 0Q-7-4 0-3Q7-4 15 0Q7 5 0 6Q-7 5-15 0Z',              upper: 'M-15 0Q-7-4 0-3Q7-4 15 0Z' },
  'Bow-shaped': { full: 'M-18 0Q-12-5-5-8Q0-11 5-8Q12-5 18 0Q9 11 0 12Q-9 11-18 0Z', upper: 'M-18 0Q-12-5-5-8Q0-11 5-8Q12-5 18 0Z' },
  Wide:         { full: 'M-22 0Q-10-7 0-6Q10-7 22 0Q10 9 0 10Q-10 9-22 0Z',         upper: 'M-22 0Q-10-7 0-6Q10-7 22 0Z' },
  Heart:        { full: 'M-16 0Q-9-10-3-9Q0-7 0-7Q0-7 3-9Q9-10 16 0Q8 9 0 11Q-8 9-16 0Z', upper: 'M-16 0Q-9-10-3-9Q0-7 0-7Q0-7 3-9Q9-10 16 0Z' },
}

function Pill({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
        selected ? 'bg-[#F4845F] text-white shadow-sm scale-105' : 'bg-[#FFE8D6] text-[#C7522A] hover:bg-[#FFD4BC]'
      }`}
    >
      {label}
    </button>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-semibold text-[#8B5E52] uppercase tracking-wider mb-2">{label}</p>
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">{children}</div>
    </div>
  )
}

export default function AvatarBuilder({ onChange, onContinue }: Props) {
  const [sel, setSel] = useState({
    faceShape: '',
    skinTone:  '',
    eyeShape:  'Almond',
    eyeColor:  'brown',
    lipShape:  'Full',
    undertone: 'warm',
  })

  const pick = (key: keyof typeof sel, val: string) => {
    const next = { ...sel, [key]: val }
    setSel(next)
    onChange({
      faceShape:    next.faceShape.toLowerCase() || 'oval',
      skinTone:     SKIN_TONES.find(s => s.value === next.skinTone)?.label.toLowerCase() ?? '',
      eyeShape:     next.eyeShape.toLowerCase(),
      eyeColor:     EYE_COLORS.find(e => e.value === next.eyeColor)?.label.toLowerCase() ?? next.eyeColor,
      lipShape:     next.lipShape.toLowerCase(),
      undertone:    next.undertone,
      skinConcerns: '',
    })
  }

  const canContinue = !!sel.faceShape && !!sel.skinTone
  const skin   = SKIN_TONES.find(s => s.value === sel.skinTone)  ?? { fill: '#F0D0B0', stroke: '#D4B896' }
  const eyeCol = EYE_COLORS.find(e => e.value === sel.eyeColor)  ?? EYE_COLORS[0]
  const shape  = sel.faceShape || 'Oval'
  const lip    = LIP_PATHS[sel.lipShape]  ?? LIP_PATHS.Full
  const ew     = EYE_WHITES[sel.eyeShape] ?? EYE_WHITES.Almond
  const el     = EYE_LIDS[sel.eyeShape]   ?? EYE_LIDS.Almond

  return (
    <div className="flex flex-col items-center gap-5">
      <style>{`.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}.scrollbar-hide::-webkit-scrollbar{display:none}`}</style>

      {/* Avatar preview */}
      <div className="bg-[#FFF0E8] rounded-2xl px-8 pt-6 pb-3 shadow-sm">
        <svg viewBox="0 0 200 240" width="160" height="192">
          {/* Face outline */}
          <path d={FACE_PATHS[shape]} fill={skin.fill} stroke={skin.stroke} strokeWidth="1.5"
            style={{ transition: 'all 0.35s ease' }} />

          {/* Blush */}
          <ellipse cx="55"  cy="142" rx="15" ry="8" fill="#FFB5A7" opacity="0.38" />
          <ellipse cx="145" cy="142" rx="15" ry="8" fill="#FFB5A7" opacity="0.38" />

          {/* Eyebrows */}
          <path d="M46 94Q58 86 76 90"   fill="none" stroke="#3a1a08" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M124 90Q142 86 154 94" fill="none" stroke="#3a1a08" strokeWidth="2.2" strokeLinecap="round" />

          {/* Left eye */}
          <g transform="translate(65,110)" style={{ transition: 'all 0.35s ease' }}>
            <path d={ew} fill="white" stroke="#D4B896" strokeWidth="0.8" />
            <ellipse cy="1" rx="7" ry="7.5" fill={eyeCol.color} style={{ transition: 'fill 0.3s' }} />
            <ellipse cy="1" rx="3.5" ry="3.8" fill="#1a0a00" />
            <ellipse cx="-2" cy="-1.5" rx="1.5" ry="1.5" fill="white" opacity="0.85" />
            <path d={el} fill="none" stroke="#2a1008" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Right eye (mirrored) */}
          <g transform="translate(135,110) scale(-1,1)" style={{ transition: 'all 0.35s ease' }}>
            <path d={ew} fill="white" stroke="#D4B896" strokeWidth="0.8" />
            <ellipse cy="1" rx="7" ry="7.5" fill={eyeCol.color} style={{ transition: 'fill 0.3s' }} />
            <ellipse cy="1" rx="3.5" ry="3.8" fill="#1a0a00" />
            <ellipse cx="-2" cy="-1.5" rx="1.5" ry="1.5" fill="white" opacity="0.85" />
            <path d={el} fill="none" stroke="#2a1008" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Nose */}
          <path d="M94 143C92 149 91 154 94 156C97 158 103 158 106 156C109 154 108 149 106 143"
            fill="none" stroke={skin.stroke} strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />

          {/* Lips */}
          <g transform="translate(100,170)" style={{ transition: 'all 0.35s ease' }}>
            <path d={lip.full}  fill="#E8707A" />
            <path d={lip.upper} fill="#C05060" opacity="0.3" />
            <ellipse cy="4" rx="7" ry="2.5" fill="#F09090" opacity="0.4" />
          </g>
        </svg>
      </div>

      {/* Feature rows */}
      <div className="w-full space-y-4">

        <Row label="Face Shape">
          {['Oval','Round','Square','Heart','Diamond'].map(s => (
            <Pill key={s} label={s} selected={sel.faceShape === s} onClick={() => pick('faceShape', s)} />
          ))}
        </Row>

        <Row label="Skin Tone">
          {SKIN_TONES.map(t => (
            <button key={t.value} onClick={() => pick('skinTone', t.value)}
              className={`flex flex-col items-center gap-1 flex-shrink-0 transition-all ${sel.skinTone === t.value ? 'scale-110' : 'opacity-70 hover:opacity-100'}`}>
              <div className={`w-10 h-10 rounded-full border-2 transition-all ${sel.skinTone === t.value ? 'border-[#F4845F] shadow-md' : 'border-[#FFD4BC]'}`}
                style={{ backgroundColor: t.fill }} />
              <span className="text-[10px] text-[#8B5E52] font-medium">{t.label}</span>
            </button>
          ))}
        </Row>

        <Row label="Eye Shape">
          {['Almond','Round','Hooded','Monolid','Upturned'].map(s => (
            <Pill key={s} label={s} selected={sel.eyeShape === s} onClick={() => pick('eyeShape', s)} />
          ))}
        </Row>

        <Row label="Eye Color">
          {EYE_COLORS.map(c => (
            <button key={c.value} onClick={() => pick('eyeColor', c.value)}
              className={`flex flex-col items-center gap-1 flex-shrink-0 transition-all ${sel.eyeColor === c.value ? 'scale-110' : 'opacity-70 hover:opacity-100'}`}>
              <div className={`w-10 h-10 rounded-full border-2 transition-all ${sel.eyeColor === c.value ? 'border-[#F4845F] shadow-md' : 'border-[#FFD4BC]'}`}
                style={{ backgroundColor: c.color }} />
              <span className="text-[10px] text-[#8B5E52] font-medium">{c.label}</span>
            </button>
          ))}
        </Row>

        <Row label="Lip Shape">
          {['Full','Thin','Bow-shaped','Wide','Heart'].map(s => (
            <Pill key={s} label={s} selected={sel.lipShape === s} onClick={() => pick('lipShape', s)} />
          ))}
        </Row>

        <Row label="Undertone">
          {UNDERTONES.map(t => (
            <button key={t.value} onClick={() => pick('undertone', t.value)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                sel.undertone === t.value ? 'border-[#F4845F] scale-105' : 'border-transparent opacity-80 hover:opacity-100'
              }`}
              style={{ backgroundColor: t.color, color: '#1C0A00' }}>
              {t.label}
            </button>
          ))}
        </Row>

      </div>

      <button
        onClick={onContinue}
        disabled={!canContinue}
        className="w-full bg-[#F4845F] text-white py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all mt-1">
        {canContinue ? 'Looks good! Continue →' : 'Select face shape & skin tone to continue'}
      </button>
    </div>
  )
}
