interface AttributeIconProps {
  attribute: string;
  size?: number;
}

const ICONS: Record<string, { bg: string; accent?: string; symbol: React.ReactNode }> = {
  불: {
    bg: "#ff0000",
    symbol: (
      <g>
        {/* Flame */}
        <path d="M16 6 C16 6 14 10 15 13 C13 11 13 8 13 8 C11 10 10 14 12 18 C10 17 9 15 9 15 C9 18 11 22 16 23 C21 22 23 18 23 15 C23 15 22 17 20 18 C22 14 21 10 19 8 C19 8 19 11 17 13 C18 10 16 6 16 6Z" fill="white" />
      </g>
    ),
  },
  땅: {
    bg: "#dc6f03",
    symbol: (
      <g>
        {/* Swirl/Earth spiral */}
        <path d="M16 8 C20.4 8 24 11.6 24 16 C24 20.4 20.4 24 16 24 C11.6 24 8 20.4 8 16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M16 11 C18.8 11 21 13.2 21 16 C21 18.8 18.8 21 16 21 C13.2 21 11 18.8 11 16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="2" fill="white" />
      </g>
    ),
  },
  전기: {
    bg: "#18bec8",
    symbol: (
      <g>
        {/* Lightning bolt */}
        <polygon points="18,7 12,17 15.5,17 14,25 20,15 16.5,15" fill="white" />
      </g>
    ),
  },
  얼음: {
    bg: "#0000ff",
    symbol: (
      <g>
        {/* Snowflake */}
        <line x1="16" y1="7" x2="16" y2="25" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="7" y1="16" x2="25" y2="16" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="9.5" y1="9.5" x2="22.5" y2="22.5" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="22.5" y1="9.5" x2="9.5" y2="22.5" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
        {/* Tips */}
        <line x1="13" y1="10" x2="16" y2="7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="19" y1="10" x2="16" y2="7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="13" y1="22" x2="16" y2="25" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="19" y1="22" x2="16" y2="25" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    ),
  },
  신성: {
    bg: "#3b3b3b",
    accent: "#ffff8b",
    symbol: (
      <g>
        {/* Crosshair with cross */}
        <circle cx="16" cy="16" r="5" fill="none" stroke="#ffff8b" strokeWidth="2"/>
        <line x1="16" y1="8" x2="16" y2="12" stroke="#ffff8b" strokeWidth="2" strokeLinecap="round"/>
        <line x1="16" y1="20" x2="16" y2="24" stroke="#ffff8b" strokeWidth="2" strokeLinecap="round"/>
        <line x1="8" y1="16" x2="12" y2="16" stroke="#ffff8b" strokeWidth="2" strokeLinecap="round"/>
        <line x1="20" y1="16" x2="24" y2="16" stroke="#ffff8b" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="2" fill="#ffff8b"/>
      </g>
    ),
  },
  어둠: {
    bg: "#6b22b4",
    symbol: (
      <g>
        {/* Eye */}
        <ellipse cx="16" cy="16" rx="8" ry="5" fill="none" stroke="white" strokeWidth="2"/>
        <circle cx="16" cy="16" r="3" fill="white"/>
        <circle cx="16" cy="16" r="1.5" fill="#6b22b4"/>
        {/* Lashes */}
        <line x1="16" y1="9" x2="16" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="20" y1="10.5" x2="19" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="12" y1="10.5" x2="13" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    ),
  },
  무속성: {
    bg: "#555555",
    symbol: (
      <text x="16" y="21" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" fontFamily="sans-serif">무</text>
    ),
  },
};

export function AttributeIcon({ attribute, size = 32 }: AttributeIconProps) {
  const icon = ICONS[attribute];
  if (!icon) {
    // fallback: white circle (no attribute / empty)
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="15" fill="white" stroke="#d1d5db" strokeWidth="1.5"/>
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background only, no border */}
      <circle cx="16" cy="16" r="15" fill={icon.bg} />
      {/* Symbol */}
      {icon.symbol}
    </svg>
  );
}
