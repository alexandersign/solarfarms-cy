'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const ChatWidget = dynamic(
  () => import('@/components/ui/ChatWidget').then((m) => ({ default: m.ChatWidget })),
  { ssr: false }
)

const WhatsAppButton = dynamic(
  () => import('@/components/ui/WhatsAppButton').then((m) => ({ default: m.WhatsAppButton })),
  { ssr: false }
)

export function DeferredWidgets() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const load = () => setReady(true)

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = window.requestIdleCallback(load, { timeout: 4000 })
      return () => window.cancelIdleCallback(id)
    }

    const timer = setTimeout(load, 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!ready) return null

  return (
    <>
      <WhatsAppButton />
      <ChatWidget />
    </>
  )
}
