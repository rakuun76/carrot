import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-5 flex flex-col justify-between items-center">
      <div className="my-auto flex flex-col items-center gap-3">
        <h1 className="text-4xl font-semibold">당근🥕</h1>
        <h2 className="text-xl font-medium">당근 마켓에 어서오세요😀</h2>
      </div>
      <div className="w-full flex flex-col items-center gap-2">
        <Link
          className="primary-btn-layout py-2.5 text-lg"
          href="/create-account"
        >
          시작하기
        </Link>
        <div>
          <span>이미 계정이 있나요? </span>
          <Link className="hover:underline" href="/login">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
