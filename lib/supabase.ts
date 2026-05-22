// lib/supabase.ts
// This file creates a "client" — a configured connection to your Supabase project.
// We import this wherever we need to talk to the database.

import { createClient } from '@supabase/supabase-js'

// process.env reads from .env.local
// The "!" at the end tells TypeScript "I promise this value exists"
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// This client is safe to use in the browser — it uses the anon key,
// which only has permissions defined by your RLS policies.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
