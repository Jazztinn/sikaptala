import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Sikaptala Starter",
  description: "Hackathon-ready Next.js and Supabase starter boilerplate."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-border/60 bg-white/70 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-8">
            <Link href="/" className="text-lg font-semibold">
              Sikaptala
            </Link>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="/onboarding">Onboarding</Link>
              <Link href="/login">Login</Link>
              <Link href="/signup">Signup</Link>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
