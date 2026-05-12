import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import "./dampi.css";
import { AiWrapper } from "@/components/ai/AiWrapper";
import SwRegister from "@/components/ui/SwRegister";

export const metadata: Metadata = {
  title: "Dampi",
  description: "Family health tracking and AI assistant",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Dampi",
  },
};

export const viewport: Viewport = {
  themeColor: "#4d736c",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <AiWrapper />
        <SwRegister />
      </body>
    </html>
  );
}
