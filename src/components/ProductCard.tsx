import React from 'react';
import { Product, CartItem } from '../types';

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
  const totalQuantity = cartItem ? cartItem.variants.reduce((sum, v) => sum + v.quantity, 0) : 0;
  const isSelected = totalQuantity > 0;

  const getActiveVariant = () => {
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

  const getSavePercentage = () => {
    if (product.price === 0 && product.compareAtPrice && product.compareAtPrice > 0) return 100; // For FREE items
    if (!product.compareAtPrice || product.compareAtPrice <= product.price) return 0;
    return Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100);
  };

  const activeQuantity = getActiveVariantQuantity();
  const savePercentage = getSavePercentage();

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
      className="flex flex-col bg-white rounded-xl p-3 sm:p-4 transition-all border-2"
      style={{ borderColor: isSelected ? '#4E2FD2B2' : 'transparent' }}
    >
      {savePercentage > 0 && (
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
            textAlign: 'center'
          }}
        >
          {savePercentage === 100 ? 'FREE' : `Save ${savePercentage}%`}
        </div>
      )}

      <div className="flex flex-row gap-3 sm:gap-4">
        <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 xl:w-36 xl:h-36 bg-white rounded-xl overflow-hidden flex items-center justify-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain scale-110"
          />
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <h3
            style={{
              color: '#1F1F1F',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontWeight: '600',
              fontSize: '15px',
              lineHeight: '100%',
              letterSpacing: '0.6px',
              verticalAlign: 'middle',
              margin: '0'
            }}
          >
            {product.name}
          </h3>

          {product.description && (
            <p
              style={{
                color: '#1F1F1FBF',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: '500',
                fontSize: '11px',
                lineHeight: '130%',
                letterSpacing: '0.6px',
                verticalAlign: 'middle',
                margin: '0'
              }}
            >
              {product.description}
            </p>
          )}

          {product.learnMoreUrl && (
            <a
              href={product.learnMoreUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                color: '#0000EE',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: '500',
                fontSize: '11px',
                lineHeight: '100%',
                letterSpacing: '0.6px',
                verticalAlign: 'middle',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              Learn More
            </a>
          )}

          {product.variants.length > 0 ? (
            <div className="flex items-center gap-2 flex-wrap">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => handleVariantChange(variant.id)}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded border-2 transition-all bg-white ${
                    cartItem?.activeVariantId === variant.id
                      ? 'border-teal-500 ring-1 ring-teal-500'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="w-6 h-6 rounded overflow-hidden flex items-center justify-center">
                    <img
                      src={variant.imageUrl}
                      alt={variant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontWeight: '500',
                      fontSize: '10px',
                      lineHeight: '100%',
                      letterSpacing: '0.6px',
                      verticalAlign: 'middle'
                    }}
                  >
                    {variant.name}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            // Empty div to maintain spacing
            <div className="h-6" />
          )}

          <div className="flex items-center justify-between mt-auto gap-2">
            {product.isMonthly ? (
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={activeQuantity > 0}
                  onChange={(e) => handleQuantityChange(e.target.checked ? 1 - activeQuantity : -activeQuantity)}
                  className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span
                  style={{
                    color: '#1F1F1F',
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontWeight: '500',
                    fontSize: '14px',
                    lineHeight: '100%'
                  }}
                >
                  {product.name}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleQuantityChange(-1)}
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
                  onClick={() => handleQuantityChange(1)}
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors border border-gray-300 rounded"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            )}

            <div className="flex flex-col items-end gap-1 shrink-0">
              <span
                style={{
                  color: '#D8392B',
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                {product.price === 0 ? 'FREE' : `$${product.price.toFixed(2)}${product.isMonthly ? '/mo' : ''}`}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span
                  style={{
                    color: '#575757',
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontSize: '12px',
                    textDecoration: 'line-through'
                  }}
                >
                  ${product.compareAtPrice.toFixed(2)}${product.isMonthly ? '/mo' : ''}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
