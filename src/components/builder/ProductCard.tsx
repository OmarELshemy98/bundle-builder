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

// Card styles (moved to variables to make the JSX cleaner)
const titleStyle = {
  color: '#1F1F1F',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontWeight: '600',
  fontSize: '15px',
  lineHeight: '100%',
  letterSpacing: '0.6px',
  margin: 0,
};

const descriptionStyle = {
  color: 'rgba(31, 31, 31, 0.75)',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontWeight: '500',
  fontSize: '11px',
  lineHeight: '130%',
  letterSpacing: '0.6px',
  margin: 0,
};

const linkStyle = {
  color: '#0000EE',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontWeight: '500',
  fontSize: '11px',
  lineHeight: '100%',
  letterSpacing: '0.6px',
  textDecoration: 'underline',
  cursor: 'pointer',
};

const originalPriceStyle = {
  color: '#D8392B',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '12px',
  textDecoration: 'line-through',
};

const salePriceStyle = {
  color: '#575757',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '16px',
  fontWeight: '600',
};

export function ProductCard({ product, cartItem, onUpdate }: ProductCardProps) {
  const {
    activeQuantity,
    savePercentage,
    isSelected,
    selectVariant,
    changeQuantity,
  } = useProductVariants({ product, cartItem, onUpdate });

  const borderColor = isSelected ? '#4E2FD2B2' : 'transparent';

  return (
    <div
      className="flex flex-col bg-white rounded-xl p-3 sm:p-4 transition-all border-2"
      style={{ borderColor }}
    >
      <div className="flex gap-3 sm:gap-4">
        {/* Left column: Discount badge and product image */}
        <div className="flex flex-col gap-2">
          <ProductSaveBadge savePercentage={savePercentage} />
          <div className="flex-shrink-0 w-full sm:w-36 aspect-square bg-white rounded-xl overflow-hidden flex items-center justify-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain scale-110"
            />
          </div>
        </div>

        {/* Right column: Product details, variants, and controls */}
        <div className="flex-1 flex flex-col gap-2">
          <h3 style={titleStyle}>{product.name}</h3>

          {product.description && (
            <p style={descriptionStyle}>{product.description}</p>
          )}

          {product.learnMoreUrl && (
            <a
              href={product.learnMoreUrl}
              target="_blank"
              rel="noreferrer"
              style={linkStyle}
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
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span style={originalPriceStyle}>
                  {formatPrice(product.compareAtPrice, product.isMonthly)}
                </span>
              )}
              <span style={salePriceStyle}>
                {formatPrice(product.price, product.isMonthly)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
