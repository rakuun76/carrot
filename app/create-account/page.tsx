import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-3 py-6">
      <div className="flex flex-col gap-2 mb-4 *:font-medium">
        <h1 className="text-2xl">안녕하세요 😀</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <input
            className="bg-transparent rounded-md px-2 py-1.5 focus:outline-none ring-1 ring-neutral-400 focus:ring-neutral-100"
            type="text"
            placeholder="Username"
            required
          />
          <span className="text-red-500 font-medium">Input error</span>
        </div>
        <button className="primary-btn-layout py-1.5">Create account</button>
      </form>
      <div className="h-px bg-neutral-500" />
      <Link
        className="flex justify-center items-center gap-1 primary-btn-layout py-1.5"
        href="/sms"
      >
        <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
        <span>Sign up with SMS</span>
      </Link>
    </div>
  );
}
