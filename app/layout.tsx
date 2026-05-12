import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import "./dampi.css";
import { AiWrapper } from "@/components/ai/AiWrapper";

export const metadata: Metadata = {
  title: "Dampi on Sikaptala",
  description: "Dampi onboarding, auth, and AI experience integrated into Sikaptala."
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
      </body>
    </html>
  );
}
