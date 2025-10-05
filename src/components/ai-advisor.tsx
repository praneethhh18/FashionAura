
'use client';

import { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { shoppingCartAdvisor } from '@/ai/flows/shopping-cart-advisor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function AIAdvisor() {
  const { cart } = useCart();
  const [budget, setBudget] = useState('');
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getAdvice = async () => {
    if (cart.length === 0) {
      setError('Your cart is empty. Add items to get advice.');
      return;
    }
    if (!budget || isNaN(Number(budget)) || Number(budget) <= 0) {
      setError('Please enter a valid budget.');
      return;
    }
    setIsLoading(true);
    setAdvice('');
    setError('');
    try {
      const result = await shoppingCartAdvisor({
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        budget: Number(budget),
      });
      setAdvice(result.advice);
    } catch (e) {
      console.error(e);
      setError('Could not generate advice at this moment.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-4">
      <Card className="bg-transparent border-none shadow-none">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest">
            <Sparkles className="h-4 w-4 text-foreground" />
            AI Shopping Advisor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Your Budget (₹)"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              disabled={isLoading}
              className="h-10 border-foreground/20 bg-transparent rounded-none focus-visible:ring-offset-0 focus-visible:ring-1"
            />
            <Button onClick={getAdvice} disabled={isLoading} variant="outline" className="h-10 rounded-none border-foreground/20">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Get Advice'
              )}
            </Button>
          </div>
          {error && (
            <Alert variant="destructive" className="text-xs rounded-none">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {isLoading && (
            <div className="space-y-2 pt-2">
                <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
                <div className="h-4 w-5/6 animate-pulse rounded-md bg-muted" />
                <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted" />
            </div>
          )}
          {advice && (
            <Alert variant="default" className="rounded-none border-foreground/20 bg-transparent">
              <Sparkles className="h-4 w-4" />
              <AlertTitle className="font-semibold uppercase tracking-wider">Expert Advice</AlertTitle>
              <AlertDescription className="font-body text-foreground">
                {advice}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
