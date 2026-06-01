import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { userId, faceAnalysis, products, desiredLook, routine } = await req.json()

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 401 })
    }

    const { data, error } = await supabaseAdmin
      .from('routines')
      .insert({
        user_id: userId,
        face_analysis: faceAnalysis,
        products: products,
        desired_look: desiredLook,
        routine_steps: routine
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ saved: data })

  } catch (error) {
    console.error('save-routine error:', error)
    return NextResponse.json({ error: 'Failed to save routine' }, { status: 500 })
  }
}
