"use client";

import { useFormStatus } from "react-dom";

interface IFormBtn {
  text: string;
}

export default function FormBtn({ text }: IFormBtn) {
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
