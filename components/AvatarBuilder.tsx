'use client'

import { useState } from 'react'
// @ts-ignore — avataaars peer dep targets React 17, works fine on React 19
import Avatar from 'avataaars'

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

// ─── Option lists ────────────────────────────────────────────────────────────

const TOP_TYPES = [
  { value: 'LongHairStraight',    label: 'Straight' },
  { value: 'LongHairWavy',        label: 'Wavy' },
  { value: 'LongHairBun',         label: 'Bun' },
  { value: 'ShortHairShortCurly', label: 'Short Curly' },
  { value: 'LongHairBob',         label: 'Bob' },
  { value: 'LongHairCurly',       label: 'Curly' },
]

const HAIR_COLORS = [
  { value: 'Black',      label: 'Black',       color: '#2C1B18' },
  { value: 'Brown',      label: 'Brown',        color: '#724133' },
  { value: 'Blonde',     label: 'Blonde',       color: '#F5C518' },
  { value: 'Auburn',     label: 'Auburn',       color: '#A55728' },
  { value: 'Red',        label: 'Red',          color: '#C93305' },
  { value: 'PastelPink', label: 'Pastel Pink',  color: '#F59797' },
  { value: 'Blue01',     label: 'Blue',         color: '#65C9FF' },
  { value: 'SilverGray', label: 'Silver',       color: '#AFAFAF' },
]

const EYE_TYPES = [
  { value: 'Default',   label: 'Default' },
  { value: 'Happy',     label: 'Happy' },
  { value: 'Surprised', label: 'Surprised' },
  { value: 'Wink',      label: 'Wink' },
  { value: 'Squint',    label: 'Squint' },
  { value: 'Dizzy',     label: 'Dreamy' },
]

const EYEBROW_TYPES = [
  { value: 'Default',       label: 'Default' },
  { value: 'RaisedExcited', label: 'Raised' },
  { value: 'SadConcerned',  label: 'Worried' },
  { value: 'UpDown',        label: 'Arched' },
  { value: 'Angry',         label: 'Bold' },
  { value: 'FlatNatural',   label: 'Natural' },
]

const MOUTH_TYPES = [
  { value: 'Default',  label: 'Neutral' },
  { value: 'Smile',    label: 'Smile' },
  { value: 'Serious',  label: 'Serious' },
  { value: 'Twinkle',  label: 'Playful' },
  { value: 'Tongue',   label: 'Fun' },
  { value: 'Sad',      label: 'Pouty' },
]

const SKIN_COLORS = [
  { value: 'Light',     label: 'Light',      color: '#FDDBB4' },
  { value: 'Yellow',    label: 'Yellow',      color: '#F5C28A' },
  { value: 'Tanned',    label: 'Tanned',      color: '#D08B5B' },
  { value: 'Brown',     label: 'Brown',        color: '#AE5D29' },
  { value: 'DarkBrown', label: 'Dark Brown',  color: '#614335' },
  { value: 'Black',     label: 'Black',        color: '#3C1F0E' },
]

const ACCESSORIES = [
  { value: 'Blank',          label: 'None' },
  { value: 'Kurt',           label: 'Round Frames' },
  { value: 'Prescription01', label: 'Glasses' },
  { value: 'Prescription02', label: 'Square Glasses' },
  { value: 'Round',          label: 'Circle Frames' },
  { value: 'Sunglasses',     label: 'Sunglasses' },
  { value: 'Wayfarers',      label: 'Wayfarers' },
]

// ─── faceAnalysis mappings ────────────────────────────────────────────────────

const SKIN_TO_TONE: Record<string, string> = {
  Light:     'fair light',
  Yellow:    'light yellow',
  Tanned:    'tanned',
  Brown:     'medium brown',
  DarkBrown: 'dark brown',
  Black:     'deep',
}

const EYE_TO_SHAPE: Record<string, string> = {
  Default:   'almond',
  Happy:     'upturned',
  Surprised: 'round',
  Wink:      'almond',
  Squint:    'hooded',
  Dizzy:     'round',
}

