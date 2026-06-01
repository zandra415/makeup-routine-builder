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

      if (inputMode === 'upload' && selfieFile) {
        const imageBase64 = await fileToBase64(selfieFile)
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
      if (userId) {
        await fetch('/api/save-routine', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            routine,
            products,
            desiredLook,
            faceAnalysis
          })
        })
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
    <div className="min-h-screen bg-[#FFF5F0] font-sans">
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
                {!showCamera ? (
                  <div className="space-y-4">
                    {selfiePreview ? (
                      <div className="relative">
                        <img src={selfiePreview} alt="Your selfie" className="w-full max-w-sm mx-auto rounded-2xl object-cover aspect-square" />
                        <button
                          onClick={() => { setSelfiePreview(null); setSelfieFile(null) }}
                          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 text-[#1C0A00] text-sm flex items-center justify-center hover:bg-white transition-all"
                        >✕</button>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <div className="flex flex-col items-center">
                          <button
                            onClick={startCamera}
                            className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border-2 border-dashed border-[#FFAA80] bg-[#FFF5EE] hover:bg-[#FFE8D6] transition-all cursor-pointer text-[#F4845F] text-sm font-medium"
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                              <circle cx="12" cy="13" r="4"/>
                            </svg>
                            Take a Selfie
                          </button>
                          <p className="text-xs text-[#C4977E] text-center mt-1">Best on mobile 📱</p>
                        </div>
                        <label className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border-2 border-dashed border-[#FFD4BC] bg-[#FFFAF5] hover:bg-[#FFF0E8] transition-all cursor-pointer text-[#8B5E52] text-sm font-medium">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" y1="3" x2="12" y2="15"/>
                          </svg>
                          Upload Photo
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (!file) return
                            setSelfieFile(file)
                            const reader = new FileReader()
                            reader.onload = (ev) => setSelfiePreview(ev.target?.result as string)
                            reader.readAsDataURL(file)
                          }} />
                        </label>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative max-w-sm mx-auto">
                    <video
                      ref={videoRef}
                      className="w-full rounded-2xl"
                      style={{ transform: 'scaleX(-1)' }}
                      autoPlay
                      playsInline
                      muted
                    />
                    <canvas ref={canvasRef} className="hidden" />
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                      <button
                        onClick={stopCamera}
                        className="px-5 py-2 rounded-full bg-white/80 text-[#1C0A00] text-sm font-medium hover:bg-white transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={capturePhoto}
                        className="w-14 h-14 rounded-full bg-[#F4845F] border-4 border-white text-white flex items-center justify-center hover:bg-[#FFAA80] transition-all shadow-lg"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                          <circle cx="12" cy="13" r="4"/>
                        </svg>
                      </button>
                    </div>
                    <div className="absolute top-4 left-0 right-0 flex justify-center">
                      <div className="px-4 py-2 rounded-full bg-black/30 text-white text-xs">
                        Position your face in the center ✦
                      </div>
                    </div>
                  </div>
                )}
                <button
                  onClick={handleNextFromStep1}
                  disabled={loading || !selfieFile}
                  className="mt-8 w-full bg-[#F4845F] text-white py-3 rounded-xl font-semibold hover:bg-[#FFAA80] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
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

            <div className="mt-8 p-6 rounded-3xl bg-[#FFF0E8] border border-[#FFD4BC] text-center">
              <p className="text-xs tracking-widest uppercase text-[#F4845F] mb-2" style={{ fontFamily: 'var(--font-josefin)' }}>✦ Save Your Look ✦</p>
              <h3 className="text-xl text-[#1C0A00] mb-2" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>Love this routine?</h3>
              <p className="text-sm text-[#8B5E52] mb-6 leading-relaxed">Drop your email and we'll save your routine, send it to you, and create your free account. No password needed ever.</p>
              {!emailSaved ? (
                <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={saveEmail}
                    onChange={(e) => setSaveEmail(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-full border border-[#FFD4BC] bg-white text-sm text-[#1C0A00] outline-none focus:border-[#F4845F] focus:ring-2 focus:ring-[#FFAA80]/30 placeholder-[#C4977E]"
                  />
                  <button
                    onClick={handleEmailSave}
                    disabled={savingEmail}
                    className="px-6 py-3 rounded-full bg-[#F4845F] text-white text-sm font-medium hover:bg-[#FFAA80] transition-all duration-200 disabled:opacity-50"
                    style={{ fontFamily: 'var(--font-josefin)' }}
                  >
                    {savingEmail ? 'Saving...' : 'Save My Look →'}
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-2xl mb-2">✨</p>
                  <p className="text-[#F4845F] font-medium text-sm">Routine saved! Check your email.</p>
                  <p className="text-[#8B5E52] text-xs mt-1">Your free ZanZan account is ready.</p>
                </div>
              )}
            </div>

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
