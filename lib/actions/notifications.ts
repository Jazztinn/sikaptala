"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getRequiredAppUser } from "@/services/account-service";
import { markNotificationRead } from "@/services/notification-service";

export async function markNotificationReadAction(formData: FormData) {
  const id = String(formData.get("notificationId") || "");

  if (!id) {
    return;
  }

  const supabase = await createSupabaseServerClient();
  const appUser = await getRequiredAppUser(supabase);
  await markNotificationRead(supabase, appUser.id, id);
  revalidatePath("/app/notifications");
}
