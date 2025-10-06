
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { type Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Star, Truck, ShieldCheck, Tag, Heart } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';

export function ProductDetailsClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }
 
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    // Show toast immediately, then perform cart update on next tick so toast appears fast
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
    setTimeout(() => addToCart(product), 0);
  };

  const handleBuyNow = () => {
    toast({
      title: 'Proceeding to checkout',
      description: 'You would be redirected to the checkout page.',
    });
    setTimeout(() => addToCart(product), 0);
  };

  const handleWishlistToggle = () => {
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

  const images = [product.imageUrl, ...(product.gallery || [])];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Carousel */}
        <div>
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {images.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-square relative bg-secondary rounded-lg overflow-hidden">
                     <Image
                      src={img}
                      alt={`${product.name} image ${index + 1}`}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
           <div className="grid grid-cols-5 gap-2 mt-4">
              {images.map((img, index) => (
                  <button key={index} onClick={() => api?.scrollTo(index)} className={cn("aspect-square relative rounded-md overflow-hidden border-2", current === index + 1 ? 'border-primary' : 'border-transparent')}>
                      <Image src={img} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                  </button>
              ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl lg:text-4xl font-display font-black uppercase tracking-wide">{product.name}</h1>
          {product.tagline && <p className="text-lg text-muted-foreground mt-2">{product.tagline}</p>}

          <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("h-5 w-5", i < (product.rating || 0) ? "text-amber-400 fill-amber-400" : "text-gray-300")} />
                  ))}
              </div>
              <p className="text-sm text-muted-foreground">({(product.reviews || []).length} reviews)</p>
          </div>
          
          <p className="text-4xl font-bold mt-4">{formatPrice(product.priceAsNumber)}</p>

          {/* Actions */}
          <div className="flex gap-4 mt-8">
            <Button size="lg" className="flex-1 h-14 text-base" onClick={handleAddToCart}>Add to Cart</Button>
            <Button size="lg" variant="secondary" className="flex-1 h-14 text-base" onClick={handleBuyNow}>Buy Now</Button>
            <Button size="icon" variant="outline" className="h-14 w-14" onClick={handleWishlistToggle} aria-label="Add to wishlist">
              <Heart className={cn("h-6 w-6", isInWishlist ? "text-red-500 fill-current" : "text-foreground")} />
            </Button>
          </div>

          {/* Details */}
          <div className="mt-8 space-y-4 text-sm text-muted-foreground">
               <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary"/>
                  <span>Free Shipping on all orders</span>
              </div>
               <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary"/>
                  <span>2 Year Warranty</span>
              </div>
              <div className="flex items-center gap-3">
                  <Tag className="h-5 w-5 text-primary"/>
                  <span>Use code NEW15 for 15% off</span>
              </div>
          </div>

          {/* Accordion for Details */}
          <Accordion type="single" collapsible defaultValue="description" className="w-full mt-8">
            <AccordionItem value="description">
              <AccordionTrigger className="text-lg font-semibold">Description</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {product.description || 'No description available.'}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="specifications">
              <AccordionTrigger className="text-lg font-semibold">Specifications</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  {(product.specifications || []).map(spec => <li key={spec.name}><strong>{spec.name}:</strong> {spec.value}</li>)}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="reviews">
              <AccordionTrigger className="text-lg font-semibold">Reviews ({product.reviews?.length || 0})</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
                  {(product.reviews || []).length > 0 ? product.reviews?.map((review, index) => (
                    <div key={index}>
                      <div className="flex items-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={cn("h-4 w-4", i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-300")} />
                        ))}
                      </div>
                      <p className="font-semibold">{review.author}</p>
                      <p className="text-muted-foreground text-sm">{review.comment}</p>
                    </div>
                  )) : <p>No reviews yet.</p>}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
  );
}

