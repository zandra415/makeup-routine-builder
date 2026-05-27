'use client'

import { useState, useRef } from 'react'
import AvatarBuilder from './AvatarBuilder'

type FaceAnalysis = {
  faceShape: string
  skinTone: string
  eyeShape: string
  eyeColor: string
  lipShape: string
  undertone: string
  skinConcerns: string
}

type RoutineStep = {
  stepNumber: number
  title: string
  product: string
  technique: string
  placement: string
  tip: string
}

type Routine = {
  lookName: string
  estimatedTime: string
  steps: RoutineStep[]
  finishingNotes: string
}

const STEPS = [
  { id: 1, label: 'Face Input' },
  { id: 2, label: 'Your Products' },
  { id: 3, label: 'Choose a Look' },
  { id: 4, label: 'Your Routine' }
]

const LOOKS = [
  'Clean Girl',
  'Soft Glam',
  'Brat Summer',
  'Dark Feminine',
  'Latte Makeup',
  'Blush Everything',
  'Mob Wife Glam',
  'Coquette',
  'Strawberry Makeup',
  'Old Money Glam',
  'E-Girl Edge',
  'Siren Eye'
]

export default function MakeupWizard({ userId }: { userId?: string }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [inputMode, setInputMode] = useState<'upload' | 'avatar'>('upload')
  const [avatarData, setAvatarData] = useState<Partial<FaceAnalysis> | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [manualTraits, setManualTraits] = useState<Partial<FaceAnalysis>>({})
  const [products, setProducts] = useState<string[]>([''])
  const [desiredLook, setDesiredLook] = useState('')
  const [faceAnalysis, setFaceAnalysis] = useState<FaceAnalysis | null>(null)
  const [routine, setRoutine] = useState<Routine | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1]
        resolve(base64)
      }
      reader.onerror = reject
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const updateProduct = (index: number, value: string) => {
    const updated = [...products]
    updated[index] = value
    setProducts(updated)
  }

  const addProduct = () => setProducts([...products, ''])

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index))
  }

  const handleNextFromStep1 = async () => {
    setLoading(true)
    setError('')
    try {
      let body: Record<string, unknown>

      if (inputMode === 'upload' && imageFile) {
        const imageBase64 = await fileToBase64(imageFile)
        body = { imageBase64 }
      } else {
        body = { manualTraits }
      }

      const res = await fetch('/api/analyze-face', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!res.ok) throw new Error('Face analysis failed')

      const data = await res.json()
      setFaceAnalysis(data.faceAnalysis)
      setCurrentStep(2)
    } catch (e) {
      setError('Could not analyze your face. Please try again or use manual input.')
    } finally {
      setLoading(false)
    }
  }

  const handleNextFromStep2 = () => {
    const filled = products.filter(p => p.trim().length > 0)
    if (filled.length === 0) {
      setError('Please add at least one product.')
      return
    }
    setError('')
    setCurrentStep(3)
  }

  const handleNextFromStep3 = () => {
    if (!desiredLook) {
      setError('Please select a look.')
      return
    }
    setError('')
    handleGenerate()
  }

  const handleGenerate = async () => {
    setLoading(true)
    setError('')
    try {
      const filledProducts = products.filter(p => p.trim())

      const res = await fetch('/api/generate-routine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          faceAnalysis,
          products: filledProducts,
          desiredLook
        })
      })

      if (!res.ok) throw new Error('Routine generation failed')

      const data = await res.json()
      setRoutine(data.routine)
      setCurrentStep(4)

      if (userId) {
        await fetch('/api/save-routine', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            faceAnalysis,
            products: filledProducts,
            desiredLook,
            routine: data.routine
          })
        })
      }
    } catch (e) {
      setError('Could not generate routine. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF5F0] font-sans">
      {/* ---- Header ---- */}
      <header className="bg-gradient-to-r from-[#F4845F] to-[#FFAA80] border-b border-[#FFD4BC] px-6 py-4">
        <h1 className="text-2xl font-semibold text-yellow-300 font-serif italic tracking-tight">
          ZanZan
        </h1>
        <p className="text-yellow-100 text-sm mt-0.5">✦ serve your look ✦</p>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">

        {/* ---- Progress Steps ---- */}
        <div className="flex items-center justify-between mb-10">
          {STEPS.map((step, i) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all
                  ${currentStep === step.id ? 'bg-[#F4845F] text-white shadow-md' :
                    currentStep > step.id ? 'bg-[#FFD4BC] text-[#8B5E52]' :
                    'bg-[#FFF0E8] text-[#8B5E52]'}`}>
                  {currentStep > step.id ? '✓' : step.id}
                </div>
                <span className={`text-xs mt-1 font-medium
                  ${currentStep === step.id ? 'text-[#F4845F]' : 'text-[#8B5E52]/60'}`}>
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-4 rounded transition-all
                  ${currentStep > step.id ? 'bg-[#FFAA80]' : 'bg-[#FFD4BC]'}`} />
              )}
            </div>
          ))}
        </div>

        {/* ---- Error Banner ---- */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* ======================================================
            STEP 1 — FACE INPUT
        ====================================================== */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#FFD4BC] p-8">
            <h2 className="text-xl font-semibold text-[#1C0A00] mb-1">Tell us about your face</h2>
            <p className="text-sm text-[#8B5E52] mb-6">Upload a selfie for AI analysis, or fill in your features manually.</p>

            <div className="flex bg-[#FFF0E8] rounded-xl p-1 mb-6 gap-1">
              {(['upload', 'avatar'] as const).map(mode => (
                <button key={mode}
                  onClick={() => setInputMode(mode)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all capitalize
                    ${inputMode === mode ? 'bg-white shadow-sm text-[#F4845F]' : 'text-[#8B5E52] hover:text-[#1C0A00]'}`}>
                  {mode === 'upload' ? '📷 Upload Selfie' : '🎨 Build My Avatar'}
                </button>
              ))}
            </div>

            {inputMode === 'upload' ? (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
                    ${imagePreview ? 'border-[#F4845F] bg-[#FFF0E8]' : 'border-[#FFD4BC] hover:border-[#F4845F] hover:bg-[#FFF0E8]'}`}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-xl mx-auto" />
                  ) : (
                    <>
                      <div className="text-4xl mb-2">🤳</div>
                      <p className="text-sm text-[#8B5E52]">Click to upload a selfie</p>
                      <p className="text-xs text-[#8B5E52]/60 mt-1">JPG, PNG or HEIC • Max 10MB</p>
                    </>
                  )}
                </div>
                <button
                  onClick={handleNextFromStep1}
                  disabled={loading || !imageFile}
                  className="mt-8 w-full bg-gradient-to-r from-[#F4845F] to-[#FFAA80] text-white py-3 rounded-xl font-semibold
                             hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                  {loading ? 'Analyzing your face…' : 'Continue →'}
                </button>
              </>
            ) : (
              <AvatarBuilder
                onChange={(data) => setAvatarData(data)}
                onContinue={() => {
                  if (avatarData) {
                    setFaceAnalysis(avatarData as FaceAnalysis)
                    setCurrentStep(2)
                  }
                }}
              />
            )}
          </div>
        )}

        {/* ======================================================
            STEP 2 — PRODUCTS
        ====================================================== */}
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#FFD4BC] p-8">
            <h2 className="text-xl font-semibold text-[#1C0A00] mb-1">What products do you own?</h2>
            <p className="text-sm text-[#8B5E52] mb-6">
              Add the makeup products in your collection. Be specific — include brand and shade if you know them.
            </p>

            <div className="space-y-3">
              {products.map((product, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={product}
                    placeholder={`e.g. NARS Sheer Glow Foundation in Syracuse`}
                    onChange={e => updateProduct(i, e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-[#FFD4BC] bg-white text-[#1C0A00] text-sm focus:outline-none focus:ring-2 focus:ring-[#F4845F] placeholder:text-[#8B5E52]/40"
                  />
                  {products.length > 1 && (
                    <button
                      onClick={() => removeProduct(i)}
                      className="px-3 py-2 text-[#8B5E52] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={addProduct}
              className="mt-4 text-sm text-[#F4845F] font-medium hover:text-[#FFAA80] transition-colors">
              + Add another product
            </button>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setCurrentStep(1)}
                className="flex-1 py-3 rounded-xl border border-[#FFD4BC] text-sm text-[#8B5E52] hover:bg-[#FFF0E8] transition-all">
                ← Back
              </button>
              <button onClick={handleNextFromStep2}
                className="flex-1 bg-gradient-to-r from-[#F4845F] to-[#FFAA80] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all">
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ======================================================
            STEP 3 — LOOK SELECTOR
        ====================================================== */}
        {currentStep === 3 && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#FFD4BC] p-8">
            <h2 className="text-xl font-semibold text-[#1C0A00] mb-1">Choose your desired look</h2>
            <p className="text-sm text-[#8B5E52] mb-6">Select the style you want to create today.</p>

            <div className="grid grid-cols-2 gap-3">
              {LOOKS.map(look => (
                <button
                  key={look}
                  onClick={() => setDesiredLook(look)}
                  className={`p-4 rounded-xl border-2 text-sm font-medium text-left transition-all
                    ${desiredLook === look
                      ? 'border-[#F4845F] bg-[#FFF0E8] text-[#1C0A00]'
                      : 'border-[#FFD4BC] text-[#8B5E52] hover:border-[#F4845F] hover:bg-[#FFF0E8]'
                    }`}>
                  {look}
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setCurrentStep(2)}
                className="flex-1 py-3 rounded-xl border border-[#FFD4BC] text-sm text-[#8B5E52] hover:bg-[#FFF0E8] transition-all">
                ← Back
              </button>
              <button
                onClick={handleNextFromStep3}
                disabled={loading || !desiredLook}
                className="flex-1 bg-gradient-to-r from-[#F4845F] to-[#FFAA80] text-white py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-40 transition-all">
                {loading ? 'Generating your routine…' : '✦ Generate My Routine'}
              </button>
            </div>
          </div>
        )}

        {/* ======================================================
            STEP 4 — RESULTS
        ====================================================== */}
        {currentStep === 4 && routine && (
          <div>
            <div className="bg-gradient-to-br from-[#F4845F] to-[#FFAA80] rounded-2xl p-6 text-white mb-6">
              <p className="text-white/70 text-sm font-medium uppercase tracking-wider mb-1">Your Personalized Look</p>
              <h2 className="text-2xl font-bold mb-2">{routine.lookName}</h2>
              <p className="text-white/70 text-sm">⏱ {routine.estimatedTime}</p>
            </div>

            {faceAnalysis && (
              <div className="bg-white rounded-2xl border border-[#FFD4BC] p-6 mb-6">
                <h3 className="text-sm font-semibold text-[#8B5E52] uppercase tracking-wider mb-3">Based on your features</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(faceAnalysis).map(([key, val]) => (
                    <span key={key} className="px-3 py-1 bg-[#FFF0E8] text-[#8B5E52] rounded-full text-xs font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}: {val}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4 mb-6">
              {routine.steps.map(step => (
                <div key={step.stepNumber} className="bg-white rounded-2xl border border-[#FFD4BC] p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#FFF0E8] rounded-full flex items-center justify-center text-[#F4845F] font-bold text-sm flex-shrink-0 mt-0.5">
                      {step.stepNumber}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1C0A00] mb-1">{step.title}</h3>
                      <p className="text-xs font-medium text-[#F4845F] mb-3">🎨 {step.product}</p>

                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium text-[#8B5E52]">Technique: </span>
                          <span className="text-[#8B5E52]">{step.technique}</span>
                        </div>
                        <div>
                          <span className="font-medium text-[#8B5E52]">Placement: </span>
                          <span className="text-[#8B5E52]">{step.placement}</span>
                        </div>
                        <div className="mt-3 p-3 bg-[#FFF0E8] rounded-lg border border-[#FFD4BC]">
                          <span className="text-xs font-semibold text-[#F4845F] uppercase tracking-wide">Pro tip </span>
                          <span className="text-[#8B5E52] text-sm">{step.tip}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {routine.finishingNotes && (
              <div className="bg-[#FFF0E8] rounded-2xl border border-[#FFD4BC] p-6 mb-6">
                <h3 className="font-semibold text-[#1C0A00] mb-2">✦ Finishing Notes</h3>
                <p className="text-[#8B5E52] text-sm leading-relaxed">{routine.finishingNotes}</p>
              </div>
            )}

            <button
              onClick={() => {
                setCurrentStep(1)
                setRoutine(null)
                setFaceAnalysis(null)
                setProducts([''])
                setDesiredLook('')
                setImagePreview('')
                setImageFile(null)
              }}
              className="w-full py-3 rounded-xl border-2 border-[#FFD4BC] text-[#F4845F] font-semibold hover:bg-[#FFF0E8] transition-all">
              ← Create Another Routine
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
