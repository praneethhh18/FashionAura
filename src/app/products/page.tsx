
'use client';

import { Header } from '@/components/header';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { NewsletterForm } from '@/components/newsletter-form';

export default function ProductsPage() {
  return (
    <div className="flex flex-col bg-background min-h-screen">
      <main className="flex-grow">
        <section className="relative h-[50vh] w-full flex items-center justify-center text-center text-white">
            <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
                alt="A stylish clothing store with various items on display."
                fill
                className="object-cover"
                data-ai-hint="clothing store display"
                priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 p-8 max-w-4xl">
                 <h1 className="text-5xl md:text-7xl font-display uppercase font-black tracking-tight">
                    All Products
                 </h1>
                 <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
                    Explore our entire collection. Find your perfect style, from everyday essentials to statement pieces.
                 </p>
            </div>
        </section>

        <section className="py-16 md:py-24 px-4 md:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <Link href="/products/men" className="group relative block aspect-square overflow-hidden rounded-lg">
                    <Image 
                        src="https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1964&auto=format&fit=crop"
                        alt="A stylish man looking over a city."
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint="stylish man city view"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-8 left-8 text-white">
                        <h2 className="text-4xl font-display font-black uppercase tracking-tight">Shop Men</h2>
                        <div className="mt-4 flex items-center gap-2 font-semibold">
                            <span>Explore Collection</span>
                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                    </div>
                </Link>
                 <Link href="/products/women" className="group relative block aspect-square overflow-hidden rounded-lg">
                    <Image 
                        src="/product.jpg"
                        alt="A stylish woman in a vibrant city setting."
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint="stylish woman city"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                     <div className="absolute bottom-8 left-8 text-white">
                        <h2 className="text-4xl font-display font-black uppercase tracking-tight">Shop Women</h2>
                        <div className="mt-4 flex items-center gap-2 font-semibold">
                            <span>Explore Collection</span>
                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                    </div>
                </Link>
            </div>
        </section>
      </main>
    </div>
  );
}
