import { useCallback, useMemo } from 'react';

import { CartItem, Product } from '../types';
import { adjustVariantQuantity, getDefaultVariantId } from '../utils/cart';
import { getSavePercentage } from '../utils/pricing';

interface UseProductVariantsOptions {
  product: Product;
  cartItem: CartItem | undefined;
  onUpdate: (updates: Partial<CartItem>) => void;
}

export function useProductVariants({ product, cartItem, onUpdate }: UseProductVariantsOptions) {
  const totalQuantity = useMemo(
    () => cartItem?.variants.reduce((sum, v) => sum + v.quantity, 0) ?? 0,
    [cartItem]
  );

  const activeVariant = useMemo(() => {
    if (!cartItem?.activeVariantId && product.variants.length > 0) {
      return product.variants[0];
    }
    return product.variants.find((v) => v.id === cartItem?.activeVariantId);
  }, [cartItem, product.variants]);

  const activeQuantity = useMemo(() => {
    if (!cartItem) return 0;
    if (!activeVariant) return cartItem.variants[0]?.quantity ?? 0;
    return cartItem.variants.find((v) => v.variantId === activeVariant.id)?.quantity ?? 0;
  }, [cartItem, activeVariant]);

  const savePercentage = getSavePercentage(product);
  const isSelected = totalQuantity > 0;

  const selectVariant = useCallback(
    (variantId: string) => {
      onUpdate({ activeVariantId: variantId });
    },
    [onUpdate]
  );

  const changeQuantity = useCallback(
    (delta: number) => {
      if (!cartItem) {
        const initialVariantId = getDefaultVariantId(product);
        onUpdate({
          productId: product.id,
          activeVariantId: initialVariantId,
          variants: [{ variantId: initialVariantId, quantity: Math.max(0, delta) }],
        });
        return;
      }

      onUpdate({
        ...cartItem,
        variants: adjustVariantQuantity(cartItem, product, delta),
      });
    },
    [cartItem, onUpdate, product]
  );

  return {
    activeVariant,
    activeQuantity,
    savePercentage,
    isSelected,
    selectVariant,
    changeQuantity,
  };
}
