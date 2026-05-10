# sikaptala

Hackathon-ready `Next.js + Supabase` starter boilerplate for `Vercel`.

## Included

- guest-first splash and onboarding flow
- Supabase auth with magic link and password support
- protected app shell with account, profile, settings, notifications, and support pages
- typed server actions and service modules
- Supabase schema with RLS starter policies
- placeholder TOS route for your existing TypeScript template

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Fill in the Supabase URL and anon key.
3. Run the SQL in [schema.sql](/Users/jazztinn/Repositories/sikaptala/supabase/schema.sql).
4. Install dependencies with `npm install`.
5. Start the app with `npm run dev`.

## Environment variables

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
