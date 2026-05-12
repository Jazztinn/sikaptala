"use client";

import { useEffect, useState } from "react";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow.jsx";
import AuthLandingScreen from "@/components/auth/AuthLandingScreen.jsx";
import LoginScreen from "@/components/auth/LoginScreen.jsx";
import OnboardingShell from "@/components/onboarding/OnboardingShell.jsx";
import SplashScreen from "@/components/ui/SplashScreen";

const SPLASH_DURATION = 2000;

const ONBOARDING_STEPS = [
  { id: 'welcome' },
  { id: 'trydampi' },
  { id: 'account' },
  { id: 'child' },
  { id: 'hmo' },
  { id: 'family' },
];

type View = 'splash' | 'landing' | 'login' | 'onboarding';

export default function HomePage() {
  const [view, setView] = useState<View>('splash');

  useEffect(() => {
    const timer = setTimeout(() => setView('landing'), SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, []);

  if (view === 'splash') {
    return <SplashScreen />;
  }

  if (view === 'login') {
    return (
      <main className="min-h-screen">
        <LoginScreen onBack={() => setView('landing')} />
      </main>
    );
  }

  if (view === 'onboarding') {
    return (
      <main className="min-h-screen">
        <OnboardingFlow onInitialBack={() => setView('landing')} />
      </main>
    );
  }

  // landing
  return (
    <main className="min-h-screen">
      <OnboardingShell
        steps={ONBOARDING_STEPS}
        step={0}
        showNavigation
        animate={false}
      >
        <AuthLandingScreen
          onNew={() => setView('onboarding')}
          onExisting={() => setView('login')}
        />
      </OnboardingShell>
    </main>
  );
}
