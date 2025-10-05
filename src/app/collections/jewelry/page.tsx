
'use client';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { jewelry } from '@/lib/products';
import { Filter, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useMemo } from 'react';
import { NewsletterForm } from '@/components/newsletter-form';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ProductFilters } from '@/components/product-filters';
import type { Product } from '@/types';

type Filters = {
    genders: string[];
    sizes: string[];
    priceRange: [number, number];
    colors: string[];
    waterproofness: string[];
    lacing: string[];
};

export default function JewelryCollectionPage() {
    const [sort, setSort] = useState("featured");
    const [filters, setFilters] = useState<Filters>({
        genders: [],
        sizes: [],
        priceRange: [0, 50000],
        colors: [],
        waterproofness: [],
        lacing: [],
    });
    
    const [isFiltersSheetOpen, setIsFiltersSheetOpen] = useState(false);

    const filteredAndSortedProducts = useMemo(() => {
        let products: Product[] = [...jewelry];

        // Filtering
        if (filters.genders.length > 0) {
            products = products.filter(p => p.gender && filters.genders.includes(p.gender));
        }
        
        products = products.filter(p => p.priceAsNumber >= filters.priceRange[0] && p.priceAsNumber <= filters.priceRange[1]);

        // Sorting
        switch (sort) {
            case 'price-asc':
                products.sort((a, b) => a.priceAsNumber - b.priceAsNumber);
                break;
            case 'price-desc':
                products.sort((a, b) => b.priceAsNumber - a.priceAsNumber);
                break;
            case 'newest':
                products.sort((a, b) => (b.isNew ? 1 : -1) - (a.isNew ? 1 : -1));
                break;
            case 'featured':
            default:
                // Default order is fine
                break;
        }

        return products;
    }, [filters, sort]);
    
    const activeFilterCount = Object.values(filters).reduce((count, value) => {
        if (Array.isArray(value)) return count + value.length;
        return count;
    }, 0);

    const clearFilters = () => {
        setFilters({
            genders: [],
            sizes: [],
            priceRange: [0, 50000],
            colors: [],
            waterproofness: [],
            lacing: [],
        });
    }

    return (
        <div className="flex flex-col bg-background min-h-screen">
            <Header />
            <main className="flex-grow px-4 md:px-8 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-foreground">
                            Jewelry Collection <span className="text-muted-foreground font-normal">({filteredAndSortedProducts.length})</span>
                        </h1>
                        <div className="flex gap-2">
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Sort</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                                        <DropdownMenuRadioItem value="featured">Featured</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="price-asc">Price: Low to High</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="price-desc">Price: High to Low</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                        {filteredAndSortedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} variant="detailed" />
                        ))}
                    </div>
                    {filteredAndSortedProducts.length === 0 && (
                        <div className="text-center py-20 col-span-full">
                            <h2 className="text-2xl font-semibold">No products found</h2>
                            <p className="mt-2 text-muted-foreground">Try adjusting your filters.</p>
                             <Button onClick={clearFilters} className="mt-4">
                                Clear All Filters
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
