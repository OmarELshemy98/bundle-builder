interface ChevronIconProps {
  isExpanded: boolean;
  strokeWidth?: number;
}

export function ChevronIcon({ isExpanded }: ChevronIconProps) {
  return (
    <img
      src={isExpanded ? '/images/icons/carrot-up.png' : '/images/icons/carrot-down.svg'}
      alt={isExpanded ? 'Collapse' : 'Expand'}
      className="w-5 h-5"
    />
  );
}
