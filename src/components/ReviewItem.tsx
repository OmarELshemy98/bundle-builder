import React from 'react';
import { Product, ProductVariant, CartItem } from '../types';

const REVIEW_IMAGE_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 44 44'%3E%3Crect width='44' height='44' rx='8' fill='%23f6f7fb'/%3E%3Crect x='10' y='10' width='24' height='24' rx='4' fill='%23e8ebf4'/%3E%3C/svg%3E";

interface ReviewItemProps {
  item: {
    id: string;
    product: Product;
    variant?: ProductVariant;
    quantity: number;
    category: string;
  };
  cart: CartItem[];
  handleProductUpdate: (productId: number, updates: Partial<CartItem>) => void;
}

export const ReviewItem: React.FC<ReviewItemProps> = ({
  item, cart, handleProductUpdate }) => {
  const cartItem = cart.find((c) => c.productId === item.product.id);
  const targetVariantId =
    item.variant?.id || cartItem?.activeVariantId || cartItem?.variants[0]?.variantId || 'default';

  const handleLineQuantityChange = (delta: number) => {
    if (!cartItem) return;
    handleProductUpdate(item.product.id, {
      variants: cartItem.variants.map((v) =>
        v.variantId === targetVariantId
          ? { ...v, quantity: Math.max(0, v.quantity + delta) }
          : v
      ),
    });
  };

  return (
    <div className="review-item-row">
      <div className="review-item-left">
        <div className="review-item-thumb">
          <img
            src={item.variant?.imageUrl || item.product.imageUrl}
            alt={item.product.name}
            className="w-full h-full object-contain scale-110"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = REVIEW_IMAGE_FALLBACK;
            }}
          />
        </div>
        <span className="review-item-name truncate">{item.product.name}</span>
      </div>
      <div className="review-item-right">
        <div className="flex items-center gap-0.5 sm:gap-1">
          <button
            type="button"
            className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-gray-600 bg-[#F9F9F7] border border-[#D7D7CF] rounded disabled:opacity-50"
            onClick={() => handleLineQuantityChange(-1)}
            disabled={item.quantity <= 0}
            aria-label="Decrease quantity"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-xs sm:text-sm font-medium text-[#1f1f1f]">
            {item.quantity}
          </span>
          <button
            type="button"
            className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-gray-600 bg-[#F9F9F7] border border-[#D7D7CF] rounded"
            onClick={() => handleLineQuantityChange(1)}
            aria-label="Increase quantity"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <div className="text-right min-w-[52px] sm:min-w-[64px]">
          {item.product.compareAtPrice && item.product.compareAtPrice > item.product.price && (
            <div className="price-strikethrough">
              ${(item.product.compareAtPrice * item.quantity).toFixed(2)}
            </div>
          )}
          <div className="price-main">
            {item.product.price === 0 ? 'FREE' : `$${(item.product.price * item.quantity).toFixed(2)}`}
          </div>
        </div>
      </div>
    </div>
  );
};
