import { CART_STORAGE_KEY } from '../constants/storage';
import { CartItem } from '../types';

export function loadCart(fallback: CartItem[]): CartItem[] {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function saveCart(cart: CartItem[]): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}
