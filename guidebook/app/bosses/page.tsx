import Link from "next/link";

const BOSS_CATEGORIES = [
  {
    href: "/bosses/field",
    label: "필드 보스",
    description: "에피소드별 필드 보스",
    color: "bg-amber-50 border-amber-200 hover:border-amber-400",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    href: "/bosses/adventure",
    label: "모험",
    description: "기억의돌 · 분열특이점 · 불길한 유적지 외",
    color: "bg-blue-50 border-blue-200 hover:border-blue-400",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    href: "/bosses/challenge",
    label: "도전",
    description: "균열 · 토벌대 · 대지의 탑 · 래버러토리움 외",
    color: "bg-purple-50 border-purple-200 hover:border-purple-400",
    badge: "bg-purple-100 text-purple-700",
  },
  {
    href: "/bosses/guild",
    label: "길드도전",
    description: "길드 전용 도전 콘텐츠",
    color: "bg-green-50 border-green-200 hover:border-green-400",
    badge: "bg-green-100 text-green-700",
  },
  {
    href: "/bosses/raid",
    label: "토벌대",
    description: "토벌대 보스",
    color: "bg-red-50 border-red-200 hover:border-red-400",
    badge: "bg-red-100 text-red-700",
  },
  {
    href: "/bosses/event",
    label: "이벤트",
    description: "기간 한정 이벤트 보스",
    color: "bg-pink-50 border-pink-200 hover:border-pink-400",
    badge: "bg-pink-100 text-pink-700",
  },
];

export default function BossesHubPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">보스 도감</h1>
        <p className="text-gray-500 text-sm">카테고리를 선택하세요</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {BOSS_CATEGORIES.map((cat) => (
          <Link key={cat.href} href={cat.href}>
            <div className={`rounded-xl border-2 p-5 transition-all duration-200 cursor-pointer ${cat.color}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${cat.badge}`}>
                  {cat.label}
                </span>
              </div>
              <p className="text-sm text-gray-500">{cat.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
