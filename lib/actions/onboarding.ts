"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { onboardingDraftSchema } from "@/lib/validators";
import { getRequiredAppUser } from "@/services/account-service";
import { completeOnboarding } from "@/services/profile-service";
import type { ActionState, OnboardingDraft } from "@/types";

export async function completeOnboardingAction(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const rawDraft = formData.get("draft");

  if (typeof rawDraft !== "string") {
    return { error: "Missing onboarding draft." };
  }

  let parsedJson: OnboardingDraft;

  try {
    parsedJson = JSON.parse(rawDraft);
  } catch {
    return { error: "Onboarding draft is not valid JSON." };
  }

  const parsed = onboardingDraftSchema.safeParse(parsedJson);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const supabase = await createSupabaseServerClient();
  const appUser = await getRequiredAppUser(supabase);
  await completeOnboarding(supabase, appUser.id, parsed.data);
  revalidatePath("/app");
  revalidatePath("/onboarding");
  redirect("/app");
}
