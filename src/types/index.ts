

export interface Coupon {
  code: string;
  title: string;
  description: string;
  discountValue: number; // Percentage
  minPurchase: number; // in INR
}

export interface Product {
  id: string;
  name: string;
  price: number | string;
  priceAsNumber: number;
  imageUrl: string;
  imageHint: string;
  category?: string;
  tagline?: string;
  isNew?: boolean;
  colors?: {
    colorName: string;
    imageUrl: string;
  }[];
  gallery?: string[];
  description?: string;
  specifications?: { name: string; value: string }[];
  rating?: number;
  reviews?: {
    author: string;
    rating: number;
    comment: string;
  }[];
  gender?: 'Men' | 'Women' | 'Unisex';
  sizes?: string[];
  color?: string;
  waterproofness?: 'GORE-TEX' | 'None';
  lacingSystem?: 'Quicklace®' | 'Regular laces';
}

export interface CartItem extends Product {
  quantity: number;
  price: number;
}

export interface UserProfile {
  email: string;
  displayName?: string;
}

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    createdAt: any; // Firestore Timestamp
    userId: string;
}
