import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'

const preferencesSchema = z.object({
  email: z.string().email(),
  preferences: z.object({
    newProjects: z.boolean(),
    blogPosts: z.boolean(),
    marketUpdates: z.boolean(),
    weeklyDigest: z.boolean()
  })
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, preferences } = preferencesSchema.parse(body)
    
    // Update subscriber preferences in database
    const { error } = await supabase
      .from('newsletter_subscribers')
      .upsert({ 
        email, 
        preferences,
        status: 'active',
        updated_at: new Date().toISOString()
      })
    
    if (error) throw error
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid data' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, message: 'Update failed' },
      { status: 500 }
    )
  }
}

