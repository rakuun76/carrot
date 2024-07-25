import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function SocialLogin() {
  return (
    <>
      <div className="h-px bg-neutral-500" />
      <div className="flex flex-col gap-2">
        <Link
          className="flex justify-center items-center gap-1 primary-btn-layout py-1.5"
          href="/github/start"
        >
          <FontAwesomeIcon icon={faGithub} className="size-5" />
          <span>Sign up with Github</span>
        </Link>
        <Link
          className="flex justify-center items-center gap-1 primary-btn-layout py-1.5"
          href="/sms-login"
        >
          <FontAwesomeIcon icon={faCommentDots} className="size-5" />
          <span>Sign up with SMS</span>
        </Link>
      </div>
    </>
  );
}
