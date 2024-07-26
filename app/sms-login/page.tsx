"use client";

import Btn from "@/components/Btn";
import Input from "@/components/Input";
import { useFormState } from "react-dom";
import { smsLogin } from "./actions";

export default function SmsLogin() {
  const [state, action] = useFormState(smsLogin, null);

  return (
    <div className="flex flex-col gap-3 py-6">
      <div className="flex flex-col gap-2 mb-4 *:font-medium">
        <h1 className="text-2xl">안녕하세요 😀</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form className="flex flex-col gap-3" action={action}>
        <Input
          name="phoneNumber"
          type="string"
          placeholder="Phone number"
          required
        />
        <Input
          name="verificationCode"
          type="string"
          placeholder="Verification code"
          required
        />
        <Btn text="Verify" />
      </form>
    </div>
  );
}
