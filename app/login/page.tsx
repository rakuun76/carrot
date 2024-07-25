import FormBtn from "@/components/FormBtn";
import FormInput from "@/components/FormInput";
import SocialLogin from "@/components/SocialLogin";

export default function Login() {
  return (
    <div className="flex flex-col gap-3 py-6">
      <div className="flex flex-col gap-2 mb-4 *:font-medium">
        <h1 className="text-2xl">안녕하세요 😀</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput type="email" placeholder="Email" required errors={[]} />
        <FormInput
          type="password"
          placeholder="Password"
          required
          errors={[]}
        />
        <FormBtn disabled={false} text="Log in" />
      </form>
      <SocialLogin />
    </div>
  );
}
