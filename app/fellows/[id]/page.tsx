import { notFound } from "next/navigation";
import Link from "next/link";
import fellowsData from "@/data/fellows.json";
import { Fellow } from "@/types/fellow";
import { GradeBadge } from "@/components/GradeBadge";
import { LineageBadge } from "@/components/LineageBadge";
import { AttributeBadge } from "@/components/AttributeBadge";
import { TraitModal } from "@/components/TraitModal";
import { SkillModal } from "@/components/SkillModal";
import { ATTRIBUTE_COLORS } from "@/lib/constants";

const fellows = fellowsData as Fellow[];

interface PageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return fellows.map((f) => ({ id: f.id }));
}

export default function FellowDetailPage({ params }: PageProps) {
  const fellow = fellows.find((f) => f.id === params.id);
  if (!fellow) notFound();

  const attrColor = ATTRIBUTE_COLORS[fellow.attribute] || "#9ca3af";

  const validSkills = fellow.skills.filter((s) => s.name && s.name !== "없음");

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Button */}
      <Link
        href="/fellows"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 group"
      >
        <svg
          className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        펠로우 목록으로
      </Link>

      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-5 shadow-sm">
        {/* Color bar based on attribute */}
        <div
          className="h-2"
          style={{ backgroundColor: attrColor }}
        />

        <div className="p-6">
          <div className="flex gap-5">
            {/* Image Placeholder */}
            <div
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl flex-shrink-0 flex items-center justify-center"
              style={{ backgroundColor: attrColor + "20", border: `2px solid ${attrColor}40` }}
            >
              <span className="text-3xl sm:text-4xl" style={{ color: attrColor }}>?</span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-2">
                <GradeBadge grade={fellow.grade} />
                <LineageBadge lineage={fellow.lineage} />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 leading-tight">
                {fellow.name}
              </h1>
              {fellow.class && fellow.class !== fellow.lineage && (
                <p className="text-sm text-gray-400 mb-2">클래스: {fellow.class}</p>
              )}
              <div className="flex items-center gap-2 mt-2">
                <AttributeBadge attribute={fellow.attribute} size="md" />
                <span
                  className="text-sm font-semibold"
                  style={{ color: attrColor }}
                >
                  {fellow.attribute} 속성
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Traits Section */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-5 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900 flex items-center gap-2">
            <span className="w-1.5 h-5 rounded-full bg-amber-400 inline-block" />
            클래스 특성
          </h2>
        </div>
        <div className="p-4 space-y-2">
          {fellow.traits.map((trait, i) => (
            <TraitModal key={i} trait={trait} index={i} />
          ))}
        </div>
      </div>

      {/* Skills Section */}
      {validSkills.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-5 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-blue-400 inline-block" />
              스킬
            </h2>
          </div>
          <div className="p-4 space-y-2">
            {validSkills.map((skill, i) => (
              <SkillModal
                key={i}
                skill={skill}
                index={i}
                fellowAttribute={fellow.attribute}
              />
            ))}
          </div>
        </div>
      )}

      {/* Synergy Section (Gadis only) */}
      {fellow.lineage === "가디스" && fellow.synergy && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-5 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-pink-400 inline-block" />
              시너지
            </h2>
          </div>
          <div className="p-4">
            <div className="bg-pink-50 rounded-lg p-4 border border-pink-100">
              <p className="text-sm text-gray-700 leading-relaxed">{fellow.synergy}</p>
            </div>
          </div>
        </div>
      )}

      {/* Passive Effect */}
      {fellow.passiveEffect && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-5 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-green-400 inline-block" />
              보유 효과
            </h2>
          </div>
          <div className="p-4">
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <p className="text-sm font-semibold text-green-800">{fellow.passiveEffect}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
