import { ATTRIBUTE_COLORS } from "@/lib/constants";

interface AttributeBadgeProps {
  attribute: string;
  size?: "sm" | "md" | "lg";
}

export function AttributeBadge({ attribute, size = "md" }: AttributeBadgeProps) {
  const color = ATTRIBUTE_COLORS[attribute] || "#9ca3af";

  const sizeClasses = {
    sm: "w-5 h-5 text-[9px]",
    md: "w-7 h-7 text-xs",
    lg: "w-9 h-9 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-bold text-white ${sizeClasses[size]}`}
      style={{ backgroundColor: color }}
      title={attribute}
    >
      {attribute.charAt(0)}
    </span>
  );
}
