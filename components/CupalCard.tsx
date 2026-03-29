import Link from "next/link";
import { Cupal } from "@/types/cupal";
import { GradeBadge } from "./GradeBadge";
import { AttributeBadge } from "./AttributeBadge";
import { ATTRIBUTE_COLORS } from "@/lib/constants";

interface CupalCardProps {
  cupal: Cupal;
}

export function CupalCard({ cupal }: CupalCardProps) {
  const attrColor = ATTRIBUTE_COLORS[cupal.attribute] || "#9ca3af";

  return (
    <Link href={`/cupals/${cupal.id}`}>
      <div className="bg-white rounded-xl border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer group">
        {/* Attribute color bar */}
        <div className="h-1.5" style={{ backgroundColor: attrColor }} />

        {/* Image Placeholder */}
        <div
          className="h-36 flex items-center justify-center relative"
          style={{ backgroundColor: attrColor + "15" }}
        >
          <div className="text-center">
            <div
              className="w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center"
              style={{ backgroundColor: attrColor + "30", border: `2px solid ${attrColor}50` }}
            >
              <span className="text-2xl" style={{ color: attrColor }}>?</span>
            </div>
            <span className="text-xs text-gray-400">이미지 준비 중</span>
          </div>
          <div className="absolute top-2 right-2">
            <GradeBadge grade={cupal.grade} />
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-amber-600 transition-colors truncate">
            {cupal.name}
          </h3>
          <div className="flex items-center gap-1.5 flex-wrap">
            <AttributeBadge attribute={cupal.attribute} size="sm" />
            <span className="text-xs text-gray-500">{cupal.attribute}</span>
            <span className="text-xs text-gray-300">·</span>
            <span className="text-xs text-gray-400">{cupal.race}</span>
          </div>
          {cupal.passiveBuff && (
            <p className="text-xs text-gray-400 mt-1.5 truncate">{cupal.passiveBuff}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