const MOUTH_TO_LIP: Record<string, string> = {
  Default: 'natural',
  Smile:   'full',
  Serious: 'thin',
  Twinkle: 'bow-shaped',
  Tongue:  'wide',
  Sad:     'downturned',
}

const HAIR_TO_UNDERTONE: Record<string, string> = {
  Black:      'neutral',
  Brown:      'warm',
  Blonde:     'warm',
  Auburn:     'warm',
  Red:        'warm',
  PastelPink: 'cool',
  Blue01:     'cool',
  SilverGray: 'cool',
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
    topType:         'LongHairWavy',
    hairColor:       'Brown',
    eyeType:         'Default',
    eyebrowType:     'Default',
    mouthType:       'Smile',
    skinColor:       '',
    accessoriesType: 'Blank',
  })

  const pick = (key: keyof typeof sel, val: string) => {
    const next = { ...sel, [key]: val }
    setSel(next)
    onChange({
      faceShape:    'oval',
      skinTone:     SKIN_TO_TONE[next.skinColor]    ?? '',
      eyeShape:     EYE_TO_SHAPE[next.eyeType]      ?? 'almond',
      eyeColor:     'brown',
      lipShape:     MOUTH_TO_LIP[next.mouthType]    ?? 'natural',
      undertone:    HAIR_TO_UNDERTONE[next.hairColor] ?? 'neutral',
      skinConcerns: '',
    })
  }

  const canContinue = !!sel.skinColor

  return (
    <div className="flex flex-col items-center gap-5">
      <style>{`.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}.scrollbar-hide::-webkit-scrollbar{display:none}`}</style>

      {/* Avatar preview */}
      <div
        className="bg-[#FFF0E8] rounded-full shadow-sm flex items-center justify-center"
        style={{ width: 270, height: 270 }}
      >
        <Avatar
          style={{ width: '250px', height: '250px' }}
          avatarStyle="Circle"
          topType={sel.topType}
          hairColor={sel.hairColor}
          facialHairType="Blank"
          clotheType="BlazerShirt"
          eyeType={sel.eyeType}
          eyebrowType={sel.eyebrowType}
          mouthType={sel.mouthType}
          skinColor={sel.skinColor || 'Light'}
          accessoriesType={sel.accessoriesType}
        />
      </div>

      {/* Customization rows */}
      <div className="w-full space-y-4">

        <Row label="Hair Style">
          {TOP_TYPES.map(t => (
            <Pill key={t.value} label={t.label} selected={sel.topType === t.value} onClick={() => pick('topType', t.value)} />
          ))}
        </Row>

        <Row label="Hair Color">
          {HAIR_COLORS.map(c => (
            <Swatch key={c.value} color={c.color} label={c.label} selected={sel.hairColor === c.value} onClick={() => pick('hairColor', c.value)} />
          ))}
        </Row>

        <Row label="Eyes">
          {EYE_TYPES.map(t => (
            <Pill key={t.value} label={t.label} selected={sel.eyeType === t.value} onClick={() => pick('eyeType', t.value)} />
          ))}
        </Row>

        <Row label="Eyebrows">
          {EYEBROW_TYPES.map(t => (
            <Pill key={t.value} label={t.label} selected={sel.eyebrowType === t.value} onClick={() => pick('eyebrowType', t.value)} />
          ))}
        </Row>

        <Row label="Mouth">
          {MOUTH_TYPES.map(t => (
            <Pill key={t.value} label={t.label} selected={sel.mouthType === t.value} onClick={() => pick('mouthType', t.value)} />
          ))}
        </Row>

        <Row label="Skin Tone">
          {SKIN_COLORS.map(c => (
            <Swatch key={c.value} color={c.color} label={c.label} selected={sel.skinColor === c.value} onClick={() => pick('skinColor', c.value)} />
          ))}
        </Row>

        <Row label="Accessories">
          {ACCESSORIES.map(a => (
            <Pill key={a.value} label={a.label} selected={sel.accessoriesType === a.value} onClick={() => pick('accessoriesType', a.value)} />
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
