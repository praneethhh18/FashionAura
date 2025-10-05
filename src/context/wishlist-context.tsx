'use client';

import { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Product } from '@/types';

export interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const isClient = typeof window !== 'undefined';

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    if (!isClient) return [];
    try {
      const item = window.localStorage.getItem('shopstream-wishlist');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error('Failed to parse wishlist from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    if (!isClient) return;
    try {
      window.localStorage.setItem('shopstream-wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.error('Failed to save wishlist to localStorage', error);
    }
  }, [wishlist]);

  const addToWishlist = useCallback((product: Product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.some((item) => item.id === product.id)) {
        return prevWishlist;
      }
      return [...prevWishlist, product];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
  }, []);

  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
