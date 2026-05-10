"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supportSchema } from "@/lib/validators";
import { getRequiredAppUser } from "@/services/account-service";
import { createSupportRequest } from "@/services/support-service";
import type { ActionState } from "@/types";

export async function createSupportRequestAction(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = supportSchema.safeParse({
    email: formData.get("email"),
    subject: formData.get("subject"),
    category: formData.get("category"),
    message: formData.get("message")
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const supabase = await createSupabaseServerClient();
  const appUser = await getRequiredAppUser(supabase);
  await createSupportRequest(supabase, parsed.data, appUser.id);
  revalidatePath("/app/support");
  return { success: "Support request submitted." };
}
