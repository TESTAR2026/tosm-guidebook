"use client";

import { Input } from "@/components/ui/input";
import { GRADES, ATTRIBUTES, GRADE_STYLES, CUPAL_PASSIVE_TYPES, CUPAL_PASSIVE_STYLES, CUPAL_RACES } from "@/lib/constants";
import { AttributeIcon } from "./AttributeIcon";

interface CupalsFilterProps {
  search: string; setSearch: (v: string) => void;
  grade: string; setGrade: (v: string) => void;
  attribute: string; setAttribute: (v: string) => void;
  passiveType: string; setPassiveType: (v: string) => void;
  race: string; setRace: (v: string) => void;
}

export function CupalsFilter({
  search, setSearch,
  grade, setGrade,
  attribute, setAttribute,
  passiveType, setPassiveType,
  race, setRace,
}: CupalsFilterProps) {
  const toggle = (current: string, value: string, setter: (v: string) => void) => {
    setter(current === value ? "" : value);
  };

  const hasFilter = search || grade || attribute || passiveType || race;

  return (
    <div className="space-y-4">
      <Input
        placeholder="큐폴 이름 검색..."
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
        <span className="text-sm font-medium text-gray-500 w-10">패시브</span>
        {CUPAL_PASSIVE_TYPES.map((p) => (
          <button
            key={p}
            onClick={() => toggle(passiveType, p, setPassiveType)}
            className={`h-7 px-3 rounded-full text-xs font-bold transition-all ${
              passiveType === p
                ? (CUPAL_PASSIVE_STYLES[p] || "bg-gray-200 text-gray-700") + " ring-2 ring-inset ring-amber-400"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {p}
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

      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium text-gray-500 w-10">종족</span>
        {CUPAL_RACES.map((r) => (
          <button
            key={r}
            onClick={() => toggle(race, r, setRace)}
            className={`h-7 px-3 rounded-full text-xs font-semibold transition-all ${
              race === r
                ? "bg-purple-100 text-purple-700 border border-purple-200 ring-2 ring-inset ring-amber-400"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {hasFilter && (
        <button
          onClick={() => { setSearch(""); setGrade(""); setAttribute(""); setPassiveType(""); setRace(""); }}
          className="text-xs text-gray-400 hover:text-gray-600 underline"
        >
          필터 초기화
        </button>
      )}
    </div>
  );
}
