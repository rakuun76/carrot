"use client";

import { useFormState } from "react-dom";
import { createAccount } from "./actions";
import Btn from "@/components/Btn";
import Input from "@/components/Input";
import SocialLogin from "@/components/SocialLogin";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function CreateAccount() {
  const [state, action] = useFormState(createAccount, null);

  return (
    <div className="flex flex-col gap-3 py-6">
      <div className="flex flex-col gap-2 mb-4 *:font-medium">
        <h1 className="text-2xl">안녕하세요 😀</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form className="flex flex-col gap-3" action={action}>
        <Input
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={state?.fieldErrors.username}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.password}
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.confirmPassword}
        />
        <Btn text="Create account" />
      </form>
      <SocialLogin />
    </div>
  );
}
