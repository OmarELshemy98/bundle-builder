import { CartItem } from '../types';

export const initialCart: CartItem[] = [
  { productId: 1, activeVariantId: 'white', variants: [{ variantId: 'white', quantity: 1 }] },
  { productId: 2, activeVariantId: 'white', variants: [{ variantId: 'white', quantity: 2 }] },
  { productId: 6, activeVariantId: 'white', variants: [{ variantId: 'white', quantity: 2 }] },
  { productId: 7, activeVariantId: 'white', variants: [{ variantId: 'white', quantity: 1 }] },
  { productId: 8, activeVariantId: 'default', variants: [{ variantId: 'default', quantity: 2 }] },
  { productId: 9, activeVariantId: 'default', variants: [{ variantId: 'default', quantity: 1 }] },
];
