"use client";

import Link from "next/link";
import { useActionState, useEffect, useMemo, useState } from "react";

import { completeOnboardingAction } from "@/lib/actions/onboarding";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormState } from "@/components/ui/form-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ActionState, AppUser, OnboardingDraft } from "@/types";

const steps = [
  "Welcome",
  "Intent",
  "Personalize",
  "Preview",
  "Save",
  "Tips"
] as const;

const initialDraft: OnboardingDraft = {
  outcome: "My first hackathon result",
  intent: "",
  personalization: "",
  preview: "",
  contextualTips: ["Share your draft with your team before building."]
};

const initialState: ActionState = {};

export function OnboardingFlow({ user }: { user: AppUser | null }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [draft, setDraft] = useState<OnboardingDraft>(initialDraft);
  const [state, action, pending] = useActionState(
    completeOnboardingAction,
    initialState
  );

  useEffect(() => {
    const raw = window.localStorage.getItem("sikaptala:onboarding-draft");

    if (raw) {
      try {
        setDraft(JSON.parse(raw) as OnboardingDraft);
      } catch {
        window.localStorage.removeItem("sikaptala:onboarding-draft");
      }
      return;
    }

    if (user) {
      const nextDraft: OnboardingDraft = {
        outcome: user.profile.outcome || initialDraft.outcome,
        intent: user.profile.intent || "",
        personalization: user.profile.personalization || "",
        preview: `A starter plan for ${user.profile.displayName || "your team"}.`,
        contextualTips: [
          "Finalize onboarding before sharing protected app routes with teammates."
        ]
      };
      setDraft(nextDraft);
    }
  }, [user]);

  useEffect(() => {
    window.localStorage.setItem(
      "sikaptala:onboarding-draft",
      JSON.stringify(draft)
    );
  }, [draft]);

  const preview = useMemo(() => {
    return draft.preview || `A tailored result for ${draft.intent || "your team"}.`;
  }, [draft.preview, draft.intent]);

  const tipString = draft.contextualTips.join("\n");

  return (
    <Card className="mx-auto max-w-3xl">
      <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {steps.map((step, index) => (
          <span
            key={step}
            className={index === stepIndex ? "font-semibold text-foreground" : ""}
          >
            {step}
          </span>
        ))}
      </div>

      <div className="mt-6 space-y-6">
        {stepIndex === 0 ? (
          <section className="space-y-4">
            <h1 className="text-3xl font-semibold">Start with the outcome</h1>
            <p className="text-muted-foreground">
              Frame the result your hackathon team wants before you open the app.
            </p>
            <div className="space-y-2">
              <Label htmlFor="outcome">Desired outcome</Label>
              <Input
                id="outcome"
                value={draft.outcome}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    outcome: event.target.value
                  }))
                }
              />
            </div>
          </section>
        ) : null}

        {stepIndex === 1 ? (
          <section className="space-y-4">
            <h1 className="text-3xl font-semibold">Capture intent</h1>
            <p className="text-muted-foreground">
              Ask what the user is trying to accomplish, not just what feature they
              clicked.
            </p>
            <div className="space-y-2">
              <Label htmlFor="intent">Intent question answer</Label>
              <Textarea
                id="intent"
                value={draft.intent}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    intent: event.target.value
                  }))
                }
              />
            </div>
          </section>
        ) : null}

        {stepIndex === 2 ? (
          <section className="space-y-4">
            <h1 className="text-3xl font-semibold">Optional personalization</h1>
            <div className="space-y-2">
              <Label htmlFor="personalization">Personalization details</Label>
              <Textarea
                id="personalization"
                value={draft.personalization}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    personalization: event.target.value
                  }))
                }
              />
            </div>
          </section>
        ) : null}

        {stepIndex === 3 ? (
          <section className="space-y-4">
            <h1 className="text-3xl font-semibold">Preview the result</h1>
            <div className="space-y-2">
              <Label htmlFor="preview">Personalized preview</Label>
              <Textarea
                id="preview"
                value={draft.preview}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    preview: event.target.value
                  }))
                }
              />
            </div>
            <div className="rounded-2xl bg-muted p-4">
              <p className="text-sm text-muted-foreground">Preview card</p>
              <p className="mt-2 text-lg font-medium">{preview}</p>
            </div>
          </section>
        ) : null}

        {stepIndex === 4 ? (
          <section className="space-y-4">
            <h1 className="text-3xl font-semibold">Save your progress</h1>
            <p className="text-muted-foreground">
              Guest users can keep exploring this draft locally. Sign up when you
              want to save it into the protected app.
            </p>
            {user ? (
              <form action={action} className="space-y-4">
                <input
                  type="hidden"
                  name="draft"
                  value={JSON.stringify({
                    ...draft,
                    contextualTips: draft.contextualTips.filter(Boolean)
                  })}
                />
                <FormState {...state} />
                <Button disabled={pending}>
                  {pending ? "Saving..." : "Save and enter app"}
                </Button>
              </form>
            ) : (
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm"
                >
                  Create account to save
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium"
                >
                  I already have an account
                </Link>
              </div>
            )}
          </section>
        ) : null}

        {stepIndex === 5 ? (
          <section className="space-y-4">
            <h1 className="text-3xl font-semibold">Contextual tips</h1>
            <div className="space-y-2">
              <Label htmlFor="tips">Tips (one per line)</Label>
              <Textarea
                id="tips"
                value={tipString}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    contextualTips: event.target.value
                      .split("\n")
                      .map((tip) => tip.trim())
                      .filter(Boolean)
                  }))
                }
              />
            </div>
          </section>
        ) : null}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => setStepIndex((current) => Math.max(current - 1, 0))}
          disabled={stepIndex === 0}
          type="button"
        >
          Back
        </Button>
        <Button
          onClick={() =>
            setStepIndex((current) => Math.min(current + 1, steps.length - 1))
          }
          disabled={stepIndex === steps.length - 1}
          type="button"
        >
          Next
        </Button>
      </div>
    </Card>
  );
}
