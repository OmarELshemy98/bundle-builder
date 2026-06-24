interface ChevronIconProps {
  isExpanded: boolean;
  strokeWidth?: number;
}

export function ChevronIcon({ isExpanded, strokeWidth = 3 }: ChevronIconProps) {
  return (
    <svg
      className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}
