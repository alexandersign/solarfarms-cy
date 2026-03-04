'use client'

import { useState, useRef, useEffect, useCallback, FormEvent } from 'react'
import { MessageCircle, X, Send, ArrowRight, Loader2, ExternalLink, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface LeadInfo {
  name: string
  email: string
}

type ChatPhase = 'closed' | 'lead-capture' | 'chatting'

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

function renderMarkdown(text: string) {
  const parts: (string | JSX.Element)[] = []
  let key = 0

  const lines = text.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('- ') || line.startsWith('• ')) {
      const content = line.slice(2)
      parts.push(
        <div key={key++} className="flex gap-2 ml-1 my-0.5">
          <span className="text-cyprus-400 mt-1 shrink-0">•</span>
          <span>{renderInlineMarkdown(content)}</span>
        </div>
      )
    } else if (line.trim() === '') {
      parts.push(<div key={key++} className="h-2" />)
    } else {
      parts.push(
        <p key={key++} className="my-1">
          {renderInlineMarkdown(line)}
        </p>
      )
    }
  }

  return parts
}

function renderInlineMarkdown(text: string) {
  const parts: (string | JSX.Element)[] = []
  let key = 0

  const regex = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    if (match[1]) {
      parts.push(
        <strong key={key++} className="font-semibold text-gray-900">
          {match[1]}
        </strong>
      )
    } else if (match[2] && match[3]) {
      const href = match[3].startsWith('/') ? match[3] : match[3]
      parts.push(
        <a
          key={key++}
          href={href}
          target={match[3].startsWith('/') ? '_self' : '_blank'}
          rel="noopener noreferrer"
          className="text-cyprus-600 hover:text-cyprus-700 underline underline-offset-2 decoration-cyprus-300 hover:decoration-cyprus-500 transition-colors inline-flex items-center gap-0.5"
        >
          {match[2]}
          {!match[3].startsWith('/') && (
            <ExternalLink className="w-3 h-3 inline" />
          )}
        </a>
      )
    }

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : text
}

