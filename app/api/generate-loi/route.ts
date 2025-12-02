import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { generateLOIHTML, LOIData } from '@/lib/loi-generator'
import { trackLOIGenerated } from '@/lib/meta-conversions'

// Validation schema for LOI generation
const loiSchema = z.object({
  investorName: z.string().min(2),
  investorCompany: z.string().optional(),
  investorAddress: z.string().min(5),
  investorEmail: z.string().email(),
  investorPhone: z.string(),
  projectName: z.string(),
  projectReference: z.string().optional(),
  projectCapacityMW: z.number(),
  estimatedInvestment: z.number(),
  investmentAmount: z.number(),
  investmentType: z.enum(['equity', 'debt', 'hybrid']),
  timeline: z.string(),
  conditions: z.array(z.string()).optional(),
  bessIncluded: z.boolean().optional(),
  financingRequired: z.boolean().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = loiSchema.parse(body) as LOIData
    
    // Generate HTML
    const html = generateLOIHTML(validatedData)
    
    // Track Meta conversion for LOI generation (highest intent lead)
    // Value: €1000 for LOI generation (very high intent)
    trackLOIGenerated({
      email: validatedData.investorEmail,
      projectRef: validatedData.projectReference,
      investmentAmount: validatedData.investmentAmount,
    }).catch(() => {}) // Non-blocking
    
    // For now, return HTML (PDF generation requires additional setup)
    // In production, this would use Puppeteer or similar to generate PDF
    
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `inline; filename="LOI-${validatedData.projectReference || 'Solar-Investment'}-${Date.now()}.html"`,
      },
    })
    
    /* Future PDF implementation:
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent(html)
    const pdf = await page.pdf({ format: 'A4', printBackground: true })
    await browser.close()
    
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="LOI-${validatedData.projectReference}.pdf"`,
      },
    })
    */
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid data', errors: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, message: 'LOI generation failed' },
      { status: 500 }
    )
  }
}

