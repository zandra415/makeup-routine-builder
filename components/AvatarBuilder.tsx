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

// ─── Option lists ─────────────────────────────────────────────────────────────

const SKIN_TONES = [
  { value: 'f2d3b1', label: 'Fair',   color: '#F2D3B1' },
  { value: 'ecad80', label: 'Light',  color: '#ECAD80' },
  { value: 'b16a45', label: 'Tan',    color: '#B16A45' },
  { value: '92594b', label: 'Brown',  color: '#92594B' },
  { value: '4a312c', label: 'Dark',   color: '#4A312C' },
]

const HAIR_STYLES = [
  { value: 'long01', label: 'Straight' },
  { value: 'long02', label: 'Wavy' },
  { value: 'long03', label: 'Curly' },
  { value: 'short01', label: 'Short' },
  { value: 'short02', label: 'Textured' },
  { value: 'bun', label: 'Bun' },
]

const HAIR_COLORS = [
  { value: '0e0e0e', label: 'Black',  color: '#0E0E0E' },
  { value: '6a4e35', label: 'Brown',  color: '#6A4E35' },
  { value: 'f4d150', label: 'Blonde', color: '#F4D150' },
  { value: 'f59797', label: 'Pink',   color: '#F59797' },
  { value: '3eac2c', label: 'Green',  color: '#3EAC2C' },
  { value: 'e8e1ef', label: 'Silver', color: '#E8E1EF' },
]

const EYE_TYPES = [
  { value: 'variant01', label: 'Soft' },
  { value: 'variant02', label: 'Bright' },
  { value: 'variant03', label: 'Cat' },
  { value: 'variant04', label: 'Round' },
  { value: 'variant05', label: 'Doe' },
  { value: 'variant06', label: 'Bold' },
]

const MOUTH_TYPES = [
  { value: 'variant01', label: 'Smile' },
  { value: 'variant02', label: 'Neutral' },
  { value: 'variant03', label: 'Grin' },
  { value: 'variant04', label: 'Pout' },
]

// ─── FaceAnalysis mappings ────────────────────────────────────────────────────

const SKIN_TO_TONE: Record<string, string> = {
  'f2d3b1': 'fair',
  'ecad80': 'light',
  'b16a45': 'tan',
  '92594b': 'medium brown',
  '4a312c': 'dark',
}

const HAIR_TO_UNDERTONE: Record<string, string> = {
  '0e0e0e': 'neutral',
  '6a4e35': 'warm',
  'f4d150': 'warm',
  'f59797': 'cool',
  '3eac2c': 'cool',
  'e8e1ef': 'cool',
}

const EYE_TO_SHAPE: Record<string, string> = {
  variant01: 'almond',
  variant02: 'bright',
  variant03: 'cat',
  variant04: 'round',
  variant05: 'doe',
  variant06: 'hooded',
}

const MOUTH_TO_LIP: Record<string, string> = {
  variant01: 'full',
  variant02: 'natural',
  variant03: 'wide',
  variant04: 'downturned',
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Pill({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
        selected
          ? 'bg-[#F4845F] text-white shadow-sm scale-105'
          : 'bg-[#FFE8D6] text-[#C7522A] hover:bg-[#FFD4BC]'
      }`}
    >
      {label}
    </button>
  )
}

function Swatch({ color, label, selected, onClick }: { color: string; label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 flex-shrink-0 transition-all ${selected ? 'scale-110' : 'opacity-70 hover:opacity-100'}`}
    >
      <div
        className={`w-10 h-10 rounded-full border-2 transition-all ${selected ? 'border-[#F4845F] shadow-md' : 'border-[#FFD4BC]'}`}
        style={{ backgroundColor: color }}
      />
      <span className="text-[10px] text-[#8B5E52] font-medium">{label}</span>
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

// ─── Main component ───────────────────────────────────────────────────────────

export default function AvatarBuilder({ onChange, onContinue }: Props) {
  const [sel, setSel] = useState({
    skinColor:  '',
    hair:       'long02',
    hairColor:  '6a4e35',
    eyes:       'variant01',
    mouth:      'variant01',
  })

  const pick = (key: keyof typeof sel, val: string) => {
    const next = { ...sel, [key]: val }
    setSel(next)
    onChange({
      faceShape:    'oval',
      skinTone:     SKIN_TO_TONE[next.skinColor]    ?? '',
      eyeShape:     EYE_TO_SHAPE[next.eyes]         ?? 'almond',
      eyeColor:     'brown',
      lipShape:     MOUTH_TO_LIP[next.mouth]        ?? 'natural',
      undertone:    HAIR_TO_UNDERTONE[next.hairColor] ?? 'neutral',
      skinConcerns: '',
    })
  }

  const seed = `${sel.skinColor}-${sel.hair}-${sel.hairColor}-${sel.eyes}-${sel.mouth}`

  const avatarUrl = sel.skinColor
    ? `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(seed)}&backgroundColor=ffecd2&skinColor=${sel.skinColor}&hair=${sel.hair}&hairColor=${sel.hairColor}&eyes=${sel.eyes}&mouth=${sel.mouth}`
    : `https://api.dicebear.com/7.x/adventurer/svg?seed=zanzan-default&backgroundColor=ffecd2&hair=${sel.hair}&hairColor=${sel.hairColor}&eyes=${sel.eyes}&mouth=${sel.mouth}`

  const canContinue = !!sel.skinColor

  return (
    <div className="flex flex-col items-center gap-5">
      <style>{`.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}.scrollbar-hide::-webkit-scrollbar{display:none}`}</style>

      {/* Avatar preview */}
      <div
        className="bg-[#FFF0E8] rounded-full shadow-sm flex items-center justify-center overflow-hidden"
        style={{ width: 270, height: 270 }}
      >
        <img
          src={avatarUrl}
          alt="Your avatar"
          width={250}
          height={250}
          style={{ borderRadius: '50%' }}
        />
      </div>

      {!canContinue && (
        <p className="text-xs text-[#8B5E52] -mt-2">Pick a skin tone to see your avatar</p>
      )}

      {/* Customization rows */}
      <div className="w-full space-y-4">

        <Row label="Skin Tone">
          {SKIN_TONES.map(s => (
            <Swatch key={s.value} color={s.color} label={s.label} selected={sel.skinColor === s.value} onClick={() => pick('skinColor', s.value)} />
          ))}
        </Row>

        <Row label="Hair Style">
          {HAIR_STYLES.map(h => (
            <Pill key={h.value} label={h.label} selected={sel.hair === h.value} onClick={() => pick('hair', h.value)} />
          ))}
        </Row>

        <Row label="Hair Color">
          {HAIR_COLORS.map(c => (
            <Swatch key={c.value} color={c.color} label={c.label} selected={sel.hairColor === c.value} onClick={() => pick('hairColor', c.value)} />
          ))}
        </Row>

        <Row label="Eyes">
          {EYE_TYPES.map(e => (
            <Pill key={e.value} label={e.label} selected={sel.eyes === e.value} onClick={() => pick('eyes', e.value)} />
          ))}
        </Row>

        <Row label="Mouth">
          {MOUTH_TYPES.map(m => (
            <Pill key={m.value} label={m.label} selected={sel.mouth === m.value} onClick={() => pick('mouth', m.value)} />
          ))}
        </Row>

      </div>

      <button
        onClick={onContinue}
        disabled={!canContinue}
        className="w-full bg-[#F4845F] text-white py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all mt-1"
      >
        {canContinue ? 'This is me! Continue →' : 'Pick your skin tone to continue'}
      </button>
    </div>
  )
}
