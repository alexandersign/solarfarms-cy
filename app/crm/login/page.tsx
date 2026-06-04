'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function CrmLoginPage() {
  const router = useRouter()
  const params = useSearchParams()
  const callbackUrl = params.get('callbackUrl') || '/crm'

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      })
      if (res?.error) {
        setError('Incorrect email or password.')
      } else {
        router.push(callbackUrl)
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F0F4F8' }}>
      {/* Header bar */}
      <div
        className="w-full py-5 px-8 flex items-center"
        style={{
          background: 'linear-gradient(135deg, #1A365D 0%, #2B5FA0 100%)',
        }}
      >
        <span
          className="text-xl font-bold tracking-tight"
          style={{ color: '#C9A432' }}
        >
          Lighthief CRM
        </span>
        <span className="ml-3 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
          solarfarms.cy
        </span>
      </div>

      {/* Card */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden">
          <div
            className="px-8 py-6"
            style={{ borderBottom: '3px solid #C9A432' }}
          >
            <h1 className="text-xl font-bold" style={{ color: '#1A365D' }}>
              Sign in
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Cyprus PV prospect tracker
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': '#1A365D' } as React.CSSProperties}
                placeholder="you@lighthief.com"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ background: '#1A365D' }}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="px-8 pb-6 text-xs text-center text-gray-400">
            Lighthief Cyprus Ltd · HE 477423 · solarfarms.cy
          </div>
        </div>
      </div>
    </div>
  )
}
