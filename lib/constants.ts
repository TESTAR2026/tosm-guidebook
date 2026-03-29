export const ATTRIBUTE_COLORS: Record<string, string> = {
  불: "#ff0000",
  땅: "#dc6f03",
  전기: "#18bec8",
  얼음: "#0000ff",
  신성: "#3b3b3b",
  어둠: "#6b22b4",
};

export const ATTRIBUTE_BG_CLASSES: Record<string, string> = {
  불: "bg-red-500",
  땅: "bg-yellow-900",
  전기: "bg-yellow-400",
  얼음: "bg-sky-400",
  신성: "bg-amber-400",
  어둠: "bg-violet-700",
};

export const ATTRIBUTE_TEXT_COLORS: Record<string, string> = {
  불: "text-red-600",
  땅: "text-yellow-900",
  전기: "text-yellow-600",
  얼음: "text-sky-500",
  신성: "text-amber-500",
  어둠: "text-violet-700",
};

export const GRADE_STYLES: Record<
  string,
  { label: string; className: string }
> = {
  R: {
    label: "R",
    className: "bg-gray-200 text-gray-700 border border-gray-300",
  },
  SR: {
    label: "SR",
    className: "bg-blue-100 text-blue-700 border border-blue-300",
  },
  UR: {
    label: "UR",
    className: "bg-amber-500 text-white border border-amber-600",
  },
};

export const LINEAGE_STYLES: Record<string, string> = {
  전투: "bg-red-100 text-red-700 border border-red-200",
  사격: "bg-green-100 text-green-700 border border-green-200",
  신앙: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  암살: "bg-purple-100 text-purple-700 border border-purple-200",
  마법: "bg-blue-100 text-blue-700 border border-blue-200",
  가디스: "bg-pink-100 text-pink-700 border border-pink-200",
};

export const SKILL_TYPE_STYLES: Record<string, string> = {
  공격: "bg-red-100 text-red-700 border border-red-200",
  "버프/보조": "bg-teal-100 text-teal-700 border border-teal-200",
};

export const SKILL_LINEAGE_STYLES: Record<string, string> = {
  물리: "bg-orange-100 text-orange-700 border border-orange-200",
  원소: "bg-cyan-100 text-cyan-700 border border-cyan-200",
  정신: "bg-indigo-100 text-indigo-700 border border-indigo-200",
};

export const GRADES = ["R", "SR", "UR"];
export const LINEAGES = ["전투", "사격", "신앙", "암살", "마법", "가디스"];
export const ATTRIBUTES = ["불", "땅", "전기", "얼음", "신성", "어둠"];
