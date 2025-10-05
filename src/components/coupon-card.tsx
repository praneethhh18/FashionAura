'use client';

import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface CouponCardProps {
  title: string;
  code: string;
}

export function CouponCard({ title, code }: CouponCardProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: 'Copied to clipboard!',
      description: `Coupon code "${code}" has been copied.`,
    });
  };

  return (
    <div className="bg-secondary/50 p-4 rounded-lg flex items-center justify-between">
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground font-mono bg-background inline-block px-2 py-1 rounded-md mt-1 border">
          {code}
        </p>
      </div>
      <Button variant="ghost" size="icon" onClick={handleCopy}>
        <Copy className="h-5 w-5" />
        <span className="sr-only">Copy code</span>
      </Button>
    </div>
  );
}
