import { Product } from '../types';

export function getSavePercentage(product: Product): number {
  if (product.price === 0 && product.compareAtPrice && product.compareAtPrice > 0) {
    return 100;
  }
  if (!product.compareAtPrice || product.compareAtPrice <= product.price) {
    return 0;
  }
  return Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100);
}

export function formatPrice(amount: number, isMonthly = false): string {
  const suffix = isMonthly ? '/mo' : '';
  return amount === 0 ? 'FREE' : `$${amount.toFixed(2)}${suffix}`;
}
