"use client";

import Btn from "@/components/Btn";
import Input from "@/components/Input";
import { useFormState } from "react-dom";
import { smsLogin } from "./actions";

const initialState = {
  token: false,
  error: undefined,
};

export default function SmsLogin() {
  const [state, action] = useFormState(smsLogin, initialState);

  return (
    <div className="flex flex-col gap-3 py-6">
      <div className="flex flex-col gap-2 mb-4 *:font-medium">
        <h1 className="text-2xl">안녕하세요 😀</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form className="flex flex-col gap-3" action={action}>
        {state.token ? (
          <Input
            name="token"
            key="token"
            type="number"
            placeholder="Verification code"
            required
            errors={state.error?.formErrors}
          />
        ) : (
          <Input
            name="phoneNumber"
            key="phoneNumber"
            type="string"
            placeholder="Phone number"
            required
            errors={state.error?.formErrors}
          />
        )}
        <Btn text={state.token ? "Verify" : "Send Verification SMS"} />
      </form>
    </div>
  );
}
