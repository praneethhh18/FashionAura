
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { FloatingSupportButton } from '@/components/floating-support-button';
import Autoplay from "embla-carousel-autoplay"
import { NewsletterForm } from '@/components/newsletter-form';

const heroItems = [
  {
    title: 'Style on \n any path',
    subtitle: 'Discover fashion that travels with you — from streets to adventures, always in style.',
    image: '/pages/home/3.png',
    imageHint: 'women fashion dresses',
    href: '/products',
    textAlign: 'left'
  },
  {
    title: "For Him: \n Modern Edge",
    subtitle: 'Sharp styles, refined essentials, and modern trends for every occasion.',
    image: '/pages/home/1.png',
    imageHint: 'male model fashion',
    href: '/collections/men',
    textAlign: 'left'
  },
  {
    title: 'For Her: \nEffortless Grace',
    subtitle: 'Explore curated collections of elegance, from everyday chic to evening glamour.',
    image: '/pages/home/2.png',
    imageHint: 'stylish woman fashion',
    href: '/collections/women',
    textAlign: 'left'
  },
  {
    title: 'Accessorize \n Your Look',
    subtitle: 'Find the perfect finishing touches, from timeless watches to statement bags.',
    image: '/pages/home/assmenu1.jpg',
    imageHint: 'men accessories flatlay',
    href: '/collections/men',
    textAlign: 'left'
  }
];


const heroTextContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const heroTextItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const activityCategories = [
    { name: 'Casual Wear', image: '/pages/home/cas1.jpg', href: '/casual-wear', imageHint: 'couple in casual wear' },
    { name: 'Work & Formal Wear', image: '/pages/home/for1.jpg', href: '/work-formal', imageHint: 'woman in business attire' },
    { name: 'Party Wear', image: '/pages/home/party1.png', href: '/party-evening', imageHint: 'friends at a party' },
    { name: 'Ethnic & Traditional', image: '/pages/home/ethnic1.png', href: '/ethnic-wear', imageHint: 'woman in traditional saree' },
    { name: 'Street Style', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1887&auto=format&fit=crop', href: '/street-style', imageHint: 'woman in street style' },
    { name: 'Athleisure', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1887&auto=format&fit=crop', href: '/athleisure', imageHint: 'woman doing yoga' },
];

const trendingItems = [
  {
    id: 'urban-edge',
    title: 'Urban Edge Sneaker',
    image: '/products/Urban Edge Sneakers.png',
    href: '/collections/urban-edge',
    imageHint: 'urban edge sneakers',
    textPosition: 'bottom-left'
  },
  {
    id: 'jewelry',
    title: 'Jewelry Set',
    image: '/pages/home/jew1.jpg',
    href: '/collections/jewelry',
    imageHint: 'jewelry set',
    textPosition: 'bottom-left'
  },
  {
    id: 'ivory-men',
    title: 'Ivory Men',
    image: '/pages/home/greywhite1.jpg',
    href: '/collections/ivory-men',
    imageHint: 'white fashion',
    textPosition: 'bottom-left'
  },
  {
    id: 'femme-edge',
    title: 'Femme Edge',
    image: '/pages/home/femme1.jpg',
    href: '/collections/femme-edge',
    imageHint: 'yellow running shoes',
    textPosition: 'bottom-left'
  },
];


export default function Home() {
  const heroAutoplayPlugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const [products, setProducts] = useState<any[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) return setProducts([]);
        const data = await res.json();
        if (mounted) setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products', err);
        if (mounted) setProducts([]);
      } finally {
        if (mounted) setIsLoadingProducts(false);
      }
    };
    fetchProducts();
    return () => { mounted = false; };
  }, []);

  const bestSellers = products.slice(0, 5);
  const trendingProducts = products.slice(5, 10);
  const activityCarouselPlugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <div className="flex flex-col bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <Carousel
          plugins={[heroAutoplayPlugin.current]}
          opts={{
            loop: true,
          }}
          className="w-full relative group"
        >
          <CarouselContent>
            {heroItems.map((item) => (
              <CarouselItem key={item.title}>
                 <div className={`relative h-[60vh] w-full flex items-center text-white ${item.textAlign === 'right' ? 'justify-end' : 'justify-start'}`}>
                    <Image
                      src={item.image}
                      alt={item.imageHint}
                      fill
                      className="object-cover"
                      data-ai-hint={item.imageHint}
                      priority={item.title.includes("Accessorize")}
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <motion.div
                      className={`relative z-10 p-8 md:p-16 max-w-3xl ${item.textAlign === 'right' ? 'text-right' : 'text-left'}`}
                      variants={heroTextContainerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.h1
                        className="text-6xl md:text-8xl font-display uppercase font-black tracking-tight whitespace-pre-wrap"
                        variants={heroTextItemVariants}
                      >
                        {item.title}
                      </motion.h1>
                      <motion.p
                        className="mt-4 max-w-lg text-lg"
                        variants={heroTextItemVariants}
                      >
                        {item.subtitle}
                      </motion.p>
                      <motion.div variants={heroTextItemVariants} className={item.textAlign === 'right' ? 'flex justify-end' : ''}>
                        <Button asChild size="lg" className="mt-8 rounded-full bg-white text-black font-bold text-lg px-10 py-6 hover:bg-gray-200">
                          <Link href={item.href}>Shop Now</Link>
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Carousel>

        {/* Shop by Style */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <Carousel
              plugins={[activityCarouselPlugin.current]}
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-bold text-foreground">
                  Shop by Style
                </h2>
                <div className="flex gap-2">
                  <CarouselPrevious className="relative top-auto left-auto right-auto bottom-auto h-10 w-10" />
                  <CarouselNext className="relative top-auto left-auto right-auto bottom-auto h-10 w-10" />
                </div>
              </div>
              <CarouselContent className="-ml-4">
                {activityCategories.map((category) => (
                  <CarouselItem
                    key={category.name}
                    className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5 pl-4"
                  >
                    <Link
                      href={category.href}
                      key={category.name}
                      className="group relative block aspect-[4/5] overflow-hidden rounded-lg"
                    >
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint={category.imageHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="text-2xl font-bold">{category.name}</h3>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        {/* Sneaker Promotions */}
        <section className="pb-16 md:pb-24 px-4 md:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <Link href="/collections/men" className="group relative block aspect-[4/5] overflow-hidden rounded-lg">
                    <Image
                        src="/pages/home/mecol.png"
                        alt="Men's Collection"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint="men fashion"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-8 left-8 text-white">
                        <h3 className="text-3xl lg:text-4xl font-bold uppercase tracking-wider">Men's Collection</h3>
                        <p className="mt-2 text-lg">Clothing & accessories that define him</p>
                        <Button variant="secondary" className="mt-6 rounded-full px-8 py-6 text-base font-bold">Shop Now</Button>
                    </div>
                </Link>
                <Link href="/collections/women" className="group relative block aspect-[4/5] overflow-hidden rounded-lg">
                    <Image
                        src="/pages/home/fecol.png"
                        alt="Women's Collection"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint="women fashion"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-8 left-8 text-white">
                        <h3 className="text-3xl lg:text-4xl font-bold uppercase tracking-wider">Women's Collection</h3>
                        <p className="mt-2 text-lg">Fashion & accessories that complete her</p>
                        <Button variant="secondary" className="mt-6 rounded-full px-8 py-6 text-base font-bold">Shop Now</Button>
                    </div>
                </Link>
            </div>
        </section>

        {/* Our Best Sellers */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-secondary">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-display font-black uppercase tracking-wide text-foreground">Our Best Sellers</h2>
              <Button asChild variant="link">
                <Link href="/products">View All <ArrowRight className="h-4 w-4 ml-2" /></Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {bestSellers.map(product => <ProductCard key={product.id} product={product} variant="detailed"/>)}
            </div>
          </div>
        </section>

        {/* Trending Now */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-display font-black uppercase tracking-wide text-foreground mb-12">Trending Now</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                {trendingItems.map((item) => (
                    <Link href={item.href} key={item.title} className="group relative block aspect-[4/5] overflow-hidden rounded-lg">
                      <Image 
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint={item.imageHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className={`absolute text-white ${item.textPosition === 'bottom-left' ? 'bottom-6 left-6' : 'top-6 left-6'}`}>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                      </div>
                    </Link>
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
          <p>&copy; {new Date().getFullYear()} Fashion Aura. All Rights Reserved.</p>
        </div>
      </footer>
      <FloatingSupportButton />
    </div>
  );
}
