"use client";

import { useFormState } from "react-dom";
import { handleFormSubmit } from "./actions";
import FormBtn from "@/components/FormBtn";
import FormInput from "@/components/FormInput";
import SocialLogin from "@/components/SocialLogin";

export default function Login() {
  const [state, action] = useFormState(handleFormSubmit, null);

  return (
    <div className="flex flex-col gap-3 py-6">
      <div className="flex flex-col gap-2 mb-4 *:font-medium">
        <h1 className="text-2xl">안녕하세요 😀</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form className="flex flex-col gap-3" action={action}>
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={[]}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.errors ?? []}
        />
        <FormBtn text="Log in" />
      </form>
      <SocialLogin />
    </div>
  );
}
