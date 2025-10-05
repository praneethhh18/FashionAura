
'use client';

import { Header } from '@/components/header';
import Link from 'next/link';
import Image from 'next/image';
import { ethnicWearWomen } from '@/lib/products';
import { ProductGrid } from '@/components/product-grid';
import { NewsletterForm } from '@/components/newsletter-form';
import { Separator } from '@/components/ui/separator';
import { useState, useMemo } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const categories = ["Sarees", "Lehengas", "Kurtis", "Jewelry"];

export default function WomenEthnicPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const filteredProducts = useMemo(() => {
    if (selectedCategories.length === 0) {
      return ethnicWearWomen;
    }
    return ethnicWearWomen.filter(product =>
      product.category && selectedCategories.includes(product.category)
    );
  }, [selectedCategories]);

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <Header />
      <main className="flex-grow">
         <section className="relative h-[50vh] w-full flex items-center justify-center text-center text-white">
            <Image
                src="/pages/ethnic/women-ethnic.png"
                alt="A woman in a beautiful traditional Indian dress."
                fill
                className="object-cover"
                data-ai-hint="woman traditional dress"
                priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 p-8 max-w-4xl">
                 <h1 className="text-5xl md:text-7xl font-display uppercase font-black tracking-tight">
                    Women's Ethnic Wear
                 </h1>
                 <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
                    Draped in elegance and tradition.
                 </p>
            </div>
        </section>
        
        <section className="py-12 md:py-16 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-display font-black uppercase tracking-wide text-foreground text-center mb-8">Shop by Category</h2>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-4">
                    {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                           <Checkbox
                                id={category}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={() => handleCategoryChange(category)}
                            />
                            <Label htmlFor={category} className="text-lg font-medium cursor-pointer">
                                {category}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <Separator />

        <div className="px-4 md:px-8 py-12 md:py-16">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-2xl font-bold tracking-wide text-foreground mb-6">
                    {selectedCategories.length > 0 ? `Showing results for: ${selectedCategories.join(', ')}` : 'All Ethnic Wear'}
                </h3>
                <ProductGrid products={filteredProducts} />
                {filteredProducts.length === 0 && selectedCategories.length > 0 && (
                    <div className="text-center py-16">
                    <p className="text-muted-foreground">No products found for the selected categories.</p>
                    </div>
                )}
            </div>
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
