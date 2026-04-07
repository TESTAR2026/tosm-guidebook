import { notFound } from "next/navigation";
import fieldBossData from "@/data/bosses-field.json";
import { FieldBoss } from "@/types/boss";
import { AttributeIcon } from "@/components/AttributeIcon";
import { ATTRIBUTE_COLORS } from "@/lib/constants";

const bosses = fieldBossData as FieldBoss[];

interface PageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return bosses.map((b) => ({ id: b.id }));
}

export default function FieldBossDetailPage({ params }: PageProps) {
  const boss = bosses.find((b) => b.id === params.id);
  if (!boss) notFound();

  const attrColor = ATTRIBUTE_COLORS[boss.attribute] || "#9ca3af";

  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-gray-400 mb-6">
        <a href="/bosses" className="hover:text-gray-600">보스</a>
        <span>/</span>
        <a href="/bosses/field" className="hover:text-gray-600">필드 보스</a>
        <span>/</span>
        <span className="text-gray-700 font-medium truncate">{boss.name}</span>
      </div>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-5 shadow-sm">
        <div className="h-2" style={{ backgroundColor: attrColor }} />
        <div className="p-6">
          <div className="flex gap-5">
            <div
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl flex-shrink-0 flex items-center justify-center"
              style={{ backgroundColor: attrColor + "20", border: `2px solid ${attrColor}40` }}
            >
              <AttributeIcon attribute={boss.attribute} size={48} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                  Ep.{boss.episode}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
                  {boss.race}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 leading-tight">
                {boss.name}
              </h1>
              <p className="text-sm text-gray-400 mb-2">{boss.mapName} · Lv.{boss.bossLevel}</p>
              <div className="flex items-center gap-2">
                <AttributeIcon attribute={boss.attribute} size={22} />
                <span className="text-sm font-semibold" style={{ color: attrColor }}>
                  {boss.attribute} 속성
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Info */}
      {boss.mapDescription && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-5 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-gray-400 inline-block" />
              맵 정보
            </h2>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-4 mb-3 text-sm">
              <span className="text-gray-500">맵 레벨 <span className="font-bold text-gray-800">Lv.{boss.mapLevel}</span></span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">보스 레벨 <span className="font-bold text-gray-800">Lv.{boss.bossLevel}</span></span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{boss.mapDescription}</p>
          </div>
        </div>
      )}

      {/* Skills */}
      {boss.skills.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-5 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-red-400 inline-block" />
              스킬
            </h2>
          </div>
          <div className="p-4 space-y-2">
            {boss.skills.map((skill, i) => (
              <div key={i} className="bg-gray-50 rounded-lg border border-gray-200 p-3">
                <p className="text-sm font-semibold text-gray-800 mb-0.5">{skill.name}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
