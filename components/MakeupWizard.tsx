// components/MakeupWizard.tsx
// This is the main interactive component — a 4-step wizard that collects
// everything needed to generate a personalized makeup routine.

'use client'  // This tells Next.js: "this component runs in the browser"

import { useState, useRef } from 'react'

// ============================================================
// TYPES
// TypeScript "types" define the shape of our data.
// Think of them like a contract — this is what the data must look like.
// ============================================================

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

// ============================================================
// WIZARD STEPS CONFIG
// Keeping the step titles in one place makes them easy to update.
// ============================================================

const STEPS = [
  { id: 1, label: 'Face Input' },
  { id: 2, label: 'Your Products' },
  { id: 3, label: 'Choose a Look' },
  { id: 4, label: 'Your Routine' }
]

const LOOKS = [
  'Natural & Dewy',
  'Classic Glam',
  'Smoky Eye',
  'Bold Lip',
  'Office Ready',
  'Festival Glow',
  'Minimalist No-Makeup Makeup',
  'Sunset Warm Tones'
]

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function MakeupWizard({ userId }: { userId?: string }) {
  // --- State variables ---
  // "State" is data that, when it changes, causes the component to re-render.
  // useState returns [currentValue, functionToUpdateValue].

  const [currentStep, setCurrentStep] = useState(1)
  const [inputMode, setInputMode] = useState<'upload' | 'manual'>('upload')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [manualTraits, setManualTraits] = useState<Partial<FaceAnalysis>>({})
  const [products, setProducts] = useState<string[]>([''])
  const [desiredLook, setDesiredLook] = useState('')
  const [faceAnalysis, setFaceAnalysis] = useState<FaceAnalysis | null>(null)
  const [routine, setRoutine] = useState<Routine | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // useRef lets us reference the hidden file input element
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ============================================================
  // HELPER FUNCTIONS
  // ============================================================

  // Convert a File object to a base64 string.
  // Base64 is a way to represent binary data (images) as text
  // so it can be sent in a JSON request body.
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        // result looks like: "data:image/jpeg;base64,/9j/4AAQ..."
        // We only want the part after the comma:
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
    // Create a local URL for the preview image — no upload needed for the preview
    setImagePreview(URL.createObjectURL(file))
  }

  const updateProduct = (index: number, value: string) => {
    const updated = [...products]  // copy the array (never mutate state directly)
    updated[index] = value
    setProducts(updated)
  }

  const addProduct = () => setProducts([...products, ''])

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index))
  }

  // ============================================================
  // STEP NAVIGATION & SUBMISSION
  // ============================================================

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

      // Call our API route — this runs on the server, not the browser
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

      // Save to database if user is logged in
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

  // ============================================================
  // RENDER — THE UI
  // ============================================================

  return (
    <div className="min-h-screen bg-[#FDF8F5] font-sans">
      {/* ---- Header ---- */}
      <header className="bg-white border-b border-rose-100 px-6 py-4">
        <h1 className="text-2xl font-semibold text-rose-900 tracking-tight">
          ✦ Makeup Routine Builder
        </h1>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">

        {/* ---- Progress Steps ---- */}
        <div className="flex items-center justify-between mb-10">
          {STEPS.map((step, i) => (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all
                  ${currentStep === step.id ? 'bg-rose-600 text-white shadow-md' :
                    currentStep > step.id ? 'bg-rose-200 text-rose-800' :
                    'bg-gray-100 text-gray-400'}`}>
                  {currentStep > step.id ? '✓' : step.id}
                </div>
                <span className={`text-xs mt-1 font-medium
                  ${currentStep === step.id ? 'text-rose-700' : 'text-gray-400'}`}>
                  {step.label}
                </span>
              </div>
              {/* Connector line between steps */}
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-4 rounded transition-all
                  ${currentStep > step.id ? 'bg-rose-300' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* ---- Error Banner ---- */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* ======================================================
            STEP 1 — FACE INPUT
        ====================================================== */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-rose-50 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Tell us about your face</h2>
            <p className="text-sm text-gray-500 mb-6">Upload a selfie for AI analysis, or fill in your features manually.</p>

            {/* Toggle: Upload vs Manual */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-6 gap-1">
              {(['upload', 'manual'] as const).map(mode => (
                <button key={mode}
                  onClick={() => setInputMode(mode)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all capitalize
                    ${inputMode === mode ? 'bg-white shadow-sm text-rose-700' : 'text-gray-500 hover:text-gray-700'}`}>
                  {mode === 'upload' ? '📷 Upload Selfie' : '✏️ Enter Manually'}
                </button>
              ))}
            </div>

            {inputMode === 'upload' ? (
              <div>
                {/* Hidden file input — triggered by clicking the styled box */}
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
                    ${imagePreview ? 'border-rose-300 bg-rose-50' : 'border-gray-200 hover:border-rose-300 hover:bg-rose-50'}`}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-xl mx-auto" />
                  ) : (
                    <>
                      <div className="text-4xl mb-2">🤳</div>
                      <p className="text-sm text-gray-500">Click to upload a selfie</p>
                      <p className="text-xs text-gray-400 mt-1">JPG, PNG or HEIC • Max 10MB</p>
                    </>
                  )}
                </div>
              </div>
            ) : (
              /* Manual trait inputs */
              <div className="grid grid-cols-2 gap-4">
                {([
                  ['faceShape', 'Face Shape', 'e.g. oval, round, square'],
                  ['skinTone', 'Skin Tone', 'e.g. fair, medium, deep'],
                  ['eyeShape', 'Eye Shape', 'e.g. almond, round, hooded'],
                  ['eyeColor', 'Eye Color', 'e.g. brown, hazel, blue'],
                  ['lipShape', 'Lip Shape', 'e.g. full, thin, bow-shaped'],
                  ['undertone', 'Undertone', 'e.g. warm, cool, neutral'],
                ] as [keyof FaceAnalysis, string, string][]).map(([key, label, placeholder]) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                    <input
                      type="text"
                      placeholder={placeholder}
                      value={manualTraits[key] || ''}
                      onChange={e => setManualTraits({ ...manualTraits, [key]: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={handleNextFromStep1}
              disabled={loading || (inputMode === 'upload' && !imageFile)}
              className="mt-8 w-full bg-rose-600 text-white py-3 rounded-xl font-semibold
                         hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
              {loading ? 'Analyzing your face…' : 'Continue →'}
            </button>
          </div>
        )}

        {/* ======================================================
            STEP 2 — PRODUCTS
        ====================================================== */}
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl shadow-sm border border-rose-50 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">What products do you own?</h2>
            <p className="text-sm text-gray-500 mb-6">
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
                    className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                  />
                  {products.length > 1 && (
                    <button
                      onClick={() => removeProduct(i)}
                      className="px-3 py-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={addProduct}
              className="mt-4 text-sm text-rose-600 font-medium hover:text-rose-800 transition-colors">
              + Add another product
            </button>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setCurrentStep(1)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-all">
                ← Back
              </button>
              <button onClick={handleNextFromStep2}
                className="flex-1 bg-rose-600 text-white py-3 rounded-xl font-semibold hover:bg-rose-700 transition-all">
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ======================================================
            STEP 3 — LOOK SELECTOR
        ====================================================== */}
        {currentStep === 3 && (
          <div className="bg-white rounded-2xl shadow-sm border border-rose-50 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Choose your desired look</h2>
            <p className="text-sm text-gray-500 mb-6">Select the style you want to create today.</p>

            <div className="grid grid-cols-2 gap-3">
              {LOOKS.map(look => (
                <button
                  key={look}
                  onClick={() => setDesiredLook(look)}
                  className={`p-4 rounded-xl border-2 text-sm font-medium text-left transition-all
                    ${desiredLook === look
                      ? 'border-rose-500 bg-rose-50 text-rose-800'
                      : 'border-gray-100 text-gray-700 hover:border-rose-200 hover:bg-rose-50/50'
                    }`}>
                  {look}
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setCurrentStep(2)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-all">
                ← Back
              </button>
              <button
                onClick={handleNextFromStep3}
                disabled={loading || !desiredLook}
                className="flex-1 bg-rose-600 text-white py-3 rounded-xl font-semibold hover:bg-rose-700 disabled:opacity-50 transition-all">
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
            {/* Look summary card */}
            <div className="bg-gradient-to-br from-rose-600 to-rose-800 rounded-2xl p-6 text-white mb-6">
              <p className="text-rose-200 text-sm font-medium uppercase tracking-wider mb-1">Your Personalized Look</p>
              <h2 className="text-2xl font-bold mb-2">{routine.lookName}</h2>
              <p className="text-rose-200 text-sm">⏱ {routine.estimatedTime}</p>
            </div>

            {/* Face analysis summary */}
            {faceAnalysis && (
              <div className="bg-white rounded-2xl border border-rose-50 p-6 mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Based on your features</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(faceAnalysis).map(([key, val]) => (
                    <span key={key} className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-xs font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}: {val}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Step-by-step instructions */}
            <div className="space-y-4 mb-6">
              {routine.steps.map(step => (
                <div key={step.stepNumber} className="bg-white rounded-2xl border border-rose-50 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-700 font-bold text-sm flex-shrink-0 mt-0.5">
                      {step.stepNumber}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-xs font-medium text-rose-600 mb-3">🎨 {step.product}</p>

                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Technique: </span>
                          <span className="text-gray-600">{step.technique}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Placement: </span>
                          <span className="text-gray-600">{step.placement}</span>
                        </div>
                        <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Pro tip </span>
                          <span className="text-amber-800 text-sm">{step.tip}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Finishing notes */}
            {routine.finishingNotes && (
              <div className="bg-rose-50 rounded-2xl border border-rose-100 p-6 mb-6">
                <h3 className="font-semibold text-rose-900 mb-2">✦ Finishing Notes</h3>
                <p className="text-rose-800 text-sm leading-relaxed">{routine.finishingNotes}</p>
              </div>
            )}

            {/* Start over button */}
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
              className="w-full py-3 rounded-xl border-2 border-rose-200 text-rose-700 font-semibold hover:bg-rose-50 transition-all">
              ← Create Another Routine
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
