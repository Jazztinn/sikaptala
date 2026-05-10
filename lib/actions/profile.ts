"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { profileSchema } from "@/lib/validators";
import { getRequiredAppUser } from "@/services/account-service";
import { updateProfile } from "@/services/profile-service";
import type { ActionState } from "@/types";

export async function updateProfileAction(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = profileSchema.safeParse({
    displayName: formData.get("displayName"),
    username: formData.get("username"),
    avatarUrl: formData.get("avatarUrl"),
    intent: formData.get("intent"),
    personalization: formData.get("personalization")
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const supabase = await createSupabaseServerClient();
  const appUser = await getRequiredAppUser(supabase);
  await updateProfile(supabase, appUser.id, parsed.data);
  revalidatePath("/app/profile");
  revalidatePath("/app");
  return { success: "Profile updated." };
}
