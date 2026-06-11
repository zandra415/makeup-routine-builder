import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI()

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, manualTraits } = await req.json()

    let faceAnalysis: Record<string, string>

    if (imageBase64) {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
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

      const rawText = response.choices[0].message.content || '{}'
      const jsonText = rawText.replace(/```json\n?|\n?```/g, '').trim()
      try {
        faceAnalysis = JSON.parse(jsonText)
      } catch {
        return NextResponse.json({ error: 'AI returned an unexpected response format' }, { status: 500 })
      }

    } else if (manualTraits) {
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
    return NextResponse.json({ error: 'Failed to analyze face' }, { status: 500 })
  }
}
