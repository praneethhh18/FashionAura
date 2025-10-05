'use client';

import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import type { CartItem } from '@/types';

interface CartItemControlsProps {
  item: CartItem;
}

export function CartItemControls({ item }: CartItemControlsProps) {
  const { updateQuantity } = useCart();

  const handleQuantityChange = (change: number) => {
    const newQuantity = item.quantity + change;
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="mt-2 flex items-center">
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 rounded-full border border-foreground/20"
        onClick={() => handleQuantityChange(-1)}
        aria-label="Decrease quantity"
      >
        <Minus className="h-3 w-3" />
      </Button>
      <span className="mx-3 text-sm font-medium w-4 text-center">{item.quantity}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 rounded-full border border-foreground/20"
        onClick={() => handleQuantityChange(1)}
        aria-label="Increase quantity"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
}
