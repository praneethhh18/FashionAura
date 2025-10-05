
'use client';

import { Header } from '@/components/header';
import Link from 'next/link';
import Image from 'next/image';
import { NewsletterForm } from '@/components/newsletter-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { coupons } from '@/lib/coupons';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function OffersPage() {
  const { toast } = useToast();

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: 'Copied to clipboard!',
      description: `Coupon code "${code}" has been copied.`,
    });
  };

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="relative h-[50vh] w-full flex items-center justify-center text-center text-white">
            <Image
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
                alt="Excited shoppers during a sale event."
                fill
                className="object-cover"
                data-ai-hint="shoppers sale event"
                priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 p-8 max-w-4xl">
                 <h1 className="text-5xl md:text-7xl font-display uppercase font-black tracking-tight">
                    Exclusive Offers
                 </h1>
                 <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
                    Don't miss out on our special deals! Grab the best offers on your favorite styles.
                 </p>
            </div>
        </section>

        <section className="py-16 md:py-24 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-display font-black uppercase tracking-wide text-foreground text-center mb-12">Current Coupons & Deals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {coupons.map((coupon) => (
                        <Card key={coupon.code} className="flex flex-col">
                            <CardHeader>
                                <CardTitle>{coupon.title}</CardTitle>
                                <CardDescription>{coupon.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
                                    <span className="font-mono text-lg font-bold tracking-widest">{coupon.code}</span>
                                    <Button variant="ghost" size="icon" onClick={() => handleCopy(coupon.code)}>
                                        <Copy className="h-5 w-5" />
                                    </Button>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <p className="text-xs text-muted-foreground">Minimum purchase: ₹{coupon.minPurchase}</p>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

      </main>
      <footer className="bg-foreground text-background py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
           <div>
              <h3 className="font-bold uppercase tracking-wider mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                  <li><Link href="/about#contact" className="hover:text-white">Contact</Link></li>
                  <li><Link href="/about#faq" className="hover:text-white">FAQ</Link></li>
                  <li><Link href="/shipping-returns" className="hover:text-white">Shipping</Link></li>
                  <li><Link href="/shipping-returns" className="hover:text-white">Returns</Link></li>
              </ul>
           </div>
           <div>
              <h3 className="font-bold uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                  <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                  <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              </ul>
           </div>
            <div>
              <h3 className="font-bold uppercase tracking-wider mb-4">Follow Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                  <li><Link href="https://www.instagram.com/signup" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</Link></li>
                  <li><Link href="https://www.facebook.com/signup" target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</Link></li>
                  <li><Link href="https://x.com/signup" target="_blank" rel="noopener noreferrer" className="hover:text-white">Twitter</Link></li>
              </ul>
           </div>
           <div>
              <NewsletterForm />
           </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Cartify. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
