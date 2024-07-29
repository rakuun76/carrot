"use client";

import { useFormStatus } from "react-dom";

interface BtnProps {
  text: string;
}

export default function Btn({ text }: BtnProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className="primary-btn-layout py-1.5 disabled:bg-neutral-400 disabled:text-neutral-100 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {text}
    </button>
  );
}
