import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendNewParkNotification, getActiveSubscribers } from '@/lib/newsletter'
import { supabase } from '@/lib/supabase'

const sendNewsletterSchema = z.object({
  projectId: z.string().uuid().optional(),
  // Or provide manual data
  parkReference: z.string().optional(),
  parkName: z.string().optional(),
  sizeMW: z.number().optional(),
  price: z.number().optional(),
  highlights: z.array(z.string()).optional(),
  linkUrl: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Check admin key
    const adminKey = request.headers.get('x-admin-key')
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    const validatedData = sendNewsletterSchema.parse(body)
    
    let parkData
    
    // If projectId provided, fetch from database
    if (validatedData.projectId) {
      const { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', validatedData.projectId)
        .single()
      
      if (error || !project) {
        return NextResponse.json(
          { success: false, message: 'Project not found' },
          { status: 404 }
        )
      }
      
      parkData = {
        parkReference: project.reference_code,
        parkName: project.title,
        sizeMW: project.capacity_mwp,
        price: project.total_capex,
        highlights: project.highlights || [],
        linkUrl: `/projects/${project.slug}`
      }
    } else {
      // Use provided data
      if (!validatedData.parkName || !validatedData.sizeMW || !validatedData.price) {
        return NextResponse.json(
          { success: false, message: 'Missing required project data' },
          { status: 400 }
        )
      }
      
      parkData = {
        parkReference: validatedData.parkReference || 'NEW-PROJECT',
        parkName: validatedData.parkName,
        sizeMW: validatedData.sizeMW,
        price: validatedData.price,
        highlights: validatedData.highlights || [],
        linkUrl: validatedData.linkUrl || '/projects'
      }
    }
    
    // Get subscriber count before sending
    const subscribers = await getActiveSubscribers()
    const subscriberCount = subscribers.length
    
    if (subscriberCount === 0) {
      return NextResponse.json({
        success: false,
        message: 'No active subscribers found',
        subscriberCount: 0
      })
    }
    
    // Send the newsletter
    const result = await sendNewParkNotification(parkData)
    
    // Log the newsletter send
    if (result.success) {
      await supabase.from('newsletter_sends').insert([{
        type: 'new_project',
        subject: `New Solar Park Available: ${parkData.parkName}`,
        recipient_count: subscriberCount,
        project_id: validatedData.projectId || null,
        status: 'sent',
        sent_by: 'admin'
      }])
      
      // Update project with newsletter sent timestamp
      if (validatedData.projectId) {
        await supabase
          .from('projects')
          .update({
            newsletter_sent_at: new Date().toISOString(),
            newsletter_sent_to: subscriberCount
          })
          .eq('id', validatedData.projectId)
      }
    }
    
    return NextResponse.json({
      success: result.success,
      message: result.success 
        ? `Newsletter sent to ${subscriberCount} subscribers` 
        : 'Failed to send newsletter',
      subscriberCount,
      data: result.data
    })
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation error', errors: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, message: 'Failed to send newsletter', error: String(error) },
      { status: 500 }
    )
  }
}

// GET - Get newsletter status and subscriber count
export async function GET(request: NextRequest) {
  try {
    // Check admin key
    const adminKey = request.headers.get('x-admin-key')
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const subscribers = await getActiveSubscribers()
    
    // Get recent newsletter sends
    const { data: recentSends } = await supabase
      .from('newsletter_sends')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
    
    return NextResponse.json({
      success: true,
      subscriberCount: subscribers.length,
      recentSends: recentSends || []
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to get newsletter status', error: String(error) },
      { status: 500 }
    )
  }
}
