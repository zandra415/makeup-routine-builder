'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED_QUESTIONS = [
  "What is trending on TikTok right now?",
  "Find me a dupe for Charlotte Tilbury Flawless Filter",
  "How do I contour for my face shape?",
  "What look works for a job interview?",
]

export default function LumiChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi, I am Lumi! Your AI beauty assistant. Ask me anything — trending looks, product dupes, makeup techniques, or what is blowing up on TikTok right now."
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen, isMinimized])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, isMinimized])

  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) return

    const userMessage: Message = { role: 'user', content }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      })
      const data = await response.json()
      if (data.message) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Something went wrong. Try again in a second." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* CHAT WINDOW */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 flex flex-col"
          style={{
            width: '360px',
            height: isMinimized ? 'auto' : '520px',
            background: '#FFFAF5',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(28,10,0,0.15)',
            border: '1px solid #FFD4BC',
            overflow: 'hidden'
          }}
        >
          {/* HEADER */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#FFD4BC]" style={{ background: '#0A1A0F' }}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#F4845F] flex items-center justify-center">
                  <span className="text-white text-sm font-bold" style={{ fontFamily: 'var(--font-syne)' }}>L</span>
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#0A1A0F]" />
              </div>
              <div>
                <p className="text-white text-sm font-medium" style={{ fontFamily: 'var(--font-syne)' }}>Lumi</p>
                <p className="text-[#6A9070] text-xs" style={{ fontFamily: 'var(--font-josefin)' }}>ZanZan Beauty AI</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-[#6A9070] hover:text-white transition-colors text-lg leading-none"
              >
                {isMinimized ? '▲' : '▼'}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#6A9070] hover:text-white transition-colors text-lg leading-none ml-1"
              >
                ✕
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* MESSAGES */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" style={{ overscrollBehavior: 'contain' }}>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full bg-[#F4845F] flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                        <span className="text-white text-xs font-bold">L</span>
                      </div>
                    )}
                    <div
                      className="max-w-[80%] px-4 py-3 rounded-2xl text-xs leading-relaxed"
                      style={{
                        background: msg.role === 'user' ? '#F4845F' : 'white',
                        color: msg.role === 'user' ? 'white' : '#1C0A00',
                        border: msg.role === 'assistant' ? '1px solid #FFD4BC' : 'none',
                        borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                        fontFamily: 'var(--font-josefin)',
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="w-7 h-7 rounded-full bg-[#F4845F] flex items-center justify-center flex-shrink-0 mr-2">
                      <span className="text-white text-xs font-bold">L</span>
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-white border border-[#FFD4BC] flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F4845F] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F4845F] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F4845F] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* SUGGESTED QUESTIONS */}
              {messages.length === 1 && (
                <div className="px-4 pb-3 flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-[10px] px-3 py-1.5 rounded-full border border-[#FFD4BC] text-[#8B5E52] hover:border-[#F4845F] hover:text-[#F4845F] transition-all"
                      style={{ fontFamily: 'var(--font-josefin)' }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* INPUT */}
              <div className="px-4 py-3 border-t border-[#FFD4BC] flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                  placeholder="Ask Lumi anything..."
                  className="flex-1 px-4 py-2.5 rounded-full border border-[#FFD4BC] bg-white text-xs text-[#1C0A00] placeholder-[#C4977E] outline-none focus:border-[#F4845F] transition-all"
                  style={{ fontFamily: 'var(--font-josefin)' }}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={loading || !input.trim()}
                  className="w-9 h-9 rounded-full bg-[#F4845F] flex items-center justify-center hover:bg-[#FFAA80] transition-all disabled:opacity-40 flex-shrink-0"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* FLOATING BUTTON */}
      <button
        onClick={() => { setIsOpen(!isOpen); setIsMinimized(false) }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1"
        style={{
          background: isOpen ? '#1C0A00' : '#0A1A0F',
          boxShadow: '0 8px 30px rgba(10,26,15,0.3)'
        }}
      >
        <div className="w-6 h-6 rounded-full bg-[#F4845F] flex items-center justify-center">
          <span className="text-white text-xs font-bold">L</span>
        </div>
        <span className="text-white text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-josefin)' }}>
          {isOpen ? 'Close Lumi' : 'Ask Lumi'}
        </span>
        {!isOpen && (
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        )}
      </button>
    </>
  )
}
