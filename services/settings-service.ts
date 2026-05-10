import type { SettingsRecord } from "@/types";

type SupabaseLike = Awaited<ReturnType<typeof import("@/lib/supabase/server").createSupabaseServerClient>>;

function mapSettings(row: Record<string, unknown>): SettingsRecord {
  return {
    id: String(row.id),
    emailNotifications: Boolean(row.email_notifications),
    inAppNotifications: Boolean(row.in_app_notifications),
    productTips: Boolean(row.product_tips),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at)
  };
}

export async function ensureSettings(supabase: SupabaseLike, userId: string) {
  await supabase.from("user_settings").upsert(
    {
      id: userId
    },
    {
      onConflict: "id"
    }
  );

  const { data, error } = await supabase
    .from("user_settings")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  return mapSettings(data);
}

export async function updateSettings(
  supabase: SupabaseLike,
  userId: string,
  input: {
    emailNotifications: boolean;
    inAppNotifications: boolean;
    productTips: boolean;
  }
) {
  const { error } = await supabase
    .from("user_settings")
    .update({
      email_notifications: input.emailNotifications,
      in_app_notifications: input.inAppNotifications,
      product_tips: input.productTips
    })
    .eq("id", userId);

  if (error) {
    throw error;
  }
}
