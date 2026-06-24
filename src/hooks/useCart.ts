import { useCallback, useEffect, useState } from 'react';

import { initialCart } from '../data';
import { loadCart, saveCart } from '../services/cartStorage';
import { CartItem } from '../types';
import { updateCartItem } from '../utils/cart';

// Hook to manage the shopping cart state with localStorage persistence
export function useCart() {
  // Load cart from localStorage first, fall back to initialCart if nothing is saved
  const [cart, setCart] = useState<CartItem[]>(() => loadCart(initialCart));

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  // Update a product in the cart (or add it if it doesn't exist)
  const updateProduct = useCallback((productId: number, updates: Partial<CartItem>) => {
    setCart((prev) => updateCartItem(prev, productId, updates));
  }, []);

  return { cart, updateProduct };
}
