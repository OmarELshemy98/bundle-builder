import { CartItem, Product } from '../types';

export function updateCartItem(
  cart: CartItem[],
  productId: number,
  updates: Partial<CartItem>
): CartItem[] {
  const idx = cart.findIndex((item) => item.productId === productId);

  if (idx >= 0) {
    const updated = [...cart];
    updated[idx] = { ...updated[idx], ...updates };
    return updated;
  }

  if (updates.productId && updates.variants) {
    return [
      ...cart,
      {
        productId,
        activeVariantId: updates.activeVariantId,
        variants: updates.variants,
      },
    ];
  }

  return cart;
}

export function getDefaultVariantId(product: Product): string {
  return product.variants.length > 0 ? product.variants[0].id : 'default';
}

export function adjustVariantQuantity(
  cartItem: CartItem,
  product: Product,
  delta: number
): CartItem['variants'] {
  const targetVariantId =
    cartItem.activeVariantId ?? getDefaultVariantId(product);

  const updatedVariants = [...cartItem.variants];
  const existingIndex = updatedVariants.findIndex((v) => v.variantId === targetVariantId);

  if (existingIndex >= 0) {
    updatedVariants[existingIndex] = {
      ...updatedVariants[existingIndex],
      quantity: Math.max(0, updatedVariants[existingIndex].quantity + delta),
    };
  } else {
    updatedVariants.push({ variantId: targetVariantId, quantity: Math.max(0, delta) });
  }

  return updatedVariants;
}
