"use client";

import "./splash-screen.css";

export default function SplashScreen() {
  return (
    <div className="splash-screen">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/dampi.svg" alt="Dampi" className="splash-logo" />
    </div>
  );
}
