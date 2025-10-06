
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { useToast } from '@/hooks/use-toast';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import Link from 'next/link';

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


interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'detailed';
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const formatPrice = (price: number | string) => {
  const numericPrice = typeof price === 'string' 
    ? parseFloat(price.replace(/[^0-9.]/g, '')) 
    : price;

  if (isNaN(numericPrice)) return 'N/A';

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numericPrice);
};


export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isInWishlist = isClient ? wishlist.some((item) => item.id === product.id) : false;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Show feedback immediately, defer the actual cart mutation so the toast appears without delay
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
    // Defer heavy work (localStorage serialization) to next tick so UI updates aren't blocked
    setTimeout(() => addToCart(product), 0);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: 'Removed from wishlist',
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: 'Added to wishlist',
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const colorThumbnails = product.colors || [];

  const cardContent = (
    <>
      <div className="relative aspect-[1/1] w-full overflow-hidden mb-3 bg-secondary rounded-md">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-500 ease-in-out group-hover:scale-105"
          data-ai-hint={product.imageHint}
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536px) 25vw, 20vw"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white h-8 w-8"
            aria-label="Add to wishlist"
            onClick={handleWishlistToggle}
          >
            <WishlistIcon className={cn("h-4 w-4 text-foreground/80", isInWishlist && "text-red-500 fill-current")} />
          </Button>
          <Button
            onClick={handleAddToCart}
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white h-8 w-8"
            aria-label="Add to cart"
          >
            <ShoppingBagIconOriginal className="h-4 w-4" />
          </Button>
        </div>
        {product.isNew && <Badge variant="default" className="absolute top-2 left-2 bg-white text-black rounded-none">New arrival</Badge>}
      </div>
      <div className="flex-grow mt-2">
        {colorThumbnails.length > 0 && variant === 'detailed' && (
           <div className="flex items-center gap-1 mb-2">
              <button className="h-6 w-6 rounded-full border-2 border-foreground flex items-center justify-center">
                <Image src={colorThumbnails[0].imageUrl} alt={colorThumbnails[0].colorName} width={20} height={20} className="rounded-full object-cover"/>
              </button>
              {colorThumbnails.slice(1, 5).map((color) => (
                <button key={color.colorName} className="h-6 w-6 rounded-full border flex items-center justify-center">
                   <Image src={color.imageUrl} alt={color.colorName} width={20} height={20} className="rounded-full object-cover"/>
                </button>
              ))}
              {colorThumbnails.length > 5 && (
                <button className="h-6 w-6 flex items-center justify-center">
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
           </div>
        )}
        <h3 className="font-bold text-sm md:text-base leading-tight uppercase tracking-wide">{product.name}</h3>
        {product.tagline && <p className="text-sm text-muted-foreground truncate">{product.tagline}</p>}
        <p className="font-body text-sm font-semibold text-foreground/80 mt-1">
          {formatPrice(product.price)}
        </p>
      </div>
    </>
  );

  if (variant === 'detailed') {
    return (
      <Link href={`/products/${product.id}`} className="group flex flex-col text-left">
          <motion.div variants={cardVariants}>
            {cardContent}
          </motion.div>
      </Link>
    );
  }

  return (
    <Link href={`/products/${product.id}`} className="group flex flex-col text-left">
        <motion.div variants={cardVariants}>
            <div className="relative aspect-[3/4] w-full overflow-hidden mb-3 bg-secondary rounded-md">
                <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain p-4 transition-transform duration-500 ease-in-out group-hover:scale-105"
                data-ai-hint={product.imageHint}
                sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536px) 25vw, 20vw"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                    aria-label="Add to wishlist"
                    onClick={handleWishlistToggle}
                >
                    <WishlistIcon className={cn("h-5 w-5 text-foreground/80", isInWishlist && "text-red-500 fill-current")} />
                </Button>
                <Button
                    onClick={handleAddToCart}
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                    aria-label="Add to cart"
                >
                    <ShoppingBagIconOriginal className="h-5 w-5" />
                </Button>
                </div>
            </div>
            <div className="flex-grow mt-2">
                <h3 className="font-bold text-sm md:text-base leading-tight">{product.name}</h3>
                {product.tagline && <p className="text-sm text-muted-foreground truncate">{product.tagline}</p>}
                <p className="font-body text-sm font-semibold text-foreground/80 mt-1">
                {formatPrice(product.price)}
                </p>
            </div>
        </motion.div>
    </Link>
  );
}
