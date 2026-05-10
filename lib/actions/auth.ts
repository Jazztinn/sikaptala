"use server";

import { redirect } from "next/navigation";

import { getEnv } from "@/lib/env";
import { authSchema, passwordAuthSchema } from "@/lib/validators";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ActionState } from "@/types";

export async function signInWithPasswordAction(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = passwordAuthSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { error: error.message };
  }

  redirect("/app");
}

export async function signUpAction(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = passwordAuthSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const supabase = await createSupabaseServerClient();
  const env = getEnv();
  const { error } = await supabase.auth.signUp({
    ...parsed.data,
    options: {
      emailRedirectTo: `${env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/app`
    }
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success:
      "Check your email to confirm the account if confirmations are enabled."
  };
}

export async function sendMagicLinkAction(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = authSchema.safeParse({
    email: formData.get("email"),
    password: ""
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const supabase = await createSupabaseServerClient();
  const env = getEnv();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: {
      emailRedirectTo: `${env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/app`
    }
  });

  if (error) {
    return { error: error.message };
  }

  return { success: "Magic link sent. Check your inbox." };
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}
