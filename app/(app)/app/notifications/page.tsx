import { markNotificationReadAction } from "@/lib/actions/notifications";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getRequiredAppUser } from "@/services/account-service";
import { listNotifications } from "@/services/notification-service";

export default async function NotificationsPage() {
  const supabase = await createSupabaseServerClient();
  const appUser = await getRequiredAppUser(supabase);
  const notifications = await listNotifications(supabase, appUser.id);

  return (
    <Card className="space-y-4">
      <div>
        <p className="text-sm text-muted-foreground">Notifications</p>
        <h1 className="mt-2 text-3xl font-semibold">Inbox</h1>
      </div>
      {notifications.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No notifications yet. Seed this table when your app starts generating
          system events.
        </p>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="rounded-2xl border border-border p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{notification.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {notification.body}
                  </p>
                </div>
                {!notification.read ? (
                  <form action={markNotificationReadAction}>
                    <input
                      type="hidden"
                      name="notificationId"
                      value={notification.id}
                    />
                    <Button variant="secondary">Mark read</Button>
                  </form>
                ) : (
                  <span className="text-sm text-muted-foreground">Read</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
