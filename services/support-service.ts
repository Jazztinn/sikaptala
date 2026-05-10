import type { SupportRequestInput } from "@/types";

type SupabaseLike = Awaited<ReturnType<typeof import("@/lib/supabase/server").createSupabaseServerClient>>;

export async function createSupportRequest(
  supabase: SupabaseLike,
  input: SupportRequestInput,
  userId?: string
) {
  const { error } = await supabase.from("support_requests").insert({
    user_id: userId ?? null,
    email: input.email || null,
    subject: input.subject,
    category: input.category,
    message: input.message
  });

  if (error) {
    throw error;
  }
}
