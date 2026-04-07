import Link from "next/link";
import { FieldBoss } from "@/types/boss";
import { AttributeIcon } from "./AttributeIcon";
import { ATTRIBUTE_COLORS } from "@/lib/constants";

interface FieldBossCardProps {
  boss: FieldBoss;
}

export function FieldBossCard({ boss }: FieldBossCardProps) {
  const attrColor = ATTRIBUTE_COLORS[boss.attribute] || "#9ca3af";

  return (
    <Link href={`/bosses/field/${boss.id}`}>
      <div className="bg-white rounded-xl border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer group">
        <div className="h-1.5" style={{ backgroundColor: attrColor }} />
        <div className="p-4">
          {/* Episode + Map */}
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
              Ep.{boss.episode}
            </span>
            <span className="text-xs text-gray-400 truncate">{boss.mapName}</span>
          </div>

          {/* Boss name */}
          <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-amber-600 transition-colors leading-tight line-clamp-2">
            {boss.name}
          </h3>

          {/* Attribute + Race + Level */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-1.5">
              <AttributeIcon attribute={boss.attribute} size={18} />
              <span className="text-xs text-gray-500">{boss.race}</span>
            </div>
            <span className="text-xs text-gray-400">Lv.{boss.bossLevel}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
