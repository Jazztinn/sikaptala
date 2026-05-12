"use client";

import { useRouter } from "next/navigation";

import LoginScreen from "@/components/auth/LoginScreen.jsx";

export default function LoginPage() {
  const router = useRouter();

  return <LoginScreen onBack={() => router.push("/signup")} />;
}
