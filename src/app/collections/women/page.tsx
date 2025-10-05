
'use client';

import { Header } from '@/components/header';
import Link from 'next/link';
import Image from 'next/image';
import { NewsletterForm } from '@/components/newsletter-form';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/product-card';
import { casualWearWomen, workFormalWomen, partyEveningWomen, ethnicWearWomen, sportsActivewearWomen, accessoriesWomen, jewelry } from '@/lib/products';
import type { Product } from '@/types';

const categories = [
    { name: "Casual Wear", products: casualWearWomen.slice(0,5), tagline: "Effortless style for every day.", href: "/casual-wear/women" },
    { name: "Work & Formal Wear", products: workFormalWomen, tagline: "Sharp, sophisticated, and professional.", href: "/work-formal/women" },
    { name: "Party & Evening Wear", products: partyEveningWomen, tagline: "Make a statement at every celebration.", href: "/party-evening/women" },
    { name: "Ethnic Wear", products: ethnicWearWomen, tagline: "Timeless tradition, modern elegance.", href: "#" },
    { name: "Sports & Activewear", products: sportsActivewearWomen, tagline: "Performance and style, combined.", href: "#" },
    { name: "Accessories", products: accessoriesWomen, tagline: "The perfect finishing touches.", href: "#" },
    { name: "Jewelry", products: jewelry, tagline: "Sparkle and shine.", href: "/collections/jewelry" },
]

const CollectionProductGrid = ({ products }: { products: Product[] }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map(product => (
            <ProductCard key={product.id} product={product} variant="detailed" />
        ))}
    </div>
)

export default function WomenCollectionPage() {

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <Header />
      <main className="flex-grow">
         <section className="relative h-[60vh] w-full flex items-center justify-center text-center text-white">
            <Image
                src="/pages/collections/womencollection.png"
                alt="Women's Collection"
                fill
                className="object-cover"
                data-ai-hint="women fashion collection"
                priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 p-8 max-w-4xl">
                 <h1 className="text-5xl md:text-7xl font-display uppercase font-black tracking-tight">
                    Women's Collection
                 </h1>
                 <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
                    Explore curated collections of elegance, from everyday chic to evening glamour.
                 </p>
            </div>
        </section>

        <div className="px-4 md:px-8 py-12 md:py-16">
            <div className="max-w-7xl mx-auto space-y-16">
                {categories.map(category => (
                    <section key={category.name}>
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h2 className="text-3xl font-display font-black uppercase tracking-wide text-foreground">{category.name}</h2>
                                <p className="text-muted-foreground mt-1">{category.tagline}</p>
                            </div>
                            <Link href={category.href} className="text-sm font-semibold hover:underline">
                                View All
                            </Link>
                        </div>
                        <CollectionProductGrid products={category.products} />
                        <Separator className="mt-12" />
                    </section>
                ))}
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
