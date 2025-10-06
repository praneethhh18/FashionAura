

'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { useState, useEffect, useRef } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Cart } from '@/components/cart';
import { Input } from '@/components/ui/input';
import { AuthSheet } from './auth-sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from '@/lib/utils';
import { Logo } from './logo';
import { ArrowRight } from 'lucide-react';
import { CouponCard } from './coupon-card';
import { coupons } from '@/lib/coupons';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/hooks/use-products';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

// We'll derive product lists from the /api/products endpoint using the useProducts hook
// to keep frontend <-> backend separation clear. Pages/components that need categorised
// lists can filter the unified products array.


const megaMenuItems = {
  'New': {
    featured: [
      { title: 'New Arrivals', href: '/collections/men'},
      { title: 'Best Sellers', href: '/collections/women'},
      { title: 'Upcoming Collections', href: '/collections/men'},
      { title: 'Style Finder', href: '/collections/women'},
    ],
    collections: [
      { title: 'Casual Wear Collection', href: '/casual-wear'},
      { title: 'Work & Formal wear', href: '/work-formal'},
      { title: 'Party & Evening wear', href: '/party-evening'},
      { title: 'Seasonal Collection', href: '/collections/men'},
      { title: 'Accessories Collection', href: '/collections/women'},
      { title: 'Shoes & Footwears', href: '/collections/men'},
    ],
    'Must-Haves': [
      { title: 'Signature Handbags', href: '/collections/women'},
      { title: 'Trending Sneakers', href: '/collections/men'},
      { title: 'Classic Watches', href: '/collections/men'},
      { title: 'Elegant Jewelry', href: '/collections/women'},
      { title: 'Everyday Essentials', href: '/collections/men'},
    ],
    image: {
      src: '/pages/home/new.png',
      alt: 'New arrivals for men and women fashion',
      title: 'New Arrivals',
      href: '/collections/women',
      imageHint: 'fashion new arrivals'
    }
  },
  'Men': {
    featured: [
      { title: "All Men’s", href: '/collections/men'},
      { title: "Men’s New Arrivals", href: '/collections/men'},
      { title: "Men’s Shoes", href: '/collections/men'},
      { title: "Men’s Clothing", href: '/collections/men'},
      { title: "Men’s Accessories", href: '/collections/men'},
    ],
    collections: [
      { title: 'Casual Wear', href: '/casual-wear/men'},
      { title: 'Work & Formal', href: '/work-formal/men'},
      { title: 'Party & Evening', href: '/party-evening/men'},
      { title: 'Seasonal Picks', href: '/collections/men'},
      { title: 'Streetwear', href: '/collections/men'},
    ],
    'Must-Haves': [
      { title: 'Signature Jackets', href: '/collections/men'},
      { title: 'Classic Watches', href: '/collections/men'},
      { title: 'Trending Sneakers', href: '/collections/men'},
      { title: 'Everyday Basics', href: '/collections/men'},
      { title: 'Work Staples', href: '/collections/men'},
    ],
    image: {
      src: '/pages/home/mecol.png',
      alt: "Men's collection",
      title: "Men's Collection",
      href: '/collections/men',
      imageHint: 'male model fashion'
    }
  },
  'Women': {
    featured: [
      { title: "All Women's", href: '/collections/women'},
      { title: "Women's New Arrivals", href: '/collections/women'},
      { title: "Women's Shoes", href: '/collections/women'},
      { title: "Women's Clothing", href: '/collections/women'},
      { title: "Women's Accessories", href: '/collections/women'},
    ],
    collections: [
      { title: "Casual Wear", href: '/casual-wear/women'},
      { title: "Work & Formal", href: '/work-formal/women'},
      { title: "Party & Evening", href: '/party-evening/women'},
      { title: "Seasonal Styles", href: '/collections/women'},
      { title: "Ethnic & Fusion", href: '/collections/women'},
    ],
    'Must-Haves': [
      { title: 'Statement Dresses', href: '/collections/women'},
      { title: 'Signature Handbags', href: '/collections/women'},
      { title: 'Elegant Jewelry', href: '/collections/women'},
      { title: 'Trending Heels', href: '/collections/women'},
      { title: 'Everyday Essentials', href: '/collections/women'},
    ],
    image: {
      src: '/pages/home/fecol.png',
      alt: "Women's collection",
      title: "Women's Collection",
      href: '/collections/women',
      imageHint: 'female model fashion'
    }
  },
  'Accessories': {
    featured: [
      { title: 'All Accessories', href: '/collections/men'},
      { title: 'New Arrivals', href: '/collections/women'},
      { title: 'Best Sellers', href: '/collections/men'},
      { title: 'Trending Now', href: '/collections/women'},
    ],
    collections: [
      { title: 'Bags & Clutches', href: '/collections/women'},
      { title: 'Watches', href: '/collections/men'},
      { title: 'Jewelry', href: '/collections/women'},
      { title: 'Sunglasses', href: '/collections/men'},
      { title: 'Belts & Wallets', href: '/collections/men'},
    ],
    'Must-Haves': [
      { title: 'Designer Handbags', href: '/collections/women'},
      { title: 'Premium Watches', href: '/collections/men'},
      { title: 'Statement Jewelry', href: '/collections/women'},
      { title: 'Trendy Sunglasses', href: '/collections/men'},
      { title: 'Everyday Essentials', href: '/collections/women'},
    ],
    image: {
      src: '/pages/home/assmenu1.jpg',
      alt: 'A collection of stylish accessories',
      title: 'Complete Your Look',
      href: '/collections/men',
      imageHint: 'stylish accessories collection'
    }
  },
   'Offers': {
    coupons: coupons.slice(0, 5),
    image: {
      src: '/pages/home/offers.png',
      alt: 'A red sale tag',
      title: 'Shop The Sale',
      href: '/offers',
      imageHint: 'sale tag'
    }
  },
  'About Us': {
    description: "At Fashion Aura, fashion isn’t just about clothing—it’s about self-expression, confidence, and lifestyle. We bring together the latest trends, timeless classics, and everyday essentials to create a collection that fits every moment of your life.\\n\\nFrom stylish men’s and women’s wear to accessories that complete your look, Fashion Aura is your one-stop destination for modern fashion. Our carefully curated collections are designed to keep you comfortable, confident, and effortlessly stylish.\\n\\nWe believe fashion should be accessible, innovative, and inspiring. That’s why we combine quality craftsmanship, sustainable choices, and exclusive offers to deliver value beyond just style.\\n\\nJoin us as we redefine fashion shopping—making it simpler, smarter, and more personal for you.",
    image: {
      src: '/pages/home/about us.png',
      alt: 'A diverse group of people working together',
      title: 'Our Team & Values',
      href: '/about',
      imageHint: 'diverse team collaboration'
    }
  }
};

const WishlistIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="wishlist" {...props}>
      <path fill="#62bcdb" d="M45,10a4.91,4.91,0,0,1,5,4.81V55.19A4.91,4.91,0,0,1,45,60H19a4.91,4.91,0,0,1-5-4.81V14.81A4.91,4.91,0,0,1,19,10Z"></path>
      <rect width="28" height="42" x="19" y="15" opacity=".2" rx="2"></rect>
      <path d="M26.29,13.08H37.71A2.29,2.29,0,0,0,40,10.79h0A2.29,2.29,0,0,0,37.71,8.5H35.43A3.43,3.43,0,0,0,32,5.08h0A3.43,3.43,0,0,0,28.57,8.5H26.29A2.29,2.29,0,0,0,24,10.79h0A2.29,2.29,0,0,0,26.29,13.08Z" opacity=".2"></path>
      <rect width="28" height="42" x="18" y="14" fill="#ffbc00" rx="2"></rect>
      <path d="M39.89,22.52c1.84,1.77,1.54,4.5.32,6.74a13.14,13.14,0,0,1-7.3,6.52s-4.32-1.18-7.34-6.52c-1.26-2.22-1.65-5,.19-6.74s5.16-1.24,6.75,1.61l.31.64.32-.64C34.73,21.28,38.06,20.75,39.89,22.52Z" opacity=".2"></path>
      <path fill="#f26a69" d="M39,22.16c1.84,1.77,1.53,4.5.32,6.74A13.14,13.14,0,0,1,32,35.42s-4.32-1.18-7.34-6.52c-1.26-2.22-1.65-5,.18-6.74s5.17-1.24,6.75,1.61c0,0,.31.63,.32.64s.32-.64,.32-.64C33.82,20.92,37.14,20.39,39,22.16Z"></path>
      <path fill="#2bc936" d="M26.29,12H37.71A2.28,2.28,0,0,0,40,9.71h0a2.28,2.28,0,0,0-2.29-2.28H35.43A3.44,3.44,0,0,0,32,4h0a3.44,3.44,0,0,0-3.43,3.43H26.29A2.28,2.28,0,0,0,24,9.71h0A2.28,2.28,0,0,0,26.29,12Z"></path>
      <path d="M40 43H24a1 1 0 010-2H40a1 1 0 010 2zM40 49H24a1 1 0 010-2H40a1 1 0 010 2z"></path>
    </svg>
);


