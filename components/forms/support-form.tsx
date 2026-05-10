"use client";

import { useActionState } from "react";

import { createSupportRequestAction } from "@/lib/actions/support";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormState } from "@/components/ui/form-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ActionState } from "@/types";

const initialState: ActionState = {};

export function SupportForm({ email }: { email: string }) {
  const [state, action, pending] = useActionState(
    createSupportRequestAction,
    initialState
  );

  return (
    <Card>
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">Support</p>
        <h1 className="mt-2 text-3xl font-semibold">Send a request</h1>
      </div>
      <form action={action} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="support-email">Reply-to email</Label>
          <Input id="support-email" name="email" defaultValue={email} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" name="subject" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            name="category"
            className="flex h-11 w-full rounded-xl border border-input bg-white px-3 py-2 text-sm shadow-sm outline-none"
            defaultValue="feedback"
          >
            <option value="feedback">Feedback</option>
            <option value="bug">Bug</option>
            <option value="account">Account</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" required />
        </div>
        <FormState {...state} />
        <Button disabled={pending}>
          {pending ? "Submitting..." : "Submit request"}
        </Button>
      </form>
    </Card>
  );
}
