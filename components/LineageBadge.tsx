import { LINEAGE_STYLES } from "@/lib/constants";

interface LineageBadgeProps {
  lineage: string;
}

export function LineageBadge({ lineage }: LineageBadgeProps) {
  const className =
    LINEAGE_STYLES[lineage] ||
    "bg-gray-100 text-gray-700 border border-gray-200";

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}
    >
      {lineage}
    </span>
  );
}
