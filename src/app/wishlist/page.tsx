
'use client';

import { Header } from '@/components/header';
import { ProductGrid } from '@/components/product-grid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useWishlist } from '@/hooks/use-wishlist';
import { HeartCrack } from 'lucide-react';
import { NewsletterForm } from '@/components/newsletter-form';

export default function WishlistPage() {
    const { wishlist, clearWishlist } = useWishlist();

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <Header />
      <main className="flex-grow px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-display font-black uppercase tracking-wide text-foreground">
              My Wishlist
            </h1>
            {wishlist.length > 0 && (
                <Button variant="outline" onClick={clearWishlist}>
                    Clear Wishlist
                </Button>
            )}
          </div>
          {wishlist.length > 0 ? (
            <ProductGrid products={wishlist} />
          ) : (
            <div className="text-center py-20">
                <HeartCrack className="mx-auto h-16 w-16 text-muted-foreground" />
                <h2 className="mt-6 text-2xl font-semibold">Your Wishlist is Empty</h2>
                <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your wishlist yet.</p>
                <Button asChild className="mt-6">
                    <Link href="/products">Start Shopping</Link>
                </Button>
            </div>
          )}
        </div>
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
