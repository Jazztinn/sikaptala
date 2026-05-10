import Link from "next/link";

import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-semibold">Sign in</h1>
        <p className="text-muted-foreground">
          Use a password or a magic link, then continue into the protected app.
        </p>
      </div>
      <LoginForm />
      <p className="mt-6 text-sm text-muted-foreground">
        Need an account?{" "}
        <Link href="/signup" className="font-medium text-foreground underline">
          Create one here
        </Link>
      </p>
    </main>
  );
}
