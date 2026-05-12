"use client";

import { useRouter } from "next/navigation";

import AuthLandingScreen from "@/components/auth/AuthLandingScreen.jsx";

export default function SignupPage() {
  const router = useRouter();

  return (
    <AuthLandingScreen
      onNew={() => router.push("/onboarding")}
      onExisting={() => router.push("/login")}
    />
  );
}
