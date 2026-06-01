import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function checkRateLimit(identifier: string): Promise<{
  allowed: boolean
  remaining: number
  resetDate: string
}> {
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString()

  const { count } = await supabase
    .from('routines')
    .select('*', { count: 'exact', head: true })
    .eq('identifier', identifier)
    .gte('created_at', monthStart)
    .lt('created_at', monthEnd)

  const used = count || 0
  const limit = 3
  const remaining = Math.max(0, limit - used)
  const resetDate = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    .toLocaleDateString('en-US', { month: 'long', day: 'numeric' })

  return {
    allowed: used < limit,
    remaining,
    resetDate
  }
}
