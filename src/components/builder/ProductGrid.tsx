import { CartItem, Product } from '../../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  cart: CartItem[];
  onUpdate: (productId: number, updates: Partial<CartItem>) => void;
}

export function ProductGrid({ products, cart, onUpdate }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          cartItem={cart.find((c) => c.productId === product.id)}
          onUpdate={(updates) => onUpdate(product.id, updates)}
        />
      ))}
    </div>
  );
}
