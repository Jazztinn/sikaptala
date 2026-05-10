"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";

import { signUpAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormState } from "@/components/ui/form-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionState, OnboardingDraft } from "@/types";

const initialState: ActionState = {};

export function SignupForm() {
  const [state, action, pending] = useActionState(signUpAction, initialState);
  const [draft, setDraft] = useState<OnboardingDraft | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem("sikaptala:onboarding-draft");

    if (!raw) {
      return;
    }

    try {
      setDraft(JSON.parse(raw) as OnboardingDraft);
    } catch {
      window.localStorage.removeItem("sikaptala:onboarding-draft");
    }
  }, []);

  return (
    <Card className="mx-auto max-w-xl">
      <h2 className="text-2xl font-semibold">Create your account</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Use your onboarding draft to save progress and unlock the protected app.
      </p>
      {draft ? (
        <div className="mt-4 rounded-2xl bg-muted p-4 text-sm">
          <p className="font-medium">Draft detected</p>
          <p className="mt-1 text-muted-foreground">
            We found your onboarding progress for "{draft.outcome}". Finish sign
            up, then we will route you back to onboarding to save it to your
            profile.
          </p>
        </div>
      ) : null}
      <form action={action} className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input id="signup-email" name="email" type="email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <Input id="signup-password" name="password" type="password" required />
        </div>
        <FormState {...state} />
        <Button disabled={pending} className="w-full">
          {pending ? "Creating account..." : "Create account"}
        </Button>
      </form>
      <p className="mt-4 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-foreground underline">
          Sign in
        </Link>
      </p>
    </Card>
  );
}
