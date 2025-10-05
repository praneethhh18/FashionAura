'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/header';
import { ProductGrid } from '@/components/product-grid';
import { NewsletterForm } from '@/components/newsletter-form';
import {
    products as allProducts,
    casualWearMen,
    casualWearWomen,
    workFormalMen,
    workFormalWomen,
    partyEveningMen,
    partyEveningWomen,
    ethnicWearMen,
    ethnicWearWomen,
    sportsActivewearMen,
    sportsActivewearWomen,
    accessoriesMen,
    accessoriesWomen,
    jewelry,
    urbanEdgeSneakers,
    ivoryMen,
    femmeEdge
} from '@/lib/products';
import type { Product } from '@/types';
import Link from 'next/link';

const allProductCollections = [
    ...allProducts, ...casualWearMen, ...casualWearWomen, ...workFormalMen, ...workFormalWomen,
    ...partyEveningMen, ...partyEveningWomen, ...ethnicWearMen, ...ethnicWearWomen,
    ...sportsActivewearMen, ...sportsActivewearWomen, ...accessoriesMen, ...accessoriesWomen,
    ...jewelry, ...urbanEdgeSneakers, ...ivoryMen, ...femmeEdge
];
const uniqueProducts = Array.from(new Map(allProductCollections.map(p => [p.id, p])).values());


function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');

    const filteredProducts = uniqueProducts.filter(product => {
        const searchTerm = query?.toLowerCase() || '';
        return (
            product.name.toLowerCase().includes(searchTerm) ||
            product.category?.toLowerCase().includes(searchTerm) ||
            product.description?.toLowerCase().includes(searchTerm) ||
            product.tagline?.toLowerCase().includes(searchTerm)
        );
    });

    return (
        <div className="flex flex-col bg-background min-h-screen">
            <Header />
            <main className="flex-grow px-4 md:px-8 py-8">
                <div className="max-w-7xl mx-auto">
                    {query ? (
                        <>
                            <h1 className="text-3xl font-bold mb-2">
                                Search Results for "{query}"
                            </h1>
                            <p className="text-muted-foreground mb-8">
                                {filteredProducts.length} results found.
                            </p>
                            {filteredProducts.length > 0 ? (
                                <ProductGrid products={filteredProducts} />
                            ) : (
                                <div className="text-center py-20">
                                    <h2 className="text-2xl font-semibold">No products found</h2>
                                    <p className="mt-2 text-muted-foreground">
                                        We couldn't find any products matching your search.
                                    </p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-20">
                            <h2 className="text-2xl font-semibold">Search for products</h2>
                            <p className="mt-2 text-muted-foreground">
                                Use the search bar in the header to find what you're looking for.
                            </p>
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
                    <p>&copy; {new Date().getFullYear()} Fashion Aura. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}


export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchResults />
        </Suspense>
    )
}