const ShoppingBagIconOriginal = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 467.685" {...props}>
        <path fill="#34B169" d="M159.632 0h87.127c9.117 0 16.576 7.459 16.576 16.576v68.882H143.056V16.576C143.056 7.459 150.515 0 159.632 0z"/>
        <path fill="#4C80BF" d="M313.587 34.74c33.703 0 62.487 21.049 73.941 50.718H239.642c11.454-29.669 40.238-50.718 73.945-50.718z"/>
        <path fill="#FFD448" d="M407.338 10.942c44.42 0 81.311 32.196 88.626 74.528l-.303-.012H318.712c7.319-42.323 44.211-74.516 88.626-74.516z"/>
        <path fill="#FB5541" fillRule="nonzero" d="M151.727 278.707l-47.29-171.245a16.321 16.321 0 01-.994-5.63c0-9.04 7.335-16.374 16.374-16.374h375.844c1.29.039 2.598.19 3.903.512 8.76 2.155 14.114 11.004 11.959 19.764l-42.37 171.42c-1.324 7.708-8.045 13.578-16.133 13.578H167.46v-.05c-7.16.004-13.734-4.741-15.733-11.975z"/>
        <path fill="#333" d="M224.685 387.66c22.097 0 40.013 17.911 40.013 40.013 0 22.097-17.916 40.012-40.013 40.012-22.101 0-40.016-17.915-40.016-40.012 0-22.102 17.915-40.013 40.016-40.013zM400.109 387.66c22.101 0 40.012 17.911 40.012 40.013 0 22.097-17.911 40.012-40.012 40.012-22.098 0-40.013-17.915-40.013-40.012 0-22.102 17.915-40.013 40.013-40.013z"/>
        <path fill="#B73E30" fillRule="nonzero" d="M225.838 158.688c-.419-6.329 4.369-11.808 10.698-12.227 6.329-.419 11.807 4.368 12.227 10.698l4.115 61.158c.42 6.329-4.368 11.808-10.697 12.227-6.329.42-11.807-4.368-12.227-10.697l-4.116-61.159zM301.103 157.923c0-6.352 5.157-11.508 11.509-11.508 6.353 0 11.509 5.156 11.509 11.508v61.159c0 6.353-5.156 11.509-11.509 11.509-6.352 0-11.509-5.156-11.509-11.509v-61.159zM376.462 157.159c.419-6.33 5.898-11.117 12.227-10.698 6.329.419 11.116 5.898 10.697 12.227l-4.116 61.159c-.419 6.329-5.898 11.117-12.227 10.697-6.329-.419-11.116-5.898-10.697-12.227l4.116-61.158z"/>
        <path fill="#484848" fillRule="nonzero" d="M16.37 52.333C7.331 52.333 0 45.002 0 35.963c0-9.039 7.331-16.37 16.37-16.37h42.603l1.635.082c14.882.271 28.426 3.187 39.818 10.277 12.468 7.758 21.775 19.861 26.687 37.928 16.553 70.979 39.349 142.07 56.387 213.068 7.105 28.084 12.961 42.544 22.167 48.729 8.034 5.398 21.336 6.547 42.272 6.473 8.516-.027 16.817-.202 25.329-.202h175.209c9.04 0 16.37 7.331 16.37 16.37 0 9.039-7.33 16.371-16.37 16.371H272.499c-8.092 0-16.033.058-24.121.073-27.615.074-45.895-1.91-60.875-11.974-17.356-11.657-26.5-31.463-35.703-67.916L95.522 76.446c-2.543-9.362-6.83-15.299-12.359-18.739-5.929-3.689-13.827-5.242-22.963-5.42l-1.227.046H16.37z"/>
        <path fill="#333" fillRule="nonzero" d="M0 35.963c0-9.039 7.331-16.37 16.37-16.37h42.603l1.635.082c14.882.271 28.426 3.187 39.818 10.277 12.468 7.758 21.775 19.861 26.687 37.928 16.553 70.979 39.349 142.07 56.387 213.068 7.105 28.084 12.961 42.544 22.167 48.729 8.045 5.405 21.375 6.551 42.366 6.473 8.472-.027 16.735-.202 25.203-.202h175.241c9.04 0 16.37 7.331 16.37 16.37H260.248c-62.622 1.103-76.286-2.865-92.59-67.41l-56.34-212.745c-7.459-27.436-27.149-36.052-52.345-36.2H0z"/>
    </svg>
);


