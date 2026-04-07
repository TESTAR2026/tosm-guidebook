import { AttributeIcon } from "./AttributeIcon";

interface AttributeBadgeProps {
  attribute: string;
  size?: "sm" | "md" | "lg";
}

export function AttributeBadge({ attribute, size = "md" }: AttributeBadgeProps) {
  const sizeMap = { sm: 20, md: 28, lg: 36 };
  return (
    <span title={attribute} className="inline-flex items-center justify-center">
      <AttributeIcon attribute={attribute} size={sizeMap[size]} />
    </span>
  );
}
