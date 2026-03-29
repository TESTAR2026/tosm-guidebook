import Link from "next/link";

const SECTIONS = [
  {
    href: "/fellows",
    title: "펠로우",
    desc: "스킬, 특성, 속성 정보",
    color: "bg-amber-500 hover:bg-amber-600",
  },
  {
    href: "/cupals",
    title: "큐폴",
    desc: "동행 효과, 스킬 정보",
    color: "bg-sky-500 hover:bg-sky-600",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        트리오브세이비어M
        <br />
        <span className="text-amber-500">가이드북</span>
      </h1>
      <p className="text-gray-500 mb-10 text-lg">
        펠로우, 큐폴 정보를 한눈에 확인하세요.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className={`inline-flex flex-col items-center justify-center rounded-xl ${s.color} text-white font-semibold px-10 py-5 text-base transition-colors shadow-sm`}
          >
            <span className="text-xl font-bold">{s.title}</span>
            <span className="text-xs font-normal mt-1 opacity-90">{s.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
