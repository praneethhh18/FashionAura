
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Loader2, Trash2, X, Sparkles, AlertCircle } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { CartItemControls } from './cart-item-controls';
import type { CartItem } from '@/types';
import { ScrollArea } from './ui/scroll-area';
import { AIAdvisor } from './ai-advisor';
import { Separator } from './ui/separator';
import { SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { Input } from './ui/input';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { useRouter } from 'next/navigation';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
};


function CartItem({ item }: { item: CartItem }) {
  const { removeFromCart } = useCart();
  const priceDisplay = formatPrice(item.price);
  const totalPriceDisplay = formatPrice(item.price * item.quantity);
    
  return (
    <div className="flex items-start gap-4">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden border border-border">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-contain p-1"
          data-ai-hint={item.imageHint}
          sizes="96px"
        />
      </div>
      <div className="flex-grow">
        <h3 className="font-bold text-base">{item.name}</h3>
        <p className="text-sm text-muted-foreground">{priceDisplay}</p>
        <CartItemControls item={item} />
      </div>
      <div className="flex flex-col items-end gap-2">
        <p className="font-semibold text-sm">
          {totalPriceDisplay}
        </p>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" onClick={() => removeFromCart(item.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function Cart() {
  const { 
    cart, 
    clearCart, 
    totalPrice, 
    itemCount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    finalTotal
  } = useCart();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const router = useRouter();

  const handleApplyCoupon = () => {
    setCouponError(null);
    const result = applyCoupon(couponCode);
    if (result.success) {
        toast({ title: 'Coupon Applied!', description: result.message });
    } else {
        setCouponError(result.message);
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponCode('');
    setCouponError(null);
  }

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: cart,
                total: finalTotal,
            }),
        });

        const result = await response.json();
        
        if (response.ok) {
            router.push('/checkout/address');
        } else {
            throw new Error(result.message || 'Failed to initiate checkout.');
        }

    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: 'Checkout Failed',
            description: error.message || 'An unexpected error occurred.',
        });
    } finally {
        setIsCheckingOut(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <SheetHeader className="mb-6 pr-4">
        <SheetTitle className="font-display text-2xl font-black tracking-wide uppercase text-left">Your Cart ({itemCount})</SheetTitle>
        <SheetDescription className="sr-only">
          Review items in your cart, get AI advice, and proceed to checkout.
        </SheetDescription>
      </SheetHeader>

      {cart.length > 0 ? (
        <>
          <ScrollArea className="flex-grow pr-4 -mr-4">
            <div className="space-y-6">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
            </div>
            
            <Separator className="my-6" />

            <div className="space-y-4">
               <div className="space-y-2">
                   <label htmlFor="coupon-code" className="text-sm font-medium">Have a coupon?</label>
                   <div className="flex items-center gap-2">
                       <Input 
                          id="coupon-code"
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="h-10 border-foreground/20 bg-transparent rounded-l-md rounded-r-none focus-visible:ring-offset-0 focus-visible:ring-1"
                          disabled={!!appliedCoupon}
                      />
                       <Button onClick={handleApplyCoupon} variant="outline" className="h-10 rounded-r-md rounded-l-none border-foreground/20" disabled={!!appliedCoupon}>
                           Apply
                       </Button>
                   </div>
               </div>
               {couponError && (
                   <Alert variant="destructive" className="text-xs rounded-md">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{couponError}</AlertDescription>
                   </Alert>
               )}
               {appliedCoupon && (
                   <Alert className="text-xs rounded-md border-green-500 bg-green-50 text-green-800">
                      <Sparkles className="h-4 w-4 text-green-600" />
                      <AlertTitle className="font-bold text-green-700 flex justify-between items-center">
                          <span>'{appliedCoupon.code}' Applied!</span>
                           <Button variant="ghost" size="icon" onClick={handleRemoveCoupon} className="h-5 w-5 text-green-700 hover:text-green-900">
                              <X className="h-4 w-4" />
                          </Button>
                      </AlertTitle>
                      <AlertDescription className="text-green-700">{appliedCoupon.description}</AlertDescription>
                   </Alert>
               )}
            </div>
            
            <Separator className="my-6" />

            <AIAdvisor />

          </ScrollArea>
          
          <div className="space-y-4 pt-6 mt-auto border-t pr-4">
            <div className="flex justify-between items-center text-lg font-medium">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
             <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Shipping</span>
              <span>FREE</span>
            </div>

            {appliedCoupon && discountAmount > 0 && (
                <div className="flex justify-between items-center text-sm text-green-600 font-semibold">
                    <span>Discount</span>
                    <span>- {formatPrice(discountAmount)}</span>
                </div>
            )}

            <div className="flex justify-between items-center text-xl font-bold tracking-wider uppercase">
              <span>Total</span>
              <span>{formatPrice(finalTotal)}</span>
            </div>
            <Button
              onClick={handleCheckout}
              disabled={isCheckingOut || cart.length === 0}
              className="w-full h-14 rounded-full uppercase tracking-widest bg-primary text-primary-foreground font-bold text-base"
              size="lg"
            >
              {isCheckingOut ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              Checkout
            </Button>
          </div>
        </>
      ) : (
        <div className="flex-grow flex items-center justify-center text-center text-muted-foreground">
          <p>Your cart is empty.</p>
        </div>
      )}
    </div>
  );
}
