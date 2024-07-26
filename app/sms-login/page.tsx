import Btn from "@/components/Btn";
import Input from "@/components/Input";

export default function SmsLogin() {
  return (
    <div className="flex flex-col gap-3 py-6">
      <div className="flex flex-col gap-2 mb-4 *:font-medium">
        <h1 className="text-2xl">안녕하세요 😀</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form className="flex flex-col gap-3">
        <Input
          name="phoneNumber"
          type="number"
          placeholder="Phone number"
          required
        />
        <Input
          name="verificationCode"
          type="number"
          placeholder="Verification code"
          required
        />
        <Btn text="Verify" />
      </form>
    </div>
  );
}
