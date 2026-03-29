import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        트리오브세이비어M
        <br />
        <span className="text-amber-500">가이드북</span>
      </h1>
      <p className="text-gray-500 mb-8 text-lg">
        펠로우 정보, 스킬, 특성을 한눈에 확인하세요.
      </p>
      <Link
        href="/fellows"
        className="inline-flex items-center justify-center rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 text-base transition-colors"
      >
        펠로우 목록 보기
      </Link>
    </div>
  );
}
