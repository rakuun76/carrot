import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-5 flex flex-col justify-between items-center">
      <div className="my-auto flex flex-col items-center gap-3">
        <h1 className="text-4xl font-semibold">당근🥕</h1>
        <h2 className="text-xl">당근 마켓에 어서오세요😀</h2>
      </div>
      <div className="w-full flex flex-col items-center gap-2">
        <Link
          href="/create-account"
          className="w-full py-2.5 bg-orange-500 text-white text-center text-lg font-medium rounded-md hover:bg-orange-400 transition-colors"
        >
          시작하기
        </Link>
        <div>
          <span>이미 계정이 있나요? </span>
          <Link href="/login" className="hover:underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
