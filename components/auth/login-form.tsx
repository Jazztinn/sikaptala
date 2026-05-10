"use client";

import { useActionState } from "react";

import {
  sendMagicLinkAction,
  signInWithPasswordAction
} from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormState } from "@/components/ui/form-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionState } from "@/types";

const initialState: ActionState = {};

export function LoginForm() {
  const [passwordState, passwordAction, passwordPending] = useActionState(
    signInWithPasswordAction,
    initialState
  );
  const [magicState, magicAction, magicPending] = useActionState(
    sendMagicLinkAction,
    initialState
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <h2 className="text-xl font-semibold">Sign in with password</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          For teammates who want the fastest direct path into the protected app.
        </p>
        <form action={passwordAction} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password-email">Email</Label>
            <Input id="password-email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password-value">Password</Label>
            <Input id="password-value" name="password" type="password" required />
          </div>
          <FormState {...passwordState} />
          <Button disabled={passwordPending} className="w-full">
            {passwordPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold">Send a magic link</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Best for hackathon teammates who do not want password friction.
        </p>
        <form action={magicAction} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="magic-email">Email</Label>
            <Input id="magic-email" name="email" type="email" required />
          </div>
          <FormState {...magicState} />
          <Button disabled={magicPending} className="w-full">
            {magicPending ? "Sending..." : "Email me a link"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