export function Header() {
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isAuthSheetOpen, setIsAuthSheetOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const router = useRouter();
  // Products fetched from backend for search/autocomplete
  const { products: uniqueProducts = [] } = useProducts();
  
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    setIsClient(true);
    
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
            setIsHeaderVisible(false); // Scrolling down
        } else {
            setIsHeaderVisible(true); // Scrolling up
        }
        lastScrollY.current = currentScrollY;
        ticking.current = false;
    };
    
    const onScroll = () => {
        if (!ticking.current) {
            window.requestAnimationFrame(handleScroll);
            ticking.current = true;
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target as Node)) {
        setIsSuggestionsVisible(false);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      const filtered = uniqueProducts.filter((product: Product) => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limit suggestions
      setSuggestions(filtered);
      setIsSuggestionsVisible(true);
    } else {
      setSuggestions([]);
      setIsSuggestionsVisible(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSuggestionsVisible(false);
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    }
  };

  const handleAccountClick = () => {
    setIsAuthSheetOpen(true);
  }


  const navLinks = [
    { name: 'New', href: '/collections/men' },
    { name: 'Men', href: '/collections/men' },
    { name: 'Women', href: '/collections/women' },
    { name: 'Accessories', href: '/collections/men' },
    { name: 'Offers', href: '/offers' },
    { name: 'About Us', href: '/about' },
  ];

  return (
    <header 
        ref={headerRef}
        className={cn(
            "sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b transition-transform duration-300",
            !isHeaderVisible && '-translate-y-full'
        )}
    >
      <div className="flex flex-col">
        {/* Top Bar */}
        <div 
            className="flex h-16 items-center justify-between px-4 md:px-8"
        >
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="h-12 w-auto" />
            </Link>
          </div>

          <div ref={searchWrapperRef} className="flex-1 flex justify-center px-8 relative">
             <form onSubmit={handleSearchSubmit} className="relative w-full max-w-lg hidden md:flex">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input 
                    placeholder="Search for a product, activity, shoes..." 
                    className="h-10 pl-12 rounded-full bg-secondary focus:ring-2 focus:ring-ring"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => { if(suggestions.length > 0) setIsSuggestionsVisible(true);}}
                />
            </form>
             {isSuggestionsVisible && suggestions.length > 0 && (
                <div className="absolute top-full mt-2 w-full max-w-lg bg-white border rounded-lg shadow-lg z-50">
                    {suggestions.map(product => (
                        <Link 
                            key={product.id} 
                            href={`/products/${product.id}`}
                            className="flex items-center gap-4 p-3 hover:bg-gray-100"
                            onClick={() => setIsSuggestionsVisible(false)}
                        >
                            <Image src={product.imageUrl} alt={product.name} width={40} height={40} className="object-contain" />
                            <div className="flex-grow">
                                <p className="font-semibold text-sm">{product.name}</p>
                                <p className="text-xs text-gray-500">{product.category}</p>
                            </div>
                            <p className="text-sm font-semibold">{formatPrice(product.priceAsNumber)}</p>
                        </Link>
                    ))}
                </div>
            )}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
             <Button variant="ghost" size="icon" className="hidden md:flex" onClick={handleAccountClick}>
              <User className="h-6 w-6" />
              <span className="sr-only">Account</span>
            </Button>
            
            <Button asChild variant="ghost" size="icon" className="hidden md:flex relative">
              <Link href="/wishlist">
                <WishlistIcon />
                {isClient && wishlist.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-white text-xs font-bold">
                    {wishlist.length}
                  </span>
                )}
                <span className="sr-only">Wishlist</span>
              </Link>
            </Button>
            
            <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingBagIconOriginal />
                    {isClient && itemCount > 0 && (
                      <span
                        className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-white text-xs font-bold"
                      >
                        {itemCount}
                      </span>
                    )}
                    <span className="sr-only">{isClient ? `${itemCount} items in cart` : '0 items in cart'}</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg p-6 flex flex-col">
                    <SheetHeader>
                        <SheetTitle className="sr-only">Shopping Cart</SheetTitle>
                        <SheetDescription className="sr-only">View and edit the items in your shopping cart.</SheetDescription>
                    </SheetHeader>
                   <Cart />
                </SheetContent>
            </Sheet>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Bottom Bar - Navigation */}
        <div className="hidden md:flex h-10 items-center justify-center px-4 md:px-8 border-t">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link, index) => {
                const menuData = megaMenuItems[link.name as keyof typeof megaMenuItems];

                if (!menuData) {
                    return (
                        <NavigationMenuItem key={`${link.name}-${index}`}>
                            <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "text-sm font-semibold uppercase tracking-wider text-foreground/80 hover:text-foreground bg-transparent")}>
                                <Link href={link.href}>
                                {link.name}
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    );
                }

                if (link.name === 'Offers') {
                  return (
                    <NavigationMenuItem key={`${link.name}-${index}`}>
                      <NavigationMenuTrigger className="text-sm font-semibold uppercase tracking-wider text-foreground/80 hover:text-foreground bg-transparent hover:bg-accent focus:bg-accent data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                        {link.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                         <div className="p-8 w-[980px]">
                          <div className="grid grid-cols-12 gap-8">
                            <div className="col-span-8">
                               <h3 className="font-bold text-lg mb-4">Current Offers</h3>
                               <div className="grid grid-cols-2 gap-4">
                                 {(menuData as any).coupons.map((coupon: { title: string, code: string }) => (
                                   <CouponCard key={coupon.code} title={coupon.title} code={coupon.code} />
                                 ))}
                               </div>
                            </div>
                             <div className="col-span-4">
                                <Link href={(menuData as any).image.href} className="group relative block h-full w-full overflow-hidden rounded-lg">
                                  <Image 
                                      src={(menuData as any).image.src}
                                      alt={(menuData as any).image.alt}
                                      fill
                                      className="object-cover"
                                      data-ai-hint={(menuData as any).image.imageHint}
                                  />
                                  <div className="absolute inset-0 bg-black/20"/>
                                  <div className="absolute bottom-4 left-4 text-white flex items-center justify-between w-[calc(100%-2rem)]">
                                    <h3 className="font-bold text-lg uppercase tracking-wider">{(menuData as any).image.title}</h3>
                                    <div className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:scale-110">
                                      <ArrowRight className="h-6 w-6" />
                                    </div>
                                  </div>
                                </Link>
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }

                 if (link.name === 'About Us') {
                  return (
                    <NavigationMenuItem key={`${link.name}-${index}`}>
                      <NavigationMenuTrigger className="text-sm font-semibold uppercase tracking-wider text-foreground/80 hover:text-foreground bg-transparent hover:bg-accent focus:bg-accent data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                        {link.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                         <div className="p-8 w-[980px]">
                          <div className="grid grid-cols-12 gap-8">
                            <div className="col-span-8 flex flex-col justify-center">
                               <h3 className="font-bold text-2xl mb-4">About Fashion Aura</h3>
                               <div className="text-sm text-muted-foreground space-y-4 whitespace-pre-wrap">
                                {(menuData as any).description}
                               </div>
                               <Button asChild className="mt-6 w-fit">
                                <Link href="/about#contact">Contact Us</Link>
                               </Button>
                            </div>
                             <div className="col-span-4">
                                <Link href={(menuData as any).image.href} className="group relative block h-full w-full overflow-hidden rounded-lg">
                                  <Image 
                                      src={(menuData as any).image.src}
                                      alt={(menuData as any).image.alt}
                                      fill
                                      className="object-cover"
                                      data-ai-hint={(menuData as any).image.imageHint}
                                  />
                                  <div className="absolute inset-0 bg-black/20"/>
                                  <div className="absolute bottom-4 left-4 text-white flex items-center justify-between w-[calc(100%-2rem)]">
                                    <h3 className="font-bold text-lg uppercase tracking-wider">{(menuData as any).image.title}</h3>
                                    <div className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:scale-110">
                                      <ArrowRight className="h-6 w-6" />
                                    </div>
                                  </div>
                                </Link>
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }


                const sectionKeys = Object.keys(menuData);
                const featuredKey = sectionKeys.find(k => k.toLowerCase().includes('featured')) || 'featured';
                const collectionsKey = sectionKeys.find(k => k.toLowerCase().includes('collections')) || 'collections';
                const mustHavesKey = sectionKeys.find(k => k.toLowerCase().includes('must-have')) || 'Must-Haves';
                
                return (
                    <NavigationMenuItem key={`${link.name}-${index}`}>
                      <NavigationMenuTrigger className="text-sm font-semibold uppercase tracking-wider text-foreground/80 hover:text-foreground bg-transparent hover:bg-accent focus:bg-accent data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                        {link.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="p-8 w-[980px]">
                          <div className="grid grid-cols-12 gap-8">
                            <div className="col-span-8 grid grid-cols-3 gap-8">
                                <div>
                                  <Link href="/products" className="font-bold mb-4 inline-flex items-center gap-1 hover:underline">
                                    {featuredKey.charAt(0).toUpperCase() + featuredKey.slice(1)} <ArrowRight className="h-4 w-4" />
                                    </Link>
                                  <ul className="space-y-3">
                                      {((menuData as any)[featuredKey] as {title: string, href: string}[]).map(item => <li key={item.title}><Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground">{item.title}</Link></li>)}
                                  </ul>
                                </div>
                                <div>
                                  <Link href="/products" className="font-bold mb-4 inline-flex items-center gap-1 hover:underline">
                                    {link.name === 'Men' ? 'Shop by Category' : link.name === 'Women' ? 'Shop by Occasion' : link.name === 'Accessories' ? 'Shop the Look' : 'Collections'} <ArrowRight className="h-4 w-4" />
                                  </Link>
                                  <ul className="space-y-3">
                                    {((menuData as any)[collectionsKey] as {title: string, href: string}[]).map(item => <li key={item.title}><Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground">{item.title}</Link></li>)}
                                  </ul>
                                </div>
                                <div>
                                  <Link href="/products" className="font-bold mb-4 inline-flex items-center gap-1 hover:underline">
                                     {link.name === 'Men' ? 'Essentials' : link.name === 'Women' ? 'Style Picks' : link.name === 'Accessories' ? 'Editor’s Choice' : 'Must-Haves'} <ArrowRight className="h-4 w-4" />
                                  </Link>
                                  <ul className="space-y-3">
                                    {((menuData as any)[mustHavesKey] as {title: string, href: string}[]).map(item => <li key={item.title}><Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground">{item.title}</Link></li>)}
                                  </ul>
                                </div>
                            </div>
                            <div className="col-span-4">
                                <Link href={(menuData as any).image.href} className="group relative block h-full w-full overflow-hidden rounded-lg">
                                  <Image 
                                      src={(menuData as any).image.src}
                                      width={600}
                                      height={400}
                                      alt={(menuData as any).image.alt}
                                      className="object-cover"
                                      data-ai-hint={(menuData as any).image.imageHint}
                                  />
                                  <div className="absolute inset-0 bg-black/20"/>
                                  <div className="absolute bottom-4 left-4 text-white flex items-center justify-between w-[calc(100%-2rem)]">
                                    <h3 className="font-bold text-lg uppercase tracking-wider">{(menuData as any).image.title}</h3>
                                    <div className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:scale-110">
                                      <ArrowRight className="h-6 w-6" />
                                    </div>
                                  </div>
                                </Link>
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      
      <AuthSheet open={isAuthSheetOpen} onOpenChange={setIsAuthSheetOpen} />

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute top-full left-0 w-full bg-background border-t transition-transform duration-300",
        isMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
          <div className="flex flex-col items-start gap-1 p-4">
             <form onSubmit={handleSearchSubmit} className="relative w-full mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input 
                  placeholder="Search..." 
                  className="h-12 pl-10 rounded-full bg-secondary focus:ring-2 focus:ring-ring"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
            </form>
            {navLinks.map(link => (
              <Link key={link.name} href={link.href} className="w-full p-4 text-lg font-bold uppercase tracking-wider hover:bg-secondary rounded-md" onClick={() => setIsMenuOpen(false)}>{link.name}</Link>
            ))}
             <div className="border-t w-full mt-4 pt-4 flex flex-col gap-2">
                <Button variant="ghost" className="w-full justify-start p-4 gap-2" onClick={() => { setIsMenuOpen(false); handleAccountClick();}}>
                  <User className="h-5 w-5" />
                  My Account
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start p-4 gap-2">
                  <Link href="/wishlist">
                    <WishlistIcon className="h-5 w-5" />
                    Wishlist
                  </Link>
                </Button>
             </div>
          </div>
        </div>
    </header>
  );
}
