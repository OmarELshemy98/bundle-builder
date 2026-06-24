import { useProductVariants } from '../../hooks/useProductVariants';
import { CartItem, Product } from '../../types';
import { formatPrice } from '../../utils/pricing';
import { ProductQuantityControls } from './ProductQuantityControls';
import { ProductSaveBadge } from './ProductSaveBadge';
import { VariantSelector } from './VariantSelector';

interface ProductCardProps {
  product: Product;
  cartItem: CartItem | undefined;
  onUpdate: (updates: Partial<CartItem>) => void;
}

export function ProductCard({ product, cartItem, onUpdate }: ProductCardProps) {
  const { activeQuantity, savePercentage, isSelected, selectVariant, changeQuantity } =
    useProductVariants({ product, cartItem, onUpdate });

  return (
    <div
      className="flex flex-col bg-white rounded-xl p-3 sm:p-4 transition-all border-2"
      style={{ borderColor: isSelected ? '#4E2FD2B2' : 'transparent' }}
    >
      <ProductSaveBadge savePercentage={savePercentage} />

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-shrink-0 w-full sm:w-36 aspect-square bg-white rounded-xl overflow-hidden flex items-center justify-center">
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
              margin: '0',
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
                margin: '0',
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
                cursor: 'pointer',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              Learn More
            </a>
          )}

          <VariantSelector
            product={product}
            activeVariantId={cartItem?.activeVariantId}
            onSelect={selectVariant}
          />

          <div className="flex items-center justify-between mt-auto gap-2">
            <ProductQuantityControls
              product={product}
              activeQuantity={activeQuantity}
              onChangeQuantity={changeQuantity}
            />

            <div className="flex flex-col items-end gap-1 shrink-0">
              <span
                style={{
                  color: '#D8392B',
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {formatPrice(product.price, product.isMonthly)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span
                  style={{
                    color: '#575757',
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontSize: '12px',
                    textDecoration: 'line-through',
                  }}
                >
                  {formatPrice(product.compareAtPrice, product.isMonthly)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