export function ChatWidget() {
  const [phase, setPhase] = useState<ChatPhase>('closed')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [leadInfo, setLeadInfo] = useState<LeadInfo | null>(null)
  const [leadName, setLeadName] = useState('')
  const [leadEmail, setLeadEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [sessionId] = useState(() => generateId())
  const [showScrollBtn, setShowScrollBtn] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior })
  }, [])

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom()
    }
  }, [messages, scrollToBottom])

  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container) return

    function handleScroll() {
      if (!container) return
      const { scrollTop, scrollHeight, clientHeight } = container
      setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 100)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [phase])

  useEffect(() => {
    if (phase === 'lead-capture') {
      setTimeout(() => nameInputRef.current?.focus(), 300)
    } else if (phase === 'chatting') {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [phase])

  function handleOpen() {
    setPhase('lead-capture')
  }

  function handleClose() {
    setPhase('closed')
  }

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  function handleLeadSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validateEmail(leadEmail)) {
      setEmailError('Please enter a valid email address')
      return
    }
    setEmailError('')
    const info: LeadInfo = { name: leadName.trim(), email: leadEmail.trim() }
    setLeadInfo(info)
    setPhase('chatting')

    const greeting: Message = {
      id: generateId(),
      role: 'assistant',
      content: info.name
        ? `Hi ${info.name}! Welcome to SolarFarms.cy. I'm here to help you with questions about solar PV and battery energy storage investments in Cyprus.\n\nWhether you're exploring **financial returns**, **technology options**, **financing strategies**, or **regulatory requirements** — I'm happy to guide you.\n\nWhat would you like to know?`
        : `Welcome to SolarFarms.cy! I'm here to help you with questions about solar PV and battery energy storage investments in Cyprus.\n\nWhether you're exploring **financial returns**, **technology options**, **financing strategies**, or **regulatory requirements** — I'm happy to guide you.\n\nWhat would you like to know?`,
      timestamp: new Date(),
    }
    setMessages([greeting])
  }

  function handleSkipLead(e: FormEvent) {
    e.preventDefault()
    setPhase('chatting')
    const greeting: Message = {
      id: generateId(),
      role: 'assistant',
      content: `Welcome to SolarFarms.cy! I'm here to help you with questions about solar PV and battery energy storage investments in Cyprus.\n\nWhether you're exploring **financial returns**, **technology options**, **financing strategies**, or **regulatory requirements** — I'm happy to guide you.\n\nWhat would you like to know?`,
      timestamp: new Date(),
    }
    setMessages([greeting])
  }

  async function handleSend(e: FormEvent) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || isStreaming) return

    const userMsg: Message = {
      id: generateId(),
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    }

    const assistantMsg: Message = {
      id: generateId(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setInput('')
    setIsStreaming(true)

    try {
      const chatHistory = [...messages, userMsg]
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .map((m) => ({ role: m.role, content: m.content }))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: chatHistory,
          visitorName: leadInfo?.name,
          visitorEmail: leadInfo?.email,
          sessionId,
        }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.error || 'Failed to get response')
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No stream available')

      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') break
          try {
            const parsed = JSON.parse(data)
            if (parsed.content) {
              setMessages((prev) => {
                const updated = [...prev]
                const last = updated[updated.length - 1]
                if (last && last.id === assistantMsg.id) {
                  updated[updated.length - 1] = {
                    ...last,
                    content: last.content + parsed.content,
                  }
                }
                return updated
              })
            }
          } catch {
            // skip malformed chunks
          }
        }
      }
    } catch (error) {
      setMessages((prev) => {
        const updated = [...prev]
        const last = updated[updated.length - 1]
        if (last && last.id === assistantMsg.id) {
          updated[updated.length - 1] = {
            ...last,
            content:
              "I'm sorry, I'm having trouble connecting right now. Please try again or [contact our team](/contact) directly.",
          }
        }
        return updated
      })
    } finally {
      setIsStreaming(false)
    }
  }

  const quickQuestions = [
    'What returns can I expect from solar in Cyprus?',
    'How does BESS improve my PV park revenue?',
    'What financing options are available?',
    'What is the curtailment situation in Cyprus?',
  ]

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={phase === 'closed' ? handleOpen : handleClose}
        className={cn(
          'fixed z-[51] rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 group',
          'bottom-6 left-6',
          'max-sm:bottom-20 max-sm:right-6 max-sm:left-auto',
          phase === 'closed'
            ? 'bg-gradient-to-br from-cyprus-500 to-cyprus-700 hover:from-cyprus-600 hover:to-cyprus-800 text-white'
            : 'bg-gray-700 hover:bg-gray-800 text-white'
        )}
        aria-label={phase === 'closed' ? 'Open chat' : 'Close chat'}
      >
        {phase === 'closed' && (
          <span className="absolute inset-0 rounded-full bg-cyprus-400 opacity-20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
        )}
        {phase === 'closed' ? (
          <MessageCircle className="w-6 h-6" />
        ) : (
          <X className="w-6 h-6" />
        )}
        {phase === 'closed' && (
          <span className="absolute top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none left-full ml-3 max-sm:left-auto max-sm:right-full max-sm:ml-0 max-sm:mr-3">
            Ask our AI assistant
          </span>
        )}
      </button>

      {/* Chat Panel */}
      {phase !== 'closed' && (
        <div
          className={cn(
            'fixed z-[52] rounded-2xl shadow-2xl border border-gray-200 bg-white flex flex-col overflow-hidden',
            'animate-in',
            'bottom-24 left-6 w-[380px] sm:w-[420px]',
            'max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:w-full max-sm:rounded-b-none max-sm:border-b-0'
          )}
          style={{ height: 'min(600px, calc(100vh - 140px))' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-cyprus-600 to-cyprus-700 px-5 py-4 flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-sm">
                SolarFarms.cy Assistant
              </h3>
              <p className="text-cyprus-100 text-xs">
                Solar & BESS investment expert
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lead Capture Phase */}
          {phase === 'lead-capture' && (
            <div className="flex-1 flex flex-col p-6 overflow-y-auto">
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-solar-100 to-cyprus-100 flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-cyprus-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 font-heading">
                    Welcome to SolarFarms.cy
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Ask anything about solar & BESS investments in Cyprus
                  </p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <div>
                    <label
                      htmlFor="chat-name"
                      className="block text-xs font-medium text-gray-600 mb-1"
                    >
                      Your name
                    </label>
                    <input
                      ref={nameInputRef}
                      id="chat-name"
                      type="text"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="John Smith"
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyprus-400 focus:border-transparent bg-gray-50 transition-all placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="chat-email"
                      className="block text-xs font-medium text-gray-600 mb-1"
                    >
                      Email address
                    </label>
                    <input
                      id="chat-email"
                      type="email"
                      value={leadEmail}
                      onChange={(e) => {
                        setLeadEmail(e.target.value)
                        if (emailError) setEmailError('')
                      }}
                      placeholder="john@company.com"
                      className={cn(
                        'w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyprus-400 focus:border-transparent bg-gray-50 transition-all placeholder:text-gray-400',
                        emailError ? 'border-red-300' : 'border-gray-200'
                      )}
                    />
                    {emailError && (
                      <p className="text-xs text-red-500 mt-1">{emailError}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={!leadEmail}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-cyprus-500 to-cyprus-600 hover:from-cyprus-600 hover:to-cyprus-700 text-white rounded-xl font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    Start Chatting
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleSkipLead}
                    className="w-full py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    Continue without sharing details
                  </button>
                </form>
              </div>

              <p className="text-[10px] text-gray-400 text-center mt-4">
                Your information is kept private and never shared with third
                parties.
              </p>
            </div>
          )}

          {/* Chat Phase */}
          {phase === 'chatting' && (
            <>
              {/* Messages */}
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth"
              >
                {messages.map((msg, i) => (
                  <div
                    key={msg.id}
                    className={cn(
                      'flex gap-2.5',
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyprus-100 to-cyprus-200 flex items-center justify-center shrink-0 mt-0.5">
                        <MessageCircle className="w-3.5 h-3.5 text-cyprus-600" />
                      </div>
                    )}
                    <div
                      className={cn(
                        'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                        msg.role === 'user'
                          ? 'bg-cyprus-600 text-white rounded-br-md'
                          : 'bg-gray-100 text-gray-800 rounded-bl-md'
                      )}
                    >
                      {msg.role === 'assistant' ? (
                        <div className="space-y-0.5">
                          {renderMarkdown(msg.content)}
                          {isStreaming &&
                            i === messages.length - 1 &&
                            msg.content === '' && (
                              <div className="flex items-center gap-1 py-1">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                              </div>
                            )}
                        </div>
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                ))}

                {/* Quick Questions (show after first assistant message if no user messages yet) */}
                {messages.length === 1 &&
                  messages[0].role === 'assistant' &&
                  !isStreaming && (
                    <div className="space-y-2 pt-1">
                      <p className="text-xs text-gray-400 font-medium px-1">
                        Popular questions:
                      </p>
                      {quickQuestions.map((q) => (
                        <button
                          key={q}
                          onClick={() => {
                            setInput(q)
                            setTimeout(() => {
                              const form = document.getElementById('chat-form')
                              form?.dispatchEvent(
                                new Event('submit', {
                                  bubbles: true,
                                  cancelable: true,
                                })
                              )
                            }, 50)
                          }}
                          className="block w-full text-left px-3 py-2 text-xs text-gray-600 bg-white border border-gray-200 rounded-xl hover:border-cyprus-300 hover:bg-cyprus-50 hover:text-cyprus-700 transition-all"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}

                <div ref={messagesEndRef} />
              </div>

              {/* Scroll to bottom */}
              {showScrollBtn && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
                  <button
                    onClick={() => scrollToBottom()}
                    className="bg-white border border-gray-200 shadow-md rounded-full p-1.5 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              )}

              {/* Input */}
              <div className="shrink-0 border-t border-gray-100 px-4 py-3 bg-white">
                <form
                  id="chat-form"
                  onSubmit={handleSend}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about solar & BESS investments..."
                    disabled={isStreaming}
                    className="flex-1 px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyprus-400 focus:border-transparent bg-gray-50 disabled:opacity-50 transition-all placeholder:text-gray-400"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isStreaming}
                    className="p-2.5 bg-gradient-to-r from-cyprus-500 to-cyprus-600 hover:from-cyprus-600 hover:to-cyprus-700 text-white rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-sm hover:shadow-md"
                  >
                    {isStreaming ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </form>
                <p className="text-[10px] text-gray-400 text-center mt-2">
                  AI assistant — responses may not be fully accurate
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
