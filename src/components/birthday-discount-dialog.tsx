
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';
import { coupons } from '@/lib/coupons';

interface BirthdayDiscountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collectionHref: string;
}

export function BirthdayDiscountDialog({ open, onOpenChange, collectionHref }: BirthdayDiscountDialogProps) {
  const [dob, setDob] = useState('');
  const [showCoupon, setShowCoupon] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const birthdayCoupon = coupons.find(c => c.code === 'BDAYEDGE25');

  const handleContinue = () => {
    if (!dob) {
      toast({
        variant: 'destructive',
        title: 'Please enter your date of birth.',
      });
      return;
    }
    // Simple validation for demo purposes
    const year = new Date(dob).getFullYear();
    if (isNaN(year) || year > new Date().getFullYear() - 10) {
        toast({
            variant: 'destructive',
            title: 'Invalid Date',
            description: 'Please enter a valid date of birth.',
        });
        return;
    }

    setShowCoupon(true);
  };

  const handleCopyToClipboard = () => {
    if (birthdayCoupon) {
      navigator.clipboard.writeText(birthdayCoupon.code);
      toast({
        title: 'Copied to clipboard!',
        description: `Coupon code "${birthdayCoupon.code}" copied.`,
      });
    }
  };

  const handleGoToCollection = () => {
    router.push(collectionHref);
    // The onOpenChange from the parent will handle closing and setting localStorage
    onOpenChange(false);
  };

  const handleClose = () => {
    // Reset state when closing the dialog from any state
    onOpenChange(false);
    // A timeout ensures the closing animation completes before state reset
    setTimeout(() => {
        setShowCoupon(false);
        setDob('');
    }, 300);
  };
  
  if (!birthdayCoupon) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        {!showCoupon ? (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>Unlock a Birthday Discount!</AlertDialogTitle>
              <AlertDialogDescription>
                Enter your date of birth to get a special discount on the Femme Edge collection.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleClose}>Maybe Later</AlertDialogCancel>
              {/* Use a regular button to prevent auto-closing */}
              <Button onClick={handleContinue}>Continue</Button>
            </AlertDialogFooter>
          </>
        ) : (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>🎉 Let's Celebrate Your Next Birthday!</AlertDialogTitle>
              <AlertDialogDescription>
                As a special treat, here is your discount code for the Femme Edge collection.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4 space-y-4">
                <p className="text-sm text-muted-foreground">{birthdayCoupon.description}</p>
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
                    <span className="font-mono text-lg font-bold tracking-widest">{birthdayCoupon.code}</span>
                    <Button variant="ghost" size="icon" onClick={handleCopyToClipboard}>
                        <Copy className="h-5 w-5" />
                    </Button>
                </div>
            </div>
            <AlertDialogFooter>
              <Button onClick={handleGoToCollection} className="w-full">
                Shop on Femme Edge
              </Button>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
