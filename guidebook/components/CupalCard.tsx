import Link from "next/link";
import { Cupal } from "@/types/cupal";
import { GradeBadge } from "./GradeBadge";
import { AttributeIcon } from "./AttributeIcon";
import { ATTRIBUTE_COLORS, CUPAL_PASSIVE_STYLES } from "@/lib/constants";

interface CupalCardProps {
  cupal: Cupal;
}

const SKILL_EFFECT_TAGS: { key: keyof Cupal; label: string; className: string }[] = [
  { key: "debuff",      label: "디버프",   className: "bg-red-100 text-red-700" },
  { key: "attackBuff",  label: "공격버프", className: "bg-orange-100 text-orange-700" },
  { key: "defenseBuff", label: "방어버프", className: "bg-blue-100 text-blue-700" },
  { key: "heal",        label: "회복",     className: "bg-emerald-100 text-emerald-700" },
];

export function CupalCard({ cupal }: CupalCardProps) {
  const colorAttr =
    cupal.attack && cupal.attack !== "무" ? cupal.attack : cupal.extraDamageAttribute;
  const attrColor = ATTRIBUTE_COLORS[colorAttr] || "#9ca3af";
  const passiveStyle = CUPAL_PASSIVE_STYLES[cupal.passiveBuffType] || "bg-gray-100 text-gray-600 border border-gray-200";

  const effectTags = SKILL_EFFECT_TAGS.filter((t) => !!(cupal[t.key] as string));

  return (
    <Link href={`/cupals/${cupal.id}`}>
      <div className="bg-white rounded-xl border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer group">
        {/* Attribute color bar */}
        <div className="h-1.5" style={{ backgroundColor: attrColor }} />

        {/* Image placeholder */}
        <div
          className="h-36 flex items-center justify-center relative"
          style={{ backgroundColor: attrColor + "12" }}
        >
          <div className="text-center">
            <div
              className="w-14 h-14 rounded-full mx-auto mb-1.5 flex items-center justify-center"
              style={{ backgroundColor: attrColor + "28", border: `2px solid ${attrColor}45` }}
            >
              <span className="text-2xl" style={{ color: attrColor }}>?</span>
            </div>
            <span className="text-xs text-gray-400">이미지 준비 중</span>
          </div>
          <div className="absolute top-2 right-2">
            <GradeBadge grade={cupal.grade} />
          </div>
          {/* Passive buff type badge */}
          <div className="absolute top-2 left-2">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${passiveStyle}`}>
              {cupal.passiveBuffType}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-amber-600 transition-colors truncate">
            {cupal.name}
          </h3>

          {/* Attack attribute + skill name */}
          <div className="flex items-center gap-1.5 mb-2">
            {cupal.attack ? (
              <AttributeIcon attribute={cupal.attack} size={18} />
            ) : (
              <span className="w-[18px] h-[18px] rounded-full bg-gray-200 inline-block flex-shrink-0" />
            )}
            <span className="text-xs text-gray-600 truncate">{cupal.skillName}</span>
          </div>

          {/* Skill effect tags */}
          {effectTags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {effectTags.map((t) => (
                <span key={t.key} className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${t.className}`}>
                  {t.label}
                </span>
              ))}
              {(cupal.extraDamageAttribute || cupal.extraDamageRace) && (
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-violet-100 text-violet-700">
                  추가피해
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
