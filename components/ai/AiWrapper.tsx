"use client";

import { useState } from "react";
import DampiFab from "./DampiFab.jsx";
import DampiChatModal from "./DampiChatModal.jsx";

export function AiWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DampiFab onClick={() => setIsOpen(true)} />
      <DampiChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
