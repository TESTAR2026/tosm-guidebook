import { notFound } from "next/navigation";
import Link from "next/link";
import cupalsData from "@/data/cupals.json";
import { Cupal } from "@/types/cupal";
import { GradeBadge } from "@/components/GradeBadge";
import { AttributeIcon } from "@/components/AttributeIcon";
import { ATTRIBUTE_COLORS, CUPAL_PASSIVE_STYLES } from "@/lib/constants";

const cupals = cupalsData as Cupal[];

interface PageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return cupals.map((c) => ({ id: c.id }));
}

interface SkillEffectRowProps {
  color: string;
  label: string;
  text: string;
}
function SkillEffectRow({ color, label, text }: SkillEffectRowProps) {
  if (!text) return null;
  return (
    <div className={`rounded-lg p-3 border ${color}`}>
      <p className="text-xs font-semibold mb-0.5 opacity-70">{label}</p>
      <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
    </div>
  );
}

export default function CupalDetailPage({ params }: PageProps) {
  const cupal = cupals.find((c) => c.id === params.id);
  if (!cupal) notFound();

  const colorAttr =
    cupal.attack && cupal.attack !== "무" ? cupal.attack : cupal.extraDamageAttribute;
  const attrColor = ATTRIBUTE_COLORS[colorAttr] || "#9ca3af";
  const passiveStyle =
    CUPAL_PASSIVE_STYLES[cupal.passiveBuffType] || "bg-gray-100 text-gray-600 border border-gray-200";

  const extraDamageTarget =
    cupal.extraDamageAttribute
      ? `${cupal.extraDamageAttribute} 속성 적`
      : cupal.extraDamageRace === "전체"
      ? "모든 적"
      : cupal.extraDamageRace
      ? `${cupal.extraDamageRace} 적`
      : "";

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Button */}
      <Link
        href="/cupals"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 group"
      >
        <svg
          className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        큐폴 도감으로
      </Link>

      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-5 shadow-sm">
        <div className="h-2" style={{ backgroundColor: attrColor }} />
        <div className="p-6">
          <div className="flex gap-5">
            {/* Image placeholder */}
            <div
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl flex-shrink-0 flex items-center justify-center"
              style={{ backgroundColor: attrColor + "20", border: `2px solid ${attrColor}40` }}
            >
              <span className="text-3xl sm:text-4xl" style={{ color: attrColor }}>?</span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-2">
                <GradeBadge grade={cupal.grade} />
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${passiveStyle}`}>
                  {cupal.passiveBuffType}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                {cupal.name}
              </h1>
              {/* Attack attribute */}
              {cupal.attack && (
                <div className="flex items-center gap-2">
                  <AttributeIcon attribute={cupal.attack} size={22} />
                  <span className="text-sm font-semibold" style={{ color: attrColor }}>
                    {cupal.attack !== "무" ? `${cupal.attack} 속성 공격` : "무속성 공격"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Passive Section */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-5 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900 flex items-center gap-2">
            <span className="w-1.5 h-5 rounded-full bg-amber-400 inline-block" />
            패시브
            <span className={`ml-1 text-xs font-bold px-2 py-0.5 rounded-full ${passiveStyle}`}>
              {cupal.passiveBuffType}
            </span>
          </h2>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {cupal.passiveDescription}
          </p>
        </div>
      </div>

      {/* Skill Section */}
      {cupal.skillName && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-5 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-blue-400 inline-block" />
              스킬
            </h2>
          </div>
          <div className="p-4 space-y-3">
            {/* Skill name + cooldown row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {cupal.attack
                  ? <AttributeIcon attribute={cupal.attack} size={26} />
                  : <span className="w-[26px] h-[26px] rounded-full bg-gray-200 inline-block flex-shrink-0" />
                }
                <span className="font-bold text-gray-900">{cupal.skillName}</span>
              </div>
              {cupal.skillCooldown && (
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                  {cupal.skillCooldown}
                </span>
              )}
            </div>

            {/* Effect summary cards */}
            <div className="space-y-2">
              <SkillEffectRow
                color="bg-red-50 border-red-100 text-red-800"
                label="디버프"
                text={cupal.debuff}
              />
              <SkillEffectRow
                color="bg-orange-50 border-orange-100 text-orange-800"
                label="공격버프"
                text={cupal.attackBuff}
              />
              <SkillEffectRow
                color="bg-sky-50 border-sky-100 text-sky-800"
                label="방어버프"
                text={cupal.defenseBuff}
              />
              <SkillEffectRow
                color="bg-emerald-50 border-emerald-100 text-emerald-800"
                label="회복"
                text={cupal.heal}
              />
              {extraDamageTarget && (
                <div className="bg-violet-50 border border-violet-100 rounded-lg p-3">
                  <p className="text-xs font-semibold text-violet-500 mb-0.5">추가 피해</p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">{extraDamageTarget}</span>에게 입히는 피해{" "}
                    <span className="font-bold text-violet-700">+30%</span> (10초)
                  </p>
                </div>
              )}
            </div>

            {/* Full skill description */}
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-400 mb-2">스킬 설명</p>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {cupal.skillDescription}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Companion Effect */}
      {cupal.companionEffect && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-5 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-teal-400 inline-block" />
              동행 효과
            </h2>
          </div>
          <div className="p-4">
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
              <p className="text-sm font-semibold text-teal-800">{cupal.companionEffect}</p>
            </div>
          </div>
        </div>
      )}

      {/* Possession Effect */}
      {cupal.possessionEffect && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-5 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-green-400 inline-block" />
              보유 효과
            </h2>
          </div>
          <div className="p-4">
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <p className="text-sm font-semibold text-green-800">{cupal.possessionEffect}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
