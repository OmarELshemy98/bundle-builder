import { useCallback, useEffect, useState } from 'react';

import { initialCart } from '../data';
import { loadCart, saveCart } from '../services/cartStorage';
import { CartItem } from '../types';
import { updateCartItem } from '../utils/cart';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(() => loadCart(initialCart));

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const updateProduct = useCallback((productId: number, updates: Partial<CartItem>) => {
    setCart((prev) => updateCartItem(prev, productId, updates));
  }, []);

  return { cart, updateProduct };
}
