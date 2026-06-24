import { CartItem, Product } from '../../types';
import { ProductCard } from './ProductCard';
import { ProductGrid } from './ProductGrid';
import { StepNextButton } from './StepNextButton';

interface CamerasStepContentProps {
  products: Product[];
  cart: CartItem[];
  onUpdate: (productId: number, updates: Partial<CartItem>) => void;
  onNext: () => void;
  nextLabel: string;
}

export function CamerasStepContent({
  products,
  cart,
  onUpdate,
  onNext,
  nextLabel,
}: CamerasStepContentProps) {
  const mainGrid = products.slice(0, 4);
  const lastProduct = products[4];

  return (
    <>
      <div className="mt-4">
        <ProductGrid products={mainGrid} cart={cart} onUpdate={onUpdate} />
      </div>
      {lastProduct && (
        <div className="flex justify-center mt-4 w-full">
          <div className="w-full md:w-1/2">
            <ProductCard
              product={lastProduct}
              cartItem={cart.find((c) => c.productId === lastProduct.id)}
              onUpdate={(updates) => onUpdate(lastProduct.id, updates)}
            />
          </div>
        </div>
      )}
      <StepNextButton label={nextLabel} onClick={onNext} />
    </>
  );
}
