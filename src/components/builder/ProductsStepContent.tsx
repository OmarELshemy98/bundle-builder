import { CartItem, Product } from '../../types';
import { ProductGrid } from './ProductGrid';
import { StepNextButton } from './StepNextButton';

interface ProductsStepContentProps {
  products: Product[];
  cart: CartItem[];
  onUpdate: (productId: number, updates: Partial<CartItem>) => void;
  onNext?: () => void;
  nextLabel?: string;
  sectionLabel?: string;
}

export function ProductsStepContent({
  products,
  cart,
  onUpdate,
  onNext,
  nextLabel,
  sectionLabel,
}: ProductsStepContentProps) {
  return (
    <div className="mt-4">
      {sectionLabel && <div className="step-text mb-3">{sectionLabel}</div>}
      <ProductGrid products={products} cart={cart} onUpdate={onUpdate} />
      {onNext && nextLabel && <StepNextButton label={nextLabel} onClick={onNext} />}
    </div>
  );
}
