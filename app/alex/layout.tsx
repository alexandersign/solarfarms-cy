'use client'

import { useState, useEffect, type ReactNode } from 'react'

export default function AlexLayout({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [checking, setChecking] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const stored = document.cookie
      .split('; ')
      .find(c => c.startsWith('alex_tasks_auth='))
      ?.split('=')[1]
    if (stored) {
      setAuthenticated(true)
    }
    setChecking(false)
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('/api/alex/tasks?_check=1', {
        headers: { Authorization: `Bearer ${password}` },
      })
      if (res.ok) {
        document.cookie = `alex_tasks_auth=${password}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`
        setAuthenticated(true)
      } else {
        setError('Invalid password')
      }
    } catch {
      setError('Connection error')
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold text-gray-900">Task Hub</h1>
              <p className="text-sm text-gray-500 mt-1">Alexander Papacosta</p>
            </div>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter access key"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                autoFocus
              />
              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
              <button
                type="submit"
                className="w-full mt-4 py-3 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors text-sm"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-bold text-gray-900">Task Hub</h1>
              <span className="text-xs text-gray-400 hidden sm:inline">Cross-Project Dashboard</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={async () => {
                  const secret = document.cookie
                    .split('; ')
                    .find(c => c.startsWith('alex_tasks_auth='))
                    ?.split('=')[1]
                  if (!secret) return
                  try {
                    const res = await fetch('/api/cron/daily-digest', {
                      headers: { Authorization: `Bearer ${secret}` },
                    })
                    const data = await res.json().catch(() => ({}))
                    if (res.ok && data.success) {
                      alert(`Digest email sent to ${data.to || 'you'}!`)
                    } else {
                      alert(data.message || data.error || `Failed (${res.status}). Check RESEND_API_KEY and spam folder.`)
                    }
                  } catch (e) {
                    alert('Request failed: ' + (e instanceof Error ? e.message : 'Unknown error'))
                  }
                }}
                className="text-xs px-3 py-1.5 bg-sky-50 text-sky-700 rounded-lg hover:bg-sky-100 transition-colors"
              >
                Send Digest Now
              </button>
              <button
                onClick={() => {
                  document.cookie = 'alex_tasks_auth=; path=/; max-age=0'
                  setAuthenticated(false)
                  setPassword('')
                }}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  )
}
