"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { settingsSchema } from "@/lib/validators";
import { getRequiredAppUser } from "@/services/account-service";
import { updateSettings } from "@/services/settings-service";
import type { ActionState } from "@/types";

export async function updateSettingsAction(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = settingsSchema.safeParse({
    emailNotifications: formData.get("emailNotifications") === "on",
    inAppNotifications: formData.get("inAppNotifications") === "on",
    productTips: formData.get("productTips") === "on"
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const supabase = await createSupabaseServerClient();
  const appUser = await getRequiredAppUser(supabase);
  await updateSettings(supabase, appUser.id, parsed.data);
  revalidatePath("/app/settings");
  return { success: "Settings updated." };
}
