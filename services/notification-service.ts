import type { NotificationItem } from "@/types";

type SupabaseLike = Awaited<ReturnType<typeof import("@/lib/supabase/server").createSupabaseServerClient>>;

function mapNotification(row: Record<string, unknown>): NotificationItem {
  return {
    id: String(row.id),
    userId: String(row.user_id),
    type: (row.type as NotificationItem["type"]) ?? "info",
    title: String(row.title),
    body: String(row.body),
    read: Boolean(row.read),
    createdAt: String(row.created_at)
  };
}

export async function listNotifications(
  supabase: SupabaseLike,
  userId: string
) {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data.map(mapNotification);
}

export async function markNotificationRead(
  supabase: SupabaseLike,
  userId: string,
  id: string
) {
  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    throw error;
  }
}
