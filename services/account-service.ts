import type { AppUser } from "@/types";

import { ensureProfile } from "@/services/profile-service";
import { ensureSettings } from "@/services/settings-service";

type SupabaseLike = Awaited<ReturnType<typeof import("@/lib/supabase/server").createSupabaseServerClient>>;

export async function getRequiredAppUser(
  supabase: SupabaseLike
): Promise<AppUser> {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user?.email) {
    throw new Error("Authenticated user is required.");
  }

  const [profile, settings] = await Promise.all([
    ensureProfile(supabase, user),
    ensureSettings(supabase, user.id)
  ]);

  return {
    id: user.id,
    email: user.email,
    profile,
    settings
  };
}
