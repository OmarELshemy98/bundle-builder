import { useMemo } from 'react';

import { CartItem, SelectedReviewItem } from '../types';
import { getProductById, getReviewCategory } from '../utils/products';

export function useBundleCalculations(cart: CartItem[]) {
  const selectedItems = useMemo(() => {
    const items: SelectedReviewItem[] = [];

    cart.forEach((cartItem) => {
      const product = getProductById(cartItem.productId);
      if (!product) return;

      cartItem.variants.forEach((variantCart) => {
        if (variantCart.quantity <= 0) return;

        const variant = product.variants.find((v) => v.id === variantCart.variantId);
        items.push({
          id: `${product.id}-${variantCart.variantId}`,
          product,
          variant,
          quantity: variantCart.quantity,
          category: getReviewCategory(product.stepId),
        });
      });
    });

    return items;
  }, [cart]);

  const totals = useMemo(() => {
    let subtotal = 0;
    let compareAtSubtotal = 0;

    selectedItems.forEach((item) => {
      subtotal += item.product.price * item.quantity;
      compareAtSubtotal += (item.product.compareAtPrice ?? item.product.price) * item.quantity;
    });

    return {
      subtotal,
      compareAtSubtotal,
      savings: compareAtSubtotal - subtotal,
    };
  }, [selectedItems]);

  const grouped = useMemo(
    () => ({
      cameras: selectedItems.filter((i) => i.category === 'cameras'),
      sensors: selectedItems.filter((i) => i.category === 'sensors'),
      plan: selectedItems.filter((i) => i.category === 'plan'),
      accessories: selectedItems.filter((i) => i.category === 'accessories'),
    }),
    [selectedItems]
  );

  return {
    selectedItems,
    hasSelectedItems: selectedItems.length > 0,
    ...totals,
    ...grouped,
  };
}
