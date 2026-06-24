interface ReviewFooterProps {
  subtotal: number;
  compareAtSubtotal: number;
  savings: number;
}

export function ReviewFooter({ subtotal, compareAtSubtotal, savings }: ReviewFooterProps) {
  return (
    <div className="mt-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
      <div className="w-20 h-20 mx-auto sm:mx-0 rounded-full bg-[#4E2FD2] text-white text-[10px] leading-[1.15] font-medium flex items-center justify-center text-center px-2 rotate-[-12deg]">
        100%
        <br />
        Wyze satisfaction guarantee
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-end justify-between mb-1.5 gap-2">
          <div className="badge">as low as $19.19/mo</div>
          <div className="flex items-baseline gap-1.5 shrink-0">
            {compareAtSubtotal > subtotal && (
              <span className="price-total-strikethrough whitespace-nowrap">
                ${compareAtSubtotal.toFixed(2)}
              </span>
            )}
            <span className="price-total whitespace-nowrap">${subtotal.toFixed(2)}</span>
          </div>
        </div>
        <div className="savings-text text-center mb-2.5">
          Congrats! You're saving ${Math.max(0, savings).toFixed(2)} on your security bundle!
        </div>
        <button type="button" className="checkout-button">
          Checkout
        </button>
        <div
          className="save-system-link text-center mt-3"
          onClick={() => alert('System saved to localStorage!')}
        >
          Save my system for later
        </div>
      </div>
    </div>
  );
}
