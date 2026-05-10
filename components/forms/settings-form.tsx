"use client";

import { useActionState } from "react";

import { updateSettingsAction } from "@/lib/actions/settings";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormState } from "@/components/ui/form-state";
import { Label } from "@/components/ui/label";
import type { ActionState, SettingsRecord } from "@/types";

const initialState: ActionState = {};

export function SettingsForm({
  settings,
  email
}: {
  settings: SettingsRecord;
  email: string;
}) {
  const [state, action, pending] = useActionState(
    updateSettingsAction,
    initialState
  );

  return (
    <Card>
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold">Preferences</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Account email: {email}
        </p>
      </div>
      <form action={action} className="space-y-5">
        <label className="flex items-center gap-3">
          <Checkbox
            name="emailNotifications"
            defaultChecked={settings.emailNotifications}
          />
          <span>
            <span className="block font-medium">Email notifications</span>
            <span className="text-sm text-muted-foreground">
              Receive account updates by email.
            </span>
          </span>
        </label>
        <label className="flex items-center gap-3">
          <Checkbox
            name="inAppNotifications"
            defaultChecked={settings.inAppNotifications}
          />
          <span>
            <span className="block font-medium">In-app notifications</span>
            <span className="text-sm text-muted-foreground">
              Keep the notification inbox active inside the app.
            </span>
          </span>
        </label>
        <label className="flex items-center gap-3">
          <Checkbox name="productTips" defaultChecked={settings.productTips} />
          <span>
            <span className="block font-medium">Product tips</span>
            <span className="text-sm text-muted-foreground">
              Show contextual guidance for first-time teammates.
            </span>
          </span>
        </label>
        <FormState {...state} />
        <Button disabled={pending}>{pending ? "Saving..." : "Save settings"}</Button>
      </form>
    </Card>
  );
}
