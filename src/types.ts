export interface ProductVariant {
  id: string;
  name: string;
  imageUrl: string;
  selected?: boolean;
}

export interface Product {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  imageUrl: string;
  variants: ProductVariant[];
  badge?: string;
  selected?: boolean;
  learnMoreUrl?: string;
}
