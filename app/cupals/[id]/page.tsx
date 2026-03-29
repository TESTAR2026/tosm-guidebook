import { notFound } from "next/navigation";
import Link from "next/link";
import cupalsData from "@/data/cupals.json";
import { Cupal } from "@/types/cupal";
import { GradeBadge } from "@/components/GradeBadge";
import { AttributeBadge } from "@/components/AttributeBadge";
import { AttributeIcon } from "@/components/AttributeIcon";
import { ATTRIBUTE_COLORS } from "@/lib/constants";

const cupals = cupalsData as Cupal[];

interface PageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return cupals.map((c) => ({ id: c.id }));
}

export default function CupalDetailPage({ params }: PageProps) {
  const cupal = cupals.find((c) => c.id === params.id);
  if (!cupal) notFound();

  const attrColor = ATTRIBUTE_COLORS[cupal.attribute] || "#9ca3af";

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Button */}
      <Link
        href="/cupals"
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
        큐폴 도감으로
      </Link>

      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-5 shadow-sm">
        <div className="h-2" style={{ backgroundColor: attrColor }} />
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
                <GradeBadge grade={cupal.grade} />
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 border border-indigo-200">
                  {cupal.race}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 leading-tight">
                {cupal.name}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <AttributeBadge attribute={cupal.attribute} size="md" />
                <span className="text-sm font-semibold" style={{ color: attrColor }}>
                  {cupal.attribute} 속성
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {cupal.description && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-5 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-gray-400 inline-block" />
              설명
            </h2>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-600 leading-relaxed">{cupal.description}</p>
          </div>
        </div>
      )}

      {/* Passive Buff */}
      {cupal.passiveBuff && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-5 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-amber-400 inline-block" />
              패시브 버프
            </h2>
          </div>
          <div className="p-4">
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
              <p className="text-sm font-semibold text-amber-800">{cupal.passiveBuff}</p>
            </div>
          </div>
        </div>
      )}

      {/* Skill */}
      {cupal.skillName && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-5 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-blue-400 inline-block" />
              스킬
            </h2>
          </div>
          <div className="p-4">
            <div className="bg-blue-50 rounded-xl border border-blue-100 p-4">
              {/* Skill header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <AttributeIcon attribute={cupal.attribute} size={24} />
                  <span className="font-bold text-gray-900">{cupal.skillName}</span>
                </div>
                {cupal.skillCooldown && (
                  <div className="bg-white rounded-lg px-3 py-1 border border-blue-200">
                    <p className="text-xs text-blue-400">쿨다운</p>
                    <p className="text-sm font-semibold text-gray-800">{cupal.skillCooldown}</p>
                  </div>
                )}
              </div>
              {/* Skill description */}
              {cupal.skillDescription && (
                <p className="text-sm text-gray-700 leading-relaxed">{cupal.skillDescription}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Companion Effect (동행효과) */}
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
              <p className="text-sm text-gray-700 leading-relaxed">{cupal.companionEffect}</p>
            </div>
          </div>
        </div>
      )}

      {/* Possession Effect (보유효과) */}
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
