import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getRequiredAppUser } from "@/services/account-service";

export default async function ProtectedAppLayout({
  children
}: {
  children: ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const appUser = await getRequiredAppUser(supabase);

  if (!appUser.profile.onboardingCompleted) {
    redirect("/onboarding");
  }

  return <AppShell user={appUser}>{children}</AppShell>;
}
