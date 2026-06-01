# ZanZan

AI-powered personalized makeup routine builder.

## Stack

- Next.js 16, React 19, Tailwind CSS
- Supabase (auth + database)
- OpenAI GPT-4o (face analysis + routine generation)

## Dev

```bash
npm run dev
```

Requires `.env.local` with:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
