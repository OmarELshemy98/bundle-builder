import { CartItem, SelectedReviewItem } from '../../types';
import { ProductImage } from '../shared/ProductImage';

interface ReviewItemProps {
  item: SelectedReviewItem;
  cart: CartItem[];
  onUpdate: (productId: number, updates: Partial<CartItem>) => void;
}

export function ReviewItem({ item, cart, onUpdate }: ReviewItemProps) {
  const cartItem = cart.find((c) => c.productId === item.product.id);
  const targetVariantId =
    item.variant?.id || cartItem?.activeVariantId || cartItem?.variants[0]?.variantId || 'default';

  const handleLineQuantityChange = (delta: number) => {
    if (!cartItem) return;
    onUpdate(item.product.id, {
      variants: cartItem.variants.map((v) =>
        v.variantId === targetVariantId
          ? { ...v, quantity: Math.max(0, v.quantity + delta) }
          : v
      ),
    });
  };

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <ProductImage
          src={item.variant?.imageUrl || item.product.imageUrl}
          alt={item.product.name}
          className="w-12 h-12 bg-white rounded-md overflow-hidden flex items-center justify-center p-1"
          imageClassName="w-full h-full object-contain scale-110"
        />
        <span
          className="font-medium text-sm leading-5"
          style={{
            color: '#1F1F1F',
            fontFamily: '"Poppins", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          {item.product.name}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center text-gray-600 bg-[#F9F9F7] border border-[#D7D7CF] rounded disabled:opacity-50"
            onClick={() => handleLineQuantityChange(-1)}
            disabled={item.quantity <= 0}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="w-7 h-7 flex items-center justify-center text-sm font-medium text-[#1f1f1f]">
            {item.quantity}
          </span>
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center text-gray-600 bg-[#F9F9F7] border border-[#D7D7CF] rounded"
            onClick={() => handleLineQuantityChange(1)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <div className="text-right">
          {item.product.compareAtPrice && item.product.compareAtPrice > item.product.price && (
            <div
              className="text-sm"
              style={{
                color: '#575757',
                textDecoration: 'line-through',
                fontFamily: '"Poppins", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              ${(item.product.compareAtPrice * item.quantity).toFixed(2)}
            </div>
          )}
          <div
            className="text-lg font-semibold"
            style={{
              color: '#4E2FD2',
              fontFamily: '"Poppins", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            {item.product.price === 0 ? 'FREE' : `$${(item.product.price * item.quantity).toFixed(2)}`}
          </div>
        </div>
      </div>
    </div>
  );
}
