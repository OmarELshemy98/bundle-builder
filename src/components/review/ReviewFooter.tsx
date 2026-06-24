interface ReviewFooterProps {
  subtotal: number;
  compareAtSubtotal: number;
  savings: number;
}

export function ReviewFooter({ subtotal, compareAtSubtotal, savings }: ReviewFooterProps) {
  // Calculate savings amount (ensure it's not negative)
  const savingsAmount = Math.max(0, savings);

  return (
    <div className="mt-5">
      {/* Top section: Satisfaction badge + price info */}
      <div className="flex items-end justify-between gap-3">
        <div className="w-20 h-20 flex items-center justify-center flex-shrink-0">
          <img
            src="/images/icons/satisfaction-badge.jpg"
            alt="100% Wyze satisfaction guarantee"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="badge">as low as $19.19/mo</div>
          <div className="flex items-baseline gap-1.5">
            {compareAtSubtotal > subtotal && (
              <span className="price-total-strikethrough whitespace-nowrap">
                ${compareAtSubtotal.toFixed(2)}
              </span>
            )}
            <span className="price-total whitespace-nowrap">${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Savings text */}
      <div className="savings-text text-center mt-2 mb-2.5">
        Congrats! You're saving ${savingsAmount.toFixed(2)} on your security bundle!
      </div>

      {/* Checkout button */}
      <button type="button" className="checkout-button">
        Checkout
      </button>

      {/* Save for later link */}
      <div
        className="save-system-link text-center mt-3"
        onClick={() => alert('System saved to localStorage!')}
      >
        Save my system for later
      </div>
    </div>
  );
}
