// app/api/save-routine/route.ts
// Saves a completed routine to the Supabase database.
// Uses the service role key so it can bypass RLS and write on behalf of the user.

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// The service role key has admin-level database access.
// NEVER expose this key to the browser.
// That's why it has no NEXT_PUBLIC_ prefix.
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

    // Insert the routine into the database.
    // The "routines" table we created in Part 3 receives this data.
    const { data, error } = await supabaseAdmin
      .from('routines')
      .insert({
        user_id: userId,
        face_analysis: faceAnalysis,
        products: products,
        desired_look: desiredLook,
        routine_steps: routine
      })
      .select()         // "select()" returns the newly created row
      .single()         // "single()" unwraps the array to a single object

    if (error) throw error

    return NextResponse.json({ saved: data })

  } catch (error) {
    console.error('save-routine error:', error)
    return NextResponse.json(
      { error: 'Failed to save routine' },
      { status: 500 }
    )
  }
}
