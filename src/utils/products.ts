import { products } from '../data';
import { CartItem, Product } from '../types';

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByStep(stepId: number): Product[] {
  return products.filter((p) => p.stepId === stepId);
}

/** Counts distinct products in a step that have any quantity > 0. */
export function getSelectedCount(stepId: number, cart: CartItem[]): number {
  return getProductsByStep(stepId).reduce((count, product) => {
    const cartItem = cart.find((c) => c.productId === product.id);
    const totalQty = cartItem?.variants.reduce((sum, v) => sum + v.quantity, 0) ?? 0;
    return count + (totalQty > 0 ? 1 : 0);
  }, 0);
}

import { ReviewCategory } from '../types';

export function getReviewCategory(stepId: number): ReviewCategory {
  switch (stepId) {
    case 1:
      return 'cameras';
    case 2:
      return 'plan';
    case 3:
      return 'sensors';
    default:
      return 'accessories';
  }
}
