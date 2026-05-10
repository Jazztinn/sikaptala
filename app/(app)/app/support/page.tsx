import { SupportForm } from "@/components/forms/support-form";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getRequiredAppUser } from "@/services/account-service";

export default async function SupportPage() {
  const supabase = await createSupabaseServerClient();
  const appUser = await getRequiredAppUser(supabase);

  return <SupportForm email={appUser.email} />;
}
