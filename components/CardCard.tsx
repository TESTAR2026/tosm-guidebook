import { Card } from "@/types/card";
import { AttributeIcon } from "./AttributeIcon";
import { CARD_GRADE_STYLES, ATTRIBUTE_COLORS } from "@/lib/constants";

interface CardCardProps {
  card: Card;
}

export function CardCard({ card }: CardCardProps) {
  const gradeStyle = CARD_GRADE_STYLES[card.grade] || "bg-gray-100 text-gray-700 border border-gray-200";
  const attrColor = ATTRIBUTE_COLORS[card.effectAttribute] || "#9ca3af";
  const hasAttr = !!card.effectAttribute;
  const hasRace = !!card.effectRace;

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="h-1.5" style={{ backgroundColor: hasAttr ? attrColor : "#d1d5db" }} />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-bold text-gray-900 text-sm leading-tight">{card.name}</h3>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${gradeStyle}`}>
            {card.grade}
          </span>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed mb-3">{card.effect}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {hasAttr && <AttributeIcon attribute={card.effectAttribute} size={18} />}
            {hasRace && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                {card.effectRace}
              </span>
            )}
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400">{card.minValue}</span>
            <span className="text-xs text-gray-300 mx-1">→</span>
            <span className="text-xs font-bold text-amber-600">{card.maxValue}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
