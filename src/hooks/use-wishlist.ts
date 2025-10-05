'use client';

import { useContext } from 'react';
import { WishlistContext, type WishlistContextType } from '@/context/wishlist-context';

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
