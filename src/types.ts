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
  isMonthly?: boolean;
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

export type ReviewCategory = 'cameras' | 'sensors' | 'plan' | 'accessories';

export interface SelectedReviewItem {
  id: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  category: ReviewCategory;
}
