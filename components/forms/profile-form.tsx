"use client";

import { useActionState } from "react";

import { updateProfileAction } from "@/lib/actions/profile";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormState } from "@/components/ui/form-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ActionState, ProfileRecord } from "@/types";

const initialState: ActionState = {};

export function ProfileForm({ profile }: { profile: ProfileRecord }) {
  const [state, action, pending] = useActionState(
    updateProfileAction,
    initialState
  );

  return (
    <Card>
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">Profile</p>
        <h1 className="mt-2 text-3xl font-semibold">Public identity</h1>
      </div>
      <form action={action} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="displayName">Display name</Label>
          <Input id="displayName" name="displayName" defaultValue={profile.displayName} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" name="username" defaultValue={profile.username ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="avatarUrl">Avatar URL</Label>
          <Input id="avatarUrl" name="avatarUrl" defaultValue={profile.avatarUrl ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="intent">Intent</Label>
          <Textarea id="intent" name="intent" defaultValue={profile.intent ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="personalization">Personalization</Label>
          <Textarea
            id="personalization"
            name="personalization"
            defaultValue={profile.personalization ?? ""}
          />
        </div>
        <FormState {...state} />
        <Button disabled={pending}>{pending ? "Saving..." : "Save profile"}</Button>
      </form>
    </Card>
  );
}
