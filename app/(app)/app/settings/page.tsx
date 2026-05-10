import { SettingsForm } from "@/components/forms/settings-form";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getRequiredAppUser } from "@/services/account-service";

export default async function SettingsPage() {
  const supabase = await createSupabaseServerClient();
  const appUser = await getRequiredAppUser(supabase);

  return <SettingsForm settings={appUser.settings} email={appUser.email} />;
}
