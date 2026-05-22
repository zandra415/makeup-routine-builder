// app/api/analyze-face/route.ts
// This route receives either a selfie image or manually-entered traits,
// and uses GPT-4o Vision to identify face characteristics.

import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize the OpenAI client.
// It automatically reads OPENAI_API_KEY from your environment.
const openai = new OpenAI()

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body.
    // The browser will send either { imageBase64: "..." } or { manualTraits: {...} }
    const body = await req.json()
    const { imageBase64, manualTraits } = body

    let faceAnalysis: Record<string, string>

    if (imageBase64) {
      // --- PATH A: User uploaded a selfie ---
      // We send the image to GPT-4o Vision and ask it to describe the face.

      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                // The image is base64-encoded (a text representation of image bytes)
                // We prefix it with the data format so the API knows what it is.
                image_url: { url: `data:image/jpeg;base64,${imageBase64}` }
              },
              {
                type: 'text',
                text: `Analyze this face for makeup application purposes.
                       Return ONLY a JSON object with these exact keys:
                       faceShape, skinTone, eyeShape, eyeColor, lipShape,
                       undertone, skinConcerns.
                       Keep each value to 2-4 words. Be specific and helpful.
                       Example: {"faceShape": "oval", "skinTone": "medium olive", ...}`
              }
            ]
          }
        ]
      })

      // Extract the text from the response
      const rawText = response.choices[0].message.content || '{}'

      // Parse the JSON — GPT sometimes wraps it in backticks, so we strip those
      const jsonText = rawText.replace(/```json\n?|\n?```/g, '').trim()
      faceAnalysis = JSON.parse(jsonText)

    } else if (manualTraits) {
      // --- PATH B: User filled in traits manually ---
      // No AI needed here — we just return exactly what they entered.
      faceAnalysis = manualTraits
    } else {
      return NextResponse.json(
        { error: 'Provide either imageBase64 or manualTraits' },
        { status: 400 }
      )
    }

    return NextResponse.json({ faceAnalysis })

  } catch (error) {
    console.error('analyze-face error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze face' },
      { status: 500 }
    )
  }
}
