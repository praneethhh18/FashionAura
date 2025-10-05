
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const categories = [
    { 
        name: 'Street Wear', 
        items: ['Hoodies', 'Graphic Tees', 'Sneakers', 'Caps', 'Joggers'],
        image: '/products/men/streetwear.jpg',
        imageHint: 'male streetwear model',
        href: "/collections/men"
    },
    { 
        name: 'Office & Formal Wear', 
        items: ['Blazers', 'Formal Shirts', 'Trousers', 'Formal Shoes', 'Belts'],
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1887&auto=format&fit=crop',
        imageHint: 'man in business suit',
        href: "/collections/men"
    },
    { 
        name: 'Shirts', 
        items: ['Formal Shirts', 'Casual Shirts', 'T-Shirts', 'Polo Shirts'],
        image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?q=80&w=1887&auto=format&fit=crop',
        imageHint: 'stack of folded shirts',
        href: "/collections/men"
    },
    { 
        name: 'Pants', 
        items: ['Jeans', 'Chinos', 'Formal Trousers', 'Shorts'],
        image: '/products/men/pant.jpg',
        imageHint: 'various men pants',
        href: "/collections/men"
    },
    { 
        name: 'Shoes', 
        items: ['Sneakers', 'Loafers', 'Formal Shoes', 'Boots'],
        image: '/products/men/shoe.jpg',
        imageHint: 'collection of men shoes',
        href: "/collections/men"
    },
    { 
        name: 'Watches', 
        items: ['Analog', 'Digital', 'Smart Watches', 'Luxury'],
        image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1888&auto=format&fit=crop',
        imageHint: 'stylish wrist watch',
        href: "/collections/men"
    },
    { 
        name: 'Accessories', 
        items: ['Belts', 'Wallets', 'Sunglasses', 'Ties'],
        image: '/products/men/mnass.jpg',
        imageHint: 'men accessories flatlay',
        href: "/collections/men"
    },
];

export default function MenProductsPage() {
    return (
        <main>
            <section className="relative h-[50vh] w-full flex items-center justify-center text-center text-white">
                <Image
                    src="https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1964&auto=format&fit=crop"
                    alt="A stylish man looking over a city."
                    fill
                    className="object-cover"
                    data-ai-hint="stylish man city view"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 p-8 max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-display uppercase font-black tracking-tight">
                        Men's Collection
                    </h1>
                    <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
                        Browse through our curated categories of men's fashion.
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
                                    <Button variant="link" className="p-0 mt-4 text-base">
                                        Shop {category.name}
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
