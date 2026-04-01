import { Suspense } from 'react'
import { Metadata } from 'next'
import { LoiForm } from './LoiForm'

export const metadata: Metadata = {
  title: 'Letter of Intent Generator | Solar Farm Investment | Lighthief Cyprus',
  description:
    'Generate a professional Letter of Intent for your Cyprus solar farm investment. Non-binding preliminary documentation.',
}

function LoiFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center section-padding">
      <p className="text-gray-600">Loading…</p>
    </div>
  )
}

export default function LOIGeneratorPage() {
  return (
    <Suspense fallback={<LoiFallback />}>
      <LoiForm />
    </Suspense>
  )
}
