'use client';

import { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { CartItem, Product, Coupon } from '@/types';
import { coupons as allCoupons } from '@/lib/coupons';
import { formatPrice } from '@/lib/utils';

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;
  finalTotal: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

const isClient = typeof window !== 'undefined';

const parsePrice = (price: number | string): number => {
  if (typeof price === 'number') {
    return price;
  }
  return parseFloat(price.replace(/[^0-9.]/g, ''));
};

const getDiscountAmount = (coupon: Coupon | null, cart: CartItem[], subtotal: number): number => {
    if (!coupon) return 0;

    if (coupon.code === 'B1G1ACC') {
        const accessoryItems = cart
            .filter(item => item.category === 'Accessories' && item.name !== 'Formal Watch')
            .sort((a, b) => a.price - b.price);

        let totalDiscount = 0;
        let itemsConsidered = 0;

        // Apply BOGO logic
        for (let i = 0; i < accessoryItems.length; i++) {
            let quantity = accessoryItems[i].quantity;
            while(quantity > 0) {
                itemsConsidered++;
                if (itemsConsidered % 2 === 0) {
                    totalDiscount += accessoryItems[i].price;
                }
                quantity--;
            }
        }
        return totalDiscount;
    }

    // Default percentage discount
    if (coupon.discountValue > 0) {
        return subtotal * (coupon.discountValue / 100);
    }

    return 0;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (!isClient) return [];
    try {
      const item = window.localStorage.getItem('shopstream-cart');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error('Failed to parse cart from localStorage', error);
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    if (!isClient) return null;
    try {
      const item = window.localStorage.getItem('shopstream-coupon');
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Failed to parse coupon from localStorage', error);
      return null;
    }
  });

  useEffect(() => {
    if (!isClient) return;
    try {
      window.localStorage.setItem('shopstream-cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart to localStorage', error);
    }
  }, [cart]);

   useEffect(() => {
    if (isClient) {
      if (appliedCoupon) {
        window.localStorage.setItem('shopstream-coupon', JSON.stringify(appliedCoupon));
      } else {
        window.localStorage.removeItem('shopstream-coupon');
      }
    }
  }, [appliedCoupon]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    const priceAsNumber = parsePrice(product.price);
    if (isNaN(priceAsNumber)) {
        console.error("Invalid product price:", product.price);
        return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, price: priceAsNumber, quantity }];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        return prevCart.filter((item) => item.id !== productId);
      }
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setAppliedCoupon(null);
  }, []);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const price = parsePrice(item.price);
    return sum + price * item.quantity;
  }, 0);
  
  const applyCoupon = (code: string) => {
    const foundCoupon = allCoupons.find(c => c.code.toLowerCase() === code.toLowerCase());
    if (foundCoupon) {
        if (totalPrice >= foundCoupon.minPurchase) {
            setAppliedCoupon(foundCoupon);
            return { success: true, message: `Coupon '${foundCoupon.code}' applied successfully!` };
        } else {
            setAppliedCoupon(null);
            const remainingAmount = formatPrice(foundCoupon.minPurchase - totalPrice);
            return { success: false, message: `You need to spend ${formatPrice(foundCoupon.minPurchase)} to use this coupon. Add ${remainingAmount} more.` };
        }
    }
    return { success: false, message: 'Invalid coupon code.' };
  };

  const removeCoupon = () => {
      setAppliedCoupon(null);
  };
  
  const discountAmount = getDiscountAmount(appliedCoupon, cart, totalPrice);
  const finalTotal = Math.max(0, totalPrice - discountAmount);


  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        itemCount,
        totalPrice,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        finalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
