export interface ProductVariant {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  imageUrl: string;
  variants: ProductVariant[];
  badge?: string;
  selected?: boolean;
  learnMoreUrl?: string;
  stepId: number;
}

export interface CartItemVariant {
  variantId: string;
  quantity: number;
}

export interface CartItem {
  productId: number;
  activeVariantId?: string;
  variants: CartItemVariant[];
}
