'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Settings } from 'lucide-react'
import Link from 'next/link'

function PreferencesContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [preferences, setPreferences] = useState({
    newProjects: true,
    blogPosts: true,
    marketUpdates: true,
    weeklyDigest: true
  })
  const [isSaved, setIsSaved] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSave = async () => {
    if (!email) {
      alert('Email address is required')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/newsletter/update-preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, preferences })
      })

      if (response.ok) {
        setIsSaved(true)
        setTimeout(() => setIsSaved(false), 3000)
      } else {
        alert('Failed to update preferences. Please try again.')
      }
    } catch (error) {
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="container">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <Settings className="w-12 h-12 text-cyprus-600" />
            </div>
            <CardTitle className="text-center text-3xl">Email Preferences</CardTitle>
            <CardDescription className="text-center text-lg">
              Manage what type of updates you receive from SolarFarms.cy
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {email ? (
              <>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">Managing preferences for:</p>
                  <p className="font-semibold text-lg">{email}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Subscription Topics</h3>
                  
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 p-4 bg-white border rounded-lg hover:border-cyprus-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.newProjects}
                        onChange={(e) => setPreferences({...preferences, newProjects: e.target.checked})}
                        className="w-5 h-5 text-cyprus-600"
                      />
                      <div className="flex-1">
                        <div className="font-medium">New Project Listings</div>
                        <div className="text-sm text-gray-600">Get notified when new solar parks become available</div>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3 p-4 bg-white border rounded-lg hover:border-cyprus-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.blogPosts}
                        onChange={(e) => setPreferences({...preferences, blogPosts: e.target.checked})}
                        className="w-5 h-5 text-cyprus-600"
                      />
                      <div className="flex-1">
                        <div className="font-medium">Blog Posts & Insights</div>
                        <div className="text-sm text-gray-600">Expert analysis, market trends, and investment strategies</div>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3 p-4 bg-white border rounded-lg hover:border-cyprus-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketUpdates}
                        onChange={(e) => setPreferences({...preferences, marketUpdates: e.target.checked})}
                        className="w-5 h-5 text-cyprus-600"
                      />
                      <div className="flex-1">
                        <div className="font-medium">Market Updates</div>
                        <div className="text-sm text-gray-600">Curtailment data, policy changes, and market developments</div>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3 p-4 bg-white border rounded-lg hover:border-cyprus-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.weeklyDigest}
                        onChange={(e) => setPreferences({...preferences, weeklyDigest: e.target.checked})}
                        className="w-5 h-5 text-cyprus-600"
                      />
                      <div className="flex-1">
                        <div className="font-medium">Weekly Digest</div>
                        <div className="text-sm text-gray-600">Roundup of the week's most important updates</div>
                      </div>
                    </label>
                  </div>
                </div>

                {isSaved && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 font-medium">Preferences saved successfully!</span>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button 
                    variant="gradient"
                    className="flex-1"
                    onClick={handleSave}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Preferences'}
                  </Button>
                  <Button 
                    variant="outline"
                    asChild
                  >
                    <Link href="/">
                      Cancel
                    </Link>
                  </Button>
                </div>

                <div className="text-center pt-6 border-t">
                  <p className="text-sm text-gray-600 mb-3">
                    Want to unsubscribe completely?
                  </p>
                  <Link 
                    href={`/unsubscribe?email=${email}`}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Unsubscribe from all emails
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center space-y-6 py-8">
                <p className="text-gray-600">
                  No email address provided. Please use the preferences link from your newsletter email.
                </p>
                <Button variant="gradient" asChild>
                  <Link href="/">
                    Return to Homepage
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function PreferencesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    }>
      <PreferencesContent />
    </Suspense>
  )
}

