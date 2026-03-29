"use client";

import { Input } from "@/components/ui/input";
import { GRADES, LINEAGES, ATTRIBUTES, LINEAGE_STYLES, GRADE_STYLES } from "@/lib/constants";
import { AttributeIcon } from "./AttributeIcon";

interface FellowsFilterProps {
  search: string; setSearch: (v: string) => void;
  grade: string; setGrade: (v: string) => void;
  lineage: string; setLineage: (v: string) => void;
  attribute: string; setAttribute: (v: string) => void;
}

export function FellowsFilter({ search, setSearch, grade, setGrade, lineage, setLineage, attribute, setAttribute }: FellowsFilterProps) {
  const toggle = (current: string, value: string, setter: (v: string) => void) => {
    setter(current === value ? "" : value);
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="펠로우 이름 검색..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium text-gray-500 w-10">등급</span>
        {GRADES.map((g) => (
          <button
            key={g}
            onClick={() => toggle(grade, g, setGrade)}
            className={`h-7 px-3 rounded-full text-xs font-bold transition-all ${
              grade === g
                ? GRADE_STYLES[g]?.className + " ring-2 ring-inset ring-amber-400"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium text-gray-500 w-10">계열</span>
        {LINEAGES.map((l) => (
          <button
            key={l}
            onClick={() => toggle(lineage, l, setLineage)}
            className={`h-7 px-3 rounded-full text-xs font-semibold transition-all ${
              lineage === l
                ? (LINEAGE_STYLES[l] || "bg-gray-200 text-gray-700") + " ring-2 ring-inset ring-amber-400"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium text-gray-500 w-10">속성</span>
        {ATTRIBUTES.map((a) => (
          <button
            key={a}
            onClick={() => toggle(attribute, a, setAttribute)}
            className={`h-7 flex items-center gap-1.5 px-2.5 rounded-full text-xs font-semibold transition-all ${
              attribute === a
                ? "bg-gray-200 ring-2 ring-inset ring-amber-400"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <AttributeIcon attribute={a} size={18} />
            <span>{a}</span>
          </button>
        ))}
      </div>

      {(search || grade || lineage || attribute) && (
        <button
          onClick={() => { setSearch(""); setGrade(""); setLineage(""); setAttribute(""); }}
          className="text-xs text-gray-400 hover:text-gray-600 underline"
        >
          필터 초기화
        </button>
      )}
    </div>
  );
}
