import React from 'react';
import { Product, CartItem, ProductVariant } from '../types';

interface ProductCardProps {
  product: Product;
  cartItem: CartItem | undefined;
  onUpdate: (updates: Partial<CartItem>) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  cartItem,
  onUpdate,
}) => {
  const getTotalQuantity = () => {
    if (!cartItem) return 0;
    return cartItem.variants.reduce((total, v) => total + v.quantity, 0);
  };

  const getActiveVariant = (): ProductVariant | undefined => {
    if (!cartItem?.activeVariantId && product.variants.length > 0) {
      return product.variants[0];
    }
    return product.variants.find((v) => v.id === cartItem?.activeVariantId);
  };

  const getActiveVariantQuantity = () => {
    if (!cartItem) return 0;
    const activeVariant = getActiveVariant();
    if (!activeVariant) return cartItem.variants[0]?.quantity || 0;
    const variantCart = cartItem.variants.find((v) => v.variantId === activeVariant.id);
    return variantCart?.quantity || 0;
  };

  const totalQuantity = getTotalQuantity();
  const activeQuantity = getActiveVariantQuantity();

  const handleVariantChange = (variantId: string) => {
    onUpdate({ activeVariantId: variantId });
  };

  const handleQuantityChange = (delta: number) => {
    if (!cartItem) {
      const initialVariantId = product.variants.length > 0 ? product.variants[0].id : 'default';
      onUpdate({
        productId: product.id,
        activeVariantId: initialVariantId,
        variants: [{ variantId: initialVariantId, quantity: Math.max(0, delta) }],
      });
      return;
    }

    const targetVariantId = cartItem.activeVariantId || (product.variants.length > 0 ? product.variants[0].id : 'default');
    const updatedVariants = [...cartItem.variants];
    const existingVariantIndex = updatedVariants.findIndex((v) => v.variantId === targetVariantId);

    if (existingVariantIndex >= 0) {
      updatedVariants[existingVariantIndex] = {
        ...updatedVariants[existingVariantIndex],
        quantity: Math.max(0, updatedVariants[existingVariantIndex].quantity + delta),
      };
    } else {
      updatedVariants.push({ variantId: targetVariantId, quantity: Math.max(0, delta) });
    }

    onUpdate({
      ...cartItem,
      variants: updatedVariants,
    });
  };

  return (
    <div
      className={`relative bg-white rounded-xl p-4 transition-all border-2 ${
        totalQuantity > 0
          ? 'border-indigo-600 ring-2 ring-indigo-200'
          : 'border-transparent hover:border-gray-200'
      }`}
    >
      {product.badge && (
        <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {product.badge}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-shrink-0 w-full md:w-28 aspect-square bg-white rounded-xl overflow-hidden flex items-center justify-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
          {product.description && (
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
          )}
          
          {product.learnMoreUrl && (
            <a 
              href={product.learnMoreUrl} 
              target="_blank" 
              rel="noreferrer"
              className="text-sm text-indigo-600 font-medium underline mb-3 inline-block"
              onClick={(e) => e.stopPropagation()}
            >
              Learn More
            </a>
          )}

          {product.variants.length > 0 && (
            <div className="flex items-center gap-2 mb-3">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => handleVariantChange(variant.id)}
                  className={`relative w-10 h-10 rounded border-2 flex items-center justify-center overflow-hidden transition-all bg-white ${
                    cartItem?.activeVariantId === variant.id
                      ? 'border-teal-500 ring-1 ring-teal-500'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={variant.imageUrl}
                    alt={variant.name}
                    className="w-full h-full object-cover p-0.5"
                  />
                  {cartItem?.activeVariantId === variant.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-teal-500/30">
                      <svg className="w-5 h-5 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                </svg>
              </button>
              <span className="w-10 h-8 flex items-center justify-center font-medium text-gray-900">
                {activeQuantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-red-500">${product.price.toFixed(2)}</span>
              {product.compareAtPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
