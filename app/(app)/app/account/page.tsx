import { Card } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getRequiredAppUser } from "@/services/account-service";

export default async function AccountPage() {
  const supabase = await createSupabaseServerClient();
  const appUser = await getRequiredAppUser(supabase);

  return (
    <Card className="space-y-4">
      <div>
        <p className="text-sm text-muted-foreground">Account</p>
        <h1 className="mt-2 text-3xl font-semibold">Identity and access</h1>
      </div>
      <dl className="space-y-4 text-sm">
        <div>
          <dt className="text-muted-foreground">Email</dt>
          <dd className="font-medium">{appUser.email}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">User ID</dt>
          <dd className="font-mono text-xs">{appUser.id}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Sign-in methods</dt>
          <dd className="font-medium">Email/password and magic link</dd>
        </div>
      </dl>
    </Card>
  );
}
