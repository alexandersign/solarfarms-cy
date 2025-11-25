import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendNewParkNotification } from '@/lib/newsletter'

// Validation schema
const newParkSchema = z.object({
  parkReference: z.string(),
  parkName: z.string(),
  sizeMW: z.number(),
  price: z.number(),
  highlights: z.array(z.string()),
  linkUrl: z.string(),
  adminKey: z.string() // Simple auth for admin-only endpoint
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = newParkSchema.parse(body)
    
    // Simple admin authentication
    if (validatedData.adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const result = await sendNewParkNotification(validatedData)
    
    return NextResponse.json(result)
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid data', errors: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, message: 'Newsletter send failed' },
      { status: 500 }
    )
  }
}

