import Link from "next/link";

import { Card } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
            Web-first hackathon boilerplate
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight">
            Start with a guest-first splash flow, then save real user progress with
            Supabase auth.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            This starter gives your team routing, auth, onboarding, profile,
            settings, notifications, support, and legal placeholders without
            wasting hackathon hours on boilerplate.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/onboarding"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm"
            >
              Try onboarding as guest
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium"
            >
              Create account
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
        <Card className="space-y-4">
          <h2 className="text-xl font-semibold">What ships in this starter</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>Account, profile, settings, and notification preference flows</li>
            <li>Supabase schema and RLS-ready service boundaries</li>
            <li>Guest onboarding draft that upgrades into a saved user journey</li>
            <li>Protected app shell and Vercel-friendly environment contract</li>
          </ul>
        </Card>
      </section>
    </main>
  );
}
