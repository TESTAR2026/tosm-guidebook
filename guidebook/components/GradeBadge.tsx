import { GRADE_STYLES } from "@/lib/constants";

interface GradeBadgeProps {
  grade: string;
}

export function GradeBadge({ grade }: GradeBadgeProps) {
  const style = GRADE_STYLES[grade] || {
    label: grade,
    className: "bg-gray-200 text-gray-700 border border-gray-300",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-bold ${style.className}`}
    >
      {style.label}
    </span>
  );
}
