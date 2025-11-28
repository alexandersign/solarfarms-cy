import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'

const unsubscribeSchema = z.object({
  email: z.string().email(),
  feedback: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, feedback } = unsubscribeSchema.parse(body)
    
    // Update subscriber status in database
    const { error } = await supabase
      .from('newsletter_subscribers')
      .update({ status: 'unsubscribed' })
      .eq('email', email)
    
    if (error) {
      // If subscriber doesn't exist, that's okay - they're unsubscribed
      if (error.code !== 'PGRST116') {
        throw error
      }
    }
    
    // Optionally log feedback
    if (feedback) {
      await supabase
        .from('newsletter_feedback')
        .insert({ email, feedback, type: 'unsubscribe' })
        .then(() => {}) // Ignore errors on feedback logging
    }
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, message: 'Unsubscribe failed' },
      { status: 500 }
    )
  }
}

