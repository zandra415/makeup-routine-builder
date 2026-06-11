import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function checkRateLimit(userId: string | null): Promise<{
  allowed: boolean
  remaining: number
  resetDate: string
}> {
  const now = new Date()
  const resetDate = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    .toLocaleDateString('en-US', { month: 'long', day: 'numeric' })

  // Anonymous users can't be tracked without schema changes — allow through
  if (!userId) return { allowed: true, remaining: 3, resetDate }

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString()

  const { count } = await supabase
    .from('routines')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', monthStart)
    .lt('created_at', monthEnd)

  const used = count || 0
  const limit = 3
  const remaining = Math.max(0, limit - used)

  return { allowed: used < limit, remaining, resetDate }
}
