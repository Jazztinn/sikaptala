import Link from "next/link";
import type { ReactNode } from "react";

import { signOutAction } from "@/lib/actions/auth";
import type { AppUser } from "@/types";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/app", label: "Overview" },
  { href: "/app/account", label: "Account" },
  { href: "/app/profile", label: "Profile" },
  { href: "/app/settings", label: "Settings" },
  { href: "/app/notifications", label: "Notifications" },
  { href: "/app/support", label: "Support" },
  { href: "/tos", label: "TOS" }
];

export function AppShell({
  user,
  children
}: {
  user: AppUser;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl gap-6 px-4 py-8 lg:px-8">
      <aside className="hidden w-64 shrink-0 rounded-3xl border border-border bg-card/90 p-5 shadow-sm lg:block">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">Sikaptala starter</p>
          <h2 className="text-xl font-semibold">{user.profile.displayName}</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-xl px-3 py-2 text-sm hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={signOutAction} className="mt-6">
          <Button variant="secondary" className="w-full">
            Sign out
          </Button>
        </form>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
