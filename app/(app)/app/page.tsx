import { Card } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getRequiredAppUser } from "@/services/account-service";
import { listNotifications } from "@/services/notification-service";

export default async function AppHomePage() {
  const supabase = await createSupabaseServerClient();
  const appUser = await getRequiredAppUser(supabase);
  const notifications = await listNotifications(supabase, appUser.id);

  return (
    <div className="space-y-6">
      <Card>
        <p className="text-sm text-muted-foreground">Dashboard</p>
        <h1 className="mt-2 text-3xl font-semibold">
          Welcome, {appUser.profile.displayName}
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Your boilerplate is connected. Start building product-specific features on
          top of this shell instead of recreating auth, onboarding, or account
          flows from scratch.
        </p>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <p className="text-sm text-muted-foreground">Current outcome</p>
          <p className="mt-2 text-2xl font-semibold">
            {appUser.profile.outcome || "Outcome not saved yet"}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-muted-foreground">Notifications</p>
          <p className="mt-2 text-2xl font-semibold">{notifications.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-muted-foreground">Tips enabled</p>
          <p className="mt-2 text-2xl font-semibold">
            {appUser.settings.productTips ? "Yes" : "No"}
          </p>
        </Card>
      </div>
    </div>
  );
}
