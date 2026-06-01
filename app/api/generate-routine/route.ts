// app/api/generate-routine/route.ts
// This is the heart of the app — it takes face analysis, products, and
// desired look, then asks GPT-4o to create a personalized routine.

import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { checkRateLimit } from '@/lib/rateLimit'

const openai = new OpenAI()

type RoutineStep = {
  stepNumber: number
  title: string
  product: string
  technique: string
  placement: string
  tip: string
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { faceAnalysis, products, desiredLook } = body
    const identifier = body.userId || req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'anonymous'

    const { allowed, remaining, resetDate } = await checkRateLimit(identifier)
    if (!allowed) {
      return NextResponse.json(
        {
          error: 'limit_reached',
          message: `You've used all 3 free routines this month. Your limit resets on ${resetDate}.`,
          resetDate
        },
        { status: 429 }
      )
    }

    // Validate that we have everything we need
    if (!faceAnalysis || !products || !desiredLook) {
      return NextResponse.json(
        { error: 'faceAnalysis, products, and desiredLook are all required' },
        { status: 400 }
      )
    }

    // Build the prompt.
    // A "prompt" is the instruction we send to the AI — like writing
    // a very detailed assignment for a very capable intern.
    const systemPrompt = `You are an expert professional makeup artist with 15 years
of experience. You give precise, personalized makeup application instructions.
You always consider the user's specific face features when giving placement advice.
You ONLY use products from the user's list — never suggest products they don't have.
You respond exclusively in valid JSON — no markdown, no extra text.`

    const userPrompt = `Create a personalized makeup routine with these details:

FACE ANALYSIS:
${JSON.stringify(faceAnalysis, null, 2)}

PRODUCTS THE USER OWNS:
${products.join(', ')}

DESIRED LOOK: ${desiredLook}

Return a JSON object with this exact structure:
{
  "lookName": "string — creative name for this look",
  "estimatedTime": "string — e.g. '15 minutes'",
  "steps": [
    {
      "stepNumber": 1,
      "title": "string",
      "product": "string — must be from the user's product list",
      "technique": "string — exactly how to apply",
      "placement": "string — precisely where on the face",
      "tip": "string — personalized tip for their specific features"
    }
  ],
  "finishingNotes": "string — final tips for this look"
}`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 2000,
      // "temperature" controls creativity. 0 = robotic/consistent, 1 = creative/varied.
      // 0.7 is a good balance for instructional content.
      temperature: 0.7,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    })

    const rawText = response.choices[0].message.content || '{}'
    const jsonText = rawText.replace(/```json\n?|\n?```/g, '').trim()
    const routine = JSON.parse(jsonText)

    return NextResponse.json({ routine })

  } catch (error) {
    console.error('generate-routine error:', error)
    return NextResponse.json(
      { error: 'Failed to generate routine' },
      { status: 500 }
    )
  }
}
