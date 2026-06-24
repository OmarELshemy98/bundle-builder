import React from 'react';
import { Product, ProductVariant } from '../types';

interface ReviewItemProps {
  item: {
    id: string;
    product: Product;
    variant?: ProductVariant;
    quantity: number;
    category: 'cameras' | 'sensors' | 'plan';
  };
  cart: any[]; // Adjust type as needed
  handleProductUpdate: (productId: number, updates: any) => void;
}

export const ReviewItem: React.FC<ReviewItemProps> = ({
  item, cart, handleProductUpdate }) => {
  return (
    <div key={item.id} className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-white rounded overflow-hidden flex items-center justify-center p-0.5">
          <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-contain" />
        </div>
        <span className="font-medium text-sm" style={{ color: '#1F1F1F', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
          {item.product.name}
          {item.variant && ` (${item.variant.name})`}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <button
            className="w-7 h-7 flex items-center justify-center text-gray-600 bg-white border border-gray-300 rounded"
            onClick={() => {
              handleProductUpdate(item.product.id, {
                variants: cart.find((c: any) => c.productId === item.product.id)?.variants.map((v: any) =>
                  v.variantId === item.variant?.id ? { ...v, quantity: Math.max(0, v.quantity - 1) } : v
                ) || [],
              });
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="w-7 h-7 flex items-center justify-center text-sm font-medium">{item.quantity}</span>
          <button
            className="w-7 h-7 flex items-center justify-center text-gray-600 bg-white border border-gray-300 rounded"
            onClick={() => {
              const cartItem = cart.find((c: any) => c.productId === item.product.id);
              if (!cartItem) return;
              handleProductUpdate(item.product.id, {
                variants: cartItem.variants.map((v: any) =>
                  v.variantId === item.variant?.id ? { ...v, quantity: v.quantity + 1 } : v
                ),
              });
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <div className="text-right">
          {item.product.compareAtPrice && item.product.compareAtPrice > item.product.price && (
            <div className="text-sm" style={{ color: '#575757', textDecoration: 'line-through', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              ${(item.product.compareAtPrice * item.quantity).toFixed(2)}
            </div>
          )}
          <div className="text-lg font-bold" style={{ color: '#D8392B', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            {item.product.price === 0 ? 'FREE' : `$${(item.product.price * item.quantity).toFixed(2)}`}
          </div>
        </div>
      </div>
    </div>
  );
};
