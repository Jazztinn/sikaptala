import type { User } from "@supabase/supabase-js";

import type { OnboardingDraft, ProfileRecord } from "@/types";

type SupabaseLike = Awaited<ReturnType<typeof import("@/lib/supabase/server").createSupabaseServerClient>>;

function mapProfile(row: Record<string, unknown>): ProfileRecord {
  return {
    id: String(row.id),
    displayName: String(row.display_name ?? ""),
    username: row.username ? String(row.username) : null,
    avatarUrl: row.avatar_url ? String(row.avatar_url) : null,
    outcome: row.outcome ? String(row.outcome) : null,
    intent: row.intent ? String(row.intent) : null,
    personalization: row.personalization ? String(row.personalization) : null,
    onboardingCompleted: Boolean(row.onboarding_completed),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at)
  };
}

export async function ensureProfile(
  supabase: SupabaseLike,
  user: Pick<User, "id" | "email">
) {
  const defaults = {
    id: user.id,
    display_name: user.email?.split("@")[0] ?? "Teammate"
  };

  await supabase.from("profiles").upsert(defaults, {
    onConflict: "id"
  });

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    throw error;
  }

  return mapProfile(data);
}

export async function updateProfile(
  supabase: SupabaseLike,
  userId: string,
  input: {
    displayName: string;
    username?: string;
    avatarUrl?: string;
    intent?: string;
    personalization?: string;
  }
) {
  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: input.displayName,
      username: input.username || null,
      avatar_url: input.avatarUrl || null,
      intent: input.intent || null,
      personalization: input.personalization || null
    })
    .eq("id", userId);

  if (error) {
    throw error;
  }
}

export async function completeOnboarding(
  supabase: SupabaseLike,
  userId: string,
  draft: OnboardingDraft
) {
  const { error } = await supabase
    .from("profiles")
    .update({
      outcome: draft.outcome,
      intent: draft.intent,
      personalization: draft.personalization,
      onboarding_completed: true
    })
    .eq("id", userId);

  if (error) {
    throw error;
  }
}
