import { Product } from '../../types';

interface ProductQuantityControlsProps {
  product: Product;
  activeQuantity: number;
  onChangeQuantity: (delta: number) => void;
}

export function ProductQuantityControls({
  product,
  activeQuantity,
  onChangeQuantity,
}: ProductQuantityControlsProps) {
  if (product.isMonthly) {
    return (
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={activeQuantity > 0}
          onChange={(e) => onChangeQuantity(e.target.checked ? 1 - activeQuantity : -activeQuantity)}
          className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <span
          style={{
            color: '#1F1F1F',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: '500',
            fontSize: '14px',
            lineHeight: '100%',
          }}
        >
          {product.name}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onChangeQuantity(-1)}
        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors border border-gray-300 rounded"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
        </svg>
      </button>
      <span className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-medium text-gray-900 border-y border-gray-300">
        {activeQuantity}
      </span>
      <button
        type="button"
        onClick={() => onChangeQuantity(1)}
        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors border border-gray-300 rounded"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
