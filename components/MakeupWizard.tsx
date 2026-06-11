'use client'

import { useState, useRef } from 'react'
import AvatarBuilder from './AvatarBuilder'
import { supabase } from '@/lib/supabase'

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
  const [selfieFile, setSelfieFile] = useState<File | null>(null)
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null)
  const [showCamera, setShowCamera] = useState(false)
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const [manualTraits, setManualTraits] = useState<Partial<FaceAnalysis>>({})
  const [products, setProducts] = useState<string[]>([''])
  const [desiredLook, setDesiredLook] = useState('')
  const [faceAnalysis, setFaceAnalysis] = useState<FaceAnalysis | null>(null)
  const [routine, setRoutine] = useState<Routine | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [limitReached, setLimitReached] = useState(false)
  const [saveEmail, setSaveEmail] = useState('')
  const [savingEmail, setSavingEmail] = useState(false)
  const [emailSaved, setEmailSaved] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const routineSavedRef = useRef(false)

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
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      setError('Please upload a JPG, PNG, or WebP image.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be under 10MB.')
      return
    }
    setError('')
    setImageFile(file)
    setSelfieFile(file)
    setImagePreview(URL.createObjectURL(file))
    setSelfiePreview(URL.createObjectURL(file))
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

  const startCamera = async () => {
    try {
      const constraints = [
        { video: { facingMode: 'user', width: 1280, height: 720 } },
        { video: { facingMode: 'user' } },
        { video: true }
      ]

      let stream = null
      for (const constraint of constraints) {
        try {
          stream = await navigator.mediaDevices.getUserMedia(constraint)
          break
        } catch (e) {
          continue
        }
      }

      if (!stream) throw new Error('No camera found')

      setCameraStream(stream)
      setShowCamera(true)

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play().catch(console.error)
        }
      }, 200)
    } catch (err: any) {
      console.error('Camera error:', err)
      if (err.name === 'NotAllowedError') {
        alert('Camera permission denied. Click the lock icon in your address bar, set Camera to Allow, then refresh the page.')
      } else if (err.name === 'NotFoundError') {
        alert('No camera found on this device.')
      } else {
        alert('Could not start camera: ' + err.message)
      }
    }
  }

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop())
      setCameraStream(null)
    }
    setShowCamera(false)
  }

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return
    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(-1, 1)
    ctx.drawImage(video, -canvas.width, 0)
    canvas.toBlob((blob) => {
      if (!blob) return
      const file = new File([blob], 'selfie.jpg', { type: 'image/jpeg' })
      const dataUrl = canvas.toDataURL('image/jpeg')
      setSelfiePreview(dataUrl)
      setSelfieFile(file)
      stopCamera()
    }, 'image/jpeg', 0.9)
  }

  const handleNextFromStep1 = async () => {
    setLoading(true)
    setError('')
    setLimitReached(false)
    try {
      let body: Record<string, unknown>

      const photoFile = selfieFile || imageFile
      if (inputMode === 'upload' && photoFile) {
        const imageBase64 = await fileToBase64(photoFile)
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

  const handleEmailSave = async () => {
    if (!saveEmail || !saveEmail.includes('@')) return
    setSavingEmail(true)
    try {
      await supabase.auth.signInWithOtp({
        email: saveEmail,
        options: {
          emailRedirectTo: window.location.origin + '/account',
          data: { source: 'routine_save' }
        }
      })
      if (userId && !routineSavedRef.current) {
        await fetch('/api/save-routine', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, routine, products, desiredLook, faceAnalysis })
        })
        routineSavedRef.current = true
      }
      setEmailSaved(true)
    } catch (err) {
      console.error(err)
    } finally {
      setSavingEmail(false)
    }
  }

  const handleGenerate = async () => {
    setLoading(true)
    setError('')
    setLimitReached(false)
    try {
      const filledProducts = products.filter(p => p.trim())

      const res = await fetch('/api/generate-routine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          faceAnalysis,
          products: filledProducts,
          desiredLook,
          userId
        })
      })

      if (res.status === 429) {
        const data = await res.json()
        setError(data.message)
        setLimitReached(true)
        return
      }

      if (!res.ok) throw new Error('Routine generation failed')

      const data = await res.json()
      setRoutine(data.routine)
      setCurrentStep(4)

      if (userId && !routineSavedRef.current) {
        await fetch('/api/save-routine', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, faceAnalysis, products: filledProducts, desiredLook, routine: data.routine })
        })
        routineSavedRef.current = true
      }
    } catch (e) {
      setError('Could not generate routine. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getAffiliateLink = (product: string): string => {
    const encoded = encodeURIComponent(product)
    const sephoraBase = 'https://www.sephora.com/search?keyword='
    const ultaBase = 'https://www.ulta.com/search?searchTerm='

    const ultaBrands = ['elf', 'e.l.f', 'nyx', 'colourpop', 'wet n wild', 'milani', 'la girl', 'essence']
    const isUlta = ultaBrands.some(brand => product.toLowerCase().includes(brand))

    const baseUrl = isUlta ? ultaBase : sephoraBase
    return `${baseUrl}${encoded}&utm_source=zanzan&utm_medium=affiliate&utm_campaign=routine`
  }

  return (
    <div className="font-sans">
<main className="max-w-2xl mx-auto px-4 pt-0 pb-10">

        {/* ---- Error Banner ---- */}
        {error && (
          <div className={`mb-6 p-4 rounded-2xl border text-sm ${limitReached ? 'bg-[#FFF0E8] border-[#FFD4BC] text-[#1C0A00]' : 'bg-red-50 border-red-200 text-red-600'}`}>
            <p className={limitReached ? 'font-medium text-[#C7522A] mb-2' : ''}>{error}</p>
            {limitReached && (
              <a
                href="/auth"
                className="inline-block mt-1 px-5 py-2 rounded-full bg-[#F4845F] text-white text-xs font-medium tracking-widest uppercase hover:bg-[#FFAA80] transition-all"
                style={{ fontFamily: 'var(--font-josefin)' }}
              >
                Sign in to unlock more →
              </a>
            )}
          </div>
        )}

        {/* ======================================================
            STEP 1 — FACE INPUT
        ====================================================== */}
        {currentStep === 1 && (
          <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.92)', boxShadow: '0 12px 30px rgba(120,60,120,0.18)' }}>
            <h2 className="text-xl font-semibold text-[#1C0A00] mb-1">Let's start with your features</h2>
            <p className="text-sm text-[#8B5E52] mb-6">Upload a selfie for AI analysis, or enter your features manually.</p>

            <div className="flex gap-2 mb-6">
              {(['upload', 'avatar'] as const).map(mode => (
                <button key={mode} onClick={() => setInputMode(mode)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    inputMode === mode ? 'bg-[#F4845F] text-white' : 'border border-[#FFD4BC] text-[#8B5E52] hover:bg-[#FFF0E8]'
                  }`}>
                  {mode === 'upload' ? '📸 Upload Photo' : '✦ Enter Manually'}
                </button>
              ))}
            </div>

            {inputMode === 'upload' && (
              <>
                {!selfiePreview && !showCamera && (
                  <div className="flex gap-3 mb-4">
                    <button onClick={() => fileInputRef.current?.click()}
                      className="flex-1 py-8 rounded-2xl border-2 border-dashed border-[#FFD4BC] text-[#8B5E52] text-sm hover:bg-[#FFF0E8] hover:border-[#F4845F] transition-all">
                      📁 Upload photo
                    </button>
                    <button onClick={startCamera}
                      className="flex-1 py-8 rounded-2xl border-2 border-dashed border-[#FFD4BC] text-[#8B5E52] text-sm hover:bg-[#FFF0E8] hover:border-[#F4845F] transition-all">
                      📷 Take selfie
                    </button>
                  </div>
                )}
                <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleImageChange} />
                {showCamera && (
                  <div className="mb-4">
                    <video ref={videoRef} autoPlay playsInline className="w-full rounded-2xl" style={{ transform: 'scaleX(-1)' }} />
                    <canvas ref={canvasRef} className="hidden" />
                    <div className="flex gap-3 mt-3">
                      <button onClick={stopCamera} className="flex-1 py-2.5 rounded-xl border border-[#FFD4BC] text-[#8B5E52] text-sm hover:bg-[#FFF0E8] transition-all">Cancel</button>
                      <button onClick={capturePhoto} className="flex-1 py-2.5 rounded-xl bg-[#F4845F] text-white text-sm font-medium hover:bg-[#FFAA80] transition-all">Capture ✦</button>
                    </div>
                  </div>
                )}
                {selfiePreview && (
                  <div className="mb-4 text-center">
                    <img src={selfiePreview} alt="Your photo" className="w-32 h-32 object-cover rounded-2xl mx-auto mb-3" />
                    <button onClick={() => { setSelfiePreview(null); setSelfieFile(null); setImageFile(null); setImagePreview('') }}
                      className="text-sm text-[#8B5E52] hover:text-[#F4845F] transition-colors">✕ Remove</button>
                  </div>
                )}
              </>
            )}

            {inputMode === 'avatar' && (
              <div className="space-y-3 mb-2">
                {([
                  { key: 'faceShape',    placeholder: 'Face shape (e.g. oval, round, square)' },
                  { key: 'skinTone',     placeholder: 'Skin tone (e.g. fair, medium, deep)' },
                  { key: 'undertone',    placeholder: 'Undertone (e.g. warm, cool, neutral)' },
                  { key: 'eyeShape',     placeholder: 'Eye shape (e.g. almond, round, hooded)' },
                  { key: 'eyeColor',     placeholder: 'Eye color (e.g. brown, hazel, blue)' },
                  { key: 'lipShape',     placeholder: 'Lip shape (e.g. full, thin, heart-shaped)' },
                  { key: 'skinConcerns', placeholder: 'Skin concerns (e.g. acne, dryness, dark circles)' },
                ] as { key: keyof FaceAnalysis; placeholder: string }[]).map(field => (
                  <input key={field.key} type="text" placeholder={field.placeholder}
                    value={manualTraits[field.key] || ''}
                    onChange={e => setManualTraits({ ...manualTraits, [field.key]: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#FFD4BC] bg-white text-[#1C0A00] text-sm focus:outline-none focus:ring-2 focus:ring-[#F4845F] placeholder:text-[#8B5E52]/40"
                  />
                ))}
              </div>
            )}

            <button onClick={handleNextFromStep1} disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-[#FFE600] via-[#F4845F] to-[#FFAA80] text-white py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-40 transition-all">
              {loading ? 'Analyzing your features…' : 'Continue →'}
            </button>
          </div>
        )}

        {/* ======================================================
            STEP 2 — PRODUCTS
        ====================================================== */}
        {currentStep === 2 && (
          <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.92)', boxShadow: '0 12px 30px rgba(120,60,120,0.18)' }}>
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
                className="flex-1 bg-gradient-to-r from-[#FFE600] via-[#F4845F] to-[#FFAA80] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all">
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ======================================================
            STEP 3 — LOOK SELECTOR
        ====================================================== */}
        {currentStep === 3 && (
          <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.92)', boxShadow: '0 12px 30px rgba(120,60,120,0.18)' }}>
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
                className="flex-1 bg-gradient-to-r from-[#FFE600] via-[#F4845F] to-[#FFAA80] text-white py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-40 transition-all">
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
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <a
                          href={getAffiliateLink(step.product)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-[#F4845F] hover:text-[#C7522A] hover:underline transition-colors duration-200 flex items-center gap-1"
                        >
                          {step.product}
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                        </a>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFF0E8] text-[#C4977E] border border-[#FFD4BC]" style={{ fontFamily: 'var(--font-josefin)' }}>
                          Shop →
                        </span>
                      </div>

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

            <p className="text-[10px] text-[#C4977E] text-center mb-4" style={{ fontFamily: 'var(--font-josefin)' }}>
              ✦ Product links may earn ZanZan a small commission at no cost to you
            </p>

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
                setSelfieFile(null)
                setSelfiePreview(null)
                routineSavedRef.current = false
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
