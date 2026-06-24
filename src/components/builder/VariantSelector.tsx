import { Product } from '../../types';

interface VariantSelectorProps {
  product: Product;
  activeVariantId?: string;
  onSelect: (variantId: string) => void;
}

export function VariantSelector({ product, activeVariantId, onSelect }: VariantSelectorProps) {
  if (product.variants.length === 0) {
    return <div className="h-6" />;
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {product.variants.map((variant) => (
        <button
          key={variant.id}
          type="button"
          onClick={() => onSelect(variant.id)}
          className={`flex items-center gap-1.5 px-2 py-1 rounded border-2 transition-all bg-white ${
            activeVariantId === variant.id
              ? 'border-teal-500 ring-1 ring-teal-500'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="w-6 h-6 rounded overflow-hidden flex items-center justify-center">
            <img src={variant.imageUrl} alt={variant.name} className="w-full h-full object-cover" />
          </div>
          <span
            style={{
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontWeight: '500',
              fontSize: '10px',
              lineHeight: '100%',
              letterSpacing: '0.6px',
              verticalAlign: 'middle',
            }}
          >
            {variant.name}
          </span>
        </button>
      ))}
    </div>
  );
}
