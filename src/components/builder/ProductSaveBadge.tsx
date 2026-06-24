interface ProductSaveBadgeProps {
  savePercentage: number;
}

export function ProductSaveBadge({ savePercentage }: ProductSaveBadgeProps) {
  if (savePercentage <= 0) return null;

  return (
    <div
      className="self-start px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-3"
      style={{
        backgroundColor: '#4E2FD2',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontWeight: 600,
        fontSize: '12px',
        lineHeight: '100%',
        letterSpacing: '0px',
        textAlign: 'center',
      }}
    >
      {savePercentage === 100 ? 'FREE' : `Save ${savePercentage}%`}
    </div>
  );
}
