
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const categories = [
    { 
        name: 'Street Wear', 
        items: ['Oversized Tees', 'Cargo Pants', 'Chunky Sneakers', 'Bucket Hats', 'Crossbody Bags'],
        image: '/products/women/streetwearfe.jpg',
        imageHint: 'female streetwear model',
        href: "/collections/women"
    },
    { 
        name: 'Office & Formal Wear', 
        items: ['Blazers', 'Formal Blouses', 'Trousers', 'Pumps', 'Tote Bags'],
        image: '/products/women/fework.jpg',
        imageHint: 'woman in business attire',
        href: "/collections/women"
    },
    { 
        name: 'Dresses & Tops', 
        items: ['Formal Dresses', 'Casual Tops', 'T-Shirts', 'Blouses'],
        image: '/products/women/tee.jpg',
        imageHint: 'women dresses and tops',
        href: "/collections/women"
    },
    { 
        name: 'Pants & Skirts', 
        items: ['Jeans', 'Skirts', 'Formal Trousers', 'Shorts'],
        image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1935&auto=format&fit=crop',
        imageHint: 'women pants and skirts',
        href: "/collections/women"
    },
    { 
        name: 'Shoes', 
        items: ['Sneakers', 'Heels', 'Flats', 'Boots'],
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2080&auto=format&fit=crop',
        imageHint: 'collection of women shoes',
        href: "/collections/women"
    },
    { 
        name: 'Jewelry', 
        items: ['Necklaces', 'Earrings', 'Bracelets', 'Rings'],
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1887&auto=format&fit=crop',
        imageHint: 'assorted jewelry',
        href: "/collections/women"
    },
    { 
        name: 'Accessories', 
        items: ['Handbags', 'Wallets', 'Sunglasses', 'Scarves'],
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop',
        imageHint: 'women accessories shopping',
        href: "/collections/women"
    },
    { 
        name: 'Ethnic Wear', 
        items: ['Sarees', 'Lehengas', 'Kurtis', 'Salwar Suits', 'Ethnic Jewelry'],
        image: '/products/women/ethfe.jpg',
        imageHint: 'woman in traditional saree',
        href: "/collections/women"
    },
];

export default function WomenProductsPage() {
    return (
        <main>
            <section className="relative h-[50vh] w-full flex items-center justify-center text-center text-white">
                <Image
                    src="/wolcol.png"
                    alt="A stylish woman in a vibrant city setting."
                    fill
                    className="object-cover"
                    data-ai-hint="stylish woman city"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 p-8 max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-display uppercase font-black tracking-tight">
                        Women's Collection
                    </h1>
                    <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
                        Browse through our curated categories of women's fashion.
                    </p>
                </div>
            </section>
            <section className="py-16 md:py-24 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((category) => (
                        <Link href={category.href} key={category.name}>
                            <Card className="overflow-hidden group h-full flex flex-col">
                                <div className="relative aspect-video">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        data-ai-hint={category.imageHint}
                                    />
                                    <div className="absolute inset-0 bg-black/30" />
                                </div>
                                <CardContent className="p-6 flex-grow flex flex-col">
                                    <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                                    <ul className="space-y-2 text-muted-foreground flex-grow">
                                        {category.items.map(item => <li key={item}>{item}</li>)}
                                    </ul>
                                     <Button variant="link" className="p-0 mt-4 text-base justify-start">
                                        Shop {category.name} &rarr;
                                    </Button>
                                </CardContent>
                            </Card>
                        </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
