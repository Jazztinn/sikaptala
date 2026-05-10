import { redirect } from "next/navigation";

import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getRequiredAppUser } from "@/services/account-service";

export default async function OnboardingPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="px-4 py-10 lg:px-8">
        <OnboardingFlow user={null} />
      </main>
    );
  }

  const appUser = await getRequiredAppUser(supabase);

  if (appUser.profile.onboardingCompleted) {
    redirect("/app");
  }

  return (
    <main className="px-4 py-10 lg:px-8">
      <OnboardingFlow user={appUser} />
    </main>
  );
}
