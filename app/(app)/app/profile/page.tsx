import { ProfileForm } from "@/components/forms/profile-form";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getRequiredAppUser } from "@/services/account-service";

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient();
  const appUser = await getRequiredAppUser(supabase);

  return <ProfileForm profile={appUser.profile} />;
}
