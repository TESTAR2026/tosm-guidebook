import Link from "next/link";
import { Fellow } from "@/types/fellow";
import { GradeBadge } from "./GradeBadge";
import { LineageBadge } from "./LineageBadge";
import { AttributeBadge } from "./AttributeBadge";

interface FellowCardProps {
  fellow: Fellow;
}

export function FellowCard({ fellow }: FellowCardProps) {
  return (
    <Link href={`/fellows/${fellow.id}`}>
      <div className="bg-white rounded-xl border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer group">
        {/* Image Placeholder */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-40 flex items-center justify-center relative">
          <div className="text-gray-400 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-300 mx-auto mb-2 flex items-center justify-center">
              <span className="text-2xl text-gray-400">?</span>
            </div>
            <span className="text-xs text-gray-400">이미지 준비 중</span>
          </div>
          {/* Grade badge overlay */}
          <div className="absolute top-2 right-2">
            <GradeBadge grade={fellow.grade} />
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
            {fellow.name}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <LineageBadge lineage={fellow.lineage} />
            <AttributeBadge attribute={fellow.attribute} size="sm" />
            <span className="text-xs text-gray-500">{fellow.attribute}</span>
          </div>
          {fellow.class && (
            <p className="text-xs text-gray-400 mt-1.5">{fellow.class}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
